import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useFlashMessage } from "./OtherComponents/FlashMessageContext";
import config from "../config";

function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);
  const [role, setRole] = useState(null);
  const { showMessage } = useFlashMessage();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await axios.get(`${config.apiBaseUrl}/userStatus`, {
          withCredentials: true,
        });
        console.log(response.data);
        if (response.data.loggedIn) {
          setIsAuthenticated(true);
          setUserId(response.data.user._id);
          setRole(response.data.user.role);
        } else {
          setIsAuthenticated(false);
          // navigate("/login");
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        setIsAuthenticated(false);
        // navigate("/login");
      }
    };

    checkAuthentication();

    // Handle navbar collapse on link click
    const handleNavLinkClick = () => {
      const navbarCollapse = document.querySelector(".navbar-collapse");
      if (navbarCollapse) {
        navbarCollapse.classList.remove("show");
      }
    };

    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach((link) => {
      link.addEventListener("click", handleNavLinkClick);
    });

    // Cleanup event listeners on component unmount
    return () => {
      navLinks.forEach((link) => {
        link.removeEventListener("click", handleNavLinkClick);
      });
    };
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await axios.post(
        `${config.apiBaseUrl}/logout`,
        {},
        { withCredentials: true }
      );
      setIsAuthenticated(false);
      setUserId(null);
      setRole(null);
      showMessage("Logged out successfully", "success");
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err);
      showMessage("Error logging out. Please try again.", "error");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-white rounded-5 p-2">
      <div className="container-fluid">
        <img
          src="/media/images/logo.png"
          alt="Brand-logo"
          style={{ width: "10%", mixBlendMode: "multiply" }}
        />
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
            {isAuthenticated && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/project">
                    Explore
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">
                    Profile
                  </Link>
                </li>
                {role === "Employer" && (
                  <li className="nav-item">
                    <Link to="/newproject" className="nav-link">
                      New Project
                    </Link>
                  </li>
                )}
              </>
            )}
          </ul>
          <ul className="navbar-nav ms-auto">
            {isAuthenticated && userId ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/store">
                    Store
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/cart">
                    Cart
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/" onClick={handleLogout}>
                    Logout
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">
                    Signup
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
