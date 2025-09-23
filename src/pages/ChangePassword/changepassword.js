import Sidebar from "../../component/Sidebar/sidebar";
import Header from "../../component/Header/header";
import Footer from "../../component/Footer/footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useState } from "react";
import { changePassword } from "../../api/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CircularProgress from "@mui/material/CircularProgress";
import "./changepassword.css";

export default function ChangePassword() {
    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    const [loading, setLoading] = useState(false);
    const user = JSON.parse(localStorage.getItem("userData"));
    const [showpassword, setShowPassword] = useState(false);
    const [shownewpassword, setShowNewPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (formData.confirmPassword === formData.newPassword) {
            try {
                const response = await changePassword(formData.currentPassword, formData.newPassword);

                if (response?.status === 200) {
                    toast.success("Password updated successfully!");
                    setFormData({ currentPassword: "", newPassword: "", confirmPassword: "" });

                }
            } catch (error) {
                console.error("Error:", error);
                toast.error(error);
            }
            finally {
                setLoading(false);
            }
        }
        else {
            toast.error("Confirm Password doesn't match!")
            setLoading(false);
        }



    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    return (
        <div className="start container col-md-4 mx-auto text-start">
            <div className="card " >
                <div className="card shadow">
                    <div className="card-body">
                        <h3 className="card-title text-center mb-4">Change Password</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3  position-relative">
                                <label className="form-label">Current Password</label>
                                <input
                                    type={showpassword ? "text" : "password"}
                                    className="form-control"
                                    name="currentPassword"
                                    value={formData?.currentPassword}
                                    onChange={handleChange}
                                    required
                                />
                                <i
                                    className={`bi ${showpassword ? "bi-eye-slash" : "bi-eye"} position-absolute`}
                                    style={{
                                        top: "72%",
                                        right: "10px",
                                        transform: "translateY(-50%)",
                                        cursor: "pointer",
                                    }}
                                    onClick={() => setShowPassword(!showpassword)}
                                ></i>
                            </div>

                            <div className="mb-3  position-relative">
                                <label className="form-label">New Password</label>
                                <input
                                    type={shownewpassword ? "text" : "password"}
                                    className="form-control"
                                    name="newPassword"
                                    value={formData?.newPassword}
                                    onChange={handleChange}
                                    required
                                />
                                <i
                                    className={`bi ${shownewpassword ? "bi-eye-slash" : "bi-eye"} position-absolute`}
                                    style={{
                                        top: "72%",
                                        right: "10px",
                                        transform: "translateY(-50%)",
                                        cursor: "pointer",
                                    }}
                                    onClick={() => setShowNewPassword(!shownewpassword)}
                                ></i>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Confirm Password</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <button type="submit" className="btn btn-danger w-100" variant="contained" disabled={loading}>
                                {loading ? (<CircularProgress style={{ "size": 18, "color": "inherit" }} />) : ("Change Password")}
                            </button>
                        </form>
                    </div>
                </div>
                <ToastContainer position="top-right" autoClose={3500} />
            </div>
        </div>
    )
}