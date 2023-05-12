import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";

function Navbar() {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/SignUp">SignUp</Link>
                </li>
                <li>
                    <Link to="/About">About</Link>
                </li>
                <li>
                    <Link to="/VetLoginPage">VetLoginPage</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;