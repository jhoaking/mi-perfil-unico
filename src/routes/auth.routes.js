import { Router } from "express";
import passport from "passport";

export const authRoute = Router();

authRoute.get("/login", passport.authenticate("github"));

authRoute.get(
  "/redirect",
  passport.authenticate("github", {
    failureRedirect: "/auth/login",
  }),
  (req, res) => {
    const user = req.user;
    const token = user.token;

    res.cookie("access_token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.redirect("/dashboard");
  }
);
