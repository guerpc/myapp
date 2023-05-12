import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import Connect from "./pages/Connect";
import VetLoginPage from "./pages/VetLoginPage";
import User from './User';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="SignUp" element={<SignUp user={user} />} />
                    <Route path="About" element={<About />} />
                    <Route path="Connect" element={<Connect />} />
                    <Route path="VetLoginPage" element={<VetLoginPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

ReactDOM.render(<App />, document.getElementById("root"));