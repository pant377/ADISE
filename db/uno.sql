-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 25, 2019 at 08:29 PM
-- Server version: 10.4.10-MariaDB
-- PHP Version: 7.1.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `uno`
--

DELIMITER $$
--
-- Procedures
--
DROP PROCEDURE IF EXISTS `beginGame`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `beginGame` ()  BEGIN
DECLARE tempid tinyint;
DECLARE counter tinyint;
DELETE FROM clonedeck;
DELETE FROM hand;
REPLACE INTO clonedeck SELECT * FROM carddeck;
SET counter = 0;
WHILE(counter < 7) DO
	SELECT cardId INTO tempid FROM clonedeck ORDER BY RAND() LIMIT 1;
    INSERT INTO hand(playerId, cardId) VALUES (1, tempid);
    DELETE FROM clonedeck WHERE cardId = tempid;
    SELECT cardId INTO tempid FROM clonedeck ORDER BY RAND() LIMIT 1;
    INSERT INTO hand(playerId, cardId) VALUES (2, tempid);
    DELETE FROM clonedeck WHERE cardId = tempid;
    SET counter = counter + 1;
END WHILE;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `carddeck`
--

DROP TABLE IF EXISTS `carddeck`;
CREATE TABLE `carddeck` (
  `cardId` tinyint(4) NOT NULL,
  `cardCode` varchar(10) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `carddeck`
--

INSERT INTO `carddeck` (`cardId`, `cardCode`) VALUES
(1, 'r0'),
(2, 'r1'),
(3, 'r1'),
(4, 'r2'),
(5, 'r2'),
(6, 'r3'),
(7, 'r3'),
(8, 'r4'),
(9, 'r4'),
(10, 'r5'),
(11, 'r5'),
(12, 'r6'),
(13, 'r6'),
(14, 'r7'),
(15, 'r7'),
(16, 'r8'),
(17, 'r8'),
(18, 'r9'),
(19, 'r9'),
(20, 'y0'),
(21, 'y1'),
(22, 'y1'),
(23, 'y2'),
(24, 'y2'),
(25, 'y3'),
(26, 'y3'),
(27, 'y4'),
(28, 'y4'),
(29, 'y5'),
(30, 'y5'),
(31, 'y6'),
(32, 'y6'),
(33, 'y7'),
(34, 'y7'),
(35, 'y8'),
(36, 'y8'),
(37, 'y9'),
(38, 'y9'),
(39, 'b0'),
(40, 'b1'),
(41, 'b1'),
(42, 'b2'),
(43, 'b2'),
(44, 'b3'),
(45, 'b3'),
(46, 'b4'),
(47, 'b4'),
(48, 'b5'),
(49, 'b5'),
(50, 'b6'),
(51, 'b6'),
(52, 'b7'),
(53, 'b7'),
(54, 'b8'),
(55, 'b8'),
(56, 'b9'),
(57, 'b9'),
(58, 'g0'),
(59, 'g1'),
(60, 'g1'),
(61, 'g2'),
(62, 'g2'),
(63, 'g3'),
(64, 'g3'),
(65, 'g4'),
(66, 'g4'),
(67, 'g5'),
(68, 'g5'),
(69, 'g6'),
(70, 'g6'),
(71, 'g7'),
(72, 'g7'),
(73, 'g8'),
(74, 'g8'),
(75, 'g9'),
(76, 'g9'),
(77, '+2r'),
(78, '+2r'),
(79, '+2y'),
(80, '+2y'),
(81, '+2b'),
(82, '+2b'),
(83, '+2g'),
(84, '+2g'),
(85, 'revR'),
(86, 'revR'),
(87, 'revY'),
(88, 'revY'),
(89, 'revB'),
(90, 'revB'),
(91, 'revG'),
(92, 'revG'),
(93, 'skiR'),
(94, 'skiR'),
(95, 'skiY'),
(96, 'skiY'),
(97, 'skiB'),
(98, 'skiB'),
(99, 'skiG'),
(100, 'skiG'),
(101, 'chCol'),
(102, 'chCol'),
(103, 'chCol'),
(104, 'chCol'),
(105, 'chCol'),
(106, 'chCol'),
(107, 'chCol'),
(108, 'chCol');

-- --------------------------------------------------------

--
-- Table structure for table `clonedeck`
--

DROP TABLE IF EXISTS `clonedeck`;
CREATE TABLE `clonedeck` (
  `cardId` tinyint(4) NOT NULL,
  `cardCode` varchar(10) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `clonedeck`
--

INSERT INTO `clonedeck` (`cardId`, `cardCode`) VALUES
(1, 'r0'),
(2, 'r1'),
(3, 'r1'),
(4, 'r2'),
(5, 'r2'),
(6, 'r3'),
(7, 'r3'),
(9, 'r4'),
(10, 'r5'),
(12, 'r6'),
(13, 'r6'),
(14, 'r7'),
(16, 'r8'),
(17, 'r8'),
(18, 'r9'),
(19, 'r9'),
(20, 'y0'),
(21, 'y1'),
(22, 'y1'),
(23, 'y2'),
(24, 'y2'),
(25, 'y3'),
(26, 'y3'),
(28, 'y4'),
(29, 'y5'),
(30, 'y5'),
(32, 'y6'),
(33, 'y7'),
(34, 'y7'),
(35, 'y8'),
(36, 'y8'),
(37, 'y9'),
(38, 'y9'),
(39, 'b0'),
(40, 'b1'),
(41, 'b1'),
(44, 'b3'),
(45, 'b3'),
(46, 'b4'),
(47, 'b4'),
(48, 'b5'),
(49, 'b5'),
(50, 'b6'),
(51, 'b6'),
(52, 'b7'),
(54, 'b8'),
(57, 'b9'),
(58, 'g0'),
(59, 'g1'),
(61, 'g2'),
(62, 'g2'),
(63, 'g3'),
(64, 'g3'),
(65, 'g4'),
(67, 'g5'),
(68, 'g5'),
(69, 'g6'),
(71, 'g7'),
(72, 'g7'),
(73, 'g8'),
(74, 'g8'),
(75, 'g9'),
(76, 'g9'),
(77, '+2r'),
(78, '+2r'),
(79, '+2y'),
(80, '+2y'),
(81, '+2b'),
(82, '+2b'),
(83, '+2g'),
(84, '+2g'),
(85, 'revR'),
(86, 'revR'),
(87, 'revY'),
(89, 'revB'),
(90, 'revB'),
(91, 'revG'),
(92, 'revG'),
(93, 'skiR'),
(94, 'skiR'),
(95, 'skiY'),
(96, 'skiY'),
(97, 'skiB'),
(98, 'skiB'),
(99, 'skiG'),
(100, 'skiG'),
(102, 'chCol'),
(103, 'chCol'),
(104, 'chCol'),
(105, 'chCol'),
(106, 'chCol'),
(107, 'chCol'),
(108, 'chCol');

-- --------------------------------------------------------

--
-- Table structure for table `hand`
--

DROP TABLE IF EXISTS `hand`;
CREATE TABLE `hand` (
  `playerId` int(6) NOT NULL,
  `cardId` int(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `hand`
--

INSERT INTO `hand` (`playerId`, `cardId`) VALUES
(1, 11),
(2, 56),
(1, 27),
(2, 70),
(1, 8),
(2, 53),
(1, 31),
(2, 43),
(1, 101),
(2, 66),
(1, 42),
(2, 55),
(1, 15),
(2, 88);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `carddeck`
--
ALTER TABLE `carddeck`
  ADD PRIMARY KEY (`cardId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
