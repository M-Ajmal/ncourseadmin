import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import InputField from "./Input/InputField";
import SubmitButton from "./submit-button/SubmitButton";

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleFocus = (e) => {
    e.target.parentNode.parentNode.classList.add("focus");
  };

  const handleBlur = (e) => {
    if (e.target.value === "") {
      e.target.parentNode.parentNode.classList.remove("focus");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
  
      const data = await response.json();
      if (response.ok) {
        console.log("Calling onLogin...");
        if (onLogin) {
          onLogin(data.user); 
        }
        navigate("/dashboard");
      } else {
        setErrorMessage(data.message || "An error occurred");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage("Server error, please try again later.");
    }
  };
  

  return (
    <div className="container">
      <div className="img">
        <img src="img/final.svg" alt="Final" />
      </div>
      <div className="login-content">
        <form onSubmit={handleSubmit}>
          <img src="img/logo.png" alt="Logo" />
          <h2 className="titlewelcome">Welcome</h2>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <InputField
            label="Username"
            type="text"
            value={username}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={(e) => setUsername(e.target.value)}
          />
          <InputField
            label="Password"
            type="password"
            value={password}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={(e) => setPassword(e.target.value)}
          />
          <SubmitButton text="Login" />
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
