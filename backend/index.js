require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000;
const url = process.env.MONGO_URL;
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { ProductsModel } = require("./models/ProductsModel");
const { Project } = require("./models/ProjectModel");
const { OrderModel } = require("./models/OrderModel");
const { Engineer } = require("./models/EngineerModel");
const Employer = require("./models/EmployerModel");
const User = require("./models/User");
const Work = require("./models/Work");
const axios = require("axios");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const session = require("express-session");
const passport = require("./passportConfig"); // Import the configured passport
const MongoStore = require("connect-mongo");
const wrapAsync = require("./utils/wrapAsync");
const verifyToken = require("./Middlewares/AuthMiddleWare");

// Routes

const authMiddleware = require("./Middlewares/AuthMiddleWare");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Nirmaan-mitra",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

const parser = multer({ storage: storage });

app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: ["https://nirmaan-mitra-frontend.onrender.com"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Express session
const sessionOptions = {
  // store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: false,
  },
};

app.use(session(sessionOptions));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.post("/register", async (req, res) => {
  try {
    const { role, email, password } = req.body;
    const user = new User({ role, email, password });
    await user.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login route
app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error("Authentication error:", err); // Log error details
      return next(err);
    }
    if (!user) {
      return res.status(400).json({ message: info.message });
    }

    req.logIn(user, (err) => {
      if (err) {
        console.error("Login error:", err); // Log error details
        return next(err);
      }
      res.json({ message: "Logged in successfully!", user, status: true });
    });
  })(req, res, next);
});

// Logout route
app.post("/logout", (req, res) => {
  req.logout((err) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ message: "Logged out successfully!" });
  });
});

app.get("/profile", verifyToken, (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized access" });
  }

  // Assuming req.user contains user information
  res.status(200).json({ user: req.user });
});

// app.get("/isAuthenticated", (req, res) => {
//   if (req.isAuthenticated()) {
//     res.json({ loggedIn: true });
//   } else {
//     res.json({ loggedIn: false });
//   }
// });

