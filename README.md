Nirmaan Mitra
Nirmaan Mitra is a comprehensive platform designed to connect engineers with employers, offering a streamlined interface for job applications and recruitment processes. This project includes a frontend and backend deployed separately to enhance scalability and maintainability.

Table of Contents
Features
Technologies
Setup
Frontend
Backend
Deployment
Usage
Contributing
License
Features
User Signup and Login: Secure user authentication with JWT tokens.
Job Listings: Employers can post job opportunities, and engineers can browse and apply for jobs.
Profile Management: Users can manage their profiles and application statuses.
Notifications: Real-time updates for application statuses and job postings.
Technologies
Frontend: React, CSS, Axios
Backend: Node.js, Express, MongoDB
Authentication: JWT, bcryptjs
Deployment: Render (for separate deployment of frontend and backend)
Setup
Frontend
Clone the Repository:

git clone https://github.com/yourusername/nirmaan-mitra-frontend.git

cd nirmaan-mitra-frontend

Install Dependencies:

npm install

Set Up Environment Variables:

Create a .env file in the root directory and add your environment variables:

arduino
Copy code
REACT_APP_API_URL=http://your-backend-url/api
Run the Development Server:

npm start

Backend
Clone the Repository:

git clone https://github.com/yourusername/nirmaan-mitra-backend.git

cd nirmaan-mitra-backend

Install Dependencies:

npm install

Set Up Environment Variables:

Create a .env file in the root directory and add your environment variables:

makefile
Copy code
MONGODB_URI=your-mongodb-uri
JWT_SECRET=your-jwt-secret
NODE_ENV=development
Run the Development Server:

npm start

Deployment
Frontend Deployment
Deploy the frontend to a service like Render or Vercel.
Set the environment variable REACT_APP_API_URL to the URL of your backend.
Backend Deployment
Deploy the backend to a service like Render.
Ensure that environment variables are correctly set in the deployment environment.
Usage
Access the Application:

Navigate to the deployed frontend URL to access the application.

Sign Up and Log In:

Use the signup and login forms to create an account or access your existing account.

Explore Features:

Browse job listings and apply for positions.
Manage your profile and view application statuses.
Contributing
Fork the Repository:

Create a fork of the repository on GitHub.

Clone Your Fork:

git clone https://github.com/yourusername/nirmaan-mitra.git

Create a Branch:

git checkout -b feature-branch

Make Your Changes:

Implement your changes and test them locally.

Push Changes and Create a Pull Request:

git push origin feature-branch

Open a pull request on GitHub.

License
This project is licensed under the MIT License - see the LICENSE file for details.







