import React from 'react';

const SubmitButton = ({ text }) => {
  // Define styles using a style object
  const buttonStyle = {
    display: 'block',
    width: '100%',
    height: '50px',
    borderRadius: '25px',
    outline: 'none',
    border: 'none',
    backgroundImage: 'linear-gradient(to right, #32be8f, #38d39f, #32be8f)',
    backgroundSize: '200%',
    fontSize: '1.2rem',
    color: '#fff',
    fontFamily: 'Poppins, sans-serif',
    textTransform: 'uppercase',
    margin: '1rem 0',
    cursor: 'pointer',
    transition: '.5s',
  };

  // Define hover styles (this will be used with onMouseEnter and onMouseLeave)
  const hoverStyle = {
    backgroundPosition: 'right',
  };

  // State to manage hover effect
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <input
      type="submit"
      value={text}
      style={isHovered ? { ...buttonStyle, ...hoverStyle } : buttonStyle} // Apply hover style when hovered
      onMouseEnter={() => setIsHovered(true)} // Set hover state to true on mouse enter
      onMouseLeave={() => setIsHovered(false)} // Set hover state to false on mouse leave
    />
  );
};

export default SubmitButton;