// Function to perform geocoding using Mapbox API
const geocode = async (location) => {
  const encodedLocation = encodeURIComponent(location);
  const mapboxToken = process.env.MAPBOX_ACCESS_TOKEN; // Store your Mapbox token in the .env file
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedLocation}.json?access_token=${mapboxToken}`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    if (data.features && data.features.length > 0) {
      const [lng, lat] = data.features[0].center;
      return { lng, lat };
    } else {
      throw new Error("Location not found");
    }
  } catch (error) {
    console.error("Error during geocoding:", error);
    throw error;
  }
};

// GET request to retrieve project by ID and geocode the location
app.get(
  "/projects/:id",
  wrapAsync(async (req, res) => {
    const project = await Project.findById(req.params.id).populate({
      path: "owner",
      select: "_id username", // Include the fields you need
    });

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    // Perform geocoding for the project's location
    const coordinates = await geocode(project.location);

    res.json({ ...project._doc, coordinates });
  })
);

// GET request to retrieve all projects
app.get(
  "/projects",
  authMiddleware,
  wrapAsync(async (req, res) => {
    let projects = await Project.find({ owner: { $ne: req.user } }).populate({
      path: "owner",
      select: "_id ", // Include the fields you need
    });
    res.json(projects);
  })
);

//Get user-projects
app.get(
  "/userprojects",
  authMiddleware,
  wrapAsync(async (req, res) => {
    let projects = await Project.find({ owner: req.user }).populate({
      path: "owner",
      select: "_id ", // Include the fields you need
    });
    res.json(projects);
  })
);

// POST request to create a new project
app.post(
  "/projects",
  parser.single("image"),
  authMiddleware,
  wrapAsync(async (req, res) => {
    // Check if an image was uploaded, if not, set a default image path
    const imagePath = req.file ? req.file.path : "path/to/default/image.jpg";

    // Create a new project object including the image path
    const newProject = await Project.create({
      ProjectName: req.body.ProjectName,
      description: req.body.description,
      image: imagePath, // Use the uploaded image path or the default one
      location: req.body.location,
      owner: req.user._id,
    });

    res.status(201).json(newProject);
  })
);

// PUT request to update an existing project
app.put(
  "/projects/:id",
  parser.single("image"),
  wrapAsync(async (req, res) => {
    const updateData = {
      ProjectName: req.body.ProjectName,
      description: req.body.description,
      location: req.body.location,
    };

    if (req.file) {
      updateData.image = req.file.path; // use the URL provided by Cloudinary
    }

    const project = await Project.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.json(project);
  })
);

// DELETE request to delete an existing project
app.delete(
  "/projects/:id",
  wrapAsync(async (req, res) => {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json({ message: "Project deleted successfully" });
  })
);

// GET request to retrieve all products
app.get("/products", async (req, res) => {
  let allProducts = await ProductsModel.find({});
  res.json(allProducts);
});

// Route to place a new order
app.post(
  "/orders",
  authMiddleware,
  wrapAsync(async (req, res) => {
    const { items, total } = req.body;
    console.log(req.user);
    const userId = req.user._id;
    // Create a new order
    const newOrder = new OrderModel({
      items,
      total,
      userId,
    });

    // Save the order to the database
    const savedOrder = await newOrder.save();

    res.status(201).json(savedOrder);
  })
);

// GET user-specific orders
app.get(
  "/orders",
  authMiddleware,
  wrapAsync(async (req, res) => {
    console.log(req.user);
    // Fetch orders related to the userId
    const orders = await OrderModel.find({ userId: req.user._id }).populate(
      "items.productId"
    );

    res.status(200).json(orders);
  })
);

//Route to create Engineer Profile

app.post(
  "/engineerprofile",
  authMiddleware,
  parser.single("image"),
  wrapAsync(async (req, res) => {
    // Check if the user is authenticated and has the "Engineer" role
    const userId = req.user;

    const user = await User.find({ _id: userId });

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    if (user[0].role != "Engineer") {
      return res.status(403).json({
        error: "Access denied. Only engineers can create an engineer profile.",
      });
    }

    // Check if the user already has an engineer profile
    if (user[0].engineerProfile) {
      return res.status(400).json({ error: "Profile already exists." });
    }

    // Access the uploaded image information from req.file
    const { path } = req.file;

    // Create a new engineer profile object
    const profile = await Engineer.create({
      image: path,
      description: req.body.description,
      Education: req.body.Education,
      Experience: req.body.Experience,
      skills: req.body.skills,
      owner: userId,
    });

    // Link the engineer profile to the user
    user[0].engineerProfile = profile._id;
    await user[0].save();

    res.status(201).json(profile);
  })
);

//Route to create Employer Profile

app.post(
  "/employerprofile",
  authMiddleware,
  parser.single("image"),
  wrapAsync(async (req, res) => {
    // Check if the user is authenticated and has the "Engineer" role
    const userId = req.user;
    const user = await User.find({ _id: userId });

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    if (user[0].role != "Employer") {
      return res.status(403).json({
        error: "Access denied. Only Employers can create an engineer profile.",
      });
    }

    // Check if the user already has an engineer profile
    if (user[0].employerProfile) {
      return res.status(400).json({ error: "Profile already exists." });
    }

    // Access the uploaded image information from req.file
    const { path } = req.file;

    // Create a new engineer profile object
    const profile = await Employer.create({
      image: path,
      companyName: req.body.companyName,
      description: req.body.description,
      industry: req.body.industry,
      location: req.body.location,
      owner: userId,
    });

    // Link the engineer profile to the user
    user[0].employerProfile = profile._id;
    await user[0].save();

    res.status(201).json(profile);
  })
);

//Route to check whether profile exists for a user
app.get(
  "/checkprofile",
  authMiddleware,
  wrapAsync(async (req, res) => {
    const userId = req.user; // User ID from the authenticated user

    // Fetch user with profile references
    const user = await User.findById(userId)
      .populate("engineerProfile")
      .populate("employerProfile");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Determine the profile status based on user's role and existing profile
    let message = "";
    if (user.role === "Engineer") {
      message = user.engineerProfile
        ? "Engineer profile exists"
        : "Engineer profile does not exist";
    } else if (user.role === "Employer") {
      message = user.employerProfile
        ? "Employer profile exists"
        : "Employer profile does not exist";
    }

    res.json({ message });
  })
);
//to get the engineer details
app.get(
  "/engineerprofile",
  authMiddleware,
  wrapAsync(async (req, res) => {
    const userId = req.user;

    // Fetch user with profile references
    const user = await User.findById(userId).populate("engineerProfile");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Send user data along with populated profile
    res.json(user);
  })
);

//to get the employer details
app.get(
  "/employerprofile",
  authMiddleware,
  wrapAsync(async (req, res) => {
    const userId = req.user;

    // Fetch user with profile references
    const user = await User.findById(userId).populate("employerProfile");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Send user data along with populated profile
    res.json(user);
  })
);

//Update the engineer profile
app.put(
  "/engineerupdate",
  parser.single("image"),
  authMiddleware,
  async (req, res) => {
    const userId = req.user;
    const updateData = {
      Education: req.body.Education,
      Experience: req.body.Experience,
      description: req.body.description,
      skills: req.body.skills,
    };

    if (req.file) {
      updateData.image = req.file.path; // Assuming the path is stored or uploaded to a service like Cloudinary
    }

    try {
      // Find and update the user document
      const updatedProfile = await Engineer.findOneAndUpdate(
        { owner: userId },
        updateData,
        { new: true, useFindAndModify: false }
      );

      if (!updatedProfile) {
        return res.status(404).json({ message: "Profile not found" });
      }

      res.status(200).json({
        message: "Profile updated successfully",
        profile: updatedProfile,
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      res.status(500).json({ message: "Error updating profile" });
    }
  }
);

//update the employer profile
app.put(
  "/employerupdate",
  parser.single("image"),
  authMiddleware,
  wrapAsync(async (req, res) => {
    const userId = req.user;
    const updateData = {
      industry: req.body.industry,
      companyName: req.body.companyName,
      description: req.body.description,
      location: req.body.location,
    };

    if (req.file) {
      updateData.image = req.file.path; // Assuming the path is stored or uploaded to a service like Cloudinary
    }

    // Find and update the user document
    const updatedProfile = await Employer.findOneAndUpdate(
      { owner: userId },
      updateData,
      { new: true, useFindAndModify: false }
    );

    if (!updatedProfile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      profile: updatedProfile,
    });
  })
);

//Route to show the engineers avaliable for the
app.get(
  "/getengineer",
  wrapAsync(async (req, res) => {
    const { selectedProjectId } = req.query;

    // Step 1: Find all engineer profiles associated with the given project ID
    const associatedWorks = await Work.find({
      project: selectedProjectId,
    }).select("engineer");
    const associatedEngineerProfiles = associatedWorks.map((work) =>
      work.engineer.toString()
    );

    // Step 2: Find engineers who are not associated with the given project ID
    const unassociatedEngineers = await User.find({
      role: "Engineer",
      engineerProfile: { $nin: associatedEngineerProfiles },
    }).populate("engineerProfile");

    res.json(unassociatedEngineers);
  })
);

app.post(
  "/projects/:projectId/appoint",
  authMiddleware,
  wrapAsync(async (req, res) => {
    const { projectId } = req.params;
    const { engineerId } = req.body;
    const userId = req.user;

    // Check if the engineer is already assigned to the project
    const existingWork = await Work.findOne({
      project: projectId,
      engineer: engineerId,
    });

    if (existingWork) {
      return res.status(301).json({
        message: "Engineer is already appointed to this project.",
      });
    }

    // Create a new Work document
    const work = new Work({
      engineer: engineerId,
      project: projectId,
      employer: userId,
    });

    const newWork = await work.save();
    res.status(200).json({
      message: "Engineer is employed to project successfully",
      newWork,
    });
  })
);

//Route to see the appointed engineer for project
app.get(
  "/engineer/:id",
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    // Find all Work documents for the given project ID
    const workDocs = await Work.find({ project: id });

    // Extract engineerProfile IDs from the Work documents
    const engineerProfileIds = workDocs.map((work) => work.engineer);

    // Find engineer details from the User model where engineerProfile matches engineerProfileIds
    const engineers = await User.find({
      engineerProfile: { $in: engineerProfileIds },
    }).populate("engineerProfile");

    res.json(engineers);
  })
);

//Route to get engineer projects
app.get(
  "/engineer/:id/projects",
  authMiddleware,
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const works = await Work.find({ engineer: id });
    const projectIds = works.map((work) => work.project);

    const projects = await Project.find({ _id: { $in: projectIds } });
    res.json(projects);
  })
);

//OwnerProfile details
app.get(
  "/users/:ownerId",
  wrapAsync(async (req, res) => {
    const { ownerId } = req.params;
    const owner = await User.findById(ownerId).populate("employerProfile"); // Exclude password field

    if (!owner) {
      return res.status(404).json({ message: "Owner not found" });
    }

    res.status(200).json(owner);
  })
);

//Engineer profile details
app.get(
  "/engineers/:engineerId",
  wrapAsync(async (req, res) => {
    const { engineerId } = req.params;
    console.log(engineerId);
    const engineer = await User.findById(engineerId).populate(
      "engineerProfile"
    );

    if (!engineer) {
      return res.status(404).json({ message: "Engineer not found" });
    }

    res.status(200).json(engineer);
  })
);

// app.use("/", authRoute);

app.listen(PORT, () => {
  console.log(`app started at the port ${PORT}`);
  mongoose.connect(url);
  console.log("Connected to the database successfully");
});
