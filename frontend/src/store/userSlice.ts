import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  incomeRange: string;
  investmentGoal: string;
  experienceLevel: string;
  email: string;
}

const initialState: UserState = {
  incomeRange: "",
  investmentGoal: "",
  experienceLevel: "",
  email: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateIncomeRange: (state, action: PayloadAction<string>) => {
      state.incomeRange = action.payload;
    },
    updateInvestmentGoal: (state, action: PayloadAction<string>) => {
      state.investmentGoal = action.payload;
    },
    updateExperienceLevel: (state, action: PayloadAction<string>) => {
      state.experienceLevel = action.payload;
    },
    updateUserEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
  },
});

export const {
  updateIncomeRange,
  updateInvestmentGoal,
  updateExperienceLevel,
  updateUserEmail,
} = userSlice.actions;

export default userSlice.reducer;
