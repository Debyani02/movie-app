import { useState, useEffect, useRef } from "react";
import Footer from "../../component/Footer/footer";
import Header from "../../component/Header/header";
import Sidebar from "../../component/Sidebar/sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./profile.css";
import CircularProgress from "@mui/material/CircularProgress";
import { updateProfile } from "../../api/auth";

export default function Profile() {
    const [isEditable, setIsEditable] = useState(false);
    const [image, setImage] = useState("");
    const [loading, setLoading] = useState(false);
    const [showIcon, setShowIcon] = useState(false);
    const fileInputRef = useRef(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        dateOfBirth: "",
        bio: "",
        avatar: ""
    });
   

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData((prev) => ({ ...prev, avatar: reader.result }));
                setImage(reader.result);
                uploadImage();
            };
            reader.readAsDataURL(file);

        }
    }

    const uploadImage = async () => {
        try {
            console.log("inside upload image")
            const res = await updateProfile(formData);
            toast.success(res?.message);
            


        } catch (error) {
            toast.error(error);
        }
    }
       
    useEffect(() => {
        const data = localStorage.getItem("userData");
        if (data) {
            const parsedData = JSON.parse(data);
            setFormData(parsedData);
           

        }
    }, []);


    const handleChange = (e) => {
        if (isEditable) {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value,
            });
        }

    }
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const d = new Date(dateStr);
        return d.toISOString().split("T")[0];
    };

   
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isEditable) {
            setLoading(true);
            try {
                console.log("inside handlesubmit----------------------")
                const res = await updateProfile(formData);
                toast.success("Profile updated!");
                setIsEditable(false);

            }
            catch (err) {

                toast.error(err.message || "Failed to update!")
                console.log("inside catc-----------")

            }
            finally {
                setLoading(false);
                setIsEditable(false);
            }
           

        }
    }



    return (
        <>
           
                    <div className="profile-details-area col-md-8 mt-5 mx-auto text-start">
                        <br></br>
                        <form className="card p-4 shadow-lg w-100" onSubmit={handleSubmit}>
                            <div className="row d-flex">
                                <div className="position-relative profile-pic-container col-md-3 mb-3 "
                                    onMouseEnter={() => setShowIcon(true)}
                                    onMouseLeave={() => setShowIcon(false)}>
                                    <img src={formData?.avatar ? formData?.avatar : "../assets/no-profile-img.jpeg"}
                                        name="avatar"
                                        className="rounded-circle border border-3 border-secondary  "
                                        width="150"
                                        height="150"
                                        onClick={() => {
                                            fileInputRef.current.click()
                                        }}
                                        style={{ objectFit: "cover" }}
                                    />

                                    <input
                                        type="file"
                                        accept="image/"
                                        ref={fileInputRef}
                                        onChange={handleFileChange}
                                        className="d-none"
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col mb-3">
                                    <label className="form-label" >Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        className="form-control"
                                        value={formData?.name}
                                        onChange={handleChange} required
                                        disabled={!isEditable} />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col mb-3">
                                    <label className="form-label">Bio</label>
                                    <textarea
                                        className="form-control"
                                        name="bio" value={formData?.bio}
                                        onChange={handleChange}
                                        disabled={!isEditable}
                                        required></textarea>

                                </div>
                            </div>

                            <div className="row">
                                <div className="col mb-3">
                                    <label className="form-label">Phone</label>
                                    <input type="text"
                                        name="phone"
                                        className="form-control"
                                        value={formData?.phone}
                                        onChange={handleChange}
                                        disabled={!isEditable}
                                        required />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col mb-3">
                                    <label className="form-label">Date of Birth</label>
                                    <input type="date" name="dateOfBirth" className="form-control"
                                        value={formatDate(formData?.dateOfBirth)} onChange={handleChange} required
                                        disabled={!isEditable} />
                                </div>
                               
                            </div>
                           
                            <div className="row">
                                <div className="col">
                                    <button type="button" className="btn btn-danger w-100 mt-4" onClick={() => setIsEditable(prevIsEditable => true)}
                                        disabled={isEditable}>Edit</button>
                                </div>
                                <div className="col">
                                    <button type="submit" className="btn btn-danger  w-100 mt-4" disabled={loading} variant="contained">
                                        {loading ? (<CircularProgress style={{ "size": 18, "color": "inherit" }} />) : ("Save ")}
                                    </button>

                                </div>
                            </div>
                        </form>
                </div>
                <ToastContainer position="top-right" autoClose={3500} />
            
        </>
    )
}