import React from "react";

function About() {
  return (
    <div className="container my-5">
      {/* Section 1: "Nirmaan Mitra" and Image */}
      <div className="row align-items-center mb-5">
        <div className="col-12 col-lg-6 mb-4 mb-lg-0 text-center text-lg-start">
          <p className="text-warning display-4 fw-bold shadow-text fs-2">
            "Nirmaan Mitra"
          </p>
          <p className="text-muted fs-5">
            is a dedicated platform connecting skilled engineers with employers
            in the construction industry. Our unique approach ensures that every
            engineer is committed to completing the projects they are matched
            with, providing reliability and consistency in the workforce.
          </p>
        </div>
        <div className="col-12 col-lg-6 text-center">
          <img
            src="/media/images/founder.jpg"
            alt="Nirmaan Mitra"
            className="rounded img-fluid img-shadow mt-5 rounded-circle"
            style={{ maxWidth: "40%", height: "auto" }}
          />
          <p>
            <b>Founder & CEO</b>
            <br />
            <b>SABHAWAT RAHUL NAIK</b>
          </p>
        </div>
      </div>

      {/* Section 2: "Our Mission" and Image */}
      <div className="row align-items-center mb-5">
        <div className="col-12 col-lg-6 mb-4 mb-lg-0 text-center text-lg-start">
          <h2 className="text-warning fw-bold shadow-text">Our Mission</h2>
          <p className="text-muted fs-5">
            "To deliver reliable and consistent engineering services to the
            construction industry by connecting employers with committed and
            skilled engineers."
          </p>
        </div>
        <div className="col-12 col-lg-6 text-center">
          <img
            src="/media/images/vision.png"
            alt="Vision"
            className="rounded img-fluid img-shadow mt-5"
            style={{ maxWidth: "30%", height: "auto" }}
          />
        </div>
      </div>

      {/* Section 3: "Vision" and Image */}
      <div className="row align-items-center mt-5">
        <div className="col-12 col-lg-6 mb-4 mb-lg-0 text-center text-lg-start">
          <h2 className="text-warning fw-bold shadow-text">Vision</h2>
          <p className="text-muted fs-5">
            "To become the most trusted platform for employers seeking reliable
            engineering talent, and for engineers looking to showcase their
            skills and dedication in the industry."
          </p>
        </div>
        <div className="col-12 col-lg-6 text-center">
          <img
            src="/media/images/mission.jpg"
            alt="Our Mission"
            className="rounded img-fluid img-shadow mt-5"
            style={{ maxWidth: "60%", height: "auto" }}
          />
        </div>
      </div>
    </div>
  );
}

export default About;
