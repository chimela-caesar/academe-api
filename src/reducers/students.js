import { keyBy } from 'lodash';

import initialState from '../constants/initialState';
import * as types from '../constants/types';

export function students(state = initialState.students, action) {
    switch (action.type) {
        case types.students.UPDATE: {
            return keyBy(action.students, 'id');
        }
        default:
            return state;
    }
}

export function studentIds(state = initialState.studentIds, action) {
    switch (action.type) {
        case types.students.UPDATE: {
            const nextStudentIds = action.students
                .map(student => student.id);
            return nextStudentIds;
        }
        default:
            return state;
    }
}
