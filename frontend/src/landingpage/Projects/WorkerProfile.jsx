import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import config from "../../../config";

const WorkerEngineer = () => {
  const { engineerId } = useParams();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `${config.apiBaseUrl}/engineers/${engineerId}`
        );
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching engineer profile:", error);
      }
    };

    fetchProfile();
  }, [engineerId]);

  if (!profile) {
    return <p className="text-center mt-5">Loading...</p>;
  }

  const { username, email, engineerProfile } = profile;
  const { Education, description, Experience, skills, image } =
    engineerProfile || {};

  return (
    <div className="container mt-5 margin">
      <div className="d-flex justify-content-end mt-4 mb-5"></div>
      <div className="row">
        <div className="col-12 col-lg-6 text-center mb-4">
          <img
            src={image}
            alt="engineer-profile"
            className="img-fluid rounded border mb-3 p-3"
            style={{ maxHeight: "340px" }}
          />
        </div>
        <div className="col-12 col-lg-6">
          <div className="card p-4">
            <div className="card-body">
              <h3 className="text-warning display-4 fw-bold shadow-text fs-1 text-center">
                Engineer Profile
              </h3>
              <p className="card-text">
                <strong>Username:</strong> {username}
              </p>
              <p className="card-text">
                <strong>Email:</strong> {email}
              </p>
              <p className="card-text">
                <strong> Education:</strong> {Education}
              </p>

              <p className="card-text">
                <strong>Experience:</strong> {Experience}
              </p>
              <p className="card-text">
                <strong>Description:</strong> {description}
              </p>
              <p className="card-text">
                <strong>skills:</strong> {skills}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerEngineer;
