import React, { useState, useEffect } from "react";
import Project from "./Project";
import axios from "axios";
import LoadSpinner from "../../OtherComponents/Loader"; // Import the LoadSpinner component
import config from "../../../config";
import useUserProfile from "../../customHooks/userStatus";

function AllProjects() {
  const [allProjects, setAllProjects] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // State for loading
  const { isAuthenticated } = useUserProfile();

  useEffect(() => {
    if (!isAuthenticated) {
      setLoading(false); // Stop loading if not authenticated
      return;
    }

    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${config.apiBaseUrl}/projects`, {
          withCredentials: true,
        });
        setAllProjects(response.data);
      } catch (err) {
        setError(err.response ? err.response.data.error : "Server Error");
      } finally {
        setLoading(false); // Ensure loading state is turned off
      }
    };

    fetchProjects();
  }, [isAuthenticated]);

  if (loading) {
    return <LoadSpinner />; // Show LoadSpinner while loading
  }

  if (error) {
    return <div className="text-center text-danger mt-5">{error}</div>; // Show error message
  }

  return (
    <div className="container margin">
      <h2 className="text-warning display-4 fw-bold shadow-text fs-1 mb-5 text-center">
        Projects on Nirmaan Mitra
      </h2>
      <div className="row shopcards">
        {allProjects.length > 0 ? (
          allProjects.map((project) => (
            <Project
              key={project._id}
              image={project.image}
              ProjectName={project.ProjectName}
              ProjectId={project._id}
              Location={project.location}
              createdAt={project.createdAt}
            />
          ))
        ) : (
          <p className="text-center mt-5">No projects available</p>
        )}
      </div>
    </div>
  );
}

export default AllProjects;
