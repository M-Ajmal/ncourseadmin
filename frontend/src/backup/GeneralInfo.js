import React from 'react';

const GeneralInfo = ({ firstName, lastName }) => {
  return (
    <div className="row">
      <div className="general-information">
        <h4>General Information</h4>
        <div>
          <h5>First Name:&nbsp;</h5>
          <span>{firstName}</span>
        </div>
      </div>
      <div>
        <h5>Last Name:&nbsp;</h5>
        <span>{lastName}</span>
      </div>
    </div>
  );
};

export default GeneralInfo;
