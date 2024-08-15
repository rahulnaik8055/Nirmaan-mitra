import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import config from "../../config";

const useUserProfile = () => {
  const [userId, setUserId] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        const response = await axios.get(`${config.apiBaseUrl}/userStatus`, {
          withCredentials: true,
        });

        const { loggedIn, user } = response.data;
        console.log(response);
        setIsAuthenticated(loggedIn);

        if (loggedIn) {
          const { _id, role } = user;
          setUserId(_id);
          setRole(role);
        } else {
          //   navigate("/login");
        }
      } catch (error) {
        // navigate("/login");
        setError(error);
      } finally {
        setLoading(false);
        setAuthLoading(false);
      }
    };

    checkUserStatus();
  }, [navigate]);

  return { userId, role, isAuthenticated, loading, error };
};

export default useUserProfile;
