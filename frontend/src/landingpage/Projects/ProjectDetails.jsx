import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import Map from "../../Maps/Map";
import LoadingSpinner from "../../OtherComponents/Loader";
import AppointedEngineer from "./AppointedEngineer";
import { useFlashMessage } from "../../OtherComponents/FlashMessageContext";
import config from "../../../config";

function ProjectDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [project, setProject] = useState({});
  const [message, setMessage] = useState();
  const [loading, setLoading] = useState(true);
  const [engineers, setEngineers] = useState([]);
  const { showMessage } = useFlashMessage();
  const { userId } = useVerifyCookie();

  useEffect(() => {
    const fetchProjectAndEngineers = async () => {
      try {
        const projectResponse = await axios.get(
          `${config.apiBaseUrl}/projects/${id}`
        );
        setProject(projectResponse.data);

        const engineersResponse = await axios.get(
          `${config.apiBaseUrl}/engineer/${id}`
        );
        setEngineers(engineersResponse.data);
      } catch (error) {
        setMessage("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchProjectAndEngineers();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`${config.apiBaseUrl}/projects/${id}`);
      setMessage("Project deleted successfully!");
      showMessage("Project deleted");
      navigate("/project");
    } catch (error) {
      setMessage("Error deleting project");
    }
  };

  const handleAppointEngineer = () => {
    localStorage.setItem("selectedProjectId", id);
    navigate("/getengineer");
  };

  const createdAtDate = new Date(project.createdAt);
  const date = createdAtDate.toLocaleDateString();

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container margin">
      {message && <p>{message}</p>}
      <div className="row">
        <div className="col-12">
          <p className="fs-4">
            <span className="text-warning display-4 fw-bold shadow-text fs-4 text-center">
              Project name :{" "}
            </span>
            {project.ProjectName}
          </p>
          <p className="fs-4">
            <span className="text-warning display-4 fw-bold shadow-text fs-4 ">
              Owner :{" "}
            </span>
            {project.owner ? project.owner.username : "Unknown"}
          </p>

          {project.owner?._id === userId ? (
            ""
          ) : (
            <button
              className="btn btn-warning mt-2"
              onClick={() => navigate(`/profile/${project.owner._id}`)}
            >
              View Owner Profile
            </button>
          )}
        </div>
        <div className="col-12 col-lg-6 mt-5">
          <p className="fs-4">
            <span className="text-warning display-4 fw-bold shadow-text fs-4 ">
              Project Image{" "}
            </span>
          </p>
          <img
            src={project.image}
            alt="project-image"
            style={{ width: "100%", height: "357px", objectFit: "cover" }}
            className="rounded-5 border p-3"
          />
        </div>
        <div className="col-12 col-lg-6 mt-5">
          <p className="fs-4 ">
            <span className="text-warning display-4 fw-bold shadow-text fs-4 ">
              Site Location :{" "}
            </span>
            {project.location}
          </p>
          <Map projectId={id} />
        </div>
      </div>

      {engineers.length > 0 && <AppointedEngineer engineers={engineers} />}

      {project.owner?._id === userId && (
        <div className="project-btns">
          <button
            className="btn btn-warning mt-5 ms-2"
            onClick={handleAppointEngineer}
          >
            Appoint engineer
          </button>

          <Link to={`/updateproject/${id}`}>
            <button className="btn btn-warning mt-5 ms-2">Make changes</button>
          </Link>
          <button className="btn btn-danger mt-5 d-flex" onClick={handleDelete}>
            Delete Project
          </button>
        </div>
      )}
      <div className="mt-5">
        <p className="fs-4 ">
          <span className="text-warning display-4 fw-bold shadow-text fs-4 text-center">
            Project started On :{" "}
          </span>
          {date}
        </p>
      </div>
    </div>
  );
}

export default ProjectDetails;
