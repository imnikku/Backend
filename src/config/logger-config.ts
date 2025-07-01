import { Injectable } from "@nestjs/common";
import * as winston from 'winston';
import * as path from 'path';
import 'winston-daily-rotate-file';
import { UniqueKeyGeneration } from "src/shared/utilities/db-key-modifier";
import { requestContextStore } from "src/shared/request/request-middleware";
import { AppConfigs } from "./app-config";

const customLevels = {
    levels: {
        error: 0,
        warn: 1,
        info: 2,
        debug: 3,
        http: 4,
        verbose: 5,
        input: 6,
        silly: 7,
        data: 8,
        help: 9,
        prompt: 10,
        emerg: 11,
        alert: 12,
        crit: 13,
        notice: 14,
    },
    colors: {
        error: 'red',
        warn: 'yellow',
        info: 'green',
        debug: 'blue',
        http: 'magenta',
        verbose: 'cyan',
        input: 'grey',
        silly: 'magenta',
        data: 'white',
        help: 'cyan',
        prompt: 'grey',
        emerg: 'red',
        alert: 'yellow',
        crit: 'red',
        notice: 'blue',
    },
};


@Injectable()
export class WinstonLogger {
    private readonly logger: winston.Logger;
    constructor(name:string) {
        const logDir = path.join(process.cwd(), 'logs');

        this.logger = winston.createLogger({
            // level: 'notice', // Set log level according to usage
            levels: customLevels.levels,
            format: winston.format.combine(
                winston.format.ms(),

                winston.format.timestamp(),
                winston.format.colorize({ all: true, colors: customLevels.colors }),

                winston.format.printf(({ timestamp, level, message }) => {
                    return `${timestamp} [${requestContextStore.getStore()?.get(AppConfigs.request_id)}]:[${name}]:[${level}]: ${message}`;
                }),

            ),

            // log only in one file ....
            // transports: [
            //     new winston.transports.File({
            //       filename: 'application.log',
            //       dirname: logDir,
            //       format: winston.format.uncolorize(),

            //     }),
            //   ],

            // log datewise file ....

            transports: [
                new winston.transports.DailyRotateFile({
                    // level: customLevels.levels,
                    filename: 'rotate-%DATE%.log',
                    dirname: logDir,
                    format: winston.format.uncolorize(),
                    zippedArchive: true,
                    datePattern: 'YYYY-MM-DD',
                    maxFiles: '20d',
                    maxSize: '30m',
                })

            ]

        })

        this.logger.add(new winston.transports.Console())

    }

    error(message: string) {
        this.logger.error(message)
        
    }

    info(message: string) {
        this.logger.info(message)
    }

    notice(message: string) {
        this.logger.notice(message)
    }

    log(level:string,message: string) {
        this.logger.log(level,message)
    }

}