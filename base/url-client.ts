import nodeFetch from "node-fetch"
import logger from "./log-service"

export async function post(url: string, body: any, headers: any) {
    return await baseAction("POST", url, body, headers)

}

export async function get(url: string, headers: any) {
    return await baseAction("GET", url, undefined, headers)
}

export async function postFromUrlencoded(url: string, body: any, headers: any) {
    let formBody = new URLSearchParams()
    for (let property in body) {
        formBody.append(property, body[property])
    }
    if (headers) {
        headers["Content-Type"] = "application/x-www-form-urlencoded"
    } else {
        headers = {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }
    return await baseAction("POST", url, formBody, headers)
}

export async function baseAction(method: string, url: string, body: any | undefined, headers: { [key: string]: string }) {
   
    //content-type control
    if (headers) {
        if (!headers["Content-Type"]) {
            headers["Content-Type"] = "application/json"
        }
    } else {
        headers = {
            "Content-Type": "application/json"
        }
    }

    let opts = {
        method: method,
        body: body,
        headers: headers
    }
    let result = await nodeFetch(url, opts)
    let textData = ""
    try {
        textData = await result.text()
        let jSonData = JSON.parse(textData)
        return jSonData
    } catch (error: any) {
        logger.error("url:" + url)
        logger.error("data:" + body)
        logger.error(error)
        throw textData
    }
}
