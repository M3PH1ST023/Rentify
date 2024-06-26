import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Info from "../Info";

const Signup = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState(0);
    const [seller, setSeller] = useState(false);

    const validate = (e) => {
        e.preventDefault();
        let flag = 0;
        if (username.length < 8) {
            toast.error("Username must be atleast 8 characters");
            flag = 1;
        }
        if (password.length < 8) {
            toast.error("Password must be atleast 8 characters");
            flag = 1;
        }
        if (phone.toString().length != 10) {
            flag = 1;
            toast.error("Enter valid phone number");
        }
        if (flag == 0) {
            handleSubmit();
        }
    };

    const handleSubmit = () => {
        let postBody = {
            username: username,
            password: password,
            email: email,
            phone: phone,
            isSeller: seller,
        };
        axios
            .post(Info.server + "/api/v1/auth", postBody)
            .then((resp) => {
                if (resp.data == true) {
                    toast.success("Account Created !");
                    setTimeout(() => {
                        navigate("/login");
                    }, 2500);
                } else {
                    toast.error(resp.data.error);
                    setTimeout(() => {
                        window.location.reload(true);
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
                <h2>Register</h2>
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
                    <label>Email</label>
                    <input
                        type="email"
                        placeholder="Enter Email"
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                </div>
                <div className="inp flex f-column">
                    <label>Phone</label>
                    <input
                        type="number"
                        placeholder="Enter Phone number"
                        onChange={(e) => {
                            setPhone(e.target.value);
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
                    <input
                        type="checkbox"
                        onClick={(e) => {
                            if (seller) {
                                setSeller(false);
                            } else {
                                setSeller(true);
                            }
                            console.log(seller);
                        }}
                    />
                    <span style={{ color: "blue" }}>
                        I'd like to register as landlord
                    </span>
                </div>
                <div className="signup flex f-between">
                    <span>Already an User?</span>
                    <a
                        onClick={(e) => {
                            navigate("/login");
                        }}
                    >
                        Login
                    </a>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Signup;
