import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import HomePage from "./landingpage/Home/HomePage";
import Navbar from "./Navbar";
import Footer from "./Footer";
import StorePage from "./landingpage/Store/StorePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./landingpage/NotFound/NotFound";
import ProjectPage from "./landingpage/Projects/ProjectPage";
import AllProjects from "./landingpage/Projects/AllProjects";
import ShowProject from "./landingpage/Projects/ShowProjects";
import NewProjectForm from "./Forms/project/NewProjectForm";
import UpdateProject from "./Forms/project/UpdateProjectFrom";
import LoadingSpinner from "./OtherComponents/Loader";
import MainComponent from "./landingpage/Store/MainComponent";
import { CartProvider } from "./landingpage/Store/CartContext";
import Login from "./Forms/Authentication/Login";
import Signup from "./Forms/Authentication/Signup";
import Profile from "./landingpage/Profile/profile";
import ScrollToTop from "./OtherComponents/Scrolltotop";
import UpdateEngineer from "./Forms/profiles/UpdateEngineer";
import UpdateEmployer from "./Forms/profiles/UpdateEmployer";
import { FlashMessageProvider } from "./OtherComponents/FlashMessageContext";
import EngineerDetails from "./Appoint/engineerdetails";
import OwnerProfile from "./landingpage/Projects/OwnerProfile";
import WorkerEngineer from "./landingpage/Projects/WorkerProfile";
import Orderplaced from "./landingpage/Store/Orderplaced";
import AboutPage from "./landingpage/About/AboutPage";
import TermsAndConditions from "./OtherComponents/TermsandConditions";
import PrivacyPolicy from "./OtherComponents/PrivacyandPolicies";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <BrowserRouter>
      <FlashMessageProvider>
        <Navbar />
        {loading && <LoadingSpinner />}{" "}
        <CartProvider>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/store" element={<StorePage />} />
            <Route path="/project" element={<ProjectPage />} />

            <Route path="/projects/:id" element={<ShowProject />} />
            <Route path="/updateproject/:id" element={<UpdateProject />} />
            <Route path="/newproject" element={<NewProjectForm />} />
            <Route path="/cart" element={<MainComponent />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/editengineer" element={<UpdateEngineer />} />
            <Route path="/editemployer" element={<UpdateEmployer />} />
            <Route path="/getengineer" element={<EngineerDetails />} />
            <Route path="/profile/:ownerId" element={<OwnerProfile />} />
            <Route
              path="/engineerprofile/:engineerId"
              element={<WorkerEngineer />}
            />
            <Route path="/orderplaced" element={<Orderplaced />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/terms" element={<TermsAndConditions />} />
            <Route path="/policy" element={<PrivacyPolicy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </CartProvider>
        <Footer />
      </FlashMessageProvider>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
