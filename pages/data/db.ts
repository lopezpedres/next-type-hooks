import data from "./data"

class Database {

    constructor(){}

    async getAll():Promise<TUsers>{
        const allUsers=  Object.values(data)
        return allUsers

    }
}

export default Database