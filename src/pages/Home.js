import React from 'react';
import LogIn from './Signin.js';
import PageLayout from './PageLayout';
import User from './User';
import queryTarget from '../index';
import './styles.css';

function Home(props, queryTarget) {
    const user = props.user;

    return (
        <div className="background">
            <PageLayout user={user} queryTarget={queryTarget}/>
        </div>
        );
}

export default Home;