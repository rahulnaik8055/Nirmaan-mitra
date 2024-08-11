import React, { useState, useEffect } from "react";
import axios from "axios";
import EngineerCard from "./EngineerCard";
import { useFlashMessage } from "../OtherComponents/FlashMessageContext";
import { useNavigate } from "react-router-dom";
import config from "../../config";

function EngineerDetails() {
  const [engineers, setEngineers] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const { showMessage } = useFlashMessage();

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch engineers
    axios
      .get(`${config.apiBaseUrl}/getengineer`, {
        params: {
          selectedProjectId: localStorage.getItem("selectedProjectId"),
        },
      })
      .then((res) => {
        setEngineers(res.data);
      })
      .catch((err) => {
        showMessage("Error fetching engineers.", "error");
      });

    // Get selected project ID from localStorage
    const projectId = localStorage.getItem("selectedProjectId");
    if (projectId) {
      setSelectedProjectId(projectId);
    }
  }, []);

  const handleAppointEngineer = async (engineerProfileId) => {
    try {
      if (!selectedProjectId) {
        showMessage("No project selected.", "error");
        return;
      }

      const response = await axios.post(
        `${config.apiBaseUrl}/projects/${selectedProjectId}/appoint`,
        { engineerId: engineerProfileId },
        { withCredentials: true }
      );

      if (response.status === 200) {
        showMessage("Engineer appointed successfully", "success");
        navigate(`/projects/${selectedProjectId}`);
      }
    } catch (error) {
      console.error("Error in handleAppointEngineer:", error); // Add this line for more context
      if (error.response && error.response.data.error) {
        showMessage(error.response.data.error, "error");
      } else {
        showMessage("Error appointing engineer.", "error");
      }
    }
  };

  return (
    <div className="container margin">
      <h2 className="text-warning display-4 fw-bold shadow-text fs-1 mb-5 text-center">
        Engineers on Nirmaan-Mitra
      </h2>

      {engineers.length === 0 ? (
        <p className="text-center">
          Currently no more engineers for this project.
        </p>
      ) : (
        <div className="row">
          {engineers.map((engineer, index) => (
            <div key={index} className="col-md-4">
              <EngineerCard
                engineer={engineer}
                onAppointEngineer={handleAppointEngineer}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default EngineerDetails;
