import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Cookie from "js-cookie";
import axios from "axios";
import Info from "../Info";
import Cookies from "js-cookie";

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const validate = (e) => {
        e.preventDefault();
        if (password.length < 8) {
            toast.error("Password must be atleast 8 characters");
        } else {
            handleSubmit();
        }
    };

    const handleSubmit = () => {
        let postBody = {
            username: username,
            password: password,
        };
        axios
            .get(Info.server + "/api/v1/auth", { params: postBody })
            .then((resp) => {
                if (resp.data.error) {
                    toast.error(resp.data.error);
                } else {
                    if (resp.data.isSeller) {
                        Cookies.set("isSeller", true, { expires: 3 });
                        Cookies.set(
                            "sellerData",
                            JSON.stringify(resp.data.sellerData),
                            {
                                expires: 3,
                            }
                        );
                    }
                    Cookie.set("authToken", resp.data.authToken, {
                        expires: 3,
                    });
                    // expires in 3 days
                    toast.success("Login Successful !");
                    setTimeout(() => {
                        navigate("/");
                    }, 2500);
                }
            })
            .catch((err) => {
                console.error(err);
            });
    };

    return (
        <div className="login-container flex f-center">
            <ToastContainer theme="dark" autoClose={2000} />
            <form className="login-form flex f-column" onSubmit={validate}>
                <h2>LOGIN</h2>
                <div className="inp flex f-column">
                    <label>Username</label>
                    <input
                        type="text"
                        placeholder="Enter username"
                        onChange={(e) => {
                            setUsername(e.target.value);
                        }}
                    />
                </div>
                <div className="inp flex f-column">
                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="Enter password"
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                </div>
                <div className="signup flex f-between">
                    <span>New User?</span>
                    <a
                        onClick={(e) => {
                            navigate("/signup");
                        }}
                    >
                        Register
                    </a>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Login;
