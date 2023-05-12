import ReactDOM from "react-dom";
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

export default function App() {
    const user = {
        email: 'Temail',
        password: 'Tpassword',
        address: 'Taddress',
        city: 'Tcity',
        state: 'Tstate',
        zip: 'Tzip',
        id: 'Tid',
        userType: 'TuserType',
        phone: 'Tphone'
    };
    return (
        <AuthProvider user={user}>
            <BrowserRouter>
                <Routes>
                    <Route index element={<Home />} />
                    <Route path="SignUp" element={<SignUp />} />
                    <Route path="About" element={<About />} />
                    <Route path="Connect" element={<Connect />} />
                    <Route path="VetLoginPage" element={<VetLoginPage />} />
                    <Route path="AdminLoginPage" element={<AdminLoginPage />} />
                    <Route path="UserLoginPage" element={<UserLoginPage />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>

    );
}

ReactDOM.render(<App />, document.getElementById("root"));