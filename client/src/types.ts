export const SET_NAME = 'SET_NAME';
export const REMOVE_NAME = 'REMOVE_NAME';

interface SetNameAction {
    type: typeof SET_NAME,
    payload: string
}

interface RemoveNameAction {
    type: typeof REMOVE_NAME
}

export type NameActionTypes = SetNameAction | RemoveNameAction;
