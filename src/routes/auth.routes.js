import { Router } from "express";
import passport from "passport";


export const authRoute = Router();

authRoute.get('/login',passport.Authenticator('github'));

authRoute.get('/redirect',passport.authenticate('github'), {
    successRedirect : '/dashboard',
    failureRedirect : '/auth/login'

})