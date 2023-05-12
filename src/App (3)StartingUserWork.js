import React, { useState } from "react";
import logo from './logo.svg';
import './App.css';
import LogIn from './Signin.js';
import AdminLoginPage from "./pages/AdminLoginPage";
import User from './User';

function App() {
    const user = new User('Temail', 'Tpassword', 'Taddress', 'Tcity', 'Tstate', 'Tzip', 'Tid', 'TuserType', 'Tphone');

    
    return (
        <div className="App">
            <LogIn />

            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default App;
