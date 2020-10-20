import React from 'react';
import { Provider } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import store from './store';
import EmployeesTable from './components/employees';
import Toast from './components/Toast';
import { createStyles, makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        background: theme.palette.grey[50],
        padding: theme.spacing(5)
    }
}));

const App = () => {
    const classes = useStyles();

    return (
        <Provider store={store}>
            <Grid
                container
                spacing={0}
                className={classes.root}
            >
                <Grid item>
                    <Toast />
                    <EmployeesTable />
                </Grid>
            </Grid>
        </Provider>
    );
}

export default App;
