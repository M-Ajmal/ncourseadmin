import styled from "styled-components";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 10px;
  overflow: hidden;
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
`;

export const SuccessMessage = styled.div`
  background: #d4edda;
  color: #155724;
  padding: 10px;
  border-radius: 5px;
  margin-top: 20px;
  text-align: center;
  font-weight: bold;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

export const ReviewsContainer = styled.div`
  max-height: 400px;
  overflow-y: auto;
  padding-right: 15px;
  // scrollbar styles
`;

export const ReviewCardContainer = styled(motion.div)`
  background: linear-gradient(135deg, #e0f7fa, #80deea);
  border-radius: 15px;
  padding: 15px;
  margin-bottom: 15px;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
  position: relative;
  max-height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Stars = styled.div`
  display: flex;
`;

export const Star = styled(FaStar)`
  color: ${({ filled }) => (filled ? "#FFD700" : "#e4e5e9")};
`;

export const ReviewText = styled.p`
  font-size: 1rem;
  color: #555;
`;

export const Author = styled.p`
  font-weight: bold;
  color: #333;
  margin-top: auto;
`;

export const DeleteButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: #ff6347;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 5px 8px;
  cursor: pointer;
`;

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: white;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 300px;
`;

export const ActionButton = styled.button`
  background: ${({ bg }) => bg || "#007bff"};
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
  margin: 0 5px;
`;
