import fetch from 'isomorphic-fetch';

class Students {

    static create(payload) {
        if (!payload) {
            throw new Error('You must provide a payload when creating a new student');
        }
        // Create options for the request
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json'
            }
        };

        // Send the new student to the API
        return fetch(`${process.env.API_HOST}/students`, requestOptions).then(res =>
            res.json()
        );
    }

    static fetchMany(n) {
        return fetch(
            `${process.env.API_HOST}/students?_limit=${n}&_sort=id&_order=DESC`
        ).then(res => res.json());
    }

    static fetchOne(id) {
        return fetch(`${process.env.API_HOST}/students/${id}`).then(res => res.json());
    }

    static update(id, payload) {
        if (!payload) {
            throw new Error('You must provide a payload when creating a new student');
        }

        const requestOptions = {
            method: 'PUT',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json'
            }
        };

        return fetch(`${process.env.API_HOST}/students/${id}`, requestOptions).then(res =>
            res.json()
        );
    }

    static delete(id) {
        const requestOptions = {
            method: 'DELETE'
        };

        return fetch(`${process.env.API_HOST}/students/${id}`, requestOptions).then(res => res.json());
    }
}

export default Students;
