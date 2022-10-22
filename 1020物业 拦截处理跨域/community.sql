/*
 Navicat Premium Data Transfer

 Source Server         : 标哥的远程数据库
 Source Server Type    : MySQL
 Source Server Version : 50709
 Source Host           : www.softeem.xin:3306
 Source Schema         : community

 Target Server Type    : MySQL
 Target Server Version : 50709
 File Encoding         : 65001

 Date: 22/10/2022 13:12:04
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for admininfo
-- ----------------------------
DROP TABLE IF EXISTS `admininfo`;
CREATE TABLE `admininfo`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `adminname` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `adminpwd` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `adminemail` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `admintel` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `adminstatus` int(11) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 52 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of admininfo
-- ----------------------------
INSERT INTO `admininfo` VALUES (1, 'lhy', '123456', '123456@qq.com', '123', 123);
INSERT INTO `admininfo` VALUES (3, '隗', '12345', '12312@qq.com', '123123', 0);
INSERT INTO `admininfo` VALUES (4, '江三', '123456', '123@qq.com', '15504655046', 1);
INSERT INTO `admininfo` VALUES (5, '李书豪2', '123456', '465@qq', '15179641344', 5);
INSERT INTO `admininfo` VALUES (6, 'crf', '123456', '224@qq.com', '1582828329', 0);
INSERT INTO `admininfo` VALUES (7, '陈润福', '123456', '224@qq.com', '15828283291', 0);
INSERT INTO `admininfo` VALUES (8, '赵蕊', '123', '17777777777@qq.com', '17777777777', 0);
INSERT INTO `admininfo` VALUES (9, 'chen', '123456', '123@abc.com', '13837898976', 1);
INSERT INTO `admininfo` VALUES (11, '韩宏🐏', '123456', '12233@163.com', '18888888888', 0);
INSERT INTO `admininfo` VALUES (13, '黄勤', '123', '110@xyz.com', '119', 1);
INSERT INTO `admininfo` VALUES (19, '郝柏林', 'abc123', '123@qq.com', '123655', 222);
INSERT INTO `admininfo` VALUES (22, '洪延军', '123456', '123456432456@qq.com', '15623807162', 0);
INSERT INTO `admininfo` VALUES (23, '汤俊豪', '123456', '1212121@qq.com', '15172227901', 0);
INSERT INTO `admininfo` VALUES (24, 'lxy', '123456', '123@qq.com', '19922223333', 1);
INSERT INTO `admininfo` VALUES (26, '李心悦', '123456', '123@qq.com', '19922223333', 1);
INSERT INTO `admininfo` VALUES (27, '宇将军', '123456', '666@qq.com', '666888', 0);
INSERT INTO `admininfo` VALUES (28, '曹慧', '12345', '123@abc.com', '13467829876', 1223);
INSERT INTO `admininfo` VALUES (29, '万雨龙', '16111', '20221017@qq.conm', '132454', 1);
INSERT INTO `admininfo` VALUES (30, '汪俊辉', '123456', '123@qq.com', '15966668888', 1);
INSERT INTO `admininfo` VALUES (31, '王泽冰', '123333', '2640534088@qq.com', '123', 0);
INSERT INTO `admininfo` VALUES (32, 'adminxjc', '121314', '123@qq.com', '123324343', 1);
INSERT INTO `admininfo` VALUES (33, '占雄志', '1232423423', '123123@qq.con', '1231231231', 0);
INSERT INTO `admininfo` VALUES (34, '黄相立', '123456', '3432@qq.com', '33454353', 3);
INSERT INTO `admininfo` VALUES (35, '郝柏林', 'abc123', '123@qq.com', '123655', 222);
INSERT INTO `admininfo` VALUES (36, '林俊杰', '123456', '123456@qq.com', '123456789', 0);
INSERT INTO `admininfo` VALUES (38, '岳小方', '010805', '123@qq.com', '110', 0);
INSERT INTO `admininfo` VALUES (40, '陈韩家', '123456', '123@qq.com', '123', 123);
INSERT INTO `admininfo` VALUES (41, '黄相立', '123456', '3432@qq.com', '33454353', 3);
INSERT INTO `admininfo` VALUES (42, '万金保', '123456', '333@abc.com', '18888888888', 0);
INSERT INTO `admininfo` VALUES (43, '曹方', '123456', '128@qq.com', '15888888888', 0);
INSERT INTO `admininfo` VALUES (45, '何祥宇', '123456', 'aaa@qq.com', '12345678900', 666);
INSERT INTO `admininfo` VALUES (51, '郝柏林', 'abc123456', '123@qq.com', '123655', 222);

-- ----------------------------
-- Table structure for costinfo
-- ----------------------------
DROP TABLE IF EXISTS `costinfo`;
CREATE TABLE `costinfo`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `roomid` int(11) NOT NULL,
  `costid` int(11) NOT NULL,
  `paytime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `count` double NOT NULL,
  `price` decimal(10, 2) NOT NULL,
  `totalmoney` decimal(10, 2) NOT NULL,
  `paytype` int(11) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `roomid`(`roomid`) USING BTREE,
  INDEX `costid`(`costid`) USING BTREE,
  CONSTRAINT `costinfo_ibfk_1` FOREIGN KEY (`roomid`) REFERENCES `roominfo` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `costinfo_ibfk_2` FOREIGN KEY (`costid`) REFERENCES `costtype` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 162 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of costinfo
-- ----------------------------
INSERT INTO `costinfo` VALUES (1, 49, 170, '2001-04-21 00:00:00', 38, 250.00, 2522.00, 2);
INSERT INTO `costinfo` VALUES (34, 84, 148, '2022-10-17 07:20:38', 2, 10086.00, 20172.00, 1);
INSERT INTO `costinfo` VALUES (43, 11, 161, '2022-10-17 00:00:00', 200, 100.00, 100.00, 1);
INSERT INTO `costinfo` VALUES (51, 23, 148, '2022-10-17 15:31:23', 1, 10.00, 10.00, 10);
INSERT INTO `costinfo` VALUES (63, 55, 148, '2009-01-05 00:00:00', 44, 440.00, 666.00, 5);
INSERT INTO `costinfo` VALUES (65, 6, 168, '2022-10-17 00:00:00', 2, 100.00, 1000.00, 1);
INSERT INTO `costinfo` VALUES (73, 23, 148, '2022-10-17 00:00:00', 1, 10.00, 10.00, 10);
INSERT INTO `costinfo` VALUES (75, 18, 174, '2001-05-20 00:00:00', 666, 150.00, 150.00, 6);
INSERT INTO `costinfo` VALUES (84, 48, 176, '2022-10-17 16:04:11', 3, 999.00, 3442.00, 1);
INSERT INTO `costinfo` VALUES (92, 52, 164, '2022-10-17 00:00:00', 10, 20.00, 200.00, 1);
INSERT INTO `costinfo` VALUES (95, 18, 168, '1999-09-08 00:00:00', 66, 88.00, 88888.00, 0);
INSERT INTO `costinfo` VALUES (96, 23, 148, '2022-10-17 00:00:00', 1, 10.00, 10.00, 10);
INSERT INTO `costinfo` VALUES (100, 50, 170, '1999-09-12 00:00:00', 8, 1688.88, 1688.88, 0);
INSERT INTO `costinfo` VALUES (106, 36, 148, '2022-10-17 00:00:00', 23, 1200.00, 200.00, 0);
INSERT INTO `costinfo` VALUES (112, 69, 164, '2022-10-17 00:00:00', 1, 10.00, 10.00, 6);
INSERT INTO `costinfo` VALUES (116, 69, 164, '2022-10-17 00:00:00', 1, 10.00, 10.00, 6);
INSERT INTO `costinfo` VALUES (122, 92, 181, '2022-10-17 17:11:13', 3, 80.00, 240.00, 1);
INSERT INTO `costinfo` VALUES (123, 69, 164, '2022-10-17 00:00:00', 1, 10.00, 22.00, 1);
INSERT INTO `costinfo` VALUES (125, 82, 175, '2008-02-05 00:00:00', 23.7, 123.00, 2374.00, 233);
INSERT INTO `costinfo` VALUES (127, 6, 168, '2022-10-17 00:00:00', 2, 100.00, 1000.00, 1);
INSERT INTO `costinfo` VALUES (129, 107, 180, '2022-10-17 00:00:00', 2, 100.00, 1000.00, 1);
INSERT INTO `costinfo` VALUES (135, 50, 148, '2000-01-05 00:00:00', 56, 300.00, 1000.00, 225);
INSERT INTO `costinfo` VALUES (136, 55, 148, '2009-01-05 00:00:00', 44, 440.00, 666.00, 5);
INSERT INTO `costinfo` VALUES (137, 55, 148, '2009-01-05 00:00:00', 44, 440.00, 666.00, 5);
INSERT INTO `costinfo` VALUES (138, 55, 148, '2009-01-05 00:00:00', 44, 440.00, 666.00, 5);
INSERT INTO `costinfo` VALUES (139, 55, 148, '2009-01-05 00:00:00', 44, 440.00, 666.00, 5);
INSERT INTO `costinfo` VALUES (140, 55, 148, '2009-01-05 00:00:00', 44, 440.00, 666.00, 5);
INSERT INTO `costinfo` VALUES (141, 55, 148, '2009-01-05 00:00:00', 44, 440.00, 666.00, 5);
INSERT INTO `costinfo` VALUES (142, 55, 148, '2009-01-05 00:00:00', 44, 440.00, 666.00, 5);
INSERT INTO `costinfo` VALUES (143, 55, 148, '2009-01-05 00:00:00', 44, 440.00, 666.00, 5);
INSERT INTO `costinfo` VALUES (144, 55, 148, '2009-01-05 00:00:00', 44, 440.00, 666.00, 5);
INSERT INTO `costinfo` VALUES (145, 55, 148, '2009-01-05 00:00:00', 44, 440.00, 666.00, 5);
INSERT INTO `costinfo` VALUES (146, 111, 191, '2009-01-05 00:00:00', 44, 440.00, 666.00, 5);
INSERT INTO `costinfo` VALUES (147, 112, 192, '2001-09-01 00:00:00', 91.91, 123.91, 2374.91, 233);
INSERT INTO `costinfo` VALUES (148, 40, 148, '2022-10-11 19:35:49', 2, 23.00, 46.00, 4);
INSERT INTO `costinfo` VALUES (150, 25, 187, '2022-10-17 00:00:00', 1, 2000.00, 3500.00, 0);
INSERT INTO `costinfo` VALUES (152, 109, 185, '2022-10-17 12:01:28', 2, 1280.00, 2560.00, 0);
INSERT INTO `costinfo` VALUES (153, 58, 167, '2022-10-17 00:00:00', 1, 10.00, 3333.00, 0);
INSERT INTO `costinfo` VALUES (154, 58, 167, '2022-10-17 20:55:57', 5, 100.00, 500.00, 0);
INSERT INTO `costinfo` VALUES (155, 58, 167, '2022-10-17 21:22:35', 5, 100.00, 500.00, 0);
INSERT INTO `costinfo` VALUES (156, 58, 167, '2022-10-17 21:24:42', 5, 100.00, 500.00, 0);
INSERT INTO `costinfo` VALUES (157, 91, 172, '2022-10-18 00:59:52', 3, 80.00, 12000.00, 0);
INSERT INTO `costinfo` VALUES (159, 109, 185, '2022-10-17 12:01:28', 2, 1280.00, 2560.00, 0);
INSERT INTO `costinfo` VALUES (161, 120, 208, '2022-10-18 11:21:13', 3, 100.00, 300.00, 0);

-- ----------------------------
-- Table structure for costtype
-- ----------------------------
DROP TABLE IF EXISTS `costtype`;
CREATE TABLE `costtype`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `costname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `price` decimal(10, 2) NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 219 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of costtype
-- ----------------------------
INSERT INTO `costtype` VALUES (148, '各回各家', 100.00, 'ghjgjhg');
INSERT INTO `costtype` VALUES (159, '电费', 0.75, 'zzz设置的水费');
INSERT INTO `costtype` VALUES (161, '水费', 100.00, '万雨龙交的水费');
INSERT INTO `costtype` VALUES (163, '车位小费', 100.00, 'soso');
INSERT INTO `costtype` VALUES (164, '电费', 0.75, 'cff设置的水费');
INSERT INTO `costtype` VALUES (167, '开门费', 100.00, '两条华子');
INSERT INTO `costtype` VALUES (168, '保护费', 100.00, '汪俊辉上交给标哥的贡品费');
INSERT INTO `costtype` VALUES (169, '电费', 200.00, '许才⑦生活的电费');
INSERT INTO `costtype` VALUES (170, '电费', 120.00, '赵蕊交的电费120元');
INSERT INTO `costtype` VALUES (171, '天然气费', 1.00, '黄相立的煤气费');
INSERT INTO `costtype` VALUES (172, '标哥的保护费123123', 100.00, '标哥哥自己的保护费用');
INSERT INTO `costtype` VALUES (173, '网费', 80.00, '交网费辣');
INSERT INTO `costtype` VALUES (174, '标哥的保护费123123', 100.00, '标哥哥自己的保护费用');
INSERT INTO `costtype` VALUES (175, '标哥的保护费', 100.00, '标哥哥自己的保护费用');
INSERT INTO `costtype` VALUES (176, '水电费', 100.00, '这是占雄志的水电费100元');
INSERT INTO `costtype` VALUES (177, '水费', 15.00, '陈文交的水费');
INSERT INTO `costtype` VALUES (178, '569', 666.00, '保护费用');
INSERT INTO `costtype` VALUES (179, '标哥的保护费123123', 100.00, '标哥哥自己的保护费用');
INSERT INTO `costtype` VALUES (180, '保护费3.0', 2.00, '这是保护费');
INSERT INTO `costtype` VALUES (181, '电费', 0.50, '贺锐设置的电费');
INSERT INTO `costtype` VALUES (182, '天然气费', 1.00, '黄相立的煤气费');
INSERT INTO `costtype` VALUES (183, '标哥的保护费123123', 100.00, '标哥哥自己的保护费用');
INSERT INTO `costtype` VALUES (185, '水费', 5500.00, '易烊千玺女友交的水费');
INSERT INTO `costtype` VALUES (186, '缴纳的电费（继承BaseService）', 120.00, '凤凰花园的电费1元1度，贼坑！');
INSERT INTO `costtype` VALUES (187, '缴纳的电费（继承BaseService）', 120.00, '凤凰花园的电费1元1度，贼坑！');
INSERT INTO `costtype` VALUES (188, '水费', 255.21, '细伟的保护费');
INSERT INTO `costtype` VALUES (190, '相亲费', 199.00, '陈润福的相亲费用');
INSERT INTO `costtype` VALUES (191, '水费', 988.00, '才奇设电费');
INSERT INTO `costtype` VALUES (192, '影视收入', 91.00, '91大神张木亘的影视收入');
INSERT INTO `costtype` VALUES (194, '看门费', 50.00, '防止有人爬进家');
INSERT INTO `costtype` VALUES (198, '电费', 120.00, '赵蕊交的电费120元');
INSERT INTO `costtype` VALUES (200, '水费', 50.00, '万金保的水费');
INSERT INTO `costtype` VALUES (202, '水费', 15.00, '陈文交的水费');
INSERT INTO `costtype` VALUES (203, '水电费', 500.00, '422交的水电费');
INSERT INTO `costtype` VALUES (204, '陈征的保护费123123', 100.00, '陈征的保护费用');
INSERT INTO `costtype` VALUES (207, '赵蕊的电费', 100.00, '测试电费的添加');
INSERT INTO `costtype` VALUES (208, '燃气费', 5.00, '贺锐设置的燃气费');
INSERT INTO `costtype` VALUES (209, '标哥的小费', 18.00, '测试标哥的小费添加');
INSERT INTO `costtype` VALUES (210, '保护费5.0', 100.00, '交保护费了');
INSERT INTO `costtype` VALUES (211, '水费', 18.00, '陈文交的水费');
INSERT INTO `costtype` VALUES (212, '包养费', 18.00, '爱吃小熊饼干，迎娶业主小丹');
INSERT INTO `costtype` VALUES (215, '网费', 19.90, '戒网瘾费');
INSERT INTO `costtype` VALUES (216, '422的水电费', 200.00, '测试422的水电费');
INSERT INTO `costtype` VALUES (218, '电费', 88.00, '网无无');

-- ----------------------------
-- Table structure for roominfo
-- ----------------------------
DROP TABLE IF EXISTS `roominfo`;
CREATE TABLE `roominfo`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `roomname` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `roomarea` double NOT NULL,
  `ownername` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `ownersex` varchar(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `IDCard` varchar(18) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `telephone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `roomstatus` int(11) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 124 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of roominfo
-- ----------------------------
INSERT INTO `roominfo` VALUES (6, '1-1-106', 6777, '0', '男', '420312199505018726', '18520217515', 'hhhhh@qq.com', 1);
INSERT INTO `roominfo` VALUES (11, '1-1-101', 100, '0', '男', '42058319990303003X', '18888888888', 'xxxiaohanxxx163.com', 0);
INSERT INTO `roominfo` VALUES (13, '1-1-103', 100, '0', '男', '123123123', '123123123', '23123123', 1);
INSERT INTO `roominfo` VALUES (17, '1-2', 80, '0', '男', '12318793', '1373672', '1928271@qq.com', 6);
INSERT INTO `roominfo` VALUES (18, '1-3-312', 120, '0', '男', '420801200101010101', '188888888888', '999999999@qq.com', 0);
INSERT INTO `roominfo` VALUES (20, '1-1-666', 666, '0', '男', '421023666666668333', '66666666666', 'abc@abc.com', 11);
INSERT INTO `roominfo` VALUES (23, '3-1-110', 1000, '0', '男', '420999199909081716', '1008611', '110@abc.com', 0);
INSERT INTO `roominfo` VALUES (25, '1-1-106', 100, '0', '男', '420312199505018726', '18520217515', 'lisi@qq.com', 0);
INSERT INTO `roominfo` VALUES (26, '1-1-103', 200, '0', '男', '422325200011194223', '15786422359', '23541522@qq.com', 0);
INSERT INTO `roominfo` VALUES (27, '99-99-9901', 10, '0', '男', '420107200101104111', '13147162959', '123@qq.com', 0);
INSERT INTO `roominfo` VALUES (32, '2-1-2201', 99999, '0', '男', '420999999999999999', '15600000000', '12138@qq.com', 0);
INSERT INTO `roominfo` VALUES (36, '3-4-102', 120, '0', '男', '650125500104206545', '14552578489', '665@abc.com', 0);
INSERT INTO `roominfo` VALUES (37, '1-3-105', 190, '0', '男', '420965199910101234', '17627384758', '2812017909@qq.com', 0);
INSERT INTO `roominfo` VALUES (40, '1-1-203', 200, '0', '男', '6532579875421', '18199653565', '689@456.com', 0);
INSERT INTO `roominfo` VALUES (41, '3-3-306', 200, '0', '男', '420882202201012329', '18696020357', 'cw@anc.com', 0);
INSERT INTO `roominfo` VALUES (42, '1-2-101', 200, '0', '男', '420581202210173306', '18876773019', '12138@qq.com', 0);
INSERT INTO `roominfo` VALUES (44, '5-3-1', 500, '0', '男', '12010420010520585X', '18020013671', '2640534088@qq.com', 56);
INSERT INTO `roominfo` VALUES (47, '1-1-526', 120, '0', '男', '421111888888888888', '13988888888', '520@abc.com', 0);
INSERT INTO `roominfo` VALUES (48, '1-1-999', 100, '0', '男', '42012319990909091X', '15676434675', '10001@qq.com', 0);
INSERT INTO `roominfo` VALUES (49, '7-7-707', 10000, '0', '男', '421127200007070777', '17777777777', '17777777777@qq.com', 0);
INSERT INTO `roominfo` VALUES (50, '6-6-6-6', 666, '0', '男', '420666666666666666', '13800000000', '123@123.com', 0);
INSERT INTO `roominfo` VALUES (52, '1-1-502', 160, 'lxy', '女', '420999200202271716', '19988889999', '123abc@abc.com', 0);
INSERT INTO `roominfo` VALUES (55, '1-1-1', 50, '0', '男', '4209151515', '12315465', '11714981$qq.com', 0);
INSERT INTO `roominfo` VALUES (56, '1-7-301', 90, '0', '女', '420101200201281234', '15912345678', '128@qq.com', 0);
INSERT INTO `roominfo` VALUES (57, '1-1-203', 200, '0', '男', '6532579875421', '18199653565', '689@456.com', 0);
INSERT INTO `roominfo` VALUES (58, '3-1-312', 180, '吕亚宇', '男', '42068319990223211X', '1768399999', '990715000@qq.com', 0);
INSERT INTO `roominfo` VALUES (63, '1-1-203', 200, '0', '男', '6532579875421', '18199653565', '689@456.com', 0);
INSERT INTO `roominfo` VALUES (64, '1-1-301', 120, '0', '女', '4322457565576868', '567894', '33333333qq.com', 0);
INSERT INTO `roominfo` VALUES (66, '1-2-203', 100, '0', '男', '422254266654567654', '13432345765', '662@ddf.com', 0);
INSERT INTO `roominfo` VALUES (67, '9-1-102', 100, '0', '男', '420999190909081716', '187q6374678', '333@abc.com', 0);
INSERT INTO `roominfo` VALUES (69, '1-2-432', 123, '0', '男', '3124134', '124124124', '111@qq.com', 1);
INSERT INTO `roominfo` VALUES (71, '1-1-112', 150, '0', '女', '421181200100000', '123456789', '2764333333qq.com', 0);
INSERT INTO `roominfo` VALUES (72, '1-1-301', 120, '0', '女', '4322457565576868', '567894', '33333333qq.com', 0);
INSERT INTO `roominfo` VALUES (73, '1-1-418', 100, '0', '男', '140581199803232612', '18534514176', '333@abc.com', 0);
INSERT INTO `roominfo` VALUES (74, '1-1-106', 666, '0', '男', '420821200101011122', '15908642481', '123@qq.com', 0);
INSERT INTO `roominfo` VALUES (75, '3-1-2904', 800, '0', '女', '123456789123456789', '13876674545', '6060@abc.com', 0);
INSERT INTO `roominfo` VALUES (76, '1-1-1', 100, '0', '女', '420244200010093456', '12356789', '1234567qq.com', 1);
INSERT INTO `roominfo` VALUES (78, '5-1-110', 1000, '0', '男', '123123123123', '123123123', '123123@abc.com', 0);
INSERT INTO `roominfo` VALUES (79, '6-6-606', 100, '0', '女', '1234567890', '17671330597', '123@123.com', 0);
INSERT INTO `roominfo` VALUES (80, '2-2-201', 110, '0', '男', '423231232143423', '123123123432', '2240@qq.com', 0);
INSERT INTO `roominfo` VALUES (81, '3-1-110', 1000, '0', '男', '420999199909081716', '1008611', '110@abc.com', 0);
INSERT INTO `roominfo` VALUES (82, '2-2-1001', 200, '0', '男', '421126888888888', '18888888888', '888@qq.com', 0);
INSERT INTO `roominfo` VALUES (83, '1-1-101', 100, '0', '男', '34343435', '343434434', '34@qq.com', 0);
INSERT INTO `roominfo` VALUES (84, '1-1-101', 100, '0', '男', '34343435', '343434434', '34345@qq.com', 0);
INSERT INTO `roominfo` VALUES (86, '1-1-101', 100, '0', '男', '34343435', '343434434', '34345@qq.com', 0);
INSERT INTO `roominfo` VALUES (87, '3-1-110', 1000, '0', '男', '420999199909081716', '1008611', '110@abc.com', 0);
INSERT INTO `roominfo` VALUES (91, '1-1-101', 100, '0', '男', '34343435', '343434434', '34345@qq.com', 0);
INSERT INTO `roominfo` VALUES (92, '13-9-901', 108, '0', '男', '420123199910176789', '15504655046', '123@163.com', 0);
INSERT INTO `roominfo` VALUES (94, '1-1-101', 100, '0', '男', '42058319990303003X', '18888888888', 'xxxiaohanxxx163.com', 0);
INSERT INTO `roominfo` VALUES (95, '3-1-312', 180, '0', '女', '42068319990223211X', '1768399999', '990715000@qq.com', 0);
INSERT INTO `roominfo` VALUES (96, '1-1-108', 100, '0', '男', '420902200100000000', '1517227901', '1277662732@qq.com', 0);
INSERT INTO `roominfo` VALUES (97, '1-1-101', 100, '0', '男', '420999199909081716', '18726374678', '333@abc.com', 0);
INSERT INTO `roominfo` VALUES (98, '1-1-101', 100, '0', '男', '34343435', '343434434', '34345@qq.com', 0);
INSERT INTO `roominfo` VALUES (100, '1-1-102', 110, '0', '女', '420999199909081746', '18726374678', '333@abc.com', 0);
INSERT INTO `roominfo` VALUES (101, '1-1-102', 110, '0', '女', '420999199909081746', '18726374678', '333@abc.com', 0);
INSERT INTO `roominfo` VALUES (102, '1-1-101', 100, '0', '男', '420999199909081716', '18726374678', '333@abc.com', 0);
INSERT INTO `roominfo` VALUES (103, '3-3-306', 200, '0', '男', '420882202201012329', '18696020357', 'cw@anc.com', 0);
INSERT INTO `roominfo` VALUES (104, '3-3-306', 200, '0', '男', '420882202201012329', '18696020357', 'cw@anc.com', 0);
INSERT INTO `roominfo` VALUES (105, '1-1-101', 100, '0', '男', '42058319990303003X', '18888888888', 'xxxiaohanxxx163.com', 0);
INSERT INTO `roominfo` VALUES (106, '1-1-101', 100, '0', '男', '42058319990303003X', '18888888888', 'xxxiaohanxxx163.com', 0);
INSERT INTO `roominfo` VALUES (107, '1-1-265', 150, '0', '男', '68746123164894', '9887651321', '1233@abc.com', 1);
INSERT INTO `roominfo` VALUES (109, '1-7-301', 90, '曹蛋', '女', '420101200201281234', '15912345678', '128@qq.com', 0);
INSERT INTO `roominfo` VALUES (110, '7-7-707', 10000, '0', '男', '421127200007070777', '17777777777', '17777777777@qq.com', 0);
INSERT INTO `roominfo` VALUES (111, '1-1-1', 50, '0', '男', '4209151515', '12315465', '11714981$qq.com', 0);
INSERT INTO `roominfo` VALUES (112, '9-1-91', 91, '0', '男', '420919191919191919', '18791919191', '91@abc.com', 91);
INSERT INTO `roominfo` VALUES (114, '29-4-601', 70, '0', '男', '411381200108050000', '15072640805', '1139746253@qq.com', 0);
INSERT INTO `roominfo` VALUES (115, '9-9-999', 999, '陈征', '男', '420999199909099796', '18929379679', '999@123.com', 0);
INSERT INTO `roominfo` VALUES (116, '2-3-106', 100, '陈征', '男', '420999200109081232', '12349654252', '2182823@qq.com', 0);
INSERT INTO `roominfo` VALUES (117, '3-3-306', 200, '陈文', '男', '420882202201012329', '18696020357', 'cw@anc.com', 0);
INSERT INTO `roominfo` VALUES (118, '7-7-707', 10000, '赵蕊', '男', '421127200007070777', '17777777777', '17777777777@qq.com', 0);
INSERT INTO `roominfo` VALUES (119, '1-7-301', 90, '曹小方', '女', '420101200201281234', '15912345678', '128@qq.com', 0);
INSERT INTO `roominfo` VALUES (120, '13-9-901', 108, '贺锐', '男', '420123199910176789', '15504655046', '123@163.com', 0);
INSERT INTO `roominfo` VALUES (123, '1-1-301', 500, '王五', '女', '2345667', '12345678', '333@qq.com', 0);

SET FOREIGN_KEY_CHECKS = 1;
