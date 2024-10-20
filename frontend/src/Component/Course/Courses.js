import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import ConfirmationDialog from "./ConfirmationDialog";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/courses");
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const confirmDeleteUser = async () => {
    if (courseToDelete) {
      try {
        const response = await fetch(
          `http://localhost:5000/api/courses/${courseToDelete}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data.message); 
        
        setCourses(
          courses.filter((course) => course.course_id !== courseToDelete)
        );
      } catch (error) {
        console.error("Error deleting course:", error);
      }
      setConfirmDelete(false);
    }
  };

  const handleDelete = (courseId) => {
    setCourseToDelete(courseId);
    setConfirmDelete(true);
  };

  return (
    <div className="main-content">
      <div className="title">
        <h1>Our Courses</h1>
      </div>
      <div className="courses-scroll-container">
        <div className="courses-container">
          {courses.map((course) => (
            <div key={course.course_id} className="course-card">
              <img
                src={course.course_img}
                alt={course.course_title}
                className="course-image"
              />
              <button
                className="delete-button"
                onClick={() => handleDelete(course.course_id)}
                title="Delete Course"
              >
                <MdDelete size={24} color="#ffffff" />
              </button>
              <div className="course-details">
                <h2 className="course-title">{course.course_title}</h2>
              </div>
            </div>
          ))}
        </div>
      </div>

      {confirmDelete && (
        <ConfirmationDialog
          onConfirm={confirmDeleteUser}
          onCancel={() => setConfirmDelete(false)}
        />
      )}
    </div>
  );
};

export default Courses;
