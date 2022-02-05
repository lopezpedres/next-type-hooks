import { NextApiRequest,NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function  (request:NextApiRequest, response:NextApiResponse,){

    try{
      if(request.method==="GET"){
        const allSuppliers = await prisma.supplier.findMany()
      response.status(200).json(allSuppliers)
      console.log("Retrived all suppliers from database using Prisma")
      }
      if(request.method==="POST"){
        const newSupplier = await prisma.supplier.create({
          data:request.body
        })
        response.status(201).json(newSupplier)
        console.log(`Created a new supplier using Prisma`)
      }


    }
    catch (e){console.error(e)}


}
