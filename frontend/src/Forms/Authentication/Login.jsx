import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useFlashMessage } from "../../OtherComponents/FlashMessageContext";
import config from "../../../config";

const Login = () => {
  const navigate = useNavigate();
  const { showMessage } = useFlashMessage(); // Use the custom hook for flash messages
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputValue;
  const [validated, setValidated] = useState(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http:localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Include other headers like Authorization if needed.
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        // Assume the token is returned in the response
        const { token } = data;

        // Store the token securely
        localStorage.setItem('token', token);

        // Redirect or update the UI to indicate a successful login
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="container mt-5 margin">
      <div className="col-6 offset-3">
        <div className="form_container">
          <h2 className="text-warning display-4 fw-bold shadow-text fs-1 mb-1 text-center mb-3">
            Login Account
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
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={password}
                placeholder="Enter your password"
                id="password"
                onChange={handleOnChange}
                required
              />
              <div className="invalid-feedback">Please provide a password.</div>
            </div>
            <button type="submit" className="btn btn-warning">
              Login
            </button>
            <span className="ms-3">
              Create new Account <Link to={"/signup"}>Signup</Link>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
