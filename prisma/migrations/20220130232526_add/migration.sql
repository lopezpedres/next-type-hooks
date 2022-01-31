/*
  Warnings:

  - You are about to drop the column `birthday` on the `user` table. All the data in the column will be lost.
  - Added the required column `type` to the `Contact` table without a default value. This is not possible if the table is not empty.
  - Added the required column `supplierId` to the `ingredients` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "typeContact" AS ENUM ('provider', 'customer');

-- AlterTable
ALTER TABLE "Contact" ADD COLUMN     "type" "typeContact" NOT NULL;

-- AlterTable
ALTER TABLE "ingredients" ADD COLUMN     "supplierId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "birthday";

-- CreateTable
CREATE TABLE "supplier" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "supplier_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ingredients" ADD CONSTRAINT "ingredients_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "supplier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
