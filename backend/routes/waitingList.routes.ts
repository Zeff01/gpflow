import express from "express";
import WaitingList from "../models/waitingList.model";

const router = express.Router();


router.post("/waiting-list", async (req, res) => {
  try {
    const { email, selectedInvestments } = req.body;

    if (!email || !selectedInvestments) {
      return res
        .status(400)
        .send("Email and selected investments are required");
    }

    const newItem = new WaitingList({
      email,
      selectedInvestments,
    });

    const savedItem = await newItem.save();

    res.status(201).json(savedItem);
  } catch (error) {
    console.error("An error occurred while adding to the waiting list", error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
