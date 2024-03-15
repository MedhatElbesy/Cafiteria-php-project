-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 15, 2024 at 11:06 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cafeteria`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `fname` varchar(255) DEFAULT NULL,
  `lname` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `fname`, `lname`, `password`, `email`, `img`) VALUES
(1, 'Admin', 'User', 'e10adc3949ba59abbe56e057f20f883e', 'admin@example.com', '../images/user.png');

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `img` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `name`, `img`) VALUES
(4, 'Hot Drinks', '../images/categories/hot-drink.png'),
(5, 'Juice', '../images/categories/5.jpg'),
(6, 'Pizza', '../images/categories/6.jpg'),
(7, 'Sandwiches', '../images/categories/7.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `id` int(11) NOT NULL,
  `fname` varchar(255) DEFAULT NULL,
  `lname` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  `room` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`id`, `fname`, `lname`, `password`, `email`, `img`, `room`) VALUES
(1, 'John', 'Doe', '42f749ade7f9e195bf475f37a44cafcb', 'john.doe@example.com', '../images/user.png', 1),
(2, 'Jane', 'Smith', '42f749ade7f9e195bf475f37a44cafcb', 'jane.smith@example.com', '../images/user.png', 2),
(3, 'Bob', 'Johnson', '42f749ade7f9e195bf475f37a44cafcb', '6c19dc5249@emailabox.pro', '../images/user.png', 3),
(4, 'khaled', 'abdelbaset', '42f749ade7f9e195bf475f37a44cafcb', 'khaledabdelbaset98@gmail.com', 'user.png', 1);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `order_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` enum('processing','done','in delivery') DEFAULT NULL,
  `total_price` decimal(10,0) NOT NULL,
  `customers_id` int(11) DEFAULT NULL,
  `room` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `order_date`, `status`, `total_price`, `customers_id`, `room`) VALUES
(274, '2024-03-13 15:52:24', 'done', 1350, 1, 2),
(276, '2024-03-13 15:55:09', 'processing', 200, 1, 2),
(281, '2024-03-14 12:10:28', 'processing', 150, 1, 2),
(282, '2024-03-14 13:51:19', 'processing', 1200, 1, 2),
(283, '2024-03-14 13:57:13', 'processing', 870, 1, 2),
(285, '2024-03-14 14:06:30', 'processing', 1400, 1, 2),
(286, '2024-03-14 20:19:19', 'processing', 800, 1, 2),
(287, '2024-03-14 21:14:26', 'processing', 1600, 1, 2),
(288, '2024-03-14 21:15:13', 'processing', 800, 1, 2),
(289, '2024-03-14 22:28:38', 'processing', 50, 1, 1),
(290, '2024-03-14 22:28:56', 'processing', 150, 1, 1),
(292, '2024-03-14 23:01:44', 'processing', 50, 1, 3),
(294, '2024-03-14 23:24:35', 'processing', 1420, 1, 1),
(296, '2024-03-15 00:09:47', 'processing', 550, 1, 2),
(298, '2024-03-15 02:08:50', 'processing', 1550, 1, 1),
(299, '2024-03-15 02:09:12', 'processing', 1770, 2, 3),
(300, '2024-03-15 12:30:46', 'processing', 50, 1, 1),
(301, '2024-03-15 13:28:16', 'processing', 1000, 1, 1),
(302, '2024-03-15 13:28:39', 'processing', 1620, 1, 1),
(322, '2024-03-15 19:49:09', 'processing', 8, 2, 2),
(323, '2024-03-15 19:49:47', 'processing', 25, 1, 1),
(324, '2024-03-15 19:50:15', 'processing', 25, 1, 1),
(325, '2024-03-15 19:50:45', 'processing', 21, 1, 1),
(326, '2024-03-15 19:51:48', 'processing', 35, 2, 2),
(327, '2024-03-15 19:52:36', 'processing', 28, 1, 1),
(328, '2024-03-15 19:52:46', 'processing', 28, 2, 2),
(329, '2024-03-15 19:53:01', 'processing', 25, 1, 1),
(330, '2024-03-15 20:03:36', 'processing', 35, 1, 1),
(331, '2024-03-15 21:02:50', 'processing', 13, 2, 2),
(333, '2024-03-15 21:31:17', 'processing', 32, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `order_product`
--

CREATE TABLE `order_product` (
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price_unit` decimal(10,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_product`
--

INSERT INTO `order_product` (`order_id`, `product_id`, `quantity`, `price_unit`) VALUES
(322, 23, 1, 8),
(323, 22, 1, 5),
(323, 23, 1, 8),
(323, 24, 1, 12),
(324, 22, 1, 5),
(324, 23, 1, 8),
(324, 24, 1, 12),
(325, 22, 1, 5),
(325, 23, 2, 8),
(326, 21, 1, 15),
(326, 23, 1, 8),
(326, 24, 1, 12),
(327, 21, 1, 15),
(327, 22, 1, 5),
(327, 23, 1, 8),
(328, 21, 1, 15),
(328, 22, 1, 5),
(328, 23, 1, 8),
(329, 22, 1, 5),
(329, 23, 1, 8),
(329, 24, 1, 12),
(330, 21, 1, 15),
(330, 23, 1, 8),
(330, 24, 1, 12),
(331, 22, 1, 5),
(331, 23, 1, 8),
(333, 23, 1, 8),
(333, 24, 2, 12);

--
-- Triggers `order_product`
--
DELIMITER $$
CREATE TRIGGER `update_total_price_delete` AFTER DELETE ON `order_product` FOR EACH ROW BEGIN
    DECLARE total DECIMAL(10, 2);

    SELECT SUM(quantity * price_unit)
    INTO total
    FROM order_product
    WHERE order_id = OLD.order_id;

    UPDATE orders
    SET total_price = total
    WHERE id = OLD.order_id;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `update_total_price_insert` AFTER INSERT ON `order_product` FOR EACH ROW BEGIN
    DECLARE total DECIMAL(10, 2);

    SELECT SUM(quantity * price_unit)
    INTO total
    FROM order_product
    WHERE order_id = NEW.order_id;

    UPDATE orders
    SET total_price = total
    WHERE id = NEW.order_id;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `update_total_price_update` AFTER UPDATE ON `order_product` FOR EACH ROW BEGIN
    DECLARE total DECIMAL(10, 2);

    SELECT SUM(quantity * price_unit)
    INTO total
    FROM order_product
    WHERE order_id = NEW.order_id;

    UPDATE orders
    SET total_price = total
    WHERE id = NEW.order_id;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `img` varchar(100) DEFAULT NULL,
  `name` varchar(100) NOT NULL,
  `price` decimal(10,0) DEFAULT NULL,
  `available` enum('available','non available') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `category_id`, `img`, `name`, `price`, `available`) VALUES
(21, 4, '../images/products/21.jpg', 'Coffee', 15, 'available'),
(22, 4, '../images/products/22.jpg', 'Tea', 5, 'available'),
(23, 4, '../images/products/23.jpg', 'Green Tea', 8, 'available'),
(24, 5, '../images/products/24.jpg', 'Orange Juice', 12, 'available'),
(25, 5, '../images/products/25.jpg', 'Mango Juice', 20, 'available'),
(26, 5, '../images/products/26.jpg', 'Strawberry Juice', 18, 'available'),
(27, 6, '../images/products/27.jpg', 'Meat Pizza', 50, 'available'),
(28, 6, '../images/products/28.jpg', 'Vegetables Pizza', 45, 'available'),
(29, 6, '../images/products/29.jpg', 'Cheese Pizza', 45, 'available'),
(30, 7, '../images/products/30.jpg', 'Burger', 25, 'available'),
(31, 7, '../images/products/31.jpg', 'Hot Dog', 20, 'available'),
(32, 7, '../images/products/32.jpg', 'Falafel', 18, 'available');

-- --------------------------------------------------------

--
-- Table structure for table `rooms`
--

CREATE TABLE `rooms` (
  `id` int(11) NOT NULL,
  `extNumber` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `rooms`
--

INSERT INTO `rooms` (`id`, `extNumber`) VALUES
(1, 1),
(2, 102),
(3, 103);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `room` (`room`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_orders_customers` (`customers_id`),
  ADD KEY `room` (`room`);

--
-- Indexes for table `order_product`
--
ALTER TABLE `order_product`
  ADD PRIMARY KEY (`order_id`,`product_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_category` (`category_id`);

--
-- Indexes for table `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=334;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `customers`
--
ALTER TABLE `customers`
  ADD CONSTRAINT `customers_ibfk_1` FOREIGN KEY (`room`) REFERENCES `rooms` (`id`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `fk_orders_customers` FOREIGN KEY (`customers_id`) REFERENCES `customers` (`id`),
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`room`) REFERENCES `rooms` (`id`);

--
-- Constraints for table `order_product`
--
ALTER TABLE `order_product`
  ADD CONSTRAINT `c_order_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `c_order_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `fk_category` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
