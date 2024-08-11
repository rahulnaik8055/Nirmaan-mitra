import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Slider from "./Slider";
import ShopCards from "./ShopCards";
import Checkout from "./checkout";
import axios from "axios";
import config from "../../../config";

function StorePage() {
  const [cookies, , removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyCookie = async (retryCount = 3) => {
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
        if (!data.status) {
          removeCookie("token");
          navigate("/login");
        }
      } catch (error) {
        if (error.code === "ECONNRESET" && retryCount > 0) {
          setTimeout(() => verifyCookie(retryCount - 1), 1000);
        } else {
          removeCookie("token");
          navigate("/login");
        }
      }
    };

    verifyCookie();
  }, [cookies, navigate, removeCookie]);

  return (
    <>
      <Slider />
      <ShopCards />
      <Checkout />
    </>
  );
}

export default StorePage;
