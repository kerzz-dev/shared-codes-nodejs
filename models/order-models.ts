

export class BaseOrder {
    id: string
    creation: Date
    lastChange: Date
    rows: BaseOrderRow[]
    discount: number //TODO:read only yapilacak
    service: number
    total: number //TODO:read only yapilacak
    grandTotal: number  //TODO:read only yapilacak
    parentID: string
    status: FolioStatus
    type: ServiceType
    tip: number
    pax: number
    lock: FolioLock
    table: Table
    creator: CreatorInfo
    updaters: UpdaterInfo[]
    orwi: OrwiInfo
    userId: string
    storeId: string
    externalId: string
    customerName: string
    scheduler: Date
    isTimed: boolean
    scheduleNote: string
    isOrwiPay: boolean
    kickback: number
    inoviceAddressId: string
    source: FolioSources
    deliveryAddressId: string
    deliveryStatus: DeliveryStatus
    deliveryPaymentType: string
    deliveryAddress: string
    deliveryStaff: string
    note: string
    plasticCutlery: boolean
    appName: string
    verifyId: string
    isRating: boolean
    staffId: string
    getDiscountTotal(): number {
        return this.rows
            .filter(val => val.rowType == "discount" && val.recordStatus != "deleted")
            .reduce((a, b) => a + (b.getRowTotal()), 0);

    }
    constructor() {
        this.id = ""
        this.creation = new Date()
        this.lastChange = new Date()
        this.rows = new Array<BaseOrderRow>()
        this.discount = 0
        this.service = 0
        this.total = 0
        this.grandTotal = 0
        this.parentID = ""
        this.status = "open"
        this.type = "delivery"
        this.tip = 0
        this.pax = 0
        this.lock = new FolioLock("unlocked")
        this.table = new Table()
        this.creator = new CreatorInfo()
        this.updaters = new Array<UpdaterInfo>()
        this.orwi = new OrwiInfo()
        this.userId = ""
        this.storeId = ""
        this.externalId = ""
        this.customerName = ""
        this.scheduler = new Date()
        this.isTimed = false
        this.scheduleNote = ""
        this.isOrwiPay = false
        this.kickback = 0
        this.inoviceAddressId = ""
        this.deliveryAddressId = ""
        this.deliveryStatus = "accpeted"
        this.deliveryPaymentType = ""
        this.deliveryAddress = ""
        this.deliveryStaff = ""
        this.source = "orwi"
        this.note = ""
        this.plasticCutlery = false
        this.appName = "orwi" //orwi-mackbear-osmanli
        this.verifyId = ""
        this.isRating = false
        this.staffId = ""
    }
}


export class BaseOrderRow {
    id: string
    name: string
    itemID: string
    creation: Date
    qty: number
    unitPrice: number
    //new: boolean
    //itemImage: string
    parentID: string
    modifierID: string
    modifierGroup: string
    //qtyID: number
    note: string
    price: number
    //discount: number
    //selected: boolean
    seat: number
    creator: CreatorInfo
    updaters: UpdaterInfo[]
    deleters: DeleterInfo[]
    recordStatus: RecordStatus
    payStatus: PaymentRow[]
    isModifier: boolean
    isMustModifier: boolean
    isDetachableModifier: boolean
    isGift: boolean
    isPaidFull: boolean
    //isLoyalty: boolean
    //isFree: boolean
    //isPayment: boolean
    //isDiscount: boolean
    rowType: RowType
    externalId: string
    payRowID: string
    source: FolioSources
    couponCode: string
    getRowTotal() {
        return this.unitPrice * this.qty
    }
    constructor() {
        this.id = ""
        this.name = ""
        this.itemID = ""
        this.creation = new Date()
        this.qty = 1
        this.unitPrice = 0
        //this.new = true
        //this.itemImage = ""
        this.parentID = ""
        this.modifierID = "" //TODO: Kalacak Mı ?
        this.modifierGroup = "" // TODO: Kalacak Mı ?
        //this.qtyID = 0
        this.note = ""
        this.price = 0
        //this.discount = 0
        //this.selected = false //TODO: Kalacak Mı ?
        this.seat = 0
        this.recordStatus = "new"
        this.payStatus = new Array<PaymentRow>()
        this.isModifier = false
        this.isMustModifier = false
        this.isDetachableModifier = false
        this.isGift = false
        this.isPaidFull = false
        //this.isLoyalty = false
        //this.isFree = false
        //this.isPayment = false
        //this.isDiscount = false
        this.rowType = "product"
        this.creator = new CreatorInfo()
        this.updaters = new Array<UpdaterInfo>()
        this.deleters = new Array<DeleterInfo>()
        this.externalId = ""
        this.payRowID = ""
        this.source = "orwi"
        this.couponCode = ""
    }
}

export class PaymentRow {
    id: string
    name: string
    amount: number
    constructor(id: string, name: string, amount: number) {
        this.id = id
        this.name = name
        this.amount = amount
    }
}

export class Table {
    id: string
    name: string
    constructor() {
        this.id = ""
        this.name = ""
    }
}
export class FolioLock {
    status: "unlocked" | "locked"
    time: Date
    userName: string
    userId: ""
    constructor(lockStatus: "unlocked" | "locked") {
        this.status = lockStatus
        this.time = new Date()
        this.userName = ""
        this.userId = ""
    }
}
export class CreatorInfo {
    userName: string
    userId: string
    constructor() {
        this.userId = ""
        this.userName = ""
    }
}
export class UpdaterInfo {
    userName: string
    userId: string
    time: Date
    descripton: string
    constructor() {
        this.userId = ""
        this.userName = ""
        this.time = new Date()
        this.descripton = ""
    }
}
export class DeleterInfo {
    userId: string
    userName: string
    time: Date
    qty: number
    reasonId: string
    reason: string
    constructor() {
        this.userId = ""
        this.userName = ""
        this.time = new Date()
        this.qty = 0
        this.reasonId = ""
        this.reason = ""
    }
}

export class OrwiInfo {
    spent: number
    won: number
    pointType: "store" | "orwi" | "stamp"
    constructor() {
        this.spent = 0
        this.won = 0
        this.pointType = "store"
    }
}
export type ServiceType = "self-ordering" | "self" | "table" | "delivery" | "take-away" | "timed-take-away" | "timed-table"
export type RecordStatus = "new" | "old" | "deleted" | "all"
export type RowType = "product" | "modifier" | "custom-modifier" | "discount" | "payment" | "promotions" | "bonus"
export type FolioStatus = "open" | "closed" | "cancelled"
export type FolioSources = "orwi" | "loyalty-qr" | "web" | "pos" | "food-app"
export type DeliveryStatus = "none" | "new" | "rejected" | "accpeted" | "preparing" | "routing" | "cancelled" | "completed"

import * as util from "../base/util"
export function getOrderSchema() {
    let item = new BaseOrder()
    let row = new BaseOrderRow()
    item.rows.push(row)
    let schema = util.convertJsonSchema(item, "OrderSchema", "Order")
    return schema
}