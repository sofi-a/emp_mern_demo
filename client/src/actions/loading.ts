import { SET_LOADING, SetLoadingAction } from './types';

export const setLoading = (loading: boolean): SetLoadingAction => ({
    type: SET_LOADING,
    payload: loading
});
