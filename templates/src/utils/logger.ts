import { createLogger, format, transports, Logform } from 'winston'; // Import Logform for better typing
import path from 'path';
import { fileURLToPath } from 'url';
import util from 'util';
import { red, yellow, green, blue, magenta } from 'colorette';
import config from '@config/index'; // Ensure this path is correct for your config file
import  {APP_ENV} from '@config/constants'; // Ensure this path is correct
import * as SourceMapSupport from "source-map-support"

// Linking trace support 
SourceMapSupport.install()

/**
 * Colorizes the log level for console output.
 * @param {string} level - The log level (e.g., 'error', 'info').
 * @returns {string} The colorized level string.
 */
const colorizeLevel = (level: string): string => {
    switch (level.toUpperCase()) {
        case 'ERROR':
            return red(level.toUpperCase());
        case 'INFO':
            return blue(level.toUpperCase());
        case 'WARN':
            return yellow(level.toUpperCase());
        case 'DEBUG':
            return green(level.toUpperCase());
        default:
            return level.toUpperCase();
    }
};

/**
 * Custom format for console transport.
 * @param {Logform.TransformableInfo} info - Log information object from Winston.
 * @returns {string} Formatted log string for console.
 */
const consoleLogFormat = format.printf((info: Logform.TransformableInfo): string => {
    // Explicitly cast timestamp and meta to their expected types
    const { level, message, timestamp, meta = {} } = info;

    const customLevel = colorizeLevel(level);
    const customTimestamp = green(timestamp as string); // Cast timestamp to string
    const customMessage = message;

    // Ensure meta is treated as a record for Object.keys
    const metaObject = meta as Record<string, unknown>;
    const customMeta = Object.keys(metaObject).length > 0
        ? `\n${magenta('META')} ${util.inspect(metaObject, { showHidden: false, depth: null, colors: true })}`
        : '';

    const customLog = `${customLevel} [${customTimestamp}] ${customMessage}${customMeta}\n`;

    return customLog;
});

/**
 * Configures console transport based on environment.
 * @returns {Array<transports.ConsoleTransportInstance>} Array of console transports.
 */
function consoleTransport(): transports.ConsoleTransportInstance[] {
    if (config.env === APP_ENV.DEVELOPMENT) {
        return [
            new transports.Console({
                level: 'debug',
                format: format.combine(format.timestamp(), consoleLogFormat)
            })
        ];
    }
    return [];
}

/**
 * Custom format for file transport (JSON output).
 * @param {Logform.TransformableInfo} info - Log information object from Winston.
 * @returns {string} JSON string of log data.
 */
const fileLogFormat = format.printf((info: Logform.TransformableInfo): string => {
    // Explicitly cast timestamp and meta to their expected types
    const { level, message, timestamp, meta = {} } = info;

    // Ensure meta is treated as a record for Object.entries
    const metaObject = meta as Record<string, unknown>;

    // Handle Error objects in meta for better logging
    const logMeta = Object.entries(metaObject).reduce((acc: Record<string, unknown>, [key, value]: [string, unknown]) => {
        if (value instanceof Error) {
            acc[key] = {
                name: value.name,
                message: value.message,
                stack: value.stack || 'No stack trace available'
            };
        } else if (typeof value === 'object' && value !== null) {
            acc[key] = JSON.stringify(value);
        } else {
            acc[key] = value;
        }
        return acc;
    }, {} as Record<string, unknown>); // Initialize acc with explicit type

    const logData = {
        level: level.toUpperCase(),
        message,
        timestamp: timestamp as string, // Cast timestamp to string
        meta: logMeta
    };

    return JSON.stringify(logData);
});

/**
 * Configures file transport.
 * @returns {Array<transports.FileTransportInstance>} Array of file transports.
 */
function fileTransport(): transports.FileTransportInstance[] {
    const logDirectory = path.join(__dirname, '..', '..', 'logs');

    return [
        new transports.File({
            filename: path.join(logDirectory, `${config.env}.log`),
            level: 'info',
            format: format.combine(format.timestamp(), fileLogFormat),
            maxsize: 5242880,
            maxFiles: 5,
            tailable: true
        })
    ];
}

// Create the logger instance
export default createLogger({
    defaultMeta: {
        service: APP_ENV.APP_NAME
    },
    transports: [...fileTransport(), ...consoleTransport()],
    exitOnError: false,
});
