-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jun 20, 2014 at 10:58 PM
-- Server version: 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
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
('859AA966', 'Bugatti', 'free'),
('216fdf322', 'audi', 'free');

-- --------------------------------------------------------

--
-- Table structure for table `parked`
--

CREATE TABLE IF NOT EXISTS `parked` (
  `car_id` varchar(10) CHARACTER SET utf8mb4 NOT NULL,
  `dateBegin` datetime NOT NULL,
  `localPrice` float NOT NULL,
  `locationX` float NOT NULL,
  `locationY` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
  `credit` double NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `lastName`, `firstName`, `emailAddress`, `address`, `zipCode`, `city`, `phone`, `password`, `credit`) VALUES
(1, 'ROGER', 'Nicolas', 'test@isep.fr', '18 rue des quatre vents', 75006, 'Paris', '064564563', '7c4a8d09ca3762af61e59520943dc26494f8941b', 30);

-- --------------------------------------------------------

--
-- Table structure for table `user_cars`
--

CREATE TABLE IF NOT EXISTS `user_cars` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `user_id` int(10) NOT NULL,
  `cars_id` varchar(10) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;

--
-- Dumping data for table `user_cars`
--

INSERT INTO `user_cars` (`id`, `user_id`, `cars_id`) VALUES
(4, 1, '859AA966'),
(5, 1, '216fdf322');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
