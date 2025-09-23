import "bootstrap-icons/font/bootstrap-icons.css";
import React from "react";
import "./footer.css";

export default function Footer() {

   
    return(
        <footer className="bg-dark text-light py-3 " id="footer">
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
        <p className="mb-2 mb-md-0">
          © 2025  All Rights Reserved.
        </p>
       
      <div>
          <a
            href="https://facebook.com"
            target="blank"
            className="text-light me-3">
            <i className="bi bi-facebook"></i>
          </a>
          <a
            href="https://twitter.com"
            target="blank"
            className="text-light me-3">
          <i className="bi bi-twitter"></i>
          </a>
          <a
            href="https://instagram.com"
            target="blank"
            className="text-light me-3">
            <i className="bi bi-instagram"></i>
          </a>
          <a
            href="https://linkedin.com"
            target="blank"
            className="text-light">
            <i className="bi bi-linkedin"></i>
          </a>
        </div>
        </div>
      </footer>
    );
}