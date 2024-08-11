import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useFlashMessage } from "../../OtherComponents/FlashMessageContext";
import config from "../../../config";

function UpdateProject() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    ProjectName: "",
    description: "",
    image: null,
    location: "",
  });

  const [previousData, setPreviousData] = useState({});
  const { showMessage } = useFlashMessage();

  // Fetch the previous data
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`${config.apiBaseUrl}/projects/${id}`);
        setPreviousData(response.data);
        setFormData({ ...response.data, image: null }); // Initialize formData with the fetched data
      } catch (err) {
        console.error(err.response ? err.response.data.error : "Server Error");
      }
    };
    fetchProject();
  }, [id]);

  // Handle form input changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("ProjectName", formData.ProjectName);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("location", formData.location);

    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    try {
      const response = await axios.put(
        `${config.apiBaseUrl}/projects/${id}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      showMessage("Changes made", "success");
      navigate(`/projects/${id}`);
    } catch (error) {
      console.error("Error updating project:", error);
      showMessage("error while updating the project", "error");
    }
  };

  return (
    <div className="container mt-4 margin">
      <div className="row">
        <div className="col-12 col-lg-8">
          <h2 className="text-warning display-4 fw-bold shadow-text fs-1 mb-5">
            Update Project
          </h2>
          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-3">
              <label htmlFor="ProjectName" className="form-label">
                Project Name
              </label>
              <input
                type="text"
                className="form-control"
                id="ProjectName"
                name="ProjectName"
                value={formData.ProjectName}
                onChange={handleInputChange}
                placeholder={previousData.ProjectName || "Enter project name"}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="3"
                placeholder={
                  previousData.description || "Enter project description"
                }
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="image" className="form-label">
                Image
              </label>
              <input
                className="form-control"
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
            {previousData.image && (
              <div className="mb-3">
                <label className="form-label">Current Image</label>
                <img
                  src={previousData.image}
                  alt="Project Preview"
                  className="img-fluid rounded shadow"
                  style={{ width: "5rem", height: "5rem", objectFit: "cover" }}
                />
              </div>
            )}
            <div className="mb-3">
              <label htmlFor="location" className="form-label">
                Location
              </label>
              <input
                type="text"
                className="form-control"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder={previousData.location || "Enter project location"}
              />
            </div>
            <button type="submit" className="btn btn-warning">
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateProject;
