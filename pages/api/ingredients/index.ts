import { NextApiRequest,NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function  (request:NextApiRequest, response:NextApiResponse,){

    try{
      if(request.method==="GET"){
        const allIngredients = await prisma.ingredients.findMany()
      response.status(200).json(allIngredients)
      console.log("Retrived all Ingredients from database using Prisma")
      }
      if(request.method==="POST"){
        const newIngredients = await prisma.ingredients.create({
          data:request.body, include:{supplier:true}
        })
        response.status(201).json(newIngredients)
        console.log(`Created a new Ingredient using Prisma`)
      }


    }
    catch (e){console.error(e)}


}