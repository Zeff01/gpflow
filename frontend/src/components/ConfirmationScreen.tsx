// src/components/ConfirmationScreen.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const ConfirmationScreen: React.FC = () => {
  const navigate = useNavigate();
  const { width, height } = useWindowSize();
  const [runConfetti, setRunConfetti] = useState(true);
  const userState = useSelector((state: RootState) => state.user);

  useEffect(() => {
    console.log("User State:", userState);
  }, [userState]);

  useEffect(() => {
    const confettiTimer = setTimeout(() => {
      setRunConfetti(false);
    }, 10000);

    return () => clearTimeout(confettiTimer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold text-center text-gray-800 mb-4">
                Confirmation
              </h1>
              <p className="text-center text-xl">
                Your investment details have been submitted successfully!
              </p>
        
            </div>
            <div className="flex justify-center mt-8">
              <button
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                onClick={() => navigate("/")} 
              >
                Return to Home
              </button>
            </div>
          </div>
        </div>
      </div>
      {runConfetti && <Confetti width={width} height={height} />}
    </div>
  );
};

export default ConfirmationScreen;
