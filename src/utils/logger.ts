/**
 * WEB-Service Boilerplate
 * Created on 2020.09.03 by @toyota-m2k
 * Copyright (c) 2020 @toyota-m2k. All rights reserved.
 */

 // 使い方
// #import logManager from "./utils/logger";
// const logger = logManager.enable(@"CategoryName");
// logger.error/warn/info/debug/stack("message");
//
// category はそれぞれで適当に決める。
// フィルタするときに category ごとにまとめて設定する。

import moment from "moment";

class LoggerConfig {
    no_colors: boolean = false;
    
}

export interface ILogger {
    error(msg:any) :void;
    warn(msg:any) : void;
    info(msg:any) : void;
    debug(msg:any) : void;
    stack(e: Error, msg?: any): void;
    chrono<T>(msg: string, fn: () => Promise<T>): Promise<T>;
}

class NullLogger implements ILogger {
    public error(msg:any) { }
    public warn(msg:any) { }
    public info(msg:any) { }
    public debug(msg:any) { }
    public stack(e: Error, msg?: any) { }
    public chrono<T>(msg: string, fn: () => Promise<T>): Promise<T> {
        return fn();
    }
}

class Logger implements ILogger {
    private name!: string;
    constructor(name: string) {
        this.name = name;
    }

    static COLOR_BLACK = "\x1b[30m";
    static COLOR_RED = "\x1b[31m";
    static COLOR_GREEN = "\x1b[32m";
    static COLOR_YELLOW = "\x1b[33m";
    static COLOR_BLUE = "\x1b[34m";
    static COLOR_MAGENTA = "\x1b[35m";
    static COLOR_CYAN = "\x1b[36m";
    static COLOR_WHITE = "\x1b[37m";
    static COLOR_DEFAULT = "\x1b[39m";

    static COLOR_MSG = Logger.COLOR_BLACK;
    static COLOR_ERR = Logger.COLOR_RED;

    private jstNow(): string {
        return moment().utcOffset(9).format("YYYY/MM/DD HH:mm:ss (ZZ)");
    }

    public error(msg:any) {
        console.error(`${this.jstNow()} [${Logger.COLOR_RED}ERROR${Logger.COLOR_DEFAULT}] ${this.name}(${process.pid})> ${msg}`);
    }
    public warn(msg:any) {
        console.warn(`${this.jstNow()} [${Logger.COLOR_YELLOW}WARN${Logger.COLOR_DEFAULT}] ${this.name}(${process.pid})> ${msg}`);
    }
    public info(msg:any) {
        console.info(`${this.jstNow()} [${Logger.COLOR_GREEN}INFO${Logger.COLOR_DEFAULT}] ${this.name}(${process.pid})> ${msg}`);
    }
    public debug(msg:any) {
        console.debug(`${this.jstNow()} [${Logger.COLOR_CYAN}DEBUG${Logger.COLOR_DEFAULT}] ${this.name}(${process.pid})> ${msg}`);
    }

    public stack(e: Error, msg?: any) {
        if (msg) {
            this.error(msg);
        }
        if (e.message) {
            this.error(e.message)
        }
        if (e.stack) {
            console.error(e.stack);
        }
        if (!e.message && !e.stack) {
            this.error(e);
        }
    }

    /**
     * 時間計測
     * @param msg メッセージ
     * @param fn  計測する関数
     */
    public async chrono<T>(msg: string, fn: () => Promise<T>): Promise<T> {
        this.info(`${msg} running ...`);
        const start = process.hrtime();
        try {
            const r = await fn();
            return r;
        } finally {
            const end = process.hrtime(start);
            this.info(`${msg} completed: ${end[1] / 1000000} ms`);
        }
    }
}

class LogManager {
    private nullLogger = new NullLogger();
    private defaultLogger = new Logger("");
    private loggerMap = new Map<string, ILogger>();

    public enable(name: string) : ILogger {
        if (!name||name == "default") {
            return this.defaultLogger;
        }
        let cur = this.loggerMap.get(name);
        if (!cur || cur instanceof NullLogger) {
            cur = new Logger(name);
            this.loggerMap.set(name, cur);
        }
        return cur;
    }

    public disable(name: string) {
        if (!name || name == "default") {
            return;
        }
        this.loggerMap.delete(name);
    }

    public logger(name?: string) : ILogger {
        if (!name || name == "default") {
            return this.defaultLogger;
        }
        return this.loggerMap.get(name) || this.nullLogger;
    }

    public noColors() {
        Logger.COLOR_BLACK = "";
        Logger.COLOR_RED = "";
        Logger.COLOR_GREEN = "";
        Logger.COLOR_YELLOW = "";
        Logger.COLOR_BLUE = "";
        Logger.COLOR_MAGENTA = "";
        Logger.COLOR_CYAN = "";
        Logger.COLOR_WHITE = "";
        Logger.COLOR_DEFAULT = "";
    }
}

const logManager = new LogManager;
export default logManager;
