/**
 * WEB-Service Boilerplate
 * Created on 2020.09.03 by @toyota-m2k
 * Copyright (c) 2020 @toyota-m2k. All rights reserved.
 */
import { NextFunction, Request, Response } from "express";
import { Router } from "express";
import config from "../common/config"
import userStore from "../impl/userStore"
import { IUser } from "../common/defs"

export const router = Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  const user = req.user as IUser
  const id = user?.id
  if(id==null) {
    return res.redirect("/login")
  }
  res.render("index", { title: `${config.APP_NAME}.`, user: `${user.displayName}`});
})

router.get("/login", (req: Request, res: Response, next: NextFunction) => {
  res.render("login", { title: `${config.APP_NAME}.`});
})

router.get("/logout", (req: Request, res: Response, next: NextFunction) => {
  const id = (req.user as IUser)?.id
  if(id) {
    userStore.unregister(id)
  }
  req.logout()
  res.render("logout", { title: `${config.APP_NAME}.`});
})
  