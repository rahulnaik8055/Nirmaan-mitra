import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useFlashMessage } from "../../OtherComponents/FlashMessageContext";
import LoadingSpinner from "../../OtherComponents/Loader";
import config from "../../../config";

function EngineerProfile() {
  const navigate = useNavigate();
  const { showMessage } = useFlashMessage(); // Get showMessage function from context
  const [formData, setFormData] = useState({
    description: "",
    Experience: "",
    image: null,
    Education: "",
    skills: "",
  });
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({
    Experience: false,
    description: false,
    skills: false,
    Education: false,
    image: false,
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
      Experience: !formData.Experience,
      Education: !formData.Education,
      skills: !formData.skills,
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
    formDataToSend.append("Experience", formData.Experience);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("Education", formData.Education);
    formDataToSend.append("skills", formData.skills);

    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    try {
      const { data } = await axios.post(
        `${config.apiBaseUrl}/engineerprofile`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      navigate("/");
      showMessage("Profile Created Successfully", "success");
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
                  formErrors.image ? "is-invalid" : ""
                }`}
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleFileChange}
              />
              {formErrors.image && (
                <div className="invalid-feedback">
                  Profile picture required.
                </div>
              )}
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="Experience" className="form-label">
                  Experience
                </label>
                <input
                  type="text"
                  className={`form-control ${
                    formErrors.Experience ? "is-invalid" : ""
                  }`}
                  id="Experience"
                  name="Experience"
                  value={formData.Experience}
                  onChange={handleInputChange}
                  placeholder="Enter your experience or projects"
                />
                {formErrors.Experience && (
                  <div className="invalid-feedback">
                    Please enter your experience or projects you have worked on.
                  </div>
                )}
              </div>
              <div className="col-md-6">
                <label htmlFor="Education" className="form-label">
                  Education
                </label>
                <input
                  type="text"
                  className={`form-control ${
                    formErrors.Education ? "is-invalid" : ""
                  }`}
                  id="Education"
                  name="Education"
                  value={formData.Education}
                  onChange={handleInputChange}
                  placeholder="Enter your education details"
                />
                {formErrors.Education && (
                  <div className="invalid-feedback">
                    Please enter your education details.
                  </div>
                )}
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="skills" className="form-label">
                  Skills
                </label>
                <input
                  type="text"
                  className={`form-control ${
                    formErrors.skills ? "is-invalid" : ""
                  }`}
                  id="skills"
                  name="skills"
                  value={formData.skills}
                  onChange={handleInputChange}
                  placeholder="Enter your skills"
                />
                {formErrors.skills && (
                  <div className="invalid-feedback">
                    Please enter your skills.
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
                  placeholder="Describe yourself"
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

export default EngineerProfile;
