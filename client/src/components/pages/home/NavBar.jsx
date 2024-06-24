import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Info from "../../Info";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const NavBar = () => {
    const navigate = useNavigate();
    const [display, setDisplay] = useState("none");
    const [username, setUsername] = useState("");
    const isSeller = Cookies.get("isSeller");
    const loggedIn = Cookies.get("authToken");
    useEffect(() => {
        if (loggedIn) {
            setUsername(jwtDecode(loggedIn).username);
        }
    }, []);

    const logout = (e) => {
        e.preventDefault();
        toast.success("Logout Successful !");
        setTimeout(() => {
            let cookies = Cookies.get();
            for (let cookie in cookies) {
                Cookies.remove(cookie);
            }
            navigate("/login");
        }, 2500);
    };

    return (
        <nav className="flex f-column">
            <ToastContainer theme="dark" autoClose={2000} />
            {!loggedIn ? (
                <div className="login">
                    <a
                        onClick={(e) => {
                            navigate("/login");
                        }}
                    >
                        LOGIN
                    </a>{" "}
                    /{" "}
                    <a
                        onClick={(e) => {
                            navigate("/signup");
                        }}
                    >
                        REGISTER
                    </a>
                </div>
            ) : (
                <img
                    className="account"
                    src={Info.images.account}
                    onClick={(e) => {
                        if (display == "none") {
                            setDisplay("");
                        } else {
                            setDisplay("none");
                        }
                    }}
                />
            )}
            <div
                className="nav-links flex f-column"
                style={{ display: display }}
            >
                <a
                    onClick={(e) => {
                        navigate("/");
                    }}
                >
                    {username}
                </a>

                {isSeller ? (
                    <a
                        onClick={(e) => {
                            navigate("/property");
                        }}
                    >
                        Post Property
                    </a>
                ) : (
                    ""
                )}

                <a onClick={logout}>Logout</a>
            </div>
        </nav>
    );
};

export default NavBar;
