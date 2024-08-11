import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useFlashMessage } from "../../OtherComponents/FlashMessageContext";
import config from "../../../config";

const Signup = () => {
  const navigate = useNavigate();
  const { showMessage } = useFlashMessage(); // Get showMessage function from context
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    username: "",
    role: "Engineer",
  });
  const { email, password, username, role } = inputValue;
  const [validated, setValidated] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      try {
        const { data } = await axios.post(
          `${config.apiBaseUrl}/signup`,
          {
            ...inputValue,
          },
          { withCredentials: true }
        );
        const { success, message } = data;
        if (success) {
          showMessage("Signup successful!", "success"); // Show success message
          setSubmitted(true);
          setTimeout(() => {
            navigate("/profile");
          }, 1000);
        } else {
          showMessage(message, "error"); // Show error message
        }
      } catch (error) {
        console.error("An error occurred while signing up.");
        showMessage("An unexpected error occurred.", "error"); // Show unexpected error message
      }
    }
    setValidated(true);
  };

  // Reset form fields and validation state after successful submission
  if (submitted) {
    setInputValue({
      email: "",
      password: "",
      username: "",
      role: "Engineer",
    });
    setValidated(false);
    setSubmitted(false);
  }

  return (
    <div className="container mt-5 margin">
      <div className="col-6 offset-3">
        <div className="form_container">
          <h2 className="text-warning display-4 fw-bold shadow-text fs-1 mb-2 text-center">
            Signup Account
          </h2>
          <form
            noValidate
            className={validated ? "was-validated" : ""}
            onSubmit={handleSubmit}
          >
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={email}
                placeholder="Enter your email"
                onChange={handleOnChange}
                id="email"
                required
              />
              <div className="invalid-feedback">
                Please provide a valid email.
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                name="username"
                value={username}
                placeholder="Enter your username"
                onChange={handleOnChange}
                id="username"
                required
              />
              <div className="invalid-feedback">Please provide a username.</div>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={password}
                placeholder="Enter your password"
                onChange={handleOnChange}
                id="password"
                required
              />
              <div className="invalid-feedback">Please provide a password.</div>
            </div>
            <div className="mb-3">
              <label htmlFor="role" className="form-label">
                Role
              </label>
              <select
                className="form-select"
                name="role"
                value={role}
                onChange={handleOnChange}
                id="role"
                required
              >
                <option value="Engineer">Engineer</option>
                <option value="Employer">Employer</option>
              </select>
              <div className="invalid-feedback">Please select a role.</div>
            </div>
            <button type="submit" className="btn btn-warning">
              Signup
            </button>
            <span className="ms-3">
              Already have an account? <Link to={"/login"}>Login</Link>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
