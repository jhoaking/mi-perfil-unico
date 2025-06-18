import { Router } from "express";
import { isAutorized } from "../middlewares/jwtMiddleware.js";
export const routerDashboard = Router();

routerDashboard.get("/", isAutorized, (req, res) => {
  res.json({
    message: "Bienvenido a tu dashboard",
    user: req.user, 
  });
});
