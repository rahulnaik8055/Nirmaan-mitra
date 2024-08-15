import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import UserProjects from "../Projects/UserProjects";
import config from "../../../config";
import useUserProfile from "../../customHooks/userStatus";

const ProfileEmployer = () => {
  const [profile, setProfile] = useState(null);
  const { isAuthenticated } = useUserProfile();
  // Fetch profile once the user is verified
  useEffect(() => {
    if (!isAuthenticated) return; // Skip fetching profile if no token

    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `${config.apiBaseUrl}/employerprofile`,
          {
            withCredentials: true,
          }
        );
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, [isAuthenticated]);

  if (!profile) {
    return <p className="text-center mt-5">Loading...</p>;
  }

  const { username, email, employerProfile } = profile;
  const { companyName, description, location, image } = employerProfile || {};

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-end mt-4 mb-5">
        <Link to="/editemployer">
          <button className="btn btn-warning ">Edit Profile</button>
        </Link>
      </div>
      <div className="row">
        <div className="col-12 col-lg-6 text-center mb-4">
          <img
            src={image}
            alt="company-profile"
            className="img-fluid rounded border mb-3 p-3"
            style={{ maxHeight: "340px" }}
          />
        </div>
        <div className="col-12 col-lg-6">
          <div className="card p-4">
            <div className="card-body">
              <h3 className="text-warning display-4 fw-bold shadow-text fs-1 text-center">
                User Profile
              </h3>
              <p className="card-text">
                <strong>Username:</strong> {username}
              </p>
              <p className="card-text">
                <strong>Email:</strong> {email}
              </p>
              <p className="card-text">
                <strong>Company Name:</strong> {companyName}
              </p>
              <p className="card-text">
                <strong>Description:</strong> {description}
              </p>
              <p className="card-text">
                <strong>Location:</strong> {location}
              </p>
            </div>
          </div>
        </div>
      </div>

      <UserProjects />
    </div>
  );
};

export default ProfileEmployer;
