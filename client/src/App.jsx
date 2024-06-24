import "react-toastify/dist/ReactToastify.css";
import "./assets/styles/global.css";
import "./assets/styles/login/login.css";
import "./assets/styles/home/home.css";
import "./assets/styles/property/property.css";
import "./assets/styles/error/error.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/pages/home/Home";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import ErrorPage from "./components/ErrorPage";
import Property from "./components/pages/selller/Property";

const App = () => {
    return (
        <div className="container">
            <BrowserRouter>
                <Routes>
                    <Route index element={<Home />} />
                    {/* Authentication */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/property" element={<Property />} />
                    {/* 404 */}
                    <Route path="*" element={<ErrorPage />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;
