import React from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

function Hero() {
  const [cookies] = useCookies(["token"]);

  return (
    <div className="hero mb-5   ">
      <div>
        <div className="row mb-5">
          <div className="col-6 mb-5 ms-5">
            <h1 className="text-white display-4 fw-bold shadow-text">
              "Empowering Builders, Shaping Futures"
            </h1>
            {!cookies.token ? (
              <Link to="/signup">
                <button className="btn btn-warning btn-lg ms-1">
                  Get Started
                </button>
              </Link>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
