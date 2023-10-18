import { Request, Response, NextFunction } from "express";
import WaitingList from "../models/waitingList.model";

export const addToWaitingList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, selectedInvestments } = req.body;
    const entry = new WaitingList({ email, selectedInvestments });

    await entry.save();
    res.status(200).send("Successfully added to the waiting list");
  } catch (err) {
    next(err);
  }
};
