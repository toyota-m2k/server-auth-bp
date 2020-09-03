/**
 * WEB-Service Boilerplate
 * Created on 2020.09.03 by @toyota-m2k
 * Copyright (c) 2020 @toyota-m2k. All rights reserved.
 */

 /**
 * エラーコード定義
 */
export enum ZErrorCode {
    Succeeded = 0,
    GenericError = 100,
    DBError = 102,
    InvalidParams = 103,
    InvalidState = 104,
    NoData = 105,
    NotSupported = 106,
    TurnAwayAtExpress = 107,
}

/**
 * 例外クラス
 */
export default class ZException extends Error {
    public errorCode: ZErrorCode;
    constructor(code: ZErrorCode, message: string) {
        super(message);
        this.errorCode = code;
    }
    public toString = ():string => {
        return `ZException: ${this.message} (${this.errorCode})\r\n${this.stack}`
    }

    public static GenericException(message:string):ZException {
        return new ZException(ZErrorCode.GenericError, message)
    }
    public static DBException(message:string):ZException {
        return new ZException(ZErrorCode.DBError, message)
    }
    public static InvalidParamsException(message:string):ZException {
        return new ZException(ZErrorCode.InvalidParams, message)
    }
    public static InvalidStateException(message:string):ZException {
        return new ZException(ZErrorCode.InvalidState, message)
    }
    public static NoDataException(message:string):ZException {
        return new ZException(ZErrorCode.NoData, message)
    }
    public static NotSupportedException(message:string):ZException {
        return new ZException(ZErrorCode.NotSupported, message)
    }
}
