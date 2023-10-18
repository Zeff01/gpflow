import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateInvestmentGoal } from "../store/userSlice";
import { useSelector } from "react-redux";
import { RootState } from "../store";

type Investment = {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
};

const addToWaitingList = async (data: {
  email: string;
  selectedInvestments: { id: number; name: string }[];
}) => {
  try {
    const response = await axios.post(
      "http://localhost:3001/api/waiting-list",
      data
    );
    console.log(response.data);
  } catch (error) {
    console.error("An error occurred while adding to the waiting list", error);
  }
};

const InvestmentDetailsScreen: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedInvestments, setSelectedInvestments] = useState<number[]>([]);
  const [investmentOpportunities, setInvestmentOpportunities] = useState<
    Investment[]
  >([]);

  const userState = useSelector((state: RootState) => state.user);

  const handleInvestmentSelect = (id: number) => {
    setSelectedInvestments((prevSelected) => [...prevSelected, id]);
  };

  useEffect(() => {
    const fetchInvestments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/investments"
        );
        setInvestmentOpportunities(response.data);
      } catch (error) {
        console.error("An error occurred while fetching the data:", error);
      }
    };

    fetchInvestments();
  }, []);

  const handleProceed = async () => {
    const investmentGoal = selectedInvestments.join(", ");
    dispatch(updateInvestmentGoal(investmentGoal));

    const validInvestments = selectedInvestments
      .map((id) => investmentOpportunities.find((inv) => inv.id === id))
      .filter((inv): inv is Investment => inv !== undefined);

    const dataToSend = {
      email: userState.email,
      selectedInvestments: validInvestments.map((investment) => ({
        id: investment.id,
        name: investment.name,
      })),
    };

    try {
      await addToWaitingList(dataToSend);
      navigate("/experience-level");
    } catch (error) {
      console.error(
        "An error occurred while adding to the waiting list",
        error
      );
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6">
        Select Your Investment Opportunities
      </h1>
      <div className="flex flex-wrap justify-around gap-6">
        {investmentOpportunities.map((investment) => (
          <div
            key={investment.id}
            className="max-w-sm rounded overflow-hidden shadow-lg"
          >
            <img
              className="w-full h-[400px]"
              src={investment.imageUrl}
              alt={investment.name}
            />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{investment.name}</div>
              <p className="text-gray-700 text-base">
                {investment.description}
              </p>
            </div>
            <div className="px-6 pt-4 pb-2 flex justify-center">
              <button
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
                  selectedInvestments.includes(investment.id)
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                onClick={() => handleInvestmentSelect(investment.id)}
                disabled={selectedInvestments.includes(investment.id)}
              >
                Add to Waiting List
              </button>
            </div>
          </div>
        ))}
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-6"
        onClick={handleProceed}
        disabled={selectedInvestments.length === 0}
      >
        Proceed with Selected Investments
      </button>
    </div>
  );
};

export default InvestmentDetailsScreen;
