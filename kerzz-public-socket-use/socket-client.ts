
import socketIOClient from 'socket.io-client'
import * as socketModels from "./socket-models"
//import * as util from "./util"
import logger from '../base/log-service'

 
export async function sendActionToClient(actionReq: socketModels.ActionMessage): Promise<socketModels.ActionMessage> {
    return new Promise((resolve, reject) => {
        let socketClient = socketIOClient('https://public.kerzz.com:50500')
        socketClient.on(socketModels.EventType.connect, async function () {
            //logger.info('client:server connected')
        })
        socketClient.on(socketModels.EventType.wellcome, async function (data: string) {
            //logger.info(data)
            data
            let lg = new socketModels.ClientInfo
            lg.id = socketClient.id
            lg.info.secretKey = 'password'
            lg.info.branchCode = ""
            lg.info.brandName = "* Digital Invoice Service *"
            lg.info.licanceId = actionReq.licanceId + "_client"
            lg.info.isServer = true
            await socketClient.emit(socketModels.EventType.login, JSON.stringify(lg))
            actionReq.sender = lg.id //!sender identity
            await setTimeout(() => {
            }, 100);
            await socketClient.emit(socketModels.EventType.action_message_to_client, JSON.stringify(actionReq))
            //on action result
            socketClient.on(socketModels.EventType.action_message, function (data: string) {
                let reqMessage: socketModels.ActionMessage = JSON.parse(data)
                socketClient.close()
                //error control
                let errorResponse = reqMessage.requests.find(val => val.response.error != "")
                if (errorResponse) {
                    reject(errorResponse.response.error)
                } else {
                    resolve(reqMessage)
                }
            })
            //on error
            socketClient.on(socketModels.EventType.error, function (data: string) {
                socketClient.close()
                reject(data)
            })

        })
        //on timeout - 60 sec.
        setTimeout(() => {
            socketClient.close()
            reject("timeout socket not response")
        }, 60 * 1000);
    })

}




export async function getInventoryUnits(licanceId: string, itemCode: string) {
    let actionMessage = new socketModels.ActionMessage("", "", false)
    actionMessage.licanceId = licanceId
    let request = new socketModels.ActionRequest(socketModels.RequestTypes.class_data_action, "get-inventory-units", "get-inventory-units")
    request.parameters.push(new socketModels.ActionParameter("itemCode", itemCode))
    actionMessage.requests.push(request)
    actionMessage = await sendActionToClient(actionMessage)
    logger.info(actionMessage.requests[0].response.message)
    logger.info(actionMessage.requests[0].response.data)
    return actionMessage.requests[0].response
}


export async function getWarehouseList(licanceId: string, branchCode: number) {
    let actionMessage = new socketModels.ActionMessage("", "", false)
    actionMessage.licanceId = licanceId
    let request = new socketModels.ActionRequest(socketModels.RequestTypes.class_data_action, "get-warehouse-list", "get-warehouse-list")
    request.parameters.push(new socketModels.ActionParameter("branchCode", branchCode))
    actionMessage.requests.push(request)
    actionMessage = await sendActionToClient(actionMessage)
    logger.info(actionMessage.requests[0].response.message)
    logger.info(actionMessage.requests[0].response.data)
    return actionMessage.requests[0].response
}

export async function getBranchList(licanceId: string, showInactives: boolean) {
    let actionMessage = new socketModels.ActionMessage("", "", false)
    actionMessage.licanceId = licanceId
    let request = new socketModels.ActionRequest(socketModels.RequestTypes.class_data_action, "get-branch-list", "get-branch-list")
    request.parameters.push(new socketModels.ActionParameter("showInactives", showInactives))
    actionMessage.requests.push(request)
    actionMessage = await sendActionToClient(actionMessage)
    logger.info(actionMessage.requests[0].response.message)
    logger.info(actionMessage.requests[0].response.data)
    return actionMessage.requests[0].response
}