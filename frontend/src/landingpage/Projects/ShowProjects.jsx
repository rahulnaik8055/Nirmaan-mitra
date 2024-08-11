// ShowProject.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ProjectDetails from "./ProjectDetails";
import config from "../../../config";

function ShowProject() {
  const { id } = useParams();
  const [project, setProject] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`${config.apiBaseUrl}/projects/${id}`);
        setProject(response.data);
      } catch (err) {
        setError(err.response ? err.response.data.error : "Server Error");
      }
    };
    fetchProject();
  }, [id]);

  if (error) return <div>{error}</div>;

  return (
    <div className="container">
      <div className="project-details">
        <ProjectDetails
          key={project._id}
          ProjectName={project.ProjectName}
          Description={project.description}
          Image={project.image}
          Location={project.location}
        />
      </div>
    </div>
  );
}

export default ShowProject;
