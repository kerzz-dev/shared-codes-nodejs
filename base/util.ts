import nodeUtil from "util"
import fetch from "node-fetch"
import logger from "./log-service"
import moment from "moment"
import toJsonSchema from "to-json-schema"
import * as configService from "./configration-service"
/**
 * Round Currency Number
 * @param amount Round to Number Data
 * @example
 * //return 15.55
 * roundNumber(15.54889)
 */
export function roundNumber(amount: number) {
    return Math.round((amount + Number.EPSILON) * 100) / 100
}

/**
 * Byte Data To Hex Data
 * @param bytes Byte Data
 */
export function bytesToHex(bytes: any) {
    return Array.from(bytes, (byte: any) => byte.toString(16).padStart(2, "0")).join("").toUpperCase();
}


/**
 * String Data To Hex Data
 * @param str String Data
 */
export function stringToHex(str: string) {
    let data = new nodeUtil.TextEncoder().encode(str);
    return bytesToHex(data)
}

/**
 * Hex Data To Byte Data
 * @param hexStr Hex String Data
 */
export function hexToBytes(hexStr: string) {
    for (var bytes = [], c = 0; c < hexStr.length; c += 2)
        bytes.push(parseInt(hexStr.substr(c, 2), 16));
    return bytes;
}

/**
 * Get Time Zone For TLV(master-pass)
 * @example
 * //return "03"
 */
export function getTimezone() {

    let timeZone = "";
    let timeZoneSpan = ((new Date().getTimezoneOffset() / 60) * -1);
    if (timeZoneSpan > 0) {
        timeZone = "0";
        timeZone += timeZoneSpan
    }
    else if (timeZoneSpan == 0) {
        timeZone = "00";
    }
    else {
        timeZone += "8";
        timeZone += timeZoneSpan
    }
    return timeZone
}

/**
 * Dirty Gsm Number to Clean
 * @param gsm Dirty Gsm Number
 * @returns Cleaned Gsm Number
 * @example
 * //return 905322976542
 * cleanGsm("+90(532) 297-65 42")
 */
export function cleanGsm(gsm: string): string {
    return gsm
        .replace("+", "")
        .replace("(", "")
        .replace("(", "")
        .replace("-", "")
        .replace(" ", "")
        .trim()
}

/**
 * Convert Object Class to jsonSchema
 * @param classData Object Class
 * @param id jsonSchema Name
 * @param description  jsonSchema Description(info)
 * @returns jsonSchema Object
 */
export function convertJsonSchema(classData: unknown, id: string, title: string) {
    let schema = toJsonSchema(classData)
    schema.$id = id
    //schema.description = description
    schema.title = title

    let schemaString = JSON.stringify(schema) //swagger changes
        .replace(/{"type":"date"}/g, '{"type":"string","format":"date-time"}')
        .replace(/{"type":"integer"}/g, '{"type":"number"}')
        .replace(/,"format":"utc-millisec"/g, "")
        .replace(/,"format":"color"/g, "")
    return JSON.parse(schemaString)
}

export async function getKerzzClientSqlData(kerzzId: string, sqlCode: string) {
    let options = {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "apiKey": configService.configrations().kerzzPublicApiKey
        },
        body: JSON.stringify({
            licanceId: kerzzId,
            sqlCode: sqlCode
        })
    }
    let result = await fetch("https://public.kerzz.com:50502/api/client/getData", options)
    let jsonResult: any = await result.json()

    if (jsonResult.message) {
        logger.debug("Kerzz Public Server Result (" + kerzzId + "):" + JSON.stringify(jsonResult.message))
    }
    if (jsonResult.error) {
        logger.error(JSON.stringify(jsonResult))
        throw jsonResult.message
    } else {

        return jsonResult
    }
}


export function maskName(fullName: string) {
    let names = fullName.split(" ")
    let name = names[0] + (names.length > 1 ? " " + names[1].substring(0, 1) + "." : "")
    return name
}

export function notTurkishCharacter(value: string): string {
    let replacedVal = value
        .replace(/ı/g, "i")
        .replace(/İ/g, "I")
        .replace(/ü/g, "u")
        .replace(/Ü/g, "U")
        .replace(/ş/g, "s")
        .replace(/Ş/g, "S")
        .replace(/ö/g, "o")
        .replace(/Ö/g, "O")
        .replace(/ğ/g, "g")
        .replace(/Ğ/g, "G")
        .replace(/ç/g, "c")
        .replace(/Ç/g, "C")
    return replacedVal
}



export async function kerzzPublicFetch(path: string, body: unknown, kerzzId: string) {
    let options = {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "apiKey": configService.configrations().kerzzPublicApiKey
        },
        body: JSON.stringify(body)
    }
    let result = await fetch("https://public.kerzz.com:50502" + path, options)
    let jsonResult: any = await result.json()

    logger.debug("Kerzz Public Server Result (" + kerzzId + "):" + JSON.stringify(jsonResult.message))
    if (jsonResult.error) {
        logger.error(JSON.stringify(jsonResult))
        throw jsonResult.message
    } else {
        return jsonResult.data
    }

}

export function timeDiff(startTime: Date) {
    return moment().diff(moment(startTime), "millisecond").toString()
}


export async function contractServiceFetch(path: string, body: unknown): Promise<any | undefined> {
    try {
        let options = {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "apiKey": configService.configrations().contractServiceApiKey
            },
            body: JSON.stringify(body)
        }
        let result = await fetch("https://contract-service.kerzz.com:4300" + path, options)
        let jsonResult: any = await result.json()
        if (jsonResult.error) {
            //Server HTTP Errors
            console.error(JSON.stringify(jsonResult))
            return undefined
        } else {
            return jsonResult
        }
    } catch (err: any) {
        //Internet Connection & Component Errors
        console.error(err)
        return undefined
    }
}

export function sleep(ms: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

const isoDatePattern = new RegExp(/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/)
export function changeDateISOFormat(objectData: any) {
    // Convert back, use reviver function:
    let newJson = JSON.stringify(objectData)
    return JSON.parse(newJson, (_key, value) => {
        if (typeof value === 'string' && value.match(isoDatePattern)) {
            return new Date(value); // isostring, so cast to js date
        }
        return value; // leave any other value as-is
    });
    //console.log(deneme)
}



export function getCurrencySymbol(currencyCode: string,) {
    let curSymbol = ""
    switch (currencyCode) {
        case "tl":
            curSymbol = "₺"
            break
        case "usd":
            curSymbol = "$"
            break
        case "EUR":
            curSymbol = "€"
            break
    }
    return curSymbol

}

export function getCurrencyFormat(currency: string, amount: number) {
    currency = currency.toUpperCase()
    if (currency == "TL") {
        currency = "TRY"
    }
    return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: currency }).format(amount)
}


export function setDateFormatDMY(value: string) {
    moment.locale("tr")
    return moment(value).format("DD.MM.YYYY");
}

