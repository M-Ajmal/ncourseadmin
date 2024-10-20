import React from "react";

const CourseInfo = ({ courseName, courseId }) => {
  return (
    <div className="row">
      <div className="general-information">
        <h4>Course Information</h4>
        <div>
          <h5>Name :&nbsp;</h5>
          <span>{courseName}</span>
        </div>
      </div>
      <div>
        <h5>Course Id:&nbsp;</h5>
        <span>{courseId}</span>
      </div>
    </div>
  );
};

export default CourseInfo;
