-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema customer-manager
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema customer-manager
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `customer-manager` ;
USE `customer-manager` ;

-- -----------------------------------------------------
-- Table `customer-manager`.`customer`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `customer-manager`.`customer` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(300) NOT NULL,
  `email` VARCHAR(300) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `customer-manager`.`tag`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `customer-manager`.`tag` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(150) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `customer-manager`.`customer_tag`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `customer-manager`.`customer_tag` (
  `customer_id` INT NOT NULL,
  `tag_id` INT NOT NULL,
  PRIMARY KEY (`customer_id`, `tag_id`),
  INDEX `fk_customer_tag_tag1_idx` (`tag_id` ASC) VISIBLE,
  CONSTRAINT `fk_customer_tag_customer`
    FOREIGN KEY (`customer_id`)
    REFERENCES `customer-manager`.`customer` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_customer_tag_tag1`
    FOREIGN KEY (`tag_id`)
    REFERENCES `customer-manager`.`tag` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
