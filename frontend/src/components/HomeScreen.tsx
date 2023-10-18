import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUserEmail } from "../store/userSlice";
const HomeScreen: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleStartWizard = () => {
    if (validateEmail(email)) {
      dispatch(updateUserEmail(email));
      navigate("/income-range");
    } else {
      setIsValid(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-5xl font-bold mb-4 text-gray-800">
        Welcome to GP Flow Investment
      </h1>
      <p className="text-xl text-gray-600 mb-6">
        Your gateway to premium investment opportunities
      </p>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="form-input mb-4 py-2 px-8 rounded-full border-2"
      />
      {!isValid && (
        <p className="text-red-500 mb-4">Please enter a valid email.</p>
      )}
      <button
        onClick={handleStartWizard}
        className="inline-block px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Start Investment Wizard
      </button>
    </div>
  );
};

export default HomeScreen;
