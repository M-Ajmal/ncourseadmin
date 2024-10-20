import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./Component/Dashboard/Sidebar";
import Header from "./Component/Dashboard/Header";
import Dashboard from "./Component/Dashboard/dashboard";
import UserMan from "./Component/UserMan/UserMan";
import InstructorList from "./Component/Instructor/InstructorList";
import RatingAndReviews from "./Component/RatingAndReviews/RatingAndReviews";
import Courses from "./Component/Course/Courses";
import Catgoryman from "./Component/Category/catgoryman";
import LoginForm from "./Component/Sign-in/LoginForm";
import UserManagement from "./Component/User/UserManagement";
import Enrollment from "./Component/Enrollment/Enrollmentcom";

function App() {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div className="page-content">
        {!isLoggedIn ? (
          <LoginForm onLogin={handleLogin} />
        ) : (
          <>
            <Sidebar />
            <main>
              <Header onLogout={handleLogout} user={user} />
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/user-managment" element={<UserMan />} />
                <Route path="/instructors" element={<InstructorList />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/rating" element={<RatingAndReviews />} />
                <Route path="/Category" element={<Catgoryman />} />
                <Route path="/Enrollment" element={<Enrollment />} />
                <Route
                  path="/adminuser-management"
                  element={<UserManagement user={user} setUser={setUser} />}
                />
              </Routes>
            </main>
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
