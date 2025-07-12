/*
  Warnings:

  - You are about to drop the column `createdAt` on the `orgs` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `orgs` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `pets` table. All the data in the column will be lost.
  - You are about to drop the column `orgId` on the `pets` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `pets` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `orgs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `org_id` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "pets" DROP CONSTRAINT "pets_orgId_fkey";

-- DropIndex
DROP INDEX "idx_pets_org_id";

-- AlterTable
ALTER TABLE "orgs" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "pets" DROP COLUMN "createdAt",
DROP COLUMN "orgId",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "org_id" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE INDEX "idx_pets_org_id" ON "pets"("org_id");

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "orgs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
