/*
  Warnings:

  - You are about to drop the column `department` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `school` on the `Course` table. All the data in the column will be lost.
  - Added the required column `departmentId` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `schoolId` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Course` DROP COLUMN `department`,
    DROP COLUMN `school`,
    ADD COLUMN `departmentId` INTEGER NOT NULL,
    ADD COLUMN `schoolId` INTEGER NOT NULL;
