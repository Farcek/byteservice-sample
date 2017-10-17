CREATE TABLE `%s` (
  `id` varchar(45) NOT NULL,
  `app` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `password` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `confirmed` int(11) DEFAULT NULL,
  `create_at` datetime DEFAULT NULL,
  `login_at` datetime DEFAULT NULL,
  `beforelogin_at` datetime DEFAULT NULL,
  `roles` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
