import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useFlashMessage } from "../../OtherComponents/FlashMessageContext";
import config from "../../../config";

const UpdateEngineer = () => {
  const [profile, setProfile] = useState({
    Education: "",
    Experience: "",
    description: "",
    image: null,
    skills: "",
  });
  const [cookies] = useCookies(["token"]);
  const navigate = useNavigate();
  const { showMessage } = useFlashMessage();

  // Fetch the current profile to populate the form
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `${config.apiBaseUrl}/engineerprofile`,
          {
            withCredentials: true,
          }
        );
        const currentProfile = response.data.engineerProfile || {};
        setProfile({
          Education: currentProfile.Education || "",
          Experience: currentProfile.Experience || "",
          description: currentProfile.description || "",
          image: currentProfile.image || null,
          skills: currentProfile.skills || "",
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
      formData.append("Education", profile.Education);
      formData.append("Experience", profile.Experience);
      formData.append("description", profile.description);
      formData.append("skills", profile.skills);
      if (profile.image) {
        formData.append("image", profile.image);
      }

      await axios.put(`${config.apiBaseUrl}/engineerupdate`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/profile");
      showMessage("Changes made Successfully", "success");
    } catch (error) {
      showMessage("Cannot make changes", "error");
    }
  };

  return (
    <div className="container margin">
      <div className="row">
        <div className="col-12 col-lg-6">
          <h2 className="text-warning display-4 fw-bold shadow-text fs-1 mb-5">
            Edit Profile
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="image" className="form-label">
                Profile picture
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
            <div>
              <b>Current image</b>
              <br />
              <img
                src={profile.image}
                alt="recent-image"
                style={{ height: "100px", width: "100px", objectFit: "cover" }}
                className="rounded"
              />
            </div>
            <div className="form-group">
              <label htmlFor="Experience">Experience</label>
              <input
                type="text"
                id="Experience"
                name="Experience"
                value={profile.Experience}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={profile.description}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label htmlFor="Education">Education</label>
              <input
                type="text"
                id="Education"
                name="Education"
                value={profile.Education}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="skills">Skills</label>
              <input
                type="text"
                id="skills"
                name="skills"
                value={profile.skills}
                onChange={handleChange}
                className="form-control"
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

export default UpdateEngineer;
