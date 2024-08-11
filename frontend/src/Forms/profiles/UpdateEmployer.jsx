import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useFlashMessage } from "../../OtherComponents/FlashMessageContext";
import config from "../../../config";

const UpdateEmployer = () => {
  const [profile, setProfile] = useState({
    description: "",
    companyName: "",
    image: null,
    industry: "",
    location: "",
  });
  const [cookies] = useCookies(["token"]);
  const navigate = useNavigate();
  const { showMessage } = useFlashMessage();

  // Fetch the current profile to populate the form
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `${config.apiBaseUrl}/employerprofile`,
          {
            withCredentials: true,
          }
        );
        const currentProfile = response.data.employerProfile || {};
        setProfile({
          industry: currentProfile.industry || "",
          companyName: currentProfile.companyName || "",
          description: currentProfile.description || "",
          image: currentProfile.image || null,
          location: currentProfile.location || "",
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, [cookies.token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
  };

  const handleFileChange = (e) => {
    setProfile({ ...profile, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("industry", profile.industry);
      formData.append("companyName", profile.companyName);
      formData.append("description", profile.description);
      formData.append("location", profile.location);
      if (profile.image) {
        formData.append("image", profile.image);
      }

      await axios.put(`${config.apiBaseUrl}/employerupdate`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/profile");
      showMessage("changes Made", "success");
    } catch (error) {
      console.error("Error updating profile:", error);
      showMessage("Cannot make changes", "error");
    }
  };

  return (
    <div className="container my-5 margin">
      <h2 className="text-warning display-4 fw-bold shadow-text fs-1 mb-5">
        Edit Profile
      </h2>
      <div className="row">
        <div className="col-12 col-lg-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="image" className="form-label">
                Profile Picture
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
            <div className="mb-3">
              <b>Current Image</b>
              <br />
              <img
                src={profile.image || ""}
                alt="Current Profile"
                style={{ height: "100px", width: "100px", objectFit: "cover" }}
                className="rounded"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="companyName" className="form-label">
                Company Name
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={profile.companyName}
                onChange={handleChange}
                className="form-control"
                placeholder={profile.companyName || "Enter company name"}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={profile.description}
                onChange={handleChange}
                className="form-control"
                placeholder={profile.description || "Enter description"}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="industry" className="form-label">
                Industry
              </label>
              <input
                type="text"
                id="industry"
                name="industry"
                value={profile.industry}
                onChange={handleChange}
                className="form-control"
                placeholder={profile.industry || "Enter industry"}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="location" className="form-label">
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={profile.location}
                onChange={handleChange}
                className="form-control"
                placeholder={profile.location || "Enter location"}
              />
            </div>
            <button type="submit" className="btn btn-warning mt-3">
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateEmployer;
