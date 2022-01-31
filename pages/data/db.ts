import { PrismaClient } from "@prisma/client"

class Database {

    constructor(){}

    async getAll(data:PrismaClient):Promise<TUsers>{
        const allUsers=  Object.values(data)
        return allUsers

    }
}

export default Database