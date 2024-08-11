import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import LoadingSpinner from "../../OtherComponents/Loader";
import EngineerProfile from "../../Forms/profiles/EngineerProfile";
import EmployerProfile from "../../Forms/profiles/EmployerProfile";
import ProfileEngineer from "./ProfileEngineer";
import ProfileEmployer from "./ProfileEmployer";
import config from "../../../config";

const Profile = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies(["token"]);
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // Effect to verify user authentication
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

        const { status, user, role, userId } = data;
        setUsername(user);
        setRole(role);
        setUserId(userId);
      } catch (error) {
        console.error("Error fetching user data:", error);
        navigate("/login");
      } finally {
        setLoading(false); // Update loading state after fetching data
      }
    };

    verifyCookie();
  }, [cookies.token, navigate, removeCookie]);

  // Effect to check if the profile exists
  useEffect(() => {
    if (!userId) return; // Avoid making requests if userId is not available

    const checkProfileExistence = async () => {
      try {
        const { data } = await axios.get(`${config.apiBaseUrl}/checkprofile`, {
          withCredentials: true,
        });
        setMessage(data.message);
      } catch (err) {
        console.log(err);
      }
    };

    checkProfileExistence();
  }, [userId]);

  // Show loading indicator while fetching data
  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container margin">
      {/* Display profile existence message */}
      {message === "Engineer profile exists" ||
      message === "Employer profile exists" ? (
        <>
          {message === "Engineer profile exists" ? (
            <ProfileEngineer />
          ) : (
            <ProfileEmployer />
          )}
        </>
      ) : (
        <div>
          {role === "Engineer" ? <EngineerProfile /> : <EmployerProfile />}
        </div>
      )}
    </div>
  );
};

export default Profile;
