/*
  Warnings:

  - You are about to drop the column `token` on the `EmailVerificationToken` table. All the data in the column will be lost.
  - You are about to drop the column `token` on the `PasswordResetToken` table. All the data in the column will be lost.
  - Added the required column `code` to the `EmailVerificationToken` table without a default value. This is not possible if the table is not empty.
  - Added the required column `code` to the `PasswordResetToken` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."EmailVerificationToken_token_key";

-- DropIndex
DROP INDEX "public"."PasswordResetToken_token_key";

-- AlterTable
ALTER TABLE "public"."EmailVerificationToken" DROP COLUMN "token",
ADD COLUMN     "code" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."PasswordResetToken" DROP COLUMN "token",
ADD COLUMN     "code" TEXT NOT NULL;
