
import { Console } from "console"
import moment from "moment"
import util from "util"

class Logger extends Console {
    constructor(stdout: any, stderr: any, ...otherArgs: any[]) {
        super(stdout, stderr, ...otherArgs);
    }
    error(...args: any[]) {
        super.error(colours.fg.crimson, "ERROR ", moment().format('D-M-YY HH:mm:ss.SSS'), colours.fg.cyan + '-', util.format(...args));
    }

    trace(...args: any[]) {
        super.trace(colours.fg.cyan, "TRACE  " + moment().format('D-M-YY HH:mm:ss.SSS'), colours.fg.cyan + '-', util.format(...args))
    }
    warn(...args: any[]) {
        super.warn(colours.fg.yellow, "WARN  ", moment().format('D-M-YY HH:mm:ss.SSS'), colours.fg.cyan + '-', util.format(...args))
    }

    info(...args: any[]) {
        super.info(colours.fg.green, "INFO  ", moment().format('D-M-YY HH:mm:ss.SSS'), colours.fg.cyan + '-', util.format(...args))
    }
    debug(...args: any[]) {
        super.debug(colours.fg.blue, "DEBUG ", moment().format('D-M-YY HH:mm:ss.SSS'), colours.fg.cyan + '-', util.format(...args))
    }

}

const logger = new Logger(process.stdout, process.stderr);

const colours = {
    reset: "\x1b[0m",
    bright: "\x1b[1m",
    dim: "\x1b[2m",
    underscore: "\x1b[4m",
    blink: "\x1b[5m",
    reverse: "\x1b[7m",
    hidden: "\x1b[8m",

    fg: {
        black: "\x1b[30m",
        red: "\x1b[31m",
        green: "\x1b[32m",
        yellow: "\x1b[33m",
        blue: "\x1b[34m",
        magenta: "\x1b[35m",
        cyan: "\x1b[36m",
        white: "\x1b[37m",
        crimson: "\x1b[38m" // Scarlet
    },
    bg: {
        black: "\x1b[40m",
        red: "\x1b[41m",
        green: "\x1b[42m",
        yellow: "\x1b[43m",
        blue: "\x1b[44m",
        magenta: "\x1b[45m",
        cyan: "\x1b[46m",
        white: "\x1b[47m",
        crimson: "\x1b[48m"
    }
};



export default logger


