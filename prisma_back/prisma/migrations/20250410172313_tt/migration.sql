-- CreateTable
CREATE TABLE `cultivationpot` (
    `cultivation_pot_id` INTEGER NOT NULL AUTO_INCREMENT,
    `type_pot_id` INTEGER NOT NULL,
    `index` INTEGER NULL,
    `farm_id` INTEGER NOT NULL,
    `device_id` INTEGER NOT NULL,
    `img_path` LONGTEXT NULL,
    `ai_result` VARCHAR(191) NULL,
    `status` VARCHAR(191) NULL DEFAULT 'active',
    `pot_name` VARCHAR(191) NULL,
    `age` INTEGER NOT NULL DEFAULT 1,
    `create_pot` DATE NULL DEFAULT '1990-01-01',

    INDEX `CultivationPot_device_id_fkey`(`device_id`),
    INDEX `CultivationPot_farm_id_fkey`(`farm_id`),
    INDEX `CultivationPot_type_pot_id_fkey`(`type_pot_id`),
    PRIMARY KEY (`cultivation_pot_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `device` (
    `device_id` INTEGER NOT NULL AUTO_INCREMENT,
    `device_name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `status` VARCHAR(191) NULL DEFAULT 'inactive',
    `device_type` VARCHAR(191) NULL,
    `farm_id` INTEGER NOT NULL,

    INDEX `link_farm_id`(`farm_id`),
    PRIMARY KEY (`device_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `farm` (
    `farm_id` INTEGER NOT NULL AUTO_INCREMENT,
    `farm_name` VARCHAR(191) NOT NULL,
    `farm_type` VARCHAR(191) NULL,
    `farm_description` VARCHAR(191) NULL,
    `farm_status` BOOLEAN NULL DEFAULT true,
    `temperature` DOUBLE NULL,
    `humidity` DOUBLE NULL,

    PRIMARY KEY (`farm_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `growingpot` (
    `growing_pot_id` INTEGER NOT NULL AUTO_INCREMENT,
    `type_pot_id` INTEGER NOT NULL,
    `index` INTEGER NULL,
    `farm_id` INTEGER NOT NULL,
    `device_id` INTEGER NOT NULL,
    `img_path` LONGTEXT NULL,
    `ai_result` VARCHAR(191) NULL,
    `status` VARCHAR(191) NULL DEFAULT 'active',
    `pot_name` VARCHAR(191) NULL,
    `age` INTEGER NOT NULL DEFAULT 1,
    `create_pot` DATE NULL DEFAULT '1990-01-01',

    INDEX `GrowingPot_device_id_fkey`(`device_id`),
    INDEX `GrowingPot_farm_id_fkey`(`farm_id`),
    INDEX `GrowingPot_type_pot_id_fkey`(`type_pot_id`),
    PRIMARY KEY (`growing_pot_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `typepot` (
    `type_pot_id` INTEGER NOT NULL AUTO_INCREMENT,
    `type_pot_name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `status` BOOLEAN NULL DEFAULT true,

    PRIMARY KEY (`type_pot_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `uuid` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_username_key`(`username`),
    UNIQUE INDEX `User_uuid_key`(`uuid`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `log_table` (
    `log_id` INTEGER NOT NULL AUTO_INCREMENT,
    `date_log` DATE NOT NULL DEFAULT '1990-01-01',
    `normal_pot` INTEGER NOT NULL,
    `unnormal_pot` INTEGER NOT NULL,

    PRIMARY KEY (`log_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `cultivationpot` ADD CONSTRAINT `CultivationPot_device_id_fkey` FOREIGN KEY (`device_id`) REFERENCES `device`(`device_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `cultivationpot` ADD CONSTRAINT `CultivationPot_farm_id_fkey` FOREIGN KEY (`farm_id`) REFERENCES `farm`(`farm_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `cultivationpot` ADD CONSTRAINT `CultivationPot_type_pot_id_fkey` FOREIGN KEY (`type_pot_id`) REFERENCES `typepot`(`type_pot_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `device` ADD CONSTRAINT `link_farm_id` FOREIGN KEY (`farm_id`) REFERENCES `farm`(`farm_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `growingpot` ADD CONSTRAINT `GrowingPot_device_id_fkey` FOREIGN KEY (`device_id`) REFERENCES `device`(`device_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `growingpot` ADD CONSTRAINT `GrowingPot_farm_id_fkey` FOREIGN KEY (`farm_id`) REFERENCES `farm`(`farm_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `growingpot` ADD CONSTRAINT `GrowingPot_type_pot_id_fkey` FOREIGN KEY (`type_pot_id`) REFERENCES `typepot`(`type_pot_id`) ON DELETE CASCADE ON UPDATE CASCADE;
