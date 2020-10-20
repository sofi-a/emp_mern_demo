import React from 'react';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { withFormik, Form, FormikProps, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { Employee } from '../../models';
import { updateEmployee } from '../../actions/employees';
import store from '../../store';
import formatDate from '../../utils/dateFormatter';

type Gender = 'male' | 'female';

interface FormValues {
    name: string;
    dob: Date;
    gender: Gender;
    salary: number;
}

interface OtherProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

const EditEmployeeDialogForm = (props: OtherProps & FormikProps<FormValues>) => {
    const {
        values,
        handleChange,
        handleBlur,
        submitForm,
        touched,
        errors,
        setFieldValue,
        isSubmitting,
        open,
        setOpen
    } = props;

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <Form noValidate>
            <Dialog open={open} onClose={handleClose} aria-labelledby="add-employee-dialog-title">
                <DialogTitle id="add-employee-dialog-title">Edit Employee</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <FormControl
                                fullWidth
                                error={errors.name && touched.name ? true : false}
                            >
                                <TextField
                                    autoComplete="name"
                                    name="name"
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    required
                                    fullWidth
                                    id="name"
                                    label="Name"
                                    autoFocus
                                    aria-describedby="name-helper-text"
                                    error={errors.name && touched.name ? true : false}
                                />
                                <FormHelperText id="name-helper-text">
                                    <ErrorMessage name="name">{msg => msg}</ErrorMessage>
                                </FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl
                                fullWidth
                                error={errors.salary && touched.salary ? true : false}
                            >
                                <TextField
                                    id="salary"
                                    label="Salary"
                                    type="number"
                                    value={values.salary}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    aria-describedby="salary-helper-text"
                                    error={errors.salary && touched.salary ? true : false}
                                />
                                <FormHelperText id="salary-helper-text">
                                    <ErrorMessage name="salary">{msg => msg}</ErrorMessage>
                                </FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Grid container justify="space-around">
                                    <KeyboardDatePicker
                                        margin="normal"
                                        id="date-picker-dialog"
                                        label="Date of Birth"
                                        format="dd/MM/yyyy"
                                        value={values.dob}
                                        onChange={value => setFieldValue('dob', value)}
                                        onBlur={handleBlur}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                        error={errors.dob && touched.dob ? true : false}
                                    />
                                </Grid>
                            </MuiPickersUtilsProvider>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl
                                fullWidth
                                component="fieldset"
                                error={errors.gender && touched.gender ? true : false}
                            >
                                <FormLabel component="legend">Gender</FormLabel>
                                <RadioGroup
                                    aria-label="gender"
                                    name="gender"
                                    value={values.gender}
                                    onChange={handleChange}
                                    onBlur={handleBlur}>
                                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button type="submit" onClick={submitForm} color="primary">
                        {isSubmitting ? <CircularProgress size="1.5rem" color="primary" /> : 'Save'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Form>
    );
};

interface DialogProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    employee: Employee;
}

const EditEmployeeDialog = withFormik<DialogProps, FormValues>({
    enableReinitialize: true,
    mapPropsToValues: props => ({
        name: props.employee.name as string,
        dob: new Date(props.employee.dob as string),
        gender: props.employee.gender as Gender,
        salary: props.employee.salary as number
    }),
    validationSchema: yup.object().shape({
        name: yup.string().required('Name is required'),
        dob: yup.date().required('Date of birth is required'),
        gender: yup.mixed()
                    .oneOf(['male', 'female'], 'Gender must either be male or female')
                    .required('Gender is required'),
        salary: yup.number().required('Salary is required')
    }),
    handleSubmit: (values, formikBag) => {
        const { name, dob, gender, salary } = values;
        const { resetForm, props } = formikBag;

        store.dispatch(updateEmployee({
            _id: props.employee._id,
            name,
            gender,
            salary,
            dob: formatDate(dob)
        }));

        setTimeout(() => {
            if(!store.getState().loading) {
                resetForm();
                props.setOpen(false);
            }
        }, 1000);
    }
})(EditEmployeeDialogForm);

export default EditEmployeeDialog;
