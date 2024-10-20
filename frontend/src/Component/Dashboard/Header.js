import React, { useRef, useEffect } from 'react';
import './Header.css'; 

const Header = ({ onLogout, user }) => {
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    dropdownRef.current.classList.toggle('show');
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      dropdownRef.current.classList.remove('show');
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="header">
      <i className="fa fa-bars bar-item"></i>
      <div className="search">
        <input type="search" placeholder="Type to search..." />
      </div>

      <div className="profile" onClick={toggleDropdown}>
        <img src="img/profile.png" alt="profile" className="profile-image" />
        <div className="dropdown" ref={dropdownRef}>
          <div className="user-card">
            <img src="img/profile.png" alt="Profile" className="user-card-image" />
            <div className="info-container">
              <p className="info"><span className="label">Name:</span> {user.username}</p>
              <p className="info"><span className="label">Email:</span> {user.email}</p>
              <p className="info"><span className="label">Role:</span> Admin</p>
            </div>
            <button className="logout-button" onClick={onLogout}>Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
