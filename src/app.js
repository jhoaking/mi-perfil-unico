import express from "express";
import session from "express-session";
import passport from "passport";
import "./strategy/passport.js";
import { authRoute } from "./routes/auth.routes.js";
// import connectPg from 'connect-pg-simple';
// import { connect } from './db.js';

export const app = express();

app.use(
  session({
    secret: "some secret", // variable de entorno xd pra otros
    saveUninitialized: false,
    resave: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  app.locals.user = req.user;
  next();
});

app.use("/auth", authRoute);
