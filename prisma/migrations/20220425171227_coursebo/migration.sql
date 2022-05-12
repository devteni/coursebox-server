-- DropForeignKey
ALTER TABLE `CourseMaterial` DROP FOREIGN KEY `CourseMaterial_fileId_fkey`;

-- AlterTable
ALTER TABLE `CourseMaterial` MODIFY `fileId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `CourseMaterial` ADD CONSTRAINT `CourseMaterial_fileId_fkey` FOREIGN KEY (`fileId`) REFERENCES `File`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
