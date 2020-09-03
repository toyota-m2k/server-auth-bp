/**
 * WEB-Service Boilerplate
 * Created on 2020.09.03 by @toyota-m2k
 * Copyright (c) 2020 @toyota-m2k. All rights reserved.
 */
import { NextFunction, Request, Response } from "express";
import { Router } from "express";
import config from "../common/config"
export const router = Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.render("index", { title: `${config.APP_NAME}.`});
})

  