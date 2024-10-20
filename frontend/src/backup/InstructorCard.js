import React from "react";
import InstructorInfo from "./InstructorInfo";
import GeneralInfo from "./GeneralInfo";
import PersonalInfo from "./PersonalInfo";
import CourseInfo from "./CourseInfo";

const InstructorCard = ({ instructor }) => {
  return (
    <div className="Instructor-box">
      <InstructorInfo
        image={instructor.image}
        name={instructor.name}
        username={instructor.username}
      />
      <div className="Instructor-info-section2">
        <GeneralInfo
          firstName={instructor.firstName}
          lastName={instructor.lastName}
        />
        <PersonalInfo email={instructor.email} password={instructor.password} />
        <CourseInfo
          courseName={instructor.courseName}
          courseId={instructor.courseId}
        />
      </div>
    </div>
  );
};

export default InstructorCard;
