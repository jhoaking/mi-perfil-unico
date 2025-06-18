import { Router } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";

export const authRoute = Router();

authRoute.get("/login", passport.authenticate("github"));

authRoute.get(
  "/redirect",
  passport.authenticate("github", {
    failureRedirect: "/auth/login",
  }),
  (req, res) => {
    const user = req.user;
    console.log("user", user);

    const payload = {
      github_id: user.github_id,
      username: user.username,
    };

    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: "1d",
    });

    

    console.log("token ", token);

    res.cookie("access_token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.redirect("/dashboard");
  }
);
