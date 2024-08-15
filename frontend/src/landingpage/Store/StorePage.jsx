import React, { useEffect } from "react";
import Slider from "./Slider";
import ShopCards from "./ShopCards";
import Checkout from "./checkout";
import useIsAuthenticated from "../../customHooks/isAuthenticated";

function StorePage() {
  const { isAuthenticated } = useIsAuthenticated();
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
