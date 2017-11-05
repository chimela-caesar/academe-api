import React from 'react';
import { Link } from 'react-router';

const NotFound = () => {
    return (
        <div className="container">
            <div className="row middle-md center-md">
                <div className="col-md-12">
                    <h2>Not found :(</h2>
                    <Link to="/">
                        <button className="btn btn-default">
                            go back home
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
