-- phpMyAdmin SQL Dump
-- version 3.5.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: May 23, 2014 at 12:00 PM
-- Server version: 5.5.24-log
-- PHP Version: 5.4.3

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `parcmetres`
--

-- --------------------------------------------------------

--
-- Table structure for table `car`
--

CREATE TABLE IF NOT EXISTS `car` (
  `id` varchar(20) NOT NULL,
  `name` varchar(30) NOT NULL,
  `status` varchar(20) NOT NULL DEFAULT 'free'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `car`
--

INSERT INTO `car` (`id`, `name`, `status`) VALUES
('859AA966', 'ferrari', 'free');

-- --------------------------------------------------------

--
-- Table structure for table `parked`
--

CREATE TABLE IF NOT EXISTS `parked` (
  `car_id` varchar(10) NOT NULL,
  `dateBegin` datetime NOT NULL,
  `localPrice` float NOT NULL,
  `locationX` float NOT NULL,
  `locationY` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `lastName` varchar(30) NOT NULL,
  `firstName` varchar(30) NOT NULL,
  `emailAddress` varchar(50) NOT NULL,
  `address` varchar(50) NOT NULL,
  `zipCode` int(6) NOT NULL,
  `city` varchar(20) NOT NULL,
  `phone` varchar(12) NOT NULL,
  `password` varchar(40) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `lastName`, `firstName`, `emailAddress`, `address`, `zipCode`, `city`, `phone`, `password`) VALUES
(1, 'ROGER', 'Nicolas', 'bellerauphon@hotmail.fr', '18 rue des quatre vents', 75006, 'Paris', '064564563', '7c4a8d09ca3762af61e59520943dc26494f8941b');

-- --------------------------------------------------------

--
-- Table structure for table `user_cars`
--

CREATE TABLE IF NOT EXISTS `user_cars` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `user_id` int(10) NOT NULL,
  `cars_id` varchar(10) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `user_cars`
--

INSERT INTO `user_cars` (`id`, `user_id`, `cars_id`) VALUES
(1, 1, '859AA966');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
