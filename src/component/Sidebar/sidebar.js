import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useLocation } from "react-router-dom";
import "./sidebar.css";
import React, { useState } from "react";

export default function Sidebar({ activeTab, setActiveTab }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);

  const links = [
    { name: "Dashboard", tab: "home" },
    { name: "Profile", tab: "profile" },
    { name: "Add Movie", tab: "addmovies" },
    { name: "Change Password", tab: "changepassword" },
  ];

  return (
    <>
      <button className="hamburger btn btn-dark" onClick={toggleSidebar}>
        ☰
      </button>

      <aside className={`menu border-end p-3 ${isOpen ? "open" : ""}`}>
        <div className="nav flex-column mt-4">
          {links.map((link) => (
            <div className="nav-item" key={link.tab}>
              <button
                className="nav-link btn btn-link"
                onClick={() => {
                  setIsOpen(false);
                  setActiveTab(link.tab);
                }}
                style={{
                  background: activeTab === link.tab ? "#dc3545" : "transparent",
                  color: activeTab === link.tab ? "white" : "black",
                  width:"190px"
                }}
              >
                {link.name}
              </button>
            </div>
          ))}
        </div>
      </aside>
    </>
  );
}
