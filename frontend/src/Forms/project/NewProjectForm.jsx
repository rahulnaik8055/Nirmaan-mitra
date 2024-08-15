import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useFlashMessage } from "../../OtherComponents/FlashMessageContext";
import LoadingSpinner from "../../OtherComponents/Loader";
import config from "../../../config";
import useIsAuthenticated from "../../customHooks/isAuthenticated";

function NewProject() {
  const navigate = useNavigate();
  const { isAuthenticated } = useIsAuthenticated();
  const [formData, setFormData] = useState({
    ProjectName: "",
    description: "",
    image: null,
    location: "",
  });
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({
    ProjectName: false,
    description: false,
    location: false,
    image: false,
  });

  const { showMessage } = useFlashMessage();

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }
  }, [isAuthenticated]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormErrors({ ...formErrors, [e.target.name]: false });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const validateForm = () => {
    const errors = {
      ProjectName: !formData.ProjectName,
      description: !formData.description,
      location: !formData.location,
    };
    setFormErrors(errors);
    return !Object.values(errors).some(Boolean);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      showMessage("Please fill in all details");
      return;
    }

    setLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append("ProjectName", formData.ProjectName);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("location", formData.location);
    // formDataToSend.append("owner", userId);

    if (formData.image) {
      formDataToSend.append("image", formData.image);
    } else {
      // Set a default image if none is provided
      formDataToSend.append("image", "path/to/default/image.jpg"); // Replace with the actual default image path or URL
    }

    try {
      await axios.post(`${config.apiBaseUrl}/projects`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      showMessage("Project created successfully", "success");
      navigate("/profile");
    } catch (error) {
      console.error("Error creating project:", error);
      showMessage("Cannot create project", "error");
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
            Create New Project
          </h2>
          <form onSubmit={handleSubmit} noValidate className="needs-validation">
            <div className="mb-3">
              <label htmlFor="ProjectName" className="form-label">
                Project Name
              </label>
              <input
                type="text"
                className={`form-control ${
                  formErrors.ProjectName ? "is-invalid" : ""
                }`}
                id="ProjectName"
                name="ProjectName"
                value={formData.ProjectName}
                onChange={handleInputChange}
                placeholder="Enter project name"
              />
              {formErrors.ProjectName && (
                <div className="invalid-feedback">
                  Please enter a project name.
                </div>
              )}
            </div>
            <div className="mb-3">
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
                placeholder="Enter project description"
              ></textarea>
              {formErrors.description && (
                <div className="invalid-feedback">
                  Please enter a project description.
                </div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="image" className="form-label">
                Image
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
                  Please select an image for your project.
                </div>
              )}
            </div>
            <div className="mb-3">
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
                placeholder="Enter project location"
              />
              {formErrors.location && (
                <div className="invalid-feedback">
                  Please enter a project location.
                </div>
              )}
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

export default NewProject;
