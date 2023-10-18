import HomeScreen from "../components/HomeScreen";
import IncomeRangeScreen from "../components/IncomeRangeScreen";
import InvestmentDetailsScreen from "../components/InvestmentDetailsScreen"; // import the new screen
import ConfirmationScreen from "../components/ConfirmationScreen"; // import the new screen
import ExperienceLevelScreen from "../components/ExperienceLevelScreen";
import { Route } from "react-router-dom";

const routes = (
  <>
    <Route path="/" element={<HomeScreen />} />
    <Route path="/income-range" element={<IncomeRangeScreen />} />
    <Route path="/investment-details" element={<InvestmentDetailsScreen />} />
    <Route path="/experience-level" element={<ExperienceLevelScreen />} />
    <Route path="/confirmation" element={<ConfirmationScreen />} />
  </>
);

export default routes;
