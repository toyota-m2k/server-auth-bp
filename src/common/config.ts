/**
 * WEB-Service Boilerplate
 * Created on 2020.09.03 by @toyota-m2k
 * Copyright (c) 2020 @toyota-m2k. All rights reserved.
 */

 /**
 * 環境変数による設定切替
 * 
 * - NODE_ENV
 *      production: 本稼働用
 *      debug: デバッグ用
 * - PORT
 *      このサービスがlistenするポート番号
 * - ENABLE_CLUSTER 
 *      マルチプロセス化を有効にする場合はtrue
 * - MAX_CLUSTER
 *      最大プロセス数（デフォルト = CPU搭載数）
 */
import logManager from "../utils/logger";
class Config {
    public APP_NAME: string = "Great App Name"
    public DEBUG: boolean = process.env.NODE_ENV === "debug";
    public PRODUCTION: boolean = process.env.NODE_ENV === "production";
    public PORT: number = this.normalizePort(process.env.PORT || '3000');
    public ENABLE_CLUSTER: boolean = Config.toBoolean(process.env.ENABLE_CLUSTER);
    public MAX_CLUSTER = Number(process.env.MAX_CLUSTER || 0);
    
    // public ENABLE_REDIS_SESSION = true;
    // public REDIS_INDEX_SESSION = 1;
    // public REDIS_INDEX_ONLINE_USER = 2;

    private static toBoolean(t?: string) {
        return !t ? false : t.toLowerCase() === 'true';
    }

    private normalizePort(value: any): number {
        let port = parseInt(value, 10);

        if (isNaN(port)) {
            // named pipe
            return value;
        }

        if (port >= 0) {
            // port number
            return port;
        }
        return 3000;
    }

    constructor() {
        const logger = logManager.logger();
        if (process.env.NO_COLORS) {
            logManager.noColors();
        }
        logger.info(`>>>> ${this.APP_NAME} ... starting`);
        logger.info("---- Service Configuration ---------------------");
        logger.info(`NODE_ENV = ${process.env.NODE_ENV}`);
        logger.info(`DEBUG = ${this.DEBUG}`);
        logger.info(`PORT = ${this.PORT}`);
        logger.info(`ENABLE_CLUSTER = ${this.ENABLE_CLUSTER}`);
        logger.info(`MAX_CLUSTER = ${this.MAX_CLUSTER}`);
        logger.info(`TZ = ${process.env.TZ}`)
        logger.info("------------------------------------------------");
    }

    public actual:any = {}
}

const config = new Config();
export default config;
