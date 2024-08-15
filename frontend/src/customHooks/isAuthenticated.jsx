import { useState, useEffect } from "react";
import axios from "axios";
import config from "../../config";

const useIsAuthenticated = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await axios.get(
          `${config.apiBaseUrl}/isAuthenticated`,
          {
            withCredentials: true,
          }
        );
        setIsAuthenticated(response.data.loggedIn);
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuthentication();
  }, []);

  return { isAuthenticated, loading };
};

export default useIsAuthenticated;
