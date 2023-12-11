/*
  Warnings:

  - You are about to drop the column `folderId` on the `List` table. All the data in the column will be lost.
  - You are about to drop the column `folderId` on the `Note` table. All the data in the column will be lost.
  - You are about to drop the `Folder` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Folder" DROP CONSTRAINT "Folder_parentFolderId_fkey";

-- DropForeignKey
ALTER TABLE "Folder" DROP CONSTRAINT "Folder_parentSpaceId_fkey";

-- DropForeignKey
ALTER TABLE "List" DROP CONSTRAINT "List_folderId_fkey";

-- DropForeignKey
ALTER TABLE "Note" DROP CONSTRAINT "Note_folderId_fkey";

-- AlterTable
ALTER TABLE "List" DROP COLUMN "folderId";

-- AlterTable
ALTER TABLE "Note" DROP COLUMN "folderId";

-- DropTable
DROP TABLE "Folder";
