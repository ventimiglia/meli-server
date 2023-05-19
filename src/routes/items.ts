import express from "express";
import { getItemById, getItemsBySearch } from "../controllers/items";

const router = express.Router();

router.get("/", getItemsBySearch);

router.get("/:id", getItemById);

export default router;
