import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Info from "./Info";

const ErrorPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        toast.info("Redirecting you to home ...");
        setTimeout(() => {
            navigate("/");
        }, 2500);
    }, []);

    return (
        <div className="error-container flex f-center f-column">
            <ToastContainer theme="dark" autoClose={2000} />
            <img src={Info.images.home} />
            <h2>Route 404 ! Lost Yout Way ?</h2>
            <Link to="/" className="link">
                Go back Home
            </Link>
        </div>
    );
};

export default ErrorPage;
