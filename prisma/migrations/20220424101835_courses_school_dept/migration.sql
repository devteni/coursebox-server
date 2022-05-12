/*
  Warnings:

  - Added the required column `department` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `school` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Course` ADD COLUMN `department` VARCHAR(191) NOT NULL,
    ADD COLUMN `school` VARCHAR(191) NOT NULL;
