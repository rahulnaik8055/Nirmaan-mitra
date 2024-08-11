import React from "react";

function Footer() {
  return (
    <footer className="border-top footer">
      <div className="container mt-5 mb-5 text-center">
        <div className="row">
          {/* Logo and Social Media */}
          <div className="col-12 col-lg-3">
            <img
              src="/media/images/vision.png"
              alt="LOGO"
              style={{ width: "30%", mixBlendMode: "multiply" }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
              }}
              className="mb-3 mt-3"
            >
              <a href="https://www.linkedin.com/in/rahul-naik-63300126a/">
                <i className="fa-brands fa-linkedin"></i>
              </a>
              <a href="https://x.com/Rahul_Naik7">
                <i className="fa-brands fa-square-twitter"></i>
              </a>
              <a href="https://www.instagram.com/_rahul_naik_17/">
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a href="https://github.com/rahulnaik8055">
                <i className="fa-brands fa-github"></i>
              </a>
            </div>
            <p>&copy;2024, Nirmaan Mitra Pvt Ltd.</p>
            All rights are reserved.
          </div>

          {/* Company Links */}
          <div className="col-12 col-lg-3">
            <p className="fs-4 mt-2">Company</p>
            <a href="/about">About Us</a>
            <br />
            <a href="/store">Shop</a>
            <br />
            <a href="/projects">Projects</a>
            <br />
            <a href="/careers">Careers</a>
            <br />
            <a href="/contact">Contact Us</a>
            <br />
            <a href="/blog">Blog</a>
            <br />
            <a href="/terms">Terms & Conditions</a>
          </div>

          {/* Support Links */}
          <div className="col-12 col-lg-3">
            <p className="fs-4 mt-2">Support</p>
            <a href="/policy">Privacy Policies</a>
            <br />
            <a href="/faqs">FAQs</a>
            <br />
            <a href="/support">Customer Support</a>
            <br />
            <a href="/refund-policy">Refund Policy</a>
            <br />
            <a href="/safety">Safety Guidelines</a>
            <br />
            <a href="/legal">Legal Information</a>
          </div>

          {/* Newsletter Signup */}
          <div className="col-12 col-lg-3">
            <p className="fs-4 mt-2">Stay Connected</p>
            <p>Subscribe to our newsletter for the latest updates:</p>
            <form>
              <input
                type="email"
                className="form-control mb-2"
                placeholder="Enter your email"
              />
              <button type="submit" className="btn btn-primary">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
      <p className="p-5 fs-8 mt-5">
        Nirmaan Mitra, your definitive platform for hiring skilled engineers,
        workers, and accessing a wide range of top-quality construction
        products. Our mission is to connect builders with unparalleled expertise
        and dependable resources, ensuring excellence across projects, from
        expansive developments to meticulous home renovations. Stay informed
        with our latest industry insights, exclusive offers, and invaluable tips
        by subscribing to our newsletter. Join our vibrant community of
        dedicated professionals and enthusiasts committed to achieving
        exceptional results in construction. Let Nirmaan Mitra empower your
        construction journey with innovation, reliability, and a steadfast
        commitment to surpassing expectations at every turn.
      </p>
    </footer>
  );
}

export default Footer;
