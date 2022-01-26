import { NextApiRequest,NextApiResponse } from "next";
import DB from "../data/db"


export default async function getAllUsers (request:NextApiRequest, response:NextApiResponse<TUsers>){

    try{
        const db = new DB ()
        const allUsers = await db.getAll()
        response.status(200).json(allUsers)
        console.log("Retrived users API")


    }
    catch (e){console.error(e)}


}


