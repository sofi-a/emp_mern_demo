import {
    NameActionTypes,
    REMOVE_NAME,
    SET_NAME,
} from './types';

export function setName(newName: string): NameActionTypes {
    return {
        type: SET_NAME,
        payload: newName,
    };
}

export function removeName(): NameActionTypes {
    return {
        type: REMOVE_NAME
    };
}
