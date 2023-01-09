
declare global {
    /** Main Mongo Client Connection */
    var mongoDbCon: any

    /** Global Configs */
    var globalConfigrations: any

    /** Service Api Key List */
    var apiKeys: Array<any>

    /** Custom Error Codes List With All Languages */
    var customErrorList: Array<{ id: string, langCode: string, text: string }>

}

export { }