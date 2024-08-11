import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Project from "./Project";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import LoadSpinner from "../../OtherComponents/Loader"; // Import the LoadSpinner component
import config from "../../../config";

function AllProjects() {
  const [allProjects, setAllProjects] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // State for loading

  // Get the userId
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [role, setRole] = useState("");
  const [cookies, removeCookie] = useCookies(["token"]);

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/login");
        return;
      }

      try {
        const { data } = await axios.post(
          `${config.apiBaseUrl}`,
          {},
          { withCredentials: true }
        );

        const { status, userId, role } = data;
        setUserId(userId);
        setRole(role);

        if (!status) {
          removeCookie("token");
          navigate("/login");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    verifyCookie();
  }, [cookies.token, navigate, removeCookie]);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true); // Set loading to true before fetching data
      try {
        const response = await axios.get(`${config.apiBaseUrl}/projects`, {
          withCredentials: true,
        });
        setAllProjects(response.data);
        setLoading(false); // Set loading to false after data is fetched
      } catch (err) {
        setError(err.response ? err.response.data.error : "Server Error");
        setLoading(false); // Set loading to false if there's an error
      }
    };
    fetchProjects();
  }, []);

  if (error) return <div>{error}</div>;

  if (loading) return <LoadSpinner />; // Show LoadSpinner while loading

  return (
    <div className="container margin ">
      <h2 className="text-warning display-4 fw-bold shadow-text fs-1 mb-5 text-center">
        Projects on Nirmaan Mitra
      </h2>

      <div className="row shopcards">
        {allProjects.map((project) => (
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

export default AllProjects;
