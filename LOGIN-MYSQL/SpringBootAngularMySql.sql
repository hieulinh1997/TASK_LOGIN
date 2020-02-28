create database SpringBootAngularMySql;
use SpringBootAngularMySql;

DROP TABLE IF EXISTS `USER`;
CREATE TABLE  `USER` (
  `id` int primary key,
  `email` varchar(255) ,
  `name` varchar(255) ,
  `password` varchar(255) ,
  `role` varchar(255) 
);
INSERT INTO `USER` (`id`, `email`, `name`, `password`, `role`) VALUES
(1, 'lhlinh@gmail.com', 'lhlinh', '30f24c4b537b992f53566483dc8f6785925aec910b24de40460c316e7b705fb0', 'admin');

-- username: lhlinh@gmail.com
-- password: lhlinh
--