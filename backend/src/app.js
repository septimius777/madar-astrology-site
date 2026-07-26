import express from "express";
import cors from "cors";
import { env } from "./config/env.js";
import contactRouter from "./routes/contact.routes.js";
import healthRouter from "./routes/health.routes.js";
import { notFoundHandler, errorHandler } from "./middleware/errorHandler.js";

/**
 * Builds and configures the Express app, without starting it. Kept separate
 * from server.js so the app can be imported by tests later without binding
 * a real port, and so new route groups are just one more `app.use(...)`
 * line here as the backend grows.
 */
export function createApp() {
  const app = express();

  app.use(cors({ origin: env.frontendOrigin }));
  app.use(express.json({ limit: "10kb" }));

  app.get("/health", (req, res) => {
    res.json({ ok: true });
  });
  app.use("/health", healthRouter);

  app.use("/api/contact", contactRouter);
  // Future route groups go here, e.g.:
  // app.use("/api/newsletter", newsletterRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
