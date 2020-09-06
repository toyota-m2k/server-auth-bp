/**
 * WEB-Service Boilerplate
 * Created on 2020.09.03 by @toyota-m2k
 * Copyright (c) 2020 @toyota-m2k. All rights reserved.
 */

export interface IKeyValue {
    [key: string]: any
}

export interface IUser {
    id:string
    displayName:string
}

export interface IUserStore {
    register(user:IUser):void
    unregister(id:string):void
    findById(id:string):IUser|undefined 
}
