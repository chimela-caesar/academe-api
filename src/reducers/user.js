import initialState from '../constants/initialState';
import * as types from '../constants/types';

export function user(state = initialState.user, action) {
    switch (action.type) {
        case types.auth.LOGIN: {
            return action.user.id ? action.user : null;
        }
        case types.auth.LOGOUT: {
            return null;
        }
        default:
            return state;
    }
}
