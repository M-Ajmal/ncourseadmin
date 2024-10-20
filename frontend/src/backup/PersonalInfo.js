import React from 'react';

const PersonalInfo = ({ email, password }) => {
  return (
    <div className="row">
      <div className="general-information">
        <h4>Personal Information</h4>
        <div>
          <h5>Email:&nbsp;</h5>
          <span>{email}</span>
        </div>
      </div>
      <div>
        <h5>Password:&nbsp;</h5>
        <span>{password}</span>
      </div>
    </div>
  );
};

export default PersonalInfo;
