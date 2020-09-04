/**
 * WEB-Service Boilerplate
 * Created on 2020.09.03 by @toyota-m2k
 * Copyright (c) 2020 @toyota-m2k. All rights reserved.
 */
import { NextFunction, Request, Response } from "express";
import { Router } from "express";
import config from "../common/config"
import passport from "passport";
import { OAuth2Strategy as GoogleOAuth2Strategy } from "passport-google-oauth";
import privates from "../utils/privates"
import logManager from "../utils/logger"

let logger = logManager.enable("auth")
let clientSecrets = require(privates.get("client-secret.json"))

passport.use(new GoogleOAuth2Strategy({
    clientID: clientSecrets.web.client_id,
    clientSecret: clientSecrets.web.client_secret,
    callbackURL: clientSecrets.web.redirect_uris[0],
    accessType: 'offline'
}, (accessToken,refreshToken,profile,done)=>{
    if (profile) {
        return done(null, profile);
    }
    else {
        return done(null, false);
    }
}));

export const router = Router();

// Google OAuth2

// 認証、コールバック共通のStrategy
// 公式ドキュメントやサンプルなどでは、だいたい、router.get/post のハンドラに、passport.authenticate() を直書きしているが、
// そうすると、get '/google' と '/google/callback'とで、別のpassportインスタンスが生成されてしまう。
// 当初、session:false を '/google' のoptionsにだけ設定していて、それがcallbackでは無視されるように振る舞うので、バグかと思った。
// 結局、/google/callback側のoptionsに、session:false を書くと期待通り動作することがわかったが、これらを別のインスタンスにする
// 必要はないので、共通のインスタンスを作っておくことにする。
let googleStrategy = passport.authenticate('google', { 
    scope: ['email', 'profile'], 
    successRedirect:'/', 
    failureRedirect:'/login',
    session: config.ENABLE_SESSION, })

router.get("/google", googleStrategy)
router.get('/google/callback', googleStrategy);

  