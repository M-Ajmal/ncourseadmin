import React from 'react';

const InstructorInfo = ({ image, name, username }) => {
  return (
    <div className="Instructor-info">
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p>User name : {username}</p>
    </div>
  );
};

export default InstructorInfo;
