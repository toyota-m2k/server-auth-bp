/**
 * WEB-Service Boilerplate
 * Created on 2020.09.03 by @toyota-m2k
 * Copyright (c) 2020 @toyota-m2k. All rights reserved.
 */
import ZException from "./error"

export default class Converter {
    public static bool(v: any, def:boolean=false): boolean {
        switch (typeof v) {
            case "string": {
                switch (v.toLowerCase()) {
                    case "1":
                    case "true":
                        return true;
                    case "false":
                    case "0":
                        return false;
                    default:
                        return def;
                }
            }
            case "number":
                return v !== 0;
            case "boolean":
                return v;
            default:
                return def;
        }
    }

    public static int(v: any): number {
        switch (typeof v) {
            case "string":
                return parseInt(v, 10);
            case "number":
                return v;
            case "boolean":
                return v ? 1 : 0;
            default:
                return 0;
        }
    }

    public static nullable_text(v: any): string|null {
        switch (typeof v) {
            case "string":
                return v;
            case "number":
                return v.toString();
            default:
                return null;
        }
    }
    public static safe_text(v: any): string {
        switch (typeof v) {
            case "string":
                return v;
            case "number":
                return v.toString();
            default:
                return "";
        }
    }
    public static notnull_text(v: any): string {
        switch (typeof v) {
            case "string":
                return v;
            case "number":
                return v.toString();
            default:
                throw ZException.InvalidParamsException("null value");
        }
    }

    public static bit_flag(v: any, flag: number): boolean {
        let i = this.int(v);
        return flag == (i & flag);
    }

    public static intArray(v: any): number[] {
        if (Array.isArray(v)) {
            return v.map((x) => {
                return this.int(x);
            });
        } else {
            return [this.int(v)];
        }
    }
    public static textArray(v: any): string[] {
        if (Array.isArray(v)) {
            return v.map((x) => {
                return this.notnull_text(x);
            });
        } else {
            return [this.notnull_text(v)];
        }
    }

    public static arrayToString<T>(ary: T | T[]) {
        if (Array.isArray(ary)) {
            return ary.reduce<string>((acc, c, i) => {
                if (i == 0) {
                    return acc + `${c}`
                } else {
                    return acc + `, ${c}`;
                }
            }, "[") + "]";
        } else {
            return `${ary}`;
        }
    }
}