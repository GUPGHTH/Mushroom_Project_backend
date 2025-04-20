/*
  Warnings:

  - Added the required column `updated_at` to the `cultivationpot` table without a default value. This is not possible if the table is not empty.
  - Made the column `status` on table `cultivationpot` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `updated_at` to the `device` table without a default value. This is not possible if the table is not empty.
  - Made the column `status` on table `device` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `updated_at` to the `farm` table without a default value. This is not possible if the table is not empty.
  - Made the column `farm_status` on table `farm` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `updated_at` to the `growingpot` table without a default value. This is not possible if the table is not empty.
  - Made the column `status` on table `growingpot` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `updated_at` to the `typepot` table without a default value. This is not possible if the table is not empty.
  - Made the column `status` on table `typepot` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `updated_at` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `cultivationpot` DROP FOREIGN KEY `CultivationPot_device_id_fkey`;

-- DropForeignKey
ALTER TABLE `cultivationpot` DROP FOREIGN KEY `CultivationPot_farm_id_fkey`;

-- DropForeignKey
ALTER TABLE `cultivationpot` DROP FOREIGN KEY `CultivationPot_type_pot_id_fkey`;

-- DropForeignKey
ALTER TABLE `device` DROP FOREIGN KEY `link_farm_id`;

-- DropForeignKey
ALTER TABLE `growingpot` DROP FOREIGN KEY `GrowingPot_device_id_fkey`;

-- DropForeignKey
ALTER TABLE `growingpot` DROP FOREIGN KEY `GrowingPot_farm_id_fkey`;

-- DropForeignKey
ALTER TABLE `growingpot` DROP FOREIGN KEY `GrowingPot_type_pot_id_fkey`;

-- DropIndex
DROP INDEX `link_farm_id` ON `device`;

-- AlterTable
ALTER TABLE `cultivationpot` ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL,
    MODIFY `status` VARCHAR(191) NOT NULL DEFAULT 'active',
    MODIFY `create_pot` DATE NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `device` ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL,
    MODIFY `status` VARCHAR(191) NOT NULL DEFAULT 'inactive';

-- AlterTable
ALTER TABLE `farm` ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL,
    MODIFY `farm_status` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `growingpot` ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL,
    MODIFY `status` VARCHAR(191) NOT NULL DEFAULT 'active',
    MODIFY `create_pot` DATE NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `log_table` ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `date_log` DATE NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `typepot` ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL,
    MODIFY `status` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL;

-- AddForeignKey
ALTER TABLE `device` ADD CONSTRAINT `device_farm_id_fkey` FOREIGN KEY (`farm_id`) REFERENCES `farm`(`farm_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cultivationpot` ADD CONSTRAINT `cultivationpot_type_pot_id_fkey` FOREIGN KEY (`type_pot_id`) REFERENCES `typepot`(`type_pot_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cultivationpot` ADD CONSTRAINT `cultivationpot_farm_id_fkey` FOREIGN KEY (`farm_id`) REFERENCES `farm`(`farm_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cultivationpot` ADD CONSTRAINT `cultivationpot_device_id_fkey` FOREIGN KEY (`device_id`) REFERENCES `device`(`device_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `growingpot` ADD CONSTRAINT `growingpot_type_pot_id_fkey` FOREIGN KEY (`type_pot_id`) REFERENCES `typepot`(`type_pot_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `growingpot` ADD CONSTRAINT `growingpot_farm_id_fkey` FOREIGN KEY (`farm_id`) REFERENCES `farm`(`farm_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `growingpot` ADD CONSTRAINT `growingpot_device_id_fkey` FOREIGN KEY (`device_id`) REFERENCES `device`(`device_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `cultivationpot` RENAME INDEX `CultivationPot_device_id_fkey` TO `cultivation_pot_device_idx`;

-- RenameIndex
ALTER TABLE `cultivationpot` RENAME INDEX `CultivationPot_farm_id_fkey` TO `cultivation_pot_farm_idx`;

-- RenameIndex
ALTER TABLE `cultivationpot` RENAME INDEX `CultivationPot_type_pot_id_fkey` TO `cultivation_pot_type_idx`;

-- RenameIndex
ALTER TABLE `growingpot` RENAME INDEX `GrowingPot_device_id_fkey` TO `growing_pot_device_idx`;

-- RenameIndex
ALTER TABLE `growingpot` RENAME INDEX `GrowingPot_farm_id_fkey` TO `growing_pot_farm_idx`;

-- RenameIndex
ALTER TABLE `growingpot` RENAME INDEX `GrowingPot_type_pot_id_fkey` TO `growing_pot_type_idx`;

-- RenameIndex
ALTER TABLE `user` RENAME INDEX `User_username_key` TO `user_username_key`;

-- RenameIndex
ALTER TABLE `user` RENAME INDEX `User_uuid_key` TO `user_uuid_key`;
