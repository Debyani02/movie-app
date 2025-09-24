import React, { useState } from "react";
import { useNavigate,Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { register } from "../../api/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CircularProgress from "@mui/material/CircularProgress";


export default function Signup() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        role: "user",
        dateOfBirth: "",
        bio: "",
        password: "",
        confirmPassword: ""
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [show, setShow] = useState(false);


    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const validate = () => {
        let newErrors = {};

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            newErrors.email = "Enter a valid email";
        }
        if (!/^[A-Za-z\s]+$/.test(form.name)) {
            newErrors.name = "Name can only contain letters and spaces"
        }
        if (!/^\d{10}$/.test(form.phone)) {
            newErrors.phone = "Enter a valid 10-digit phone number";
        }
        if (
            !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
                form.password
            )
        ) {
            newErrors.password =
                "Password must be atleast 8 characters long, include uppercase, lowercase, number, special char";
        }
        if (form.password !== form.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            setLoading(true);
            try {
                const res = await register(form)
                navigate('/dashboard');


            }
            catch (err) {
                setMessage(err);
                toast.error(message);
            }
            finally {
                setLoading(false);
            }

        }
    };
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <div className="card shadow">
                        <div className="card-body">
                            <h2 className="text-center mb-4">Signup</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        name="name"
                                        className="form-control"
                                        placeholder="Name"
                                        value={form.name}
                                        onChange={handleChange}
                                    />
                                    {errors.name && (
                                        <small className="text-danger">{errors.name}</small>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        name="email"
                                        className="form-control"
                                        placeholder="Email"
                                        value={form.email}
                                        onChange={handleChange}
                                    />
                                    {errors.email && (
                                        <small className="text-danger">{errors.email}</small>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        name="phone"
                                        className="form-control"
                                        placeholder="Phone Number"
                                        value={form.phone}
                                        onChange={handleChange}
                                    />
                                    {errors.phone && (
                                        <small className="text-danger">{errors.phone}</small>
                                    )}
                                </div>
                                <div className="position-relative mb-3">
                                    <input
                                        type={show ? "text" : "password"}
                                        name="password"
                                        className="form-control"
                                        placeholder="Password"
                                        value={form.password}
                                        onChange={handleChange}
                                    />
                                    <i
                                        className={`bi ${show ? "bi-eye-slash" : "bi-eye"} position-absolute`}
                                        style={{
                                            top: "50%",
                                            right: "10px",
                                            transform: "translateY(-50%)",
                                            cursor: "pointer",
                                        }}
                                        onClick={() => setShow(!show)}
                                    ></i>
                                    {errors.password && (
                                        <small className="text-danger">{errors.password}</small>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        name="confirmPassword"
                                        className="form-control"
                                        placeholder="Confirm Password"
                                        value={form.confirmPassword}
                                        onChange={handleChange}
                                    />
                                    {errors.confirmPassword && (
                                        <small className="text-danger">
                                            {errors.confirmPassword}
                                        </small>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="date"
                                        name="dateOfBirth"
                                        className="form-control"
                                        value={form.dateOfBirth}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <textarea
                                        
                                        name="bio"
                                        className="form-control"
                                        placeholder="Write a bio"
                                        value={form.bio}
                                        onChange={handleChange}
                                    />
                                    {errors.countryCode && (
                                        <small className="text-danger">
                                            {errors.bio}
                                        </small>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    variant="contained"
                                    className="btn btn-primary w-100"
                                    disabled={loading}
                                >
                                    {loading ? (<CircularProgress style={{ "size": 18, "color": "inherit" }} />) : ("Next")}

                                </button>

                            </form>
                            <br></br>
                            <p className="login-link" style={{ "padding": "3px", "textAlign": "right" }}>Existing user?<Link to="/">Login</Link></p>
                        </div>
                    </div>
                </div>
            </div><ToastContainer position="top-right" autoClose={3500} />
        </div>
    );
}