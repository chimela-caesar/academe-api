import fetch from 'isomorphic-fetch';

class User {
    static login(payload) {
        if (!payload) {
            throw new Error('You must provide a payload at login');
        }
        // Create options for the request
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json'
            }
        };

        // Send the user to the API
        return fetch(`${process.env.API_HOST}/users/signin`, requestOptions).then(res =>
            res.json()
        );
    }

    static logout() {
        const requestOptions = {
            method: 'POST',
            body: {},
            headers: {
                'Content-Type': 'application/json'
            }
        };

        return fetch(`${process.env.API_HOST}/users/signout`, requestOptions).then(res =>
            res.json()
        );
    }
}

export default User;
