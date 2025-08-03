-- CreateEnum
CREATE TYPE "public"."AuthProvider" AS ENUM ('EMAIL', 'GOOGLE', 'FACEBOOK');

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "provider" "public"."AuthProvider" NOT NULL DEFAULT 'EMAIL';
