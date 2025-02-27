/*
  Warnings:

  - You are about to drop the `_CartItemToIngredient` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_IngredientToProduct` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CartItemToIngredient" DROP CONSTRAINT "_CartItemToIngredient_A_fkey";

-- DropForeignKey
ALTER TABLE "_CartItemToIngredient" DROP CONSTRAINT "_CartItemToIngredient_B_fkey";

-- DropForeignKey
ALTER TABLE "_IngredientToProduct" DROP CONSTRAINT "_IngredientToProduct_A_fkey";

-- DropForeignKey
ALTER TABLE "_IngredientToProduct" DROP CONSTRAINT "_IngredientToProduct_B_fkey";

-- AlterTable
ALTER TABLE "ProductIngredient" RENAME CONSTRAINT "Ingredient_pkey" TO "ProductIngredient_pkey";

-- DropTable
DROP TABLE "_CartItemToIngredient";

-- DropTable
DROP TABLE "_IngredientToProduct";

-- CreateTable
CREATE TABLE "_ProductToProductIngredient" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ProductToProductIngredient_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_CartItemToProductIngredient" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_CartItemToProductIngredient_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ProductToProductIngredient_B_index" ON "_ProductToProductIngredient"("B");

-- CreateIndex
CREATE INDEX "_CartItemToProductIngredient_B_index" ON "_CartItemToProductIngredient"("B");

-- AddForeignKey
ALTER TABLE "_ProductToProductIngredient" ADD CONSTRAINT "_ProductToProductIngredient_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToProductIngredient" ADD CONSTRAINT "_ProductToProductIngredient_B_fkey" FOREIGN KEY ("B") REFERENCES "ProductIngredient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CartItemToProductIngredient" ADD CONSTRAINT "_CartItemToProductIngredient_A_fkey" FOREIGN KEY ("A") REFERENCES "CartItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CartItemToProductIngredient" ADD CONSTRAINT "_CartItemToProductIngredient_B_fkey" FOREIGN KEY ("B") REFERENCES "ProductIngredient"("id") ON DELETE CASCADE ON UPDATE CASCADE;
