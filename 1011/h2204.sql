/*
 Navicat Premium Data Transfer

 Source Server         : 标哥的数据库
 Source Server Type    : MySQL
 Source Server Version : 50540
 Source Host           : 192.168.106.254:3306
 Source Schema         : h2204

 Target Server Type    : MySQL
 Target Server Version : 50540
 File Encoding         : 65001

 Date: 11/10/2022 19:59:15
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for admininfo
-- ----------------------------
DROP TABLE IF EXISTS `admininfo`;
CREATE TABLE `admininfo`  (
  `adminid` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `adminpwd` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `realName` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '真实姓名',
  `isDel` bit(1) NOT NULL DEFAULT b'0',
  `dingopenid` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '钉钉微信二维码',
  PRIMARY KEY (`adminid`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '����Ա��Ϣ' ROW_FORMAT = Compact;

-- ----------------------------
-- Records of admininfo
-- ----------------------------
INSERT INTO `admininfo` VALUES ('li1310812715', '2236486366', '李大哥', b'0', '');
INSERT INTO `admininfo` VALUES ('liwentao', '123456', '李文滔', b'0', '7xLyIUUSgINiP8DXNpw6lJwiEiE');
INSERT INTO `admininfo` VALUES ('yangzi', '123456', '杨紫', b'0', NULL);
INSERT INTO `admininfo` VALUES ('zhangyishan', '123456', '张一山', b'0', NULL);

-- ----------------------------
-- Table structure for classinfo
-- ----------------------------
DROP TABLE IF EXISTS `classinfo`;
CREATE TABLE `classinfo`  (
  `cid` int(11) NOT NULL AUTO_INCREMENT,
  `classnumebr` int(255) NOT NULL COMMENT '班级编号',
  `cname` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `maxCount` int(11) NOT NULL,
  `did` int(11) NOT NULL,
  `instructorid` int(11) NOT NULL,
  `isDel` bit(1) NOT NULL DEFAULT b'0',
  `tid` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`cid`) USING BTREE,
  INDEX `IXFK_classinfo_departmentinfo`(`did`) USING BTREE,
  INDEX `IXFK_classinfo_instructor`(`instructorid`) USING BTREE,
  INDEX `tid`(`tid`) USING BTREE,
  CONSTRAINT `FK_classinfo_departmentinfo` FOREIGN KEY (`did`) REFERENCES `departmentinfo` (`did`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FK_classinfo_instructor` FOREIGN KEY (`instructorid`) REFERENCES `instructor` (`instructorid`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '�༶��Ϣ' ROW_FORMAT = Compact;

-- ----------------------------
-- Records of classinfo
-- ----------------------------
INSERT INTO `classinfo` VALUES (1, 2741, 'H1904', 55, 2, 2, b'0', '2005001');
INSERT INTO `classinfo` VALUES (2, 2841, 'J1908', 58, 1, 3, b'0', '20050010');
INSERT INTO `classinfo` VALUES (3, 2941, 'J1909', 65, 3, 2, b'0', '20050011');
INSERT INTO `classinfo` VALUES (4, 3041, 'H1905', 62, 4, 3, b'0', '20050012');
INSERT INTO `classinfo` VALUES (5, 1234, 'h210304', 62, 4, 3, b'0', '20050012');
INSERT INTO `classinfo` VALUES (6, 2141, 'H2204', 66, 5, 3, b'0', '2005001');

-- ----------------------------
-- Table structure for courseinfo
-- ----------------------------
DROP TABLE IF EXISTS `courseinfo`;
CREATE TABLE `courseinfo`  (
  `courseid` int(11) NOT NULL AUTO_INCREMENT COMMENT '课程编号',
  `coursename` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `tid` int(11) NOT NULL,
  `ismajor` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '是否必修',
  `isDel` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`courseid`) USING BTREE,
  INDEX `tid`(`tid`) USING BTREE,
  CONSTRAINT `courseinfo_ibfk_1` FOREIGN KEY (`tid`) REFERENCES `teacherinfo` (`tid`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 17 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of courseinfo
-- ----------------------------
INSERT INTO `courseinfo` VALUES (1, '数据库管理', 20050014, '是', b'1');
INSERT INTO `courseinfo` VALUES (2, '高等数学', 2005001, '是', b'1');
INSERT INTO `courseinfo` VALUES (3, '大学英语', 2005006, '是', b'1');
INSERT INTO `courseinfo` VALUES (4, '外贸英语', 2005005, '是', b'1');
INSERT INTO `courseinfo` VALUES (5, '财务管理', 20050011, '是', b'0');
INSERT INTO `courseinfo` VALUES (6, '营销管理', 2005009, '是', b'0');
INSERT INTO `courseinfo` VALUES (7, '经济学基础', 2005003, '是', b'0');
INSERT INTO `courseinfo` VALUES (8, '管理信息系统', 2005008, '是', b'0');
INSERT INTO `courseinfo` VALUES (9, '装饰素描', 2005004, '是', b'1');
INSERT INTO `courseinfo` VALUES (10, '图案与构成', 2005002, '否', b'1');
INSERT INTO `courseinfo` VALUES (11, '计算机网络', 20050013, '是', b'0');
INSERT INTO `courseinfo` VALUES (12, '新概念英语', 2005007, '否', b'1');
INSERT INTO `courseinfo` VALUES (13, '计算机操作系统', 20050010, '是', b'0');
INSERT INTO `courseinfo` VALUES (14, '心理学', 20050012, '否', b'0');
INSERT INTO `courseinfo` VALUES (15, '管理学', 20050015, '否', b'0');
INSERT INTO `courseinfo` VALUES (16, '大学英语', 2005002, '是', b'1');

-- ----------------------------
-- Table structure for departmentinfo
-- ----------------------------
DROP TABLE IF EXISTS `departmentinfo`;
CREATE TABLE `departmentinfo`  (
  `did` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ϵ���� ��������',
  `dname` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT 'ϵ������',
  `isDel` bit(1) NOT NULL DEFAULT b'0' COMMENT '��ɾ��',
  `dprincipal` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '系负责人',
  `dprincipaltel` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '系负责人电话',
  PRIMARY KEY (`did`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'ϵ����Ϣ' ROW_FORMAT = Compact;

-- ----------------------------
-- Records of departmentinfo
-- ----------------------------
INSERT INTO `departmentinfo` VALUES (1, 'Web前端', b'0', '杨标', '12345678980');
INSERT INTO `departmentinfo` VALUES (2, 'Java', b'0', '张三', '13584752482');
INSERT INTO `departmentinfo` VALUES (3, 'Python', b'0', '李四', '22562155221');
INSERT INTO `departmentinfo` VALUES (4, 'UI', b'1', '王五', '21561562555');
INSERT INTO `departmentinfo` VALUES (5, 'C/C++', b'0', '赵六', '12359625566');
INSERT INTO `departmentinfo` VALUES (6, 'H5前端', b'1', '标哥', '66666666666');

-- ----------------------------
-- Table structure for examinfo
-- ----------------------------
DROP TABLE IF EXISTS `examinfo`;
CREATE TABLE `examinfo`  (
  `eid` varchar(11) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '考试时间编号',
  `etype` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '考试类型',
  `etime` date NULL DEFAULT NULL COMMENT '考试时间',
  `isDel` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`eid`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of examinfo
-- ----------------------------
INSERT INTO `examinfo` VALUES ('0801', '期中考试', '2008-11-01', b'0');
INSERT INTO `examinfo` VALUES ('0802', '期末考试', '2009-01-04', b'0');

-- ----------------------------
-- Table structure for gradeinfo
-- ----------------------------
DROP TABLE IF EXISTS `gradeinfo`;
CREATE TABLE `gradeinfo`  (
  `gid` int(11) NOT NULL COMMENT '成绩编号',
  `sid` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '学生编号',
  `eid` varchar(11) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '考试编号',
  `courseid` int(11) NOT NULL COMMENT '课程编号',
  `score` double NOT NULL COMMENT '分数',
  `isDel` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`gid`) USING BTREE,
  INDEX `sid`(`sid`) USING BTREE,
  INDEX `eid`(`eid`) USING BTREE,
  INDEX `courseid`(`courseid`) USING BTREE,
  CONSTRAINT `gradeinfo_ibfk_1` FOREIGN KEY (`sid`) REFERENCES `stuinfo` (`sid`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `gradeinfo_ibfk_3` FOREIGN KEY (`eid`) REFERENCES `examinfo` (`eid`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `gradeinfo_ibfk_4` FOREIGN KEY (`courseid`) REFERENCES `courseinfo` (`courseid`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of gradeinfo
-- ----------------------------
INSERT INTO `gradeinfo` VALUES (4, '2005010101', '0801', 2, 68, b'0');
INSERT INTO `gradeinfo` VALUES (5, '2005010102', '0801', 1, 84, b'0');
INSERT INTO `gradeinfo` VALUES (7, '2005010102', '0801', 2, 88, b'0');
INSERT INTO `gradeinfo` VALUES (8, '2005010101', '0802', 1, 78, b'0');
INSERT INTO `gradeinfo` VALUES (9, '2005010101', '0802', 2, 95, b'0');
INSERT INTO `gradeinfo` VALUES (13, '2005010102', '0802', 1, 62, b'0');
INSERT INTO `gradeinfo` VALUES (14, '2005010102', '0802', 2, 85, b'0');
INSERT INTO `gradeinfo` VALUES (15, '2005020101', '0801', 3, 61, b'0');
INSERT INTO `gradeinfo` VALUES (16, '2005020101', '0801', 4, 28, b'0');
INSERT INTO `gradeinfo` VALUES (17, '2005020102', '0801', 3, 22, b'0');
INSERT INTO `gradeinfo` VALUES (18, '2005020102', '0801', 4, 77, b'0');
INSERT INTO `gradeinfo` VALUES (19, '2005020101', '0802', 3, 54, b'0');
INSERT INTO `gradeinfo` VALUES (20, '2005020101', '0802', 4, 27, b'0');
INSERT INTO `gradeinfo` VALUES (21, '2005020102', '0802', 3, 34, b'0');
INSERT INTO `gradeinfo` VALUES (22, '2005020102', '0802', 4, 65, b'0');
INSERT INTO `gradeinfo` VALUES (24, '2005030101', '0801', 5, 36, b'0');
INSERT INTO `gradeinfo` VALUES (25, '2005030101', '0801', 6, 51, b'0');
INSERT INTO `gradeinfo` VALUES (26, '2005030101', '0802', 5, 51, b'0');
INSERT INTO `gradeinfo` VALUES (27, '2005030101', '0802', 6, 80, b'0');
INSERT INTO `gradeinfo` VALUES (28, '2005040201', '0801', 7, 68, b'0');
INSERT INTO `gradeinfo` VALUES (29, '2005040201', '0801', 8, 79, b'0');
INSERT INTO `gradeinfo` VALUES (30, '2005040202', '0801', 7, 94, b'0');
INSERT INTO `gradeinfo` VALUES (31, '2005040202', '0801', 8, 51, b'0');
INSERT INTO `gradeinfo` VALUES (32, '2005040201', '0802', 7, 36, b'0');
INSERT INTO `gradeinfo` VALUES (33, '2005040201', '0802', 8, 88, b'0');
INSERT INTO `gradeinfo` VALUES (34, '2005040202', '0802', 7, 70, b'0');
INSERT INTO `gradeinfo` VALUES (35, '2005040202', '0802', 8, 67, b'0');
INSERT INTO `gradeinfo` VALUES (36, '2005050101', '0801', 9, 25, b'0');
INSERT INTO `gradeinfo` VALUES (40, '2005050101', '0801', 10, 65, b'0');
INSERT INTO `gradeinfo` VALUES (41, '2005050102', '0801', 9, 72, b'0');
INSERT INTO `gradeinfo` VALUES (43, '2005050102', '0801', 10, 63, b'0');
INSERT INTO `gradeinfo` VALUES (44, '2005050101', '0802', 9, 80, b'0');
INSERT INTO `gradeinfo` VALUES (45, '2005050101', '0802', 10, 34, b'0');
INSERT INTO `gradeinfo` VALUES (46, '2005050102', '0802', 9, 68, b'0');
INSERT INTO `gradeinfo` VALUES (47, '2005050102', '0802', 10, 58, b'0');
INSERT INTO `gradeinfo` VALUES (50, '2005050201', '0801', 9, 65, b'0');
INSERT INTO `gradeinfo` VALUES (53, '2005050201', '0801', 10, 55, b'0');
INSERT INTO `gradeinfo` VALUES (54, '2005050202', '0801', 9, 58, b'0');
INSERT INTO `gradeinfo` VALUES (55, '2005050202', '0801', 10, 26, b'0');
INSERT INTO `gradeinfo` VALUES (56, '2005050201', '0802', 9, 98, b'0');
INSERT INTO `gradeinfo` VALUES (57, '2005050201', '0802', 10, 73, b'0');
INSERT INTO `gradeinfo` VALUES (58, '2005050202', '0802', 9, 51, b'0');
INSERT INTO `gradeinfo` VALUES (59, '2005050202', '0802', 10, 94, b'0');
INSERT INTO `gradeinfo` VALUES (60, '2005040101', '0801', 7, 60, b'0');
INSERT INTO `gradeinfo` VALUES (61, '2005040101', '0801', 8, 76, b'0');
INSERT INTO `gradeinfo` VALUES (62, '2005040102', '0801', 7, 22, b'0');
INSERT INTO `gradeinfo` VALUES (63, '2005040102', '0801', 8, 21, b'0');
INSERT INTO `gradeinfo` VALUES (64, '2005040101', '0802', 7, 22, b'0');
INSERT INTO `gradeinfo` VALUES (65, '2005040101', '0802', 8, 25, b'0');
INSERT INTO `gradeinfo` VALUES (66, '2005040102', '0802', 7, 41, b'0');
INSERT INTO `gradeinfo` VALUES (67, '2005040102', '0802', 8, 28, b'0');
INSERT INTO `gradeinfo` VALUES (68, '2005030102', '0801', 5, 80, b'0');
INSERT INTO `gradeinfo` VALUES (69, '2005030102', '0801', 6, 55, b'0');
INSERT INTO `gradeinfo` VALUES (70, '2005030102', '0802', 5, 95, b'0');
INSERT INTO `gradeinfo` VALUES (71, '2005030102', '0802', 6, 51, b'0');
INSERT INTO `gradeinfo` VALUES (72, '2005020201', '0801', 3, 32, b'0');
INSERT INTO `gradeinfo` VALUES (73, '2005020201', '0801', 4, 65, b'0');
INSERT INTO `gradeinfo` VALUES (74, '2005020202', '0801', 3, 52, b'0');
INSERT INTO `gradeinfo` VALUES (75, '2005020202', '0801', 4, 44, b'0');
INSERT INTO `gradeinfo` VALUES (76, '2005020202', '0802', 3, 45, b'0');
INSERT INTO `gradeinfo` VALUES (77, '2005020202', '0802', 4, 72, b'0');
INSERT INTO `gradeinfo` VALUES (78, '2005020201', '0802', 3, 46, b'0');
INSERT INTO `gradeinfo` VALUES (79, '2005020201', '0802', 4, 77, b'0');
INSERT INTO `gradeinfo` VALUES (80, '2005010201', '0801', 1, 66, b'0');
INSERT INTO `gradeinfo` VALUES (81, '2005010201', '0801', 2, 79, b'0');
INSERT INTO `gradeinfo` VALUES (82, '2005010201', '0802', 1, 97, b'0');
INSERT INTO `gradeinfo` VALUES (83, '2005010201', '0802', 2, 70, b'0');
INSERT INTO `gradeinfo` VALUES (84, '2005010202', '0801', 1, 38, b'0');
INSERT INTO `gradeinfo` VALUES (85, '2005010202', '0801', 2, 41, b'0');
INSERT INTO `gradeinfo` VALUES (87, '2005010202', '0802', 1, 70, b'0');
INSERT INTO `gradeinfo` VALUES (88, '2005010202', '0802', 2, 50, b'0');
INSERT INTO `gradeinfo` VALUES (93, '2005010101', '0802', 10, 21, b'0');

-- ----------------------------
-- Table structure for instructor
-- ----------------------------
DROP TABLE IF EXISTS `instructor`;
CREATE TABLE `instructor`  (
  `instructorid` int(11) NOT NULL AUTO_INCREMENT,
  `instructorname` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `instructorsex` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `instructortel` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `instructoremail` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `instructorIDCard` varchar(18) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `did` int(11) NOT NULL DEFAULT 0 COMMENT '所属系别',
  `isDel` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`instructorid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '����Ա��Ϣ' ROW_FORMAT = Compact;

-- ----------------------------
-- Records of instructor
-- ----------------------------
INSERT INTO `instructor` VALUES (0, '曾远', '男', '1387788998', 'www.zenyu123@qq.com', '420222199511112524', 1, b'1');
INSERT INTO `instructor` VALUES (2, '蒋晓箐', '女', '1588884123', 'www.jiangjiang123@qq.com', '420222199411112545', 2, b'0');
INSERT INTO `instructor` VALUES (3, '桃子', '男', '15411115542', 'www.biaobiao123@qq.com', '420222195611112535', 1, b'0');
INSERT INTO `instructor` VALUES (4, '班主任2号', '男', '17371678353', 'wwww.223648366@qq.com', '420222199701175451', 1, b'0');
INSERT INTO `instructor` VALUES (5, '标哥', '男', '15789674587', 'www.softeem.xin', '4202221997011765', 5, b'0');

-- ----------------------------
-- Table structure for stuinfo
-- ----------------------------
DROP TABLE IF EXISTS `stuinfo`;
CREATE TABLE `stuinfo`  (
  `sid` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `sname` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `ssex` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `sbirthday` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `snation` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `sIDCard` varchar(18) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `saddr` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `smail` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `stel` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `isDel` bit(1) NULL DEFAULT b'0',
  `cid` int(11) NULL DEFAULT NULL,
  `sphoto` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '学生图片路径',
  `spwd` int(11) NOT NULL,
  `slocal` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '登录地址',
  `stime` datetime NULL DEFAULT NULL COMMENT '登陆时间',
  PRIMARY KEY (`sid`) USING BTREE,
  INDEX `IXFK_stuinfo_classinfo`(`cid`) USING BTREE,
  CONSTRAINT `FK_stuinfo_classinfo` FOREIGN KEY (`cid`) REFERENCES `classinfo` (`cid`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'ѧ����Ϣ' ROW_FORMAT = Compact;

-- ----------------------------
-- Records of stuinfo
-- ----------------------------
INSERT INTO `stuinfo` VALUES ('2005010101', '苏俊丹', '女', '1989/9/1', '汉族', '420984198909011001', '湖北省/武汉市/武昌区/光谷广场1号', '2005010101@softeem.com', '13878841001', b'0', 2, NULL, 123456, '::ffff:127.0.0.1', '2019-11-07 21:43:08');
INSERT INTO `stuinfo` VALUES ('2005010102', '张小苗', '男', '1989/9/2', '汉族', '420984198909021012', '湖北省/武汉市/武昌区/光谷广场1号', '2005010102@softeem.com', '13878941002', b'0', 2, NULL, 123456, NULL, NULL);
INSERT INTO `stuinfo` VALUES ('2005010201', '赵希坤', '男', '1989/9/3', '汉族', '420984198909031013', '湖北省/武汉市/武昌区/光谷广场1号', '2005010201@softeem.com', '13879041003', b'0', 3, NULL, 123456, NULL, NULL);
INSERT INTO `stuinfo` VALUES ('2005010202', '阮志婷', '女', '1989/9/4', '汉族', '420984198909041004', '湖北省/武汉市/武昌区/光谷广场1号', '2005010202@softeem.com', '13879141004', b'0', 3, NULL, 123456, NULL, NULL);
INSERT INTO `stuinfo` VALUES ('2005020101', '程丽婷', '男', '1989/9/5', '汉族', '420984198909051015', '湖北省/武汉市/武昌区/光谷广场1号', '2005020101@softeem.com', '13879241005', b'0', 3, NULL, 123456, NULL, NULL);
INSERT INTO `stuinfo` VALUES ('2005020102', '戚正韦', '男', '1989/9/6', '回族', '420984198909061016', '湖北省/武汉市/武昌区/光谷广场1号', '2005020102@softeem.com', '13879341006', b'0', 3, NULL, 147258, '::ffff:127.0.0.1', '2019-11-07 20:35:33');
INSERT INTO `stuinfo` VALUES ('2005020201', '李家洋', '男', '1989/9/7', '汉族', '420984198909071017', '湖北省/武汉市/武昌区/光谷广场1号', '2005020201@softeem.com', '13879441007', b'0', 1, NULL, 123456, NULL, NULL);
INSERT INTO `stuinfo` VALUES ('2005020202', '孟彬彬', '女', '1989/9/8', '汉族', '420984198909081008', '湖北省/武汉市/武昌区/光谷广场1号', '2005020202@softeem.com', '13879541008', b'0', 1, NULL, 123456, NULL, NULL);
INSERT INTO `stuinfo` VALUES ('2005030101', '蔡莎莎', '女', '1989/9/9', '汉族', '420984198909091009', '湖北省/武汉市/武昌区/光谷广场1号', '2005030101@softeem.com', '13879641009', b'0', 2, NULL, 123456, NULL, NULL);
INSERT INTO `stuinfo` VALUES ('2005030102', '蔡金奎', '男', '1989/9/10', '汉族', '420984198909101011', '湖北省/武汉市/武昌区/光谷广场1号', '2005030102@softeem.com', '13879741010', b'0', 1, NULL, 123456, NULL, NULL);
INSERT INTO `stuinfo` VALUES ('2005040101', '陈润福', '女', '1989/9/11', '汉族', '420984198909111012', '湖北省,武汉市,武昌区,光谷广场1号', '2005040101@softeem.com', '13879841011', b'0', 4, NULL, 123456, NULL, NULL);
INSERT INTO `stuinfo` VALUES ('2005040102', '苏普秀', '女', '1989/9/12', '汉族', '420984198909121003', '湖北省/武汉市/武昌区/光谷广场1号', '2005040102@softeem.com', '13879941012', b'0', 1, NULL, 123456, NULL, NULL);
INSERT INTO `stuinfo` VALUES ('2005040201', '蔡智勇', '男', '1989/9/13', '汉族', '420984198909131034', '湖北省/武汉市/武昌区/光谷广场1号', '2005040201@softeem.com', '13880041013', b'0', 4, NULL, 123456, NULL, NULL);
INSERT INTO `stuinfo` VALUES ('2005040202', '侯志方', '女', '1989/9/14', '汉族', '420984198909141085', '湖北省/武汉市/武昌区/光谷广场1号', '2005040202@softeem.com', '13880141014', b'0', 1, NULL, 123456, NULL, NULL);
INSERT INTO `stuinfo` VALUES ('2005050101', '李明', '男', '1989/9/15', '汉族', '420984198909151036', '湖北省/武汉市/武昌区/光谷广场1号', '2005050101@softeem.com', '13880241015', b'0', 4, NULL, 123456, NULL, NULL);
INSERT INTO `stuinfo` VALUES ('2005050102', '陈曦', '女', '1989/9/16', '汉族', '420984198909161007', '湖北省/武汉市/武昌区/光谷广场1号', '2005050102@softeem.com', '13880341016', b'0', 1, NULL, 123456, NULL, NULL);
INSERT INTO `stuinfo` VALUES ('2005050201', '郑小营', '男', '1989/9/17', '汉族', '420984198909171018', '湖北省/武汉市/武昌区/光谷广场1号', '2005050201@softeem.com', '13880441017', b'0', 3, NULL, 123456, NULL, NULL);
INSERT INTO `stuinfo` VALUES ('2005050202', '王静', '女', '1989/9/18', '汉族', '420984198909181009', '湖北省/武汉市/武昌区/光谷广场1号', '2005050202@softeem.com', '13880541018', b'0', 1, NULL, 123456, NULL, NULL);
INSERT INTO `stuinfo` VALUES ('2005050208', '余珊珊', '女', '1989/9/19', '汉族', '420984198909191001', '湖北省/武汉市/武昌区/光谷广场1号', '2005050208@softeem.com', '13880641019', b'0', 2, NULL, 123456, NULL, NULL);
INSERT INTO `stuinfo` VALUES ('2005050209', '王珊小', '男', '1989/9/20', '汉族', '420984198909201092', '湖北省/武汉市/武昌区/光谷广场1号', '2005050209@softeem.com', '13880741020', b'0', 1, NULL, 123456, NULL, NULL);
INSERT INTO `stuinfo` VALUES ('2005050210', '王小', '女', '1000/10/10', '月光族', '420117100010100202', '湖北省/孝感市/····', 'wwww@qq.com', '12387465467', b'0', 2, NULL, 1234, NULL, NULL);
INSERT INTO `stuinfo` VALUES ('202204025501', '苏苏', '女', '2000/09/09', '汉族', '423555200009091546', '湖北省/武汉市/武昌区', 'www@qq.com', '15489678541', b'0', 6, NULL, 123456, NULL, NULL);
INSERT INTO `stuinfo` VALUES ('202204025502', '木青柳', '女', '2000/11/19', '汉族', '422352200011191424', '湖北省武汉市江夏区', '1234545@qq.com', '15789648512', b'0', 6, NULL, 123456, NULL, NULL);
INSERT INTO `stuinfo` VALUES ('202204025503', '箫汐霂', '女', '2001/01/20', '汉族', '425135200101201544', '湖北省武汉市江夏区', '5478685412@163.com', '15786548246', b'0', 6, NULL, 123456, NULL, NULL);
INSERT INTO `stuinfo` VALUES ('202204025504', '许萧萧', '女', '2002/06/30', '汉族', '422325200206301244', '浙江省杭州市', '4588967@163.com', '15986875412', b'0', 6, NULL, 123456, NULL, NULL);
INSERT INTO `stuinfo` VALUES ('516300274127', '杨标', '女', '2019-10-10', '阿昌族', '420222199701175451', '湖北省/武汉市/武昌区/光谷广场1号', 'www@qq.com', '1224785544', b'0', 6, '/uploadImgs/4f4000cccf01e141e94cdaf2cf88b7fau=3357502011,3567349206&fm=26&gp=0.jpg', 123456, NULL, NULL);

-- ----------------------------
-- Table structure for teacherinfo
-- ----------------------------
DROP TABLE IF EXISTS `teacherinfo`;
CREATE TABLE `teacherinfo`  (
  `tid` int(11) NOT NULL AUTO_INCREMENT COMMENT '教师编号',
  `tname` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '教师名字',
  `tsex` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '教师性别',
  `tage` int(11) NOT NULL COMMENT '教师年龄',
  `tnation` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '教师民族',
  `tacion` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '教师籍贯',
  `tpwd` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '教师登录密码',
  `tphone` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '教师电话',
  `isDel` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`tid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 20050016 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of teacherinfo
-- ----------------------------
INSERT INTO `teacherinfo` VALUES (2005001, '孙鹏', '男', 28, '汉族', '河南/郑州', '123456', '15862584953', b'0');
INSERT INTO `teacherinfo` VALUES (2005002, '马欢', '男', 32, '蒙古族', '山西/太原', '123456', '15862359843', b'0');
INSERT INTO `teacherinfo` VALUES (2005003, '崔建涛', '男', 35, '蒙古族', '江西/南昌', '123456', '13545268156', b'0');
INSERT INTO `teacherinfo` VALUES (2005004, '赵丹', '女', 26, '满族', '河南/郑州', '123456', '13659261258', b'0');
INSERT INTO `teacherinfo` VALUES (2005005, '马艳', '女', 36, '蒙古族', '安徽/芜湖', '123456', '13548946354', b'0');
INSERT INTO `teacherinfo` VALUES (2005006, '周健', '男', 56, '蒙古族', '山西/太原', '123456', '13549618796', b'0');
INSERT INTO `teacherinfo` VALUES (2005007, '王宏', '女', 45, '蒙古族', '福建/厦门', '123456', '13549761548', b'0');
INSERT INTO `teacherinfo` VALUES (2005008, '赵军涛', '男', 35, '蒙古族', '江西/南昌', '123456', '15948963459', b'0');
INSERT INTO `teacherinfo` VALUES (2005009, '王喜庆', '男', 46, '蒙古族', '河南/安阳', '123456', '15915613479', b'0');
INSERT INTO `teacherinfo` VALUES (20050010, '李玉英', '女', 54, '蒙古族', '河南/安阳', '123456', '15846782943', b'0');
INSERT INTO `teacherinfo` VALUES (20050011, '李曙光', '男', 31, '蒙古族', '陕西/西安', '123456', '15945862664', b'0');
INSERT INTO `teacherinfo` VALUES (20050012, '张西芝', '男', 29, '汉族', '贵州/贵阳', '123456', '15894624923', b'0');
INSERT INTO `teacherinfo` VALUES (20050013, '韩林林', '女', 25, '汉族', '安徽/芜湖', '123456', '15918936549', b'0');
INSERT INTO `teacherinfo` VALUES (20050014, '王卫东', '男', 38, '蒙古族', '陕西/宝鸡', '123456', '15916981239', b'0');
INSERT INTO `teacherinfo` VALUES (20050015, '郑帅', '保密', 26, '汉族', '陕西/西安', '123456', '15803754966', b'0');

-- ----------------------------
-- View structure for classinfoview
-- ----------------------------
DROP VIEW IF EXISTS `classinfoview`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `classinfoview` AS select `classinfo`.`cid` AS `cid`,`classinfo`.`classnumebr` AS `classnumebr`,`classinfo`.`cname` AS `cname`,`classinfo`.`maxCount` AS `maxCount`,`classinfo`.`isDel` AS `isDel`,`classinfo`.`did` AS `did`,`classinfo`.`instructorid` AS `instructorid`,`instructor`.`instructorname` AS `instructorname`,`departmentinfo`.`dname` AS `dname` from ((`classinfo` join `instructor` on((`classinfo`.`instructorid` = `instructor`.`instructorid`))) join `departmentinfo` on((`classinfo`.`did` = `departmentinfo`.`did`)));

SET FOREIGN_KEY_CHECKS = 1;
