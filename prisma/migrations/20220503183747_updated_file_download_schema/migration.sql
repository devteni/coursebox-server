/*
  Warnings:

  - Added the required column `fileId` to the `FileDownload` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `FileDownload` ADD COLUMN `fileId` VARCHAR(191) NOT NULL;
