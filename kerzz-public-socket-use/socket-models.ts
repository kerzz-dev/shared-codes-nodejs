export enum ClientTypes {
    kerzzWin = "kerzz-win",
    webClient = "web-client",
    webStaff = "web-staff",
    invoiceService = "invoice-service"
}
export class ClientInfo {
    id = ""
    alias = ""
    logined = false
    permission = ""
    info = new LoginInfo()
    loginTime: Date | undefined
}
export class LoginInfo {
    brandName = "" //company brand name
    branchCode = "" // compnany branch code
    localAddress = "" //local ip address
    terminalName = "" //terminal pc name
    licanceId = "" //kerzz licance id
    dbName = "" //kerzz database name
    isServer = true // is kerzz server
    clientType = ClientTypes.kerzzWin  //client type 
    version = ""  //client program version
    ipAddress = "" // client ip address
    secretKey = ""
}

export enum EventType {
    connection = "connection", //default - server
    connect = "connect", //default
    connect_error = "connect_error", //default
    connect_timeout = "connect_timeout", //default
    reconnect_attempt = "reconnect_attempt", //default
    reconnecting = "reconnecting", //default
    reconnect_error = "reconnect_error", //default
    reconnect_failed = "reconnect_failed", //default
    ping = "ping", //default
    pong = "pong", //default
    error = "error", //default
    message = "message", //default
    disconnect = "disconnect", //default
    wellcome = "wellcome",
    login = "login",
    action_message = "action-message",
    action_message_to_client = "action-message-to-client",
    clientList = "client-list"
}
export enum RequestTypes {
    get_table = "get-table",
    run_command = "run-command",
    save_folio = "save-folio",
    kill_process = "kill-process",
    get_proceses = "get-proceses",
    run_process = "run-process",
    download_file = "download-file",
    restart_services = "restart-services",
    print_folio = "print-folio",
    orwi_get_folio = "orwi-get-folio",
    ping_ip = "ping-ip",
    send_invoice_erp = "send-invoice-erp",
    sync_data = "sync-data",
    save_invoice = "save-invoice",
    class_data_action = "class-data-action"
}

export class ActionMessage {
    sender: string //gonderen
    reciver: string //alici
    licanceId: string //alici bilgisi yoksa lisans id dikkate alinir.
    useTransaction: boolean //hepsi ayni anda tamamlansin (sql-transaction)
    requests: Array<ActionRequest> //talepler
    constructor(sender: string, reciver: string, useTransaction: boolean) {
        this.sender = sender
        this.reciver = reciver
        this.licanceId = ""
        this.useTransaction = useTransaction
        this.requests = new Array<ActionRequest>()
    }
}
export class ActionRequest {
    requestType: RequestTypes //talep tipi
    name: string //talep adi 
    command: string//komut
    parameters: Array<ActionParameter> //parametreler
    response: RequestResponse
    constructor(requestType: RequestTypes, name: string, command: string) {
        this.requestType = requestType//talep tipi
        this.name = name //talep adi 
        this.command = command //komut
        this.parameters = new Array() //parametreler
        this.response = new RequestResponse()
    }
}
export class ActionParameter {
    name: string
    value: unknown
    constructor(name: string, value: unknown) {
        this.name = name
        this.value = value
    }

}
export class RequestResponse {
    statusCode: string
    message: string
    data: any
    error: string
    constructor() {
        this.statusCode = ""
        this.message = ""
        this.data = null
        this.error = ""
    }
}


export enum Errors {
    client_not_found = "client not found",
    sender_not_login = "sender_not_login"
}


export type DefaultParameterNames =
    "timeout" | //sql timeout value
    "connection-source" | //kerzz sql connection soruce "-master -erp -log" degerlerini alabilir.
    "run-current-user" |//run-process için (boolean) olarak gonderilir. gecerli kullanicida exe yi baslatmayı saglar.
    "file-name" | //download-file indirilen dosyaya verilecek ad veya yok
    "invoice-document" //send-invoice-erp : erpye aktarilacak belge



export class ProcessItem {
    name = ""
    id = 0
    title = ""
}
