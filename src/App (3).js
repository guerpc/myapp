import React, { useState } from "react";
import logo from './logo.svg';
import './App.css';
import LogIn from './Signin.js';
import AdminLoginPage from "./pages/AdminLoginPage";
import User from './pages/User';

function App() {
    const user = {
        email: "test@example.com",
        password: "password123",
        address: "123 Main St",
        city: "Anytown",
        state: "CA",
        zip: "12345",
        id: "user123",
        userType: "customer",
        phone: "555-123-4567"
    };


    return (
        <div className="App">
            <LogIn user={user}/>

            </header>
        </div>
    );
}

export default App;
