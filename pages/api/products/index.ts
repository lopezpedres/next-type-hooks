import { NextApiRequest,NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function  (request:NextApiRequest, response:NextApiResponse,){

    try{
      if(request.method==="GET"){
        const allProducts = await prisma.product.findMany()
      response.status(200).json(allProducts)
      console.log("Retrived all Products from database using Prisma")
      }
      if(request.method==="POST"){
        const newIngredients = await prisma.product.create({
          data:request.body
        })
        response.status(201).json(newIngredients)
        console.log(`Created a new Ingredient using Prisma`)
      }



    }
    catch (e){console.error(e)}


}