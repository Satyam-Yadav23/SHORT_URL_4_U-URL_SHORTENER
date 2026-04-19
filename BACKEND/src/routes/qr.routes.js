import express from "express";
import { generateQR } from "../controller/qr.controller.js";

const router = express.Router();

router.post("/", generateQR);

export default router;