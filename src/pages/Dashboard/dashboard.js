import React, { useState, useEffect } from "react";
import Header from "../../component/Header/header";
import Footer from "../../component/Footer/footer";
import "./dashboard.css";
import Sidebar from "../../component/Sidebar/sidebar";
import { useNavigate } from "react-router-dom";
import Gototop from "../../component/GoToTop/gototop";


import AddMovies from "../Add Movies/addmovies";
import ChangePassword from "../ChangePassword/changepassword";
import Profile from "../Profile/profile";
import Home from "../Home/home";

export default function Dashboard() {
  const navigate = useNavigate();



  const [activeTab, setActiveTab] = useState("home");

  const user = JSON.parse(localStorage.getItem("userData"));




  return (
    <>
      <Header />

      <div className="dashboard-container my-4 mb-5">

        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="dashboard-content container mt-5">
          {activeTab === "addmovies" && <AddMovies />}
          {activeTab === "changepassword" && <ChangePassword />}
          {activeTab === "profile" && <Profile />}
          {activeTab === "home" && <Home />}
        </div>
        <Gototop />
      </div>

      <Footer />
    </>
  );
}
