import { createLogger, format, transports } from 'winston'

const logger = createLogger({
    transports: [
        new transports.File({
            dirname: "logs",
            filename: "server.log",
        }),
    ],
    format: format.combine(
        format.timestamp(),
        format.printf(({ timestamp, level, message }) => {
            return `[${timestamp}] ${level}: ${message}`;
        })
    ),
});

export function infoLogger(info: string) {
    logger.info(info);
}

export function requestLogger(url: string, method: string, headers: string, body: string) {
    logger.info("URL:" + url + " |  METHOD:" + method + " |  Headers:" + headers + " |  BODY: " + body);
}

export function errorLogger(url: string, method: string, data: string) {
    logger.error("URL: " + url + " |  METHOD: " + method + " | Error: " + data);
}

export function catchErrorLogger(url: string, method: string, error: string) {
    logger.error("URL: " + url + " |  METHOD: " + method + " | Error: " + error);
}