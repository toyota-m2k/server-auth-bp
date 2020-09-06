import { IUser, IKeyValue, IUserStore } from "../common/defs"

// ユーザーストレージの仮実装
// 実際には、永続化とか、プロセス間でのユーザー情報共有とかが必要なので、
// sessionの同期（Redisを使うとか）とともに、
// サービスで使うときは、DBに保存したり、既存のユーザー管理と接続するなど、ちゃんとする。
class UserStore implements IUserStore {
    private userMap:IKeyValue = {}
    public register(user:IUser) {
        this.userMap[user.id] = user
    }
    public unregister(id:string) {
        delete this.userMap[id]
    }
    public findById(id:string):IUser|undefined {
        return this.userMap[id]
    }
}
const userStore = new UserStore()
export default userStore