import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import Project from "../Projects/Project";
import config from "../../../config";

const ProfileEngineer = () => {
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [cookies] = useCookies(["token"]);

  useEffect(() => {
    if (!cookies.token) return;

    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `${config.apiBaseUrl}/engineerprofile`,
          {
            withCredentials: true,
          }
        );
        setProfile(response.data);
        fetchProjects(response.data.engineerProfile._id); // Fetch projects using engineer's ID
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    const fetchProjects = async (engineerId) => {
      try {
        const response = await axios.get(
          `${config.apiBaseUrl}/engineer/${engineerId}/projects`,
          {
            withCredentials: true,
          }
        );
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProfile();
  }, [cookies.token]);

  if (!profile) {
    return <p className="text-center mt-5">Loading...</p>;
  }

  const { username, email, engineerProfile } = profile;
  const { Education, Experience, description, image, skills } =
    engineerProfile || {};

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-end mt-4">
        <Link to="/editengineer">
          <button className="btn btn-warning mb-3">Edit Profile</button>
        </Link>
      </div>
      <div className="row">
        <div className="col-12 col-lg-6 text-center mb-4">
          <img
            src={image}
            alt="user-profile"
            className="img-fluid rounded border mb-3 p-3"
            style={{ maxHeight: "340px" }}
          />
        </div>
        <div className="col-12 col-lg-6">
          <div className="card shadow-sm border-0 rounded">
            <div className="card-body p-4">
              <h3 className="text-warning display-4 fw-bold shadow-text fs-1 text-center">
                Engineer Details
              </h3>
              <div className="mb-3">
                <p className="card-text">
                  <strong>Username:</strong> {username}
                </p>
                <p className="card-text">
                  <strong>Email:</strong> {email}
                </p>
              </div>
              <div className="mb-3">
                <p className="card-text">
                  <strong>Description:</strong> {description}
                </p>
                <p className="card-text">
                  <strong>Education:</strong> {Education}
                </p>
              </div>
              <div className="mb-3">
                <p className="card-text">
                  <strong>Experience:</strong> {Experience}
                </p>
                <p className="card-text">
                  <strong>Skills:</strong> {skills}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className=" mt-3">
          <h2 className="text-warning display-4 fw-bold shadow-text fs-1 text-center">
            Projects Working on
          </h2>
          <div className="row shopcards">
            {projects.map((project) => (
              <Project
                key={project._id}
                image={project.image}
                ProjectName={project.ProjectName}
                ProjectId={project._id}
                Location={project.location}
                createdAt={project.createdAt}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileEngineer;
