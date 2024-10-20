import React, { useEffect, useState } from 'react'; 

const Dashboard = () => {
  const [data, setData] = useState({
    totalCourses: 0,
    totalUsers: 0,
    totalEnrollments: 0,
    totalInstructors: 0,
  });

  const fetchData = async () => {
    try {
      const [coursesResponse, usersResponse, enrollmentsResponse, instructorsResponse] = await Promise.all([
        fetch('http://localhost:5000/api/count/courses'), 
        fetch('http://localhost:5000/api/count/users'),   
        fetch('http://localhost:5000/api/count/enrollments'), 
        fetch('http://localhost:5000/api/count/instructors'), 
      ]);

      const coursesData = await coursesResponse.json();
      const usersData = await usersResponse.json();
      const enrollmentsData = await enrollmentsResponse.json();
      const instructorsData = await instructorsResponse.json();

      setData({
        totalCourses: coursesData.total,
        totalUsers: usersData.total,
        totalEnrollments: enrollmentsData.total,
        totalInstructors: instructorsData.total,
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="main-content">
      <div className="title">
        <h1>Dashboard</h1>
      </div>
      <div className="main-content-boxes">
        <div className="box">
          <div className="box-section">
            <div className="box-title">
              <h2>Student Enrollment Statistics</h2>
              <p>Overview of Course Enrollment and Instructor Performance</p>
            </div>
          </div>
          <div className="box-section-panel grid">
            <div className="small-box">
              <i className="fa fa-list fa-2x mb-10"></i>
              <span>{data.totalCourses}</span>
              <p>Total Courses</p>
            </div>
            <div className="small-box">
              <i className="fa fa-users fa-2x mb-10"></i>
              <span>{data.totalUsers}</span>
              <p>Total Users</p>
            </div>
            <div className="small-box">
              <i className="fa fa-check-circle fa-2x mb-10"></i>
              <span>{data.totalEnrollments}</span>
              <p>Total Enrollments</p>
            </div>
            <div className="small-box">
              <i className="fa fa-chalkboard-teacher fa-2x mb-10"></i>
              <span>{data.totalInstructors}</span>
              <p>Total Instructors</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
