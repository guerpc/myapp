import ReactDOM from "react-dom";
import React, { useState, Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import Connect from "./pages/Connect";
import VetLoginPage from "./pages/VetLoginPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import UserLoginPage from "./pages/UserLoginPage";
import { AuthProvider } from 'react-query';
import User from './pages/User';
import AfterSignIn from "./pages/Signin";

function App() {


    const user = {
        vId: "initialized",
        vUsername: "initialized",
        vPass: "initialized",
        type: "initialized",
        otherUID: "initialized"
    };

    const queryTarget = {
        table: {
            VetLoginInfo: { columns: ["VetLoginID", "VetUserName", "VetPassword"], name: "VetLoginInfo" },
            VetAccountInfo: { columns: ["VetAccountID", "VetAccountName"], name: "VetAccountInfo" }
        }
    };


    return (
            <BrowserRouter>
            <Routes> 

                <Route index element={<Home user={user} queryTarget={queryTarget}/>} />
                <Route path="SignUp" element={<SignUp user={user} queryTarget={queryTarget} />} />
                <Route path="About" element={<About user={user} />} />
                <Route path="Connect" element={<Connect user={user} />} />
                <Route path="VetLoginPage" element={<VetLoginPage user={user}  queryTarget={queryTarget} />} />
                <Route path="AdminLoginPage" element={<AdminLoginPage user={user}  />} />
                <Route path="UserLoginPage" element={<UserLoginPage user={user} />} />
                <Route path="AfterSignIn" element={<AfterSignIn user={user} />} />

                </Routes>
            </BrowserRouter>
    );  
}

ReactDOM.render(<App />, document.getElementById("root"));
