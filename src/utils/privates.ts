/**
 * WEB-Service Boilerplate
 * Created on 2020.09.03 by @toyota-m2k
 * Copyright (c) 2020 @toyota-m2k. All rights reserved.
 */
import path from "path";

/**
 * もともと、dist/private/* のファイルを読み込むときに、各モジュール毎に相対パスで指定していたが、
 * ts-node を使ってsrcフォルダから実行してしまうと、パスが解決できなくなるので、絶対パスで指定するように変更するとともに、
 * このクラスで一元管理することとした。
 */
export default class PrivatePath {
    static privDir = "private/";

    public static get(filename: string): string {
        return path.join(process.cwd(), PrivatePath.privDir, filename);
    }
}