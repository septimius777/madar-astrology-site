import { Router } from "express";
import { contactRateLimiter } from "../middleware/rateLimiter.js";
import { submitContactForm } from "../controllers/contact.controller.js";

const router = Router();

router.post("/", contactRateLimiter, submitContactForm);

export default router;
