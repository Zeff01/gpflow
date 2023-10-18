import mongoose, { Schema, Document } from "mongoose";

export interface IWaitingList extends Document {
  email: string;
  selectedInvestments: Array<{ id: number; name: string }>;
}

const waitingListSchema = new mongoose.Schema({
  email: { type: String, required: true },
  selectedInvestments: [{ id: Number, name: String }],
});

const WaitingList = mongoose.model("WaitingList", waitingListSchema);

export default WaitingList;
