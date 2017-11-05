import * as types from '../constants/types';
import User from '../api/User';
import { loading, loaded } from './loading';

export function addUser(user) {
    return {
        type: types.auth.LOGIN,
        error: false,
        user
    };
}

export function removeUser() {
    return {
        type: types.auth.LOGOUT,
        error: false
    };
}

export function login(user) {
    return dispatch => {
        dispatch(loading());
        return User.login(user).then(user => {
            dispatch(addUser(user));
            dispatch(loaded());
        });
    };
}

export function logout() {
    return dispatch => {
        dispatch(loading());
        return User.logout().then(user => {
            dispatch(removeUser());
            dispatch(loaded());
        });
    };
}


