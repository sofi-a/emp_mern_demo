import { SET_LOADING, SetLoadingAction } from '../actions/types';

const initialState = true;

export default (state: boolean = initialState, action: SetLoadingAction) => {
    const { type, payload } = action;

    switch(type) {
        case SET_LOADING:
            return payload;
        default:
            return state;
    }
}
