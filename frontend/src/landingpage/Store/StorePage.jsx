import React, { useEffect } from "react";
import Slider from "./Slider";
import ShopCards from "./ShopCards";
import Checkout from "./checkout";
import useUserProfile from "../../customHooks/userStatus";

function StorePage() {
  const { isAuthenticated } = useUserProfile();
  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }
  }, [isAuthenticated]);

  return (
    <>
      <Slider />
      <ShopCards />
      <Checkout />
    </>
  );
}

export default StorePage;
