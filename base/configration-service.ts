
import fs from "fs"
import logger from "./log-service"
export class GlobalConfigration {
    /* Mongo DB Connect URL Address Configration */
    mongoConnectUrl = ""
    /* Mailler Configs */
    smtpMailConfig = {
        host: "",
        port: 587,
        secure: false,
        auth: {
            user: '',
            pass: ''
        },
        senderName: 'Orwi Service',
        senderMail: 'action@orwi.app'
    }
    /* Use api server port number */
    apiPort = 0
    /* Server Service Version,relase date format:YY.M.D */
    serviceVersion = ""
    /* Server Service Host Address for fastify-swagger */
    serviceHost = ""
    /* Service Running Type */
    serviceRunningType: "production" | "test" = "test"
    /* Schedule Services is Active */
    scheduleActive = false
    /* JWT Token Sign Key */
    accessTokenKey = ""
    /* JWT Refresh Token Sign Key */
    refreshTokenKey = ""
}

export function saveSampleConfig() {
    let config = new GlobalConfigration()
    fs.writeFileSync("./sample-config.json", JSON.stringify(config))
}

export function readConfigsToJson(): GlobalConfigration {
    let config: GlobalConfigration

    let configJson = fs.readFileSync("./service-config.json", "utf-8")
    config = Object.assign(new GlobalConfigration, JSON.parse(configJson))
    // Change service info for debug
    if (config.serviceRunningType != "production") {
        config.serviceHost = "127.0.0.1"
        logger.warn("is Debug Server")
    }
    global.globalConfigrations = config
    return config
}

export function configrations(): GlobalConfigration {
    if (!global.globalConfigrations) {
        readConfigsToJson()
    }
    return global.globalConfigrations
}