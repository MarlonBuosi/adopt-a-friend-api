-- CreateTable
CREATE TABLE "orgs" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "phone" TEXT NOT NULL,

    CONSTRAINT "orgs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pets" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "species" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "weight" DOUBLE PRECISION,
    "height" DOUBLE PRECISION,
    "age" INTEGER,
    "orgId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "city" TEXT NOT NULL,

    CONSTRAINT "pets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_pets_org_id" ON "pets"("orgId");

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "orgs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
