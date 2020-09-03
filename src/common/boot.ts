#!/usr/bin/env node

/**
 * WEB-Service Boilerplate
 * Created on 2020.09.03 by @toyota-m2k
 * Copyright (c) 2020 @toyota-m2k. All rights reserved.
 */
import config from "./config";
import logManager from "../utils/logger";
import cluster from "cluster"
import master from "./master"
import slave from "./slave"

// const mmjCache = require('../server/mmj/mmjGroupTree');
const logger = logManager.enable('BOOT');

const boot = function () {
    if (cluster.isMaster) {
        if (config.ENABLE_CLUSTER) {
            logger.info("starting master process");
            master(cluster, config.MAX_CLUSTER);
        } else {
            config.actual.clusters = 1;
            logger.info("starting as single-process mode");
            slave("MASTER");
        }
    } else {
        logger.info("starting slave process");
        slave("SLAVE");
    }
}

boot();
