import { Alert } from '../models';
import {
    SET_ALERT,
    REMOVE_ALERT,
    AlertActionTypes
} from '../actions/types';

const initialState: Alert[] = [];

export default (state = initialState, action: AlertActionTypes) => {    
    const { type, payload } = action;

    switch(type) {
        case SET_ALERT:
            return [ ...state, payload ];
        case REMOVE_ALERT:
            return state.filter(alert => alert.id !== payload.id);
        default:
            return state;
    }
}