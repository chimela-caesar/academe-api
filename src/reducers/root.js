import { combineReducers } from 'redux';
import { loading } from './loading';
import { students, studentIds } from './students';
import { user } from './user';

const rootReducer = combineReducers({
    loading,
    studentIds,
    students,
    user
});

export default rootReducer;
