import { Router } from "express";

export const routerDashboard = Router();

routerDashboard.get("/", (req, res) => {
  res.send("dashboard");
});
