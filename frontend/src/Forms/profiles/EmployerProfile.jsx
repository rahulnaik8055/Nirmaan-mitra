import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useFlashMessage } from "../../OtherComponents/FlashMessageContext";
import LoadingSpinner from "../../OtherComponents/Loader";
import config from "../../../config";

function EmployerProfile() {
  const navigate = useNavigate();
  const { showMessage } = useFlashMessage(); // Get showMessage function from context
  const [formData, setFormData] = useState({
    description: "",
    companyName: "",
    image: null,
    industry: "",
    location: "",
  });
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({
    industry: false,
    description: false,
    companyName: false,
    location: false,
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormErrors({ ...formErrors, [e.target.name]: false });
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  // Validate form fields
  const validateForm = () => {
    const errors = {
      companyName: !formData.companyName,
      industry: !formData.industry,
      location: !formData.location,
    };
    setFormErrors(errors);
    return !Object.values(errors).some(Boolean);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      // If validation fails, simply return without any notifications
      return;
    }

    setLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append("companyName", formData.companyName);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("industry", formData.industry);
    formDataToSend.append("location", formData.location);

    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    try {
      const { data } = await axios.post(
        `${config.apiBaseUrl}/employerprofile`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      navigate("/");
      showMessage("Profile created successfully", "success");
    } catch (error) {
      console.error("Error creating profile:", error.message);
      showMessage("An error occurred while creating your profile.", "error"); // Show error message
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container mt-4 margin">
      <div className="row">
        <div className="col-12 col-lg-6">
          <h2 className="text-warning display-4 fw-bold shadow-text fs-1 mb-5">
            Set Up Your Profile
          </h2>
          <form onSubmit={handleSubmit} noValidate className="needs-validation">
            <div className="mb-3">
              <label htmlFor="image" className="form-label">
                Profile Picture
              </label>
              <input
                className={`form-control ${
                  formErrors.companyName ? "is-invalid" : ""
                }`}
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleFileChange}
              />
              {formErrors.companyName && (
                <div className="invalid-feedback">
                  Profile picture is required
                </div>
              )}
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="companyName" className="form-label">
                  Company Name
                </label>
                <input
                  type="text"
                  className={`form-control ${
                    formErrors.companyName ? "is-invalid" : ""
                  }`}
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  placeholder="Company Name"
                />
                {formErrors.companyName && (
                  <div className="invalid-feedback">
                    Please enter your company name.
                  </div>
                )}
              </div>
              <div className="col-md-6">
                <label htmlFor="industry" className="form-label">
                  Industry
                </label>
                <input
                  type="text"
                  className={`form-control ${
                    formErrors.industry ? "is-invalid" : ""
                  }`}
                  id="industry"
                  name="industry"
                  value={formData.industry}
                  onChange={handleInputChange}
                  placeholder="Ex: Residential Construction, Commercial Construction, etc."
                />
                {formErrors.industry && (
                  <div className="invalid-feedback">
                    Please enter your industry.
                  </div>
                )}
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="location" className="form-label">
                  Location
                </label>
                <input
                  type="text"
                  className={`form-control ${
                    formErrors.location ? "is-invalid" : ""
                  }`}
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Company location"
                />
                {formErrors.location && (
                  <div className="invalid-feedback">
                    Enter the company location
                  </div>
                )}
              </div>
              <div className="col-md-6">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea
                  className={`form-control ${
                    formErrors.description ? "is-invalid" : ""
                  }`}
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
                  placeholder="Describe your company"
                ></textarea>
                {formErrors.description && (
                  <div className="invalid-feedback">
                    Please enter a description.
                  </div>
                )}
              </div>
            </div>
            <button type="submit" className="btn btn-warning">
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EmployerProfile;
