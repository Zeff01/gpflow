
import React from "react";
import { useDispatch } from "react-redux";
import { updateExperienceLevel } from "../store/userSlice"; 
import { useNavigate } from "react-router-dom";

const ExperienceLevelScreen: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleExperienceSelect = (level: string) => {
    dispatch(updateExperienceLevel(level));
    navigate("/confirmation");
  };

  const experienceLevels = ["Beginner", "Intermediate", "Expert"];

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
                What's your investment experience level?
              </h2>
            </div>
            <div className="space-y-4">
              {experienceLevels.map((level, index) => (
                <button
                  key={index}
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                  onClick={() => handleExperienceSelect(level)}
                >
                  {level}
                </button>
              ))}
            </div>
            <div className="flex justify-start mt-8">
              <button
                className="rounded-lg font-medium border-transparent text-indigo-600 hover:text-indigo-700"
                onClick={() => navigate(-1)} 
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceLevelScreen;
