-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "name" TEXT NOT NULL DEFAULT 'Not specified',
ADD COLUMN     "picture" TEXT NOT NULL DEFAULT '/uploads/default-avatar.png';
