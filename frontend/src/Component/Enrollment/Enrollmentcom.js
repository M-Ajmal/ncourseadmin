import React, { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { BsFillFileCheckFill, BsFillFileXFill } from "react-icons/bs";
import { FaExclamationTriangle } from "react-icons/fa";

const API_URL = "http://localhost:5000/api/enrollments"; // Your API endpoint

const Enrollmentcom = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [enrollmentIdToDelete, setEnrollmentIdToDelete] = useState(null);

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const fetchEnrollments = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setEnrollments(data);
    } catch (error) {
      console.error("Error fetching enrollments:", error);
    }
  };

  const confirmDeleteEnrollment = async () => {
    try {
      await fetch(`${API_URL}/${enrollmentIdToDelete}`, { method: "DELETE" });
      fetchEnrollments();
      setConfirmDelete(false);
    } catch (error) {
      console.error("Error deleting enrollment:", error);
    }
  };

  // CSS styles
  const styles = {
    mainContent: {
      padding: "20px",
      backgroundColor: "#f9f9f9",
      borderRadius: "8px",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    },
    title: {
      marginBottom: "20px",
      textAlign: "center",
    },
    tableContainer: {
      maxHeight: "400px",
      overflowY: "auto",
      border: "1px solid #e0e0e0",
      borderRadius: "8px",
      backgroundColor: "#ffffff",
      position: "relative",
    },
    enrollmentTable: {
      width: "100%",
      borderCollapse: "collapse",
    },
    th: {
      backgroundColor: "#6fb1fc",
      color: "white",
      fontWeight: "bold",
      padding: "15px",
      textAlign: "left",
    },
    td: {
      padding: "15px",
      textAlign: "left",
      borderBottom: "1px solid #e0e0e0",
    },
    issuedStatus: {
      color: "#28a745",
      display: "flex",
      alignItems: "center",
    },
    pendingStatus: {
      color: "#dc3545",
      display: "flex",
      alignItems: "center",
    },
    actionButton: {
      padding: "8px 12px",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      marginRight: "5px",
      transition: "background-color 0.3s",
    },
    deleteButton: {
      backgroundColor: "#f44336",
      color: "white",
    },
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: 1000,
    },
    confirmationDialog: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#ffffff",
      borderRadius: "8px",
      padding: "20px",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
      zIndex: 1001,
      textAlign: "center",
    },
    confirmButton: {
      backgroundColor: "#4CAF50", // Green
      color: "white",
      border: "none",
      padding: "10px 20px",
      margin: "5px",
      cursor: "pointer",
      borderRadius: "5px",
      transition: "background-color 0.3s",
    },
    cancelButton: {
      backgroundColor: "#f44336", // Red
      color: "white",
      border: "none",
      padding: "10px 20px",
      margin: "5px",
      cursor: "pointer",
      borderRadius: "5px",
      transition: "background-color 0.3s",
    },
  };

  return (
    <div style={styles.mainContent}>
      <div style={styles.title}>
        <h1>Enrollment</h1>
      </div>
      <div style={styles.tableContainer}>
        <table style={styles.enrollmentTable}>
          <thead>
            <tr>
              <th style={styles.th}>No.</th>
              <th style={styles.th}>Enrollment ID</th>
              <th style={styles.th}>User Name</th>
              <th style={styles.th}>Course Title</th>
              <th style={styles.th}>Certificate</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {enrollments.map((enrollment, index) => (
              <tr key={enrollment.enrollment_id}>
                <td style={styles.td}>{index + 1}</td>
                <td style={styles.td}>{enrollment.enrollment_id}</td>
                <td style={styles.td}>{`${enrollment.f_name} ${enrollment.l_name}`}</td>
                <td style={styles.td}>{enrollment.course_title}</td>
                <td style={styles.td}>
                  {enrollment.certificate === 1 ? (
                    <span style={styles.issuedStatus}>
                      Issued <BsFillFileCheckFill style={{ color: "#28a745", marginLeft: "5px" }} />
                    </span>
                  ) : (
                    <span style={styles.pendingStatus}>
                      Pending <BsFillFileXFill style={{ color: "#dc3545", marginLeft: "5px" }} />
                    </span>
                  )}
                </td>
                <td>
                  <button
                    style={{ ...styles.actionButton, ...styles.deleteButton }}
                    onClick={() => {
                      setConfirmDelete(true);
                      setEnrollmentIdToDelete(enrollment.enrollment_id);
                    }}
                  >
                    <AiFillDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {confirmDelete && (
        <>
          <div style={styles.overlay} onClick={() => setConfirmDelete(false)}></div>
          <div style={styles.confirmationDialog}>
            <FaExclamationTriangle style={{ color: "orange" }} size={30} />
            <h2>Confirm Deletion</h2>
            <p>Are you sure you want to delete this enrollment?</p>
            <div>
              <button onClick={confirmDeleteEnrollment} style={styles.confirmButton}>
                Yes
              </button>
              <button
                onClick={() => setConfirmDelete(false)}
                style={styles.cancelButton}
              >
                No
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Enrollmentcom;
