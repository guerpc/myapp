import React from 'react';
import LogIn from './Signin.js';
import PageLayout from './PageLayout';
import User from './User';
import queryTarget from '../index';

function Home(props, queryTarget) {
    const user = props.user;

    return (
        <div>
        <h1>this is the homepage</h1>
            <PageLayout user={user} queryTarget={queryTarget}/>
        </div>
        );
}

export default Home;