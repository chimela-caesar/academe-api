import React from 'react';

import { Route, IndexRoute } from 'react-router';

import App from './pages/app';
import Home from './pages/index';
import Login from './pages/login';
import NotFound from './pages/error';
import SingleStudent from './pages/student';
import auth from './auth/authenticator';

function requireUser(nextState, replace, callback) {
    if (!auth.loggedIn()) {
        replace({
            pathname: '/login'
        });
    }
    callback();
}

export const routes = (
    <Route path="/" component={App}>
        <IndexRoute onEnter={requireUser} component={Home} />
        <Route
            onEnter={requireUser}
            path="/students/:student"
            component={SingleStudent}
        />
        <Route
            onEnter={requireUser}
            path="/newstudent"
            component={SingleStudent}
        />
        <Route path="/login" component={Login} />
        <Route path="*" component={NotFound} />
    </Route>
);
