import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import config from "../../config";

const useVerifyCookie = () => {
  const [userId, setUserId] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cookies, removeCookie] = useCookies([]);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
      }

      try {
        const { data } = await axios.post(
          `${config.apiBaseUrl}`,
          {},
          {
            withCredentials: true,
          }
        );

        const { status, userId, role } = data;
        setUserId(userId);
        setRole(role);
      } catch (error) {
        console.error("Error fetching user data:", error);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    verifyCookie();
  }, [cookies.token, navigate, removeCookie]);

  return { userId, role, loading };
};

export default useVerifyCookie;
