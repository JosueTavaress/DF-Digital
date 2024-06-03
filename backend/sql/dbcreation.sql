-- MySQL Script generated by MySQL Workbench
-- dom 27 fev 2022 14:54:27
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema dfDigital
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema dfDigital
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `dfDigital` ;
USE `dfDigital` ;

-- -----------------------------------------------------
-- Table `dfDigital`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dfDigital`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `dfDigital`.`tag`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dfDigital`.`tag` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `description` VARCHAR(255) NOT NULL,
  `color` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `dfDigital`.`user_tag`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dfDigital`.`user_tag` (
  `user_id` INT NOT NULL,
  `tag_id` INT NOT NULL,
  PRIMARY KEY (`user_id`, `tag_id`),
  CONSTRAINT `fk_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `dfDigital`.`user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_tag`
    FOREIGN KEY (`tag_id`)
    REFERENCES `dfDigital`.`tag` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

INSERT INTO `dfDigital`.`tag` (`name`, `description`, `color`) VALUES ('primeiro-contato', 'Etapa onde é feito o primeiro atendimento do cliente', 'green');
INSERT INTO `dfDigital`.`tag` (`name`, `description`, `color`) VALUES ('reunião', 'Etapa de interesse do cliente, reunião para alinhamento', 'blue');
INSERT INTO `dfDigital`.`tag` (`name`, `description`, `color`) VALUES ('suporte', 'Etapa de auxílio ao cliente', 'yellow');
INSERT INTO `dfDigital`.`tag` (`name`, `description`, `color`) VALUES ('finalizado', 'Prestação concluída', 'red');

INSERT INTO `dfDigital`.`user` (`name`, `email`, `password`) VALUES ('João Ferreira', 'joaoferreira@gmail.com', '$2b$10$sHAZ.YUlJe28hkWz1R1VU.9Qf3TFnIhRWHLxGYK8ChFC6P4uVzhua');
INSERT INTO `dfDigital`.`user` (`name`, `email`, `password`) VALUES ('Nilce Silva', 'nilcesilva@gmail.com', '$2b$10$QAnB..zw8WonV2SoBPg91uZzdIo3NiYsu44aptGL/MdXtMrFuvtai');
INSERT INTO `dfDigital`.`user` (`name`, `email`, `password`) VALUES ('Pedro Nava', 'pedronava@gmail.com', '$2b$10$WjHpciTraYVP/l1PVZ0oGu6eY6lZWbOXuPKLkq8LB.7H1zQqweyYS');

INSERT INTO `dfDigital`.`user_tag` (`user_id`, `tag_id`) VALUES
((SELECT `id` FROM `dfDigital`.`user` WHERE `name` = 'João Ferreira'), (SELECT `id` FROM `dfDigital`.`tag` WHERE `name` = 'primeiro-contato')),
((SELECT `id` FROM `dfDigital`.`user` WHERE `name` = 'João Ferreira'), (SELECT `id` FROM `dfDigital`.`tag` WHERE `name` = 'finalizado')),
((SELECT `id` FROM `dfDigital`.`user` WHERE `name` = 'Nilce Silva'), (SELECT `id` FROM `dfDigital`.`tag` WHERE `name` = 'suporte')),
((SELECT `id` FROM `dfDigital`.`user` WHERE `name` = 'Nilce Silva'), (SELECT `id` FROM `dfDigital`.`tag` WHERE `name` = 'reunião')),
((SELECT `id` FROM `dfDigital`.`user` WHERE `name` = 'Pedro Nava'), (SELECT `id` FROM `dfDigital`.`tag` WHERE `name` = 'primeiro-contato'));


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;