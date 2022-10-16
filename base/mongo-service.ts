
import { Db, MongoClient } from "mongodb"
import * as configService from "./configration-service"
import logger from './log-service'

export async function connectMongoDb() {
    //* Create MongoDB Connection = global.dbCon
    if (global.mongoDbCon == undefined) {
        let mongoConnector = await (await MongoClient.connect(configService.configrations().mongoConnectUrl))
        global.mongoDbCon = mongoConnector
        logger.info('Start Mongo DB Connection: OK')
    }
}


export function db(dbName: string): Db {
    return global.mongoDbCon.db(dbName)
}


