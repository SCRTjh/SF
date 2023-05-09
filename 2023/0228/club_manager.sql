/*
 Navicat Premium Data Transfer

 Source Server         : tjh
 Source Server Type    : MySQL
 Source Server Version : 50540
 Source Host           : localhost:3306
 Source Schema         : club_manager

 Target Server Type    : MySQL
 Target Server Version : 50540
 File Encoding         : 65001

 Date: 09/05/2023 09:45:38
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for activity_info
-- ----------------------------
DROP TABLE IF EXISTS `activity_info`;
CREATE TABLE `activity_info`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `activity_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `activity_desc` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `activity_img` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `activity_area` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `activity_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `start_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `end_time` timestamp NULL DEFAULT '0000-00-00 00:00:00',
  `status` tinyint(1) NOT NULL DEFAULT 0,
  `club_id` int(11) NOT NULL,
  `isDel` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `club_id`(`club_id`) USING BTREE,
  CONSTRAINT `activity_info_ibfk_1` FOREIGN KEY (`club_id`) REFERENCES `club_info` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of activity_info
-- ----------------------------
INSERT INTO `activity_info` VALUES (1, '太极社招新', '太极社招新描述', '\\uploadImages\\activityImage\\54fc76495703a6fc92d76c726afe490aedu.jpg', '线上', '社团招新', '2023-04-06 13:55:17', '2023-03-28 20:13:00', 1, 1, 0);
INSERT INTO `activity_info` VALUES (2, '太极社招新', '太极社招新描述', '\\uploadImages\\activityImage\\965c23b534965c23b534.jpg', '线上', '社团招新', '2023-04-06 13:54:17', '2023-03-28 20:13:00', 1, 1, 0);
INSERT INTO `activity_info` VALUES (3, '电竞社比赛', '电竞社日常电竞比赛', NULL, '线上', '日常活动', '2023-03-20 13:06:12', '2023-03-21 00:00:00', 1, 2, 0);

-- ----------------------------
-- Table structure for club_info
-- ----------------------------
DROP TABLE IF EXISTS `club_info`;
CREATE TABLE `club_info`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `club_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `club_desc` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `club_master` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `club_teacher` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `isDel` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `club_name`(`club_name`(191)) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of club_info
-- ----------------------------
INSERT INTO `club_info` VALUES (1, '太极社', '爱好太极的学生组建的 社团爱好太极的学生组建的 社团爱好太极的学生组建的 社团爱好太极的学生组建的 社团爱好太极的学生组建的 社团爱好太极的学生组建的 社团爱好太极的学生组建的 社团爱好太极的学生组建的 社团爱好太极的学生组建的 社团', '111', 'dhh', 0);
INSERT INTO `club_info` VALUES (2, '电竞社', '电竞描述', '2', '丁晖', 0);
INSERT INTO `club_info` VALUES (3, '文学社', '这是一个文学社', '张三', '文学社指导老师', 0);

-- ----------------------------
-- Table structure for comment_info
-- ----------------------------
DROP TABLE IF EXISTS `comment_info`;
CREATE TABLE `comment_info`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `activity_id` int(11) NOT NULL,
  `comment_desc` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `isDel` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `user_id`(`user_id`) USING BTREE,
  INDEX `activity_id`(`activity_id`) USING BTREE,
  CONSTRAINT `comment_info_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_info` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `comment_info_ibfk_2` FOREIGN KEY (`activity_id`) REFERENCES `activity_info` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 26 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of comment_info
-- ----------------------------
INSERT INTO `comment_info` VALUES (1, 1, 1, '这是一条评论', '2023-03-19 18:17:45', 0);
INSERT INTO `comment_info` VALUES (2, 1, 2, '111', '2023-03-28 15:57:26', 0);
INSERT INTO `comment_info` VALUES (3, 1, 2, '1234', '2023-03-28 15:59:17', 0);
INSERT INTO `comment_info` VALUES (4, 1, 2, 'asdasdasdasdas', '2023-03-28 15:59:58', 0);
INSERT INTO `comment_info` VALUES (5, 1, 2, '外币外币外币巴伯', '2023-03-28 16:01:15', 0);
INSERT INTO `comment_info` VALUES (6, 1, 2, '123123123123123123', '2023-03-28 17:02:38', 0);
INSERT INTO `comment_info` VALUES (7, 1, 2, '123123123123123123', '2023-03-28 17:02:38', 0);
INSERT INTO `comment_info` VALUES (8, 1, 2, '87912738971289378192', '2023-03-28 17:02:50', 0);
INSERT INTO `comment_info` VALUES (9, 1, 2, '0989080989080899', '2023-03-28 17:03:02', 0);
INSERT INTO `comment_info` VALUES (10, 1, 2, '6666666666', '2023-03-28 17:03:12', 0);
INSERT INTO `comment_info` VALUES (11, 1, 2, '12312312312312312312', '2023-03-28 17:03:25', 0);
INSERT INTO `comment_info` VALUES (12, 1, 2, '12312312312312312312', '2023-03-28 17:03:30', 0);
INSERT INTO `comment_info` VALUES (13, 1, 2, '213123123123', '2023-03-28 17:06:30', 0);
INSERT INTO `comment_info` VALUES (14, 1, 2, '21323123123123123123', '2023-03-28 17:07:34', 0);
INSERT INTO `comment_info` VALUES (15, 1, 2, '1111', '2023-03-28 17:09:36', 0);
INSERT INTO `comment_info` VALUES (16, 1, 2, '1111', '2023-03-28 17:10:14', 0);
INSERT INTO `comment_info` VALUES (17, 1, 2, '1111', '2023-03-28 17:10:18', 0);
INSERT INTO `comment_info` VALUES (18, 1, 1, '12345', '2023-03-28 17:14:53', 0);
INSERT INTO `comment_info` VALUES (19, 1, 1, '12345', '2023-03-28 17:14:58', 0);
INSERT INTO `comment_info` VALUES (22, 1, 2, '123123123', '2023-03-28 20:47:57', 0);
INSERT INTO `comment_info` VALUES (23, 1, 3, '电竞电竞', '2023-03-28 23:26:02', 0);
INSERT INTO `comment_info` VALUES (24, 1, 3, '1231231231312313', '2023-03-28 23:28:31', 0);
INSERT INTO `comment_info` VALUES (25, 1, 1, 'sadsada', '2023-04-07 23:01:31', 0);

-- ----------------------------
-- Table structure for joinapply_info
-- ----------------------------
DROP TABLE IF EXISTS `joinapply_info`;
CREATE TABLE `joinapply_info`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(255) NOT NULL,
  `club_id` int(255) NOT NULL,
  `status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '0',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `isDel` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `club_id`(`club_id`) USING BTREE,
  INDEX `user_id`(`user_id`) USING BTREE,
  CONSTRAINT `joinapply_info_ibfk_1` FOREIGN KEY (`club_id`) REFERENCES `club_info` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `joinapply_info_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user_info` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of joinapply_info
-- ----------------------------
INSERT INTO `joinapply_info` VALUES (1, 1, 1, '1', '2023-03-21 17:04:24', 0);
INSERT INTO `joinapply_info` VALUES (2, 2, 2, '1', '2023-03-21 17:04:19', 0);
INSERT INTO `joinapply_info` VALUES (3, 1, 2, '1', '2023-03-29 01:12:11', 0);
INSERT INTO `joinapply_info` VALUES (8, 3, 3, '1', '2023-03-29 13:39:48', 0);
INSERT INTO `joinapply_info` VALUES (9, 4, 3, '1', '2023-03-30 12:12:44', 0);
INSERT INTO `joinapply_info` VALUES (10, 5, 2, '2', '2023-04-06 13:16:48', 0);

-- ----------------------------
-- Table structure for roletype_info
-- ----------------------------
DROP TABLE IF EXISTS `roletype_info`;
CREATE TABLE `roletype_info`  (
  `id` int(11) NOT NULL,
  `role_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `isDel` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of roletype_info
-- ----------------------------
INSERT INTO `roletype_info` VALUES (0, '超级管理员', 0);
INSERT INTO `roletype_info` VALUES (1, '管理员', 1);
INSERT INTO `roletype_info` VALUES (2, '社团长', 2);
INSERT INTO `roletype_info` VALUES (3, '学生', 3);

-- ----------------------------
-- Table structure for user_info
-- ----------------------------
DROP TABLE IF EXISTS `user_info`;
CREATE TABLE `user_info`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_photo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `user_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `user_sex` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `user_class` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `user_institute` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `user_club` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `user_tel` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `user_pwd` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `user_email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `role_id` int(11) NOT NULL,
  `isDel` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `role_id`(`role_id`) USING BTREE,
  CONSTRAINT `user_info_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roletype_info` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of user_info
-- ----------------------------
INSERT INTO `user_info` VALUES (1, '/uploadImages/userPhoto/d4291688939440e1f91e498d0af02bceedu.jpg', 'admin', '男', NULL, '信息工程学院', '', '15172227901', '0ece41130bd79496c40282512fe19090', '1277662732@qq.com', 0, 0);
INSERT INTO `user_info` VALUES (2, NULL, '汤俊豪', '男', NULL, '信息工程学院', '', '15623799700', '677bc50bda3009a6b3f452d57a4b389e', '1277662732@qq.com', 1, 0);
INSERT INTO `user_info` VALUES (3, NULL, '张三', '男', NULL, '商学院', '文学社', '15172222222', '677bc50bda3009a6b3f452d57a4b389e', '812487192@qq.com', 2, 0);
INSERT INTO `user_info` VALUES (4, NULL, '李四', '男', NULL, '信息工程学院', '文学社', '15172227902', '677bc50bda3009a6b3f452d57a4b389e', '812487192@qq.com', 3, 0);
INSERT INTO `user_info` VALUES (5, NULL, '王五', '男', NULL, '信息工程学院', '', '15111111111', '677bc50bda3009a6b3f452d57a4b389e', '123@qq.com', 3, 0);

SET FOREIGN_KEY_CHECKS = 1;
