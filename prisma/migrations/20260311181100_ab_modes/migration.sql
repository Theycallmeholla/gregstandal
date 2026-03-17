-- CreateEnum
CREATE TYPE "AssignmentMode" AS ENUM ('TESTING', 'STICKY');

-- CreateEnum
CREATE TYPE "RoutingMode" AS ENUM ('REWRITE', 'REDIRECT');

-- AlterTable
ALTER TABLE "Experiment" ADD COLUMN "assignmentMode" "AssignmentMode" NOT NULL DEFAULT 'STICKY';
ALTER TABLE "Experiment" ADD COLUMN "routingMode" "RoutingMode" NOT NULL DEFAULT 'REWRITE';

-- AlterTable
ALTER TABLE "Variant" ADD COLUMN "redirectPath" TEXT;
ALTER TABLE "Variant" ADD COLUMN "redirectUrl" TEXT;

