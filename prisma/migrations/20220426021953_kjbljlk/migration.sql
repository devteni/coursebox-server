/*
  Warnings:

  - A unique constraint covering the columns `[fileId]` on the table `CourseMaterial` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `CourseMaterial_fileId_key` ON `CourseMaterial`(`fileId`);
