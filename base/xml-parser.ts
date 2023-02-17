import jsonXml from "jsontoxml"
import xml2js from "xml2js"



export async function parseJSONBodyToXML(jsonArgument: object) {
    return jsonXml(jsonArgument, { html: true });
}


export async function convertXMLToJSON(xmlMessage: string) {
    const options = { trim: true, explicitArray: false, explicitRoot: false };
    return xml2js.parseStringPromise(xmlMessage, options);
}


export async function convertJsonToSoapRequest(jsonArguments: object, methodName: string, xmlns: string) {
    let soapBody = await parseJSONBodyToXML(jsonArguments);

    return `<?xml version="1.0" encoding="utf-8"?> <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Header/><soap:Body><${methodName} xmlns="${xmlns}">${soapBody}</${methodName}></soap:Body></soap:Envelope>`;
}

