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
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


INSERT INTO `dfDigital`.`tag` (`name`, `description`) VALUES ('primeiro-contato', 'Etapa onde é feito o primeiro atendimento do cliente');
INSERT INTO `dfDigital`.`tag` (`name`, `description`) VALUES ('reunião', 'Etapa de interesse do cliente, reunião para alinhamento');
INSERT INTO `dfDigital`.`tag` (`name`, `description`) VALUES ('suporte', 'Etapa de auxílio ao cliente');
INSERT INTO `dfDigital`.`tag` (`name`, `description`) VALUES ('finalizado', 'Prestação concluída');

INSERT INTO `dfDigital`.`user` (`name`, `email`, `password`) VALUES ('João Ferreira', 'joaoferreira@gmail.com', 'senha123');
INSERT INTO `dfDigital`.`user` (`name`, `email`, `password`) VALUES ('Nilce Silva', 'nilcesilva@gmail.com', 'senha123');
INSERT INTO `dfDigital`.`user` (`name`, `email`, `password`) VALUES ('Pedro Nava', 'pedronava@gmail.com', 'senha123');


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;