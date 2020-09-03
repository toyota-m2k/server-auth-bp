/**
 * WEB-Service Boilerplate
 * Created on 2020.09.03 by @toyota-m2k
 * Copyright (c) 2020 @toyota-m2k. All rights reserved.
 */
import logManager from "../utils/logger"
import config from "./config"

const cpuCount = require('os').cpus().length;

const master = function (cluster:any, maxCluster:number) {
    const logger = logManager.enable(`MASTER`);
    const nc = maxCluster ? Math.min(cpuCount, maxCluster) : cpuCount;
    config.actual.clusters = nc;

    for (let i = 0; i < nc; i++) {
        cluster.fork();
    }
    cluster.on('death', (worker:any) => {
        logger.warn(`worker (pid=${worker.pid}) died. restarting ...`);
        cluster.fork();
    });
    logger.info(`${nc} clusters forked.`);
};

export default master;
