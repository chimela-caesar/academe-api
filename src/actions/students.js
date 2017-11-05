import * as types from '../constants/types';
import Students from '../api/Students';
import { loading, loaded } from './loading';

export function updateStudents(students) {
    return {
        type: types.students.UPDATE,
        error: false,
        students
    };
}

export function createNewStudent(payload) {
    return dispatch => {
        dispatch(loading());
        return Students.create(payload).then(res => {
            console.log(res);
            dispatch(getStudents());
        });
    };
}

export function updateStudent(id, payload) {
    return dispatch => {
        dispatch(loading());
        return Students.update(id, payload).then(res => {
            console.log(res);
            dispatch(getStudents());
        });
    };
}

export function getStudents(fetchNMore = 5) {
    return (dispatch, getState) => {
        const state = getState();
        const { studentIds } = state;
        const nStudentsToFetch = studentIds.length + fetchNMore;
        dispatch(loading());
        return Students.fetchMany(nStudentsToFetch).then(students => {
            dispatch(updateStudents(students));
            dispatch(loaded());
        });
    };
}

export function getStudent(id) {
    return dispatch => {
        dispatch(loading());
        return Students.fetchOne(id).then(student => {
            dispatch(updateStudents([student]));
            dispatch(loaded());
        });
    };
}

export function deleteStudent(id) {
    return dispatch => {
        dispatch(loading());
        return Students.delete(id).then(res => {
            console.log(res);
            dispatch(getStudents());
        });
    };
}

