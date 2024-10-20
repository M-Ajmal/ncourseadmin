import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="sidebar">
      <div className="brand">
        <img src="img/logow.png" alt="Logo" className="brand-logo" />
      </div>
      <ul>
        <li>
          <Link
            to="/dashboard"
            className={`sidebar-link ${
              location.pathname === "/dashboard" ? "active" : ""
            }`}
          >
            <i className="fa fa-chart-bar fa-fw"></i>
            <span>Dashboard</span>
          </Link>
        </li>
        <li>
          <Link
            to="/user-managment"
            className={`sidebar-link ${
              location.pathname === "/user-managment" ? "active" : ""
            }`}
          >
            <i className="fa fa-user-circle fa-fw"></i>
            <span>User</span>
          </Link>
        </li>
        <li>
          <Link
            to="/instructors"
            className={`sidebar-link ${
              location.pathname === "/instructors" ? "active" : ""
            }`}
          >
            <i className="fa fa-chalkboard-teacher"></i>
            <span>Instructors</span>
          </Link>
        </li>
        <li>
          <Link
            to="/rating"
            className={`sidebar-link ${
              location.pathname === "/rating" ? "active" : ""
            }`}
          >
            <i className="fa fa-star-half-alt fa-fw"></i>
            <span>Reviews</span>
          </Link>
        </li>
        <li>
          <Link
            to="/courses"
            className={`sidebar-link ${
              location.pathname === "/courses" ? "active" : ""
            }`}
          >
            <i className="fa fa-graduation-cap fa-fw"></i>
            <span>Courses</span>
          </Link>
        </li>
        <li>
          <Link
            to="/Category"
            className={`sidebar-link ${
              location.pathname === "/Category" ? "active" : ""
            }`}
          >
            <i className="fa fa-tags fa-fw"></i>
            <span>Category</span>
          </Link>
        </li>
        <li>
          <Link
            to="/Enrollment"
            className={`sidebar-link ${
              location.pathname === "/Enrollment" ? "active" : ""
            }`}
          >
            <i className="fa fa-tags fa-fw"></i>
            <span>Enrollment</span>
          </Link>
        </li>
        <li>
          <Link
            to="/adminuser-management"
            className={`sidebar-link ${
              location.pathname === "/adminuser-management" ? "active" : ""
            }`}
          >
            <i className="fa fa-users-cog fa-fw"></i>
            <span>Admin</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
