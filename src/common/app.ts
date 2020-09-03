/**
 * WEB-Service Boilerplate
 * Created on 2020.09.03 by @toyota-m2k
 * Copyright (c) 2020 @toyota-m2k. All rights reserved.
 */

import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import sassMiddleware from "node-sass-middleware";

import logManager from "../utils/logger";
import { ZErrorCode } from "../utils/error";
import { router as indexRouter } from "../routes/index";
// import { router as usersRouter } from "./routes/index";
// import { router as testRouter } from "./routes/test";

const app = express();

// __dirname は、app.js （app.tsがコンパイルされたファイル）のあるディレクトリ、"./dist/common" を指している
app.set("views", path.join(__dirname, "../../views"));
app.set("view engine", "pug");

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(sassMiddleware({
    src: path.join(__dirname, '../../public'),
    dest: path.join(__dirname, '../../public'),
    indentedSyntax: true, // true = .sass and false = .scss
    sourceMap: true
  }));
  
app.use("/", indexRouter);
// app.use("/users", usersRouter);
// app.use("/test", testRouter)


// catch 404 and forward to error handler
app.use((req: Request, res: Response, next: NextFunction) => {
    next(createHttpError(404))
});

// error handler
app.use((err:any, req:Request, res:Response, next:NextFunction) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    const logger = logManager.enable("APP");
    logger.error(err.message);
    // render the error page
    res.status(err.status || 500);
    res.json({
        status: ZErrorCode.TurnAwayAtExpress,
        errorMessage: err.message
    });
});

export default app;
