import React, { useState } from "react";
import { login } from "../../api/auth";
import {useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navigate,Link } from "react-router-dom";
import { isAuthenticated } from "../../api/auth";


export default function Signin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);

       

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }
    const navigate = useNavigate();

    if (isAuthenticated()) {
        return <Navigate to="/dashboard" replace />;
      }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            setLoading(true);

            try {

                const res = await login(email, password);
                toast.success("Login successful!");                
                navigate("/dashboard");

            }
            catch (err) {
                
                toast.error(err.message || "Login failed!")

            }
            finally {
                setLoading(false);
            }
        }
        else {
            setError("Invalid email or password")
            toast.error(error);
        }
    }

    const validate = () => {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError("Enter a valid email");
            return false;
        }
        if (!password) {
            setError("Password is required");
            return false;
        }

        return true
    }

  


    return (
        <div>
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-4">
                        <div className="card shadow">
                            <div className="login-container card-body">
                                <h2 className="title-text text-center mb-4">Login</h2>

                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <input
                                            type="email"
                                            name="email"
                                            className="form-control"
                                            value={email}
                                            placeholder="Email"
                                            onChange={handleEmailChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3 position-relative">
                                        <input
                                            type={show ? "text" : "password"}
                                            name="password"
                                            className="form-control"
                                            placeholder="Password"
                                            value={password}
                                            onChange={handlePasswordChange}
                                            required
                                        />
                                        <i
                                            className={`bi ${show ? "bi-eye-slash" : "bi-eye"} position-absolute`}
                                            style={{
                                                top: "44%",
                                                right: "25px",
                                                transform: "translateY(-50%)",
                                                cursor: "pointer",
                                            }}
                                            onClick={() => setShow(!show)}
                                        ></i>
                                    </div>
                                    <button
                                        type="submit"
                                        variant="contained"
                                        className="login-btn btn btn-primary w-100"
                                        disabled={loading}
                                    >
                                        {loading ? (<CircularProgress style={{ "size": 18, "color": "inherit" }} />) : ("Login ")}
                                    </button>
                                    <div className="mb-3">

                                    </div>
                                </form><br></br>
                                <p className="signup-link" style={{ "padding": "3px", "textAlign": "right" }}>Don't have an account? <Link to="/signup">Signup</Link></p>
                                <br></br>
                                <p className="text-danger">{message}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <ToastContainer position="top-right" autoClose={3500} />
            </div>
        </div>
    )
}