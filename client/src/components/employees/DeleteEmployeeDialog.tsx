import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import { Employee, RootState } from '../../models';
import { removeEmployee } from '../../actions/employees';
import { CircularProgress } from '@material-ui/core';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DeleteEmployeeDialog = (props: {
    open: boolean,
    setOpen: (open: boolean) => void,
    employee: Employee
}) => {
    const dispatch = useDispatch();
    const { open, setOpen, employee } = props;
    const loading = useSelector((state: RootState) => state.loading);

    const handleClose = () => {
        setOpen(false);
    }

    const handleDelete = (id: string) => {
        dispatch(removeEmployee(id));
        setTimeout(() => {
            if(!loading) setOpen(false);
        }, 1000);
    }

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle id="alert-dialog-slide-title">Delete Employee</DialogTitle>
            <DialogContent>
               <DialogContentText id="alert-dialog-slide-description">
                    Are you sure you want to remove {employee.name}? This action is irreversible
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={() => handleDelete(employee._id as string)} color="secondary">
                    { loading ? <CircularProgress size="1.5em" /> : 'Delete'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default DeleteEmployeeDialog;
