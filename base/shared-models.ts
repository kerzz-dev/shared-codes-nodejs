import * as util from "./util"
export class SuccessResult {
    statusCode: string
    message: string
    constructor(message: string) {
        this.statusCode = "200"
        this.message = message
    }
}
export class ErrorResult {
    statusCode: string
    message: string
    error: string
    constructor(message: string, error: string) {
        this.statusCode = "500"
        this.message = message
        this.error = error
    }
}
export class ApiKey {
    apiKey = ""
    dbName = ""
    accessTokenKey = ""
    description = ""
    appName = ""
    isStoreKey = false
    storeId = ""
}

/**
 * success schema 
 */
export function getSuccessSchema() {
    return util.convertJsonSchema(
        new SuccessResult("success"),
        "SuccessSchema",
        "Success Schema")
}
/**
 * error schema
 */
export function getErrorSchema() {
    return util.convertJsonSchema(
        new ErrorResult("ERR", "ERR"),
        "ErrorSchema",
        "Error Schema")
}

export enum CustomErrors {
    service_authentication_apikey_error = "service_authentication_apikey_error",
    token_verify_error = "token_verify_error",
    store_not_found = "store_not_found",
    token_invalid = "token_invalid",
    user_not_found = "user_not_found",
    user_not_registered = "user_not_registered",
    user_gsm_already_used = "user_gsm_already_used",
    user_invalid = "user_invalid",

    building_not_found = "building_not_found",
    user_mail_already_used = "user_mail_already_used",
    not_allowed_store_api_keys = "not_allowed_store_api_keys",
    invalid_data_fromat = "invalid_data_format",
    store_not_active = "store_not_active",
    in_use_cannot_delete = "in_use_cannot_delete",
    user_already_linkend_to_store = "user_already_linkend_to_store",
    store_in_use = "store_in_use"
    //yeni eklediklerimiz
    //folioId_cannot_empty = "folioId_cannot_empty",
    //folioType_cannot_empty = "folioType_cannot_empty"
}