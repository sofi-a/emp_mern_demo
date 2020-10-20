import React, { ElementType, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import clsx from 'clsx';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import { amber, green } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { removeAlert } from '../actions/alerts';
import { RootState, Variant } from '../models';

const variantIcon = (variant: string) => {
    switch(variant) {
        case 'success':
            return CheckCircleIcon;
        case 'warning':
            return WarningIcon;
        case 'error':
            return ErrorIcon;
        case 'info':
            return InfoIcon;
    }
};

const useStyles = makeStyles((theme: Theme) => createStyles({
    success: {
        backgroundColor: green[600]
    },
    error: {
        backgroundColor: theme.palette.error.main
    },
    info: {
        backgroundColor: theme.palette.primary.main
    },
    warning: {
        backgroundColor: amber[700]
    },
    icon: {
        fontSize: 20
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing(1)
    },
    message: {
        display: 'flex',
        alignItems: 'center'
    }
}));

function SnackbarContentWrapper(props: { message: string, onClose: () => void, variant: Variant, className?: string }) {
    const classes = useStyles();
    const { className, message, onClose, variant, ...other } = props;
    const Icon = variantIcon(variant) as ElementType;

    return (
        <SnackbarContent
            className={clsx(classes[variant], className)}
            aria-describedby="client-snackbar"
            message={
                <span id="client-snackbar" className={classes.message}>
                    <Icon className={clsx(classes.icon, classes.iconVariant)} />
                    {message}
                </span>
            }
            action={[
                <IconButton
                    key="close"
                    aria-label="close"
                    color="inherit"
                    onClick={onClose}
                >
                    <CloseIcon className={classes.icon} />
                </IconButton>
            ]}
            {...other}
        />
    );
}

const Toast = (): JSX.Element => {
    const alerts = useSelector((state: RootState) => state.alerts);
    const dispatch = useDispatch();

    const SnackBars = (
        <Fragment>
            {alerts !== null &&
            alerts.length > 0 &&
            alerts.map(alert => (
                <div key={alert.id}>
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left'
                        }}
                        open={alert.open}
                        autoHideDuration={alert.timeout}
                        onClose={() => dispatch(removeAlert(alert))}
                    >
                        <SnackbarContentWrapper
                            onClose={() => dispatch(removeAlert(alert))}
                            variant={alert.type}
                            message={alert.message}
                        />
                    </Snackbar>
                </div>
            ))}
        </Fragment>
    );

    return SnackBars;
}

export default Toast;