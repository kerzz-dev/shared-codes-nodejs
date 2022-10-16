import sql from "mssql"
import * as configService from "./configration-service"

/**
 *Get Sql Data From Server 
 */
export async function getData(sqlCode: string) {
    try {
        let pool = await new sql.ConnectionPool(configService.configrations().sqlServerConf).connect()
        let sqlData = await pool.query(sqlCode)
        pool.close()
        return sqlData
    } catch (err) {
        console.error(err)
        throw err
    }
}
