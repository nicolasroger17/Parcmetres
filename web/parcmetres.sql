-- phpMyAdmin SQL Dump
-- version 3.5.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: May 17, 2014 at 02:15 PM
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
-- Table structure for table `cars`
--

CREATE TABLE IF NOT EXISTS `cars` (
  `registrationPlate` varchar(20) CHARACTER SET utf8 NOT NULL,
  `name` varchar(30) CHARACTER SET utf8 NOT NULL,
  `status` varchar(20) CHARACTER SET utf8 NOT NULL DEFAULT 'free'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `cars`
--

INSERT INTO `cars` (`registrationPlate`, `name`, `status`) VALUES
('859AA966', 'ferrari', 'free');

-- --------------------------------------------------------

--
-- Table structure for table `parked`
--

CREATE TABLE IF NOT EXISTS `parked` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `registrationPlate` varchar(10) NOT NULL,
  `userId` int(10) NOT NULL,
  `dateBegin` datetime NOT NULL,
  `dateEnd` datetime NOT NULL,
  `localPrice` int(10) NOT NULL,
  `locationX` int(10) NOT NULL,
  `locationY` int(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `usercar`
--

CREATE TABLE IF NOT EXISTS `usercar` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `userId` int(10) NOT NULL,
  `registrationPlate` varchar(10) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `usercar`
--

INSERT INTO `usercar` (`id`, `userId`, `registrationPlate`) VALUES
(1, 1, '859AA966');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `lastName` varchar(30) NOT NULL,
  `firstName` varchar(30) NOT NULL,
  `emailAddress` varchar(50) NOT NULL,
  `address` varchar(50) NOT NULL,
  `zipCode` int(6) NOT NULL,
  `phone` varchar(12) NOT NULL,
  `password` varchar(40) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `lastName`, `firstName`, `emailAddress`, `address`, `zipCode`, `phone`, `password`) VALUES
(1, 'ROGER', 'Nicolas', 'bellerauphon@hotmail.fr', '18 rue des quatre vents', 75006, '064564563', '7c4a8d09ca3762af61e59520943dc26494f8941b');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
