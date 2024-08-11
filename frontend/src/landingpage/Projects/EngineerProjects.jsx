import React, { useState, useEffect } from "react";
import config from "../../../config";

import Project from "./Project";
import axios from "axios";

function EngineerProjects() {
  const [userprojects, setUserProjects] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${config.apiBaseUrl}/userprojects`, {
          withCredentials: true,
        });
        setUserProjects(response.data);
      } catch (err) {
        setError(err.response ? err.response.data.error : "Server Error");
      }
    };
    fetchProjects();
  }, []);

  return (
    <div className="container mt-3">
      <h2 className="text-warning display-4 fw-bold shadow-text fs-1 text-center">
        Projects
      </h2>
      <div className="row shopcards">
        {userprojects.map((project) => (
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
  );
}

export default EngineerProjects;
