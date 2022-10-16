
declare module NodeJS {
    interface Global {
        /** Main Mongo Client Connection */
        mongoDbCon: any

        /** Global Configs */
        globalConfigrations: any

        /** Service Api Key List */
        apiKeys: Array<any>

        /** Custom Error Codes List With All Languages */
        customErrorList: Array<{ id: string, langCode: string, text: string }>

    }
}