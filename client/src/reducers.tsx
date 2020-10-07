import { combineReducers } from 'redux';
import {
    NameActionTypes,
    REMOVE_NAME,
    SET_NAME
} from './types';

const nameReducer = (state = '', action: NameActionTypes): string => {
    switch(action.type) {
        case SET_NAME:
            return action.payload;
        case REMOVE_NAME:
            return '';
        default:
            return state;
    }
}

export default combineReducers({
    name: nameReducer,
});
