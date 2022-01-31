import { NextApiRequest,NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function  (request:NextApiRequest, response:NextApiResponse,){

    try{
      if(request.method==="GET"){
        const allUsers = await prisma.user.findMany()
      response.status(200).json(allUsers)
      console.log("Reetrived users from database using Prisma")
      }
      if(request.method==="POST"){
        const newUser = await prisma.user.create({
          data:request.body
        })
        response.status(201).json(newUser)
        console.log("Created a new user using Prisma")
      }


    }
    catch (e){console.error(e)}


}










//This is an example with local data
// import DB from "../data/db"


// export default async function getAllUsers (request:NextApiRequest, response:NextApiResponse<TUsers>){

//     try{
//         const db = new DB ()
//         const allUsers = await db.getAll()
//         response.status(200).json(allUsers)
//         console.log("Retrived users API")


//     }
//     catch (e){console.error(e)}


// }


