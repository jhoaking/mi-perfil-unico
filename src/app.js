import express from "express";
import session from "express-session";
import passport from "passport";
import "./strategy/passport.js";
import cookieParser from "cookie-parser";
import { authRoute } from "./routes/auth.routes.js";
import { routerDashboard } from "./routes/dashboard.routes.js";
import connectPg from "connect-pg-simple";
import { connect } from "./db.js";

export const app = express();

const pgSession = connectPg(session);
app.use(cookieParser());

app.use(
  session({
    store: new pgSession({
      pool: connect,
      tableName: "session",
    }),
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
app.use("/dashboard", routerDashboard);
