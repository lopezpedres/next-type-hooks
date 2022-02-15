/*
  Warnings:

  - Added the required column `quantityOfIngredientsUsed` to the `productIngredients` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "product" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "productIngredients" ADD COLUMN     "quantityOfIngredientsUsed" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "supplier" ALTER COLUMN "description" DROP NOT NULL;
