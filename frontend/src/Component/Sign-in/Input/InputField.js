import React from "react";
import "./input.css";

const InputField = ({ label, type, value, onChange, onFocus, onBlur }) => {
  return (
    <div className={`input-div ${type}`}>
      <div className="i">
        {type === "text" ? (
          <i className="fas fa-user"></i>
        ) : (
          <i className="fas fa-lock"></i>
        )}
      </div>
      <div className="div">
        <h5>{label}</h5>
        <input
          type={type}
          className="input"
          value={value}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default InputField;
