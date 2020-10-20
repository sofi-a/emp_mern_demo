import { Alert } from '../models';
import {
    SET_ALERT,
    REMOVE_ALERT,
    AlertActionTypes
} from './types';

export const setAlert = (alert: Alert): AlertActionTypes => ({
    type: SET_ALERT,
    payload: alert
});

export const removeAlert = (alert: Alert): AlertActionTypes => ({
    type: REMOVE_ALERT,
    payload: alert
});
