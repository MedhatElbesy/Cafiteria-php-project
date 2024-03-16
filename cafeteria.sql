-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 16, 2024 at 01:32 PM
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
(1, 'Admin', 'User', '42f749ade7f9e195bf475f37a44cafcb', 'admin@example.com', '../images/user.png');

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
(1, 'Amr', 'Abdullah', '42f749ade7f9e195bf475f37a44cafcb', 'amro727@gmail.com', '../images/user.png', 101),
(2, 'Medhat', 'Elbesy', '42f749ade7f9e195bf475f37a44cafcb', 'medhat57@gmail.com', '../images/user.png', 201),
(3, 'Ahmed', 'Dabour', '42f749ade7f9e195bf475f37a44cafcb', 'ahmed57@gmail.com', '../images/user.png', 202),
(4, 'Khaled', 'Abdelbaset', '42f749ade7f9e195bf475f37a44cafcb', 'khaledabdelbaset98@gmail.com', '../images/user.png', 303),
(5, 'mohamed', 'AbdElAzem', '42f749ade7f9e195bf475f37a44cafcb', 'mohamed41@gmail.com', '../images/user.png', 302);

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
(342, '2024-03-16 11:03:15', 'processing', 5, 4, 303),
(343, '2024-03-16 12:02:42', 'done', 33, 3, 202),
(344, '2024-03-16 12:19:23', 'processing', 40, 4, 102);

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
(342, 22, 1, 5),
(343, 22, 1, 5),
(343, 23, 1, 8),
(343, 25, 1, 20),
(344, 21, 1, 15),
(344, 22, 1, 5),
(344, 23, 1, 8),
(344, 24, 1, 12);

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
(101, 1),
(102, 1),
(103, 1),
(104, 1),
(201, 2),
(202, 2),
(203, 2),
(301, 3),
(302, 3),
(303, 3);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=345;

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
