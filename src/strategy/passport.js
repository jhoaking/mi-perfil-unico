import { GITHUB_CLIENT_SECRET, GITHUB_CLIENT_ID } from "../config.js";
import passport from "passport";
import { Strategy } from "passport-github2";
import { UserClass } from "../model/UserModel.js";


passport.serializeUser((user, done) => {
  done(null, user.github_id);
});

passport.deserializeUser(async (id, done) => {
  const user = await UserClass.buscarPorId(id);
  done(null, user);
});

passport.use(
  new Strategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: "/auth/redirect",
      scope: ["identify", "repo"],
    },
    async (accessToken, refresh_token, profile, done) => {
      try {
        const userExistente = await UserClass.controlUser(profile.id);
        if (userExistente) {
          return done(null, userExistente);
        }

        const guardar = await UserClass.guardarUser(
          profile.id,
          profile.username,
          profile.photos[0].value,
          profile.repo
        );

       


        done(null, guardar );
      } catch (error) {
        console.error(error);
        done(error, null);
      }
    }
  )
);
