import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import config from "../../config";
import useIsAuthenticated from "../customHooks/isAuthenticated";

const useUserProfile = () => {
  const [userId, setUserId] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { isAuthenticated, loading: authLoading } = useIsAuthenticated();

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (authLoading) return; // Wait until authentication check is done

      if (!isAuthenticated) {
        // navigate("/login");
        setLoading(false);
        return;
      }

      try {
        const { data } = await axios.get(
          `${config.apiBaseUrl}/isAuthenticated`,
          {
            withCredentials: true,
          }
        );
        console.log(data);
        const { _id, role } = data.user;
        setUserId(_id);
        setRole(role);
        setLoading(false);
      } catch (err) {
        // navigate("/login");
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [authLoading, isAuthenticated, navigate]);

  return { userId, role, loading, error };
};

export default useUserProfile;
