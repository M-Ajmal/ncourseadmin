import React from "react";

const SmallBox = ({ icon, count, label }) => {
  return (
    <div className="small-box">
      <i className={`${icon} fa-2x mb-10`}></i>
      <span>{count}</span>
      <p>{label}</p>
    </div>
  );
};

export default SmallBox;
