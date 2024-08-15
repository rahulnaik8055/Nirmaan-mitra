import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../OtherComponents/Loader";
import EngineerProfile from "../../Forms/profiles/EngineerProfile";
import EmployerProfile from "../../Forms/profiles/EmployerProfile";
import ProfileEngineer from "./ProfileEngineer";
import ProfileEmployer from "./ProfileEmployer";
import config from "../../../config";
import axios from "axios";
// import useUserProfile from "../../customHooks/userStatus";

const Profile = () => {
  const navigate = useNavigate();
  const { userId, role, loading, error } = useUserProfile();
  const [profileMessage, setProfileMessage] = useState("");
  // const { isAuthenticated } = useUserProfile();

  useEffect(() => {
    // if (!isAuthenticated) return; // Avoid making requests if userId is not available

    const checkProfileExistence = async () => {
      try {
        const { data } = await axios.get(`${config.apiBaseUrl}/checkprofile`, {
          withCredentials: true,
        });
        setProfileMessage(data.message);
      } catch (err) {
        console.log(err);
      }
    };

    checkProfileExistence();
  }, [userId]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    navigate("/login");
    return null;
  }

  return (
    <div className="container margin">
      {profileMessage === "Engineer profile exists" ||
      profileMessage === "Employer profile exists" ? (
        <>
          {profileMessage === "Engineer profile exists" ? (
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
