import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import useVerifyCookie from "./customHooks/useVerifyCookie";
import { useFlashMessage } from "./OtherComponents/FlashMessageContext";
import config from "../config";

function Navbar() {
  const [cookies] = useCookies(["token"]);
  const { role } = useVerifyCookie();
  const { showMessage } = useFlashMessage();

  useEffect(() => {
    const navbarCollapse = document.querySelector(".navbar-collapse");
    const navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navbarCollapse.classList.remove("show");
      });
    });
  }, []);

  const handleLogout = () => {
    axios
      .get(`${config.apiBaseUrl}/logout`, { withCredentials: true })
      .then((res) => {
        localStorage.removeItem("token");
        showMessage("Logged out successfully", "success");
      })
      .catch((err) => {
        console.log(err);
        showMessage(err.message, "error");
      });
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
              <Link className="nav-link" exact="true" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
            {cookies.token && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/project">
                    Explore
                  </Link>
                </li>
                {role === "Employer" && (
                  <li className="nav-item">
                    <Link to="/newproject" className="nav-link">
                      New Project
                    </Link>
                  </li>
                )}
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">
                    Profile
                  </Link>
                </li>
              </>
            )}
          </ul>
          <ul className="navbar-nav ms-auto">
            {cookies.token ? (
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
