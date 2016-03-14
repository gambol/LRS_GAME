/*
Navicat MySQL Data Transfer

Source Server         : 192.168.1.86
Source Server Version : 50616
Source Host           : 192.168.1.86:3306
Source Database       : lrs

Target Server Type    : MYSQL
Target Server Version : 50616
File Encoding         : 65001

Date: 2016-03-14 09:51:24
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for game
-- ----------------------------
DROP TABLE IF EXISTS `game`;
CREATE TABLE `game` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL COMMENT '游戏名称',
  `judgment` varchar(45) DEFAULT NULL COMMENT '裁判',
  `personCount` int(11) DEFAULT NULL COMMENT '人数',
  `timePrice` float DEFAULT NULL COMMENT '单价每分',
  `winner` varchar(45) DEFAULT NULL COMMENT '获胜者',
  `status` varchar(45) DEFAULT NULL COMMENT '游戏中/游戏结束和等待进入游戏',
  `startTime` datetime DEFAULT NULL COMMENT '开始时间',
  `endTime` datetime DEFAULT NULL COMMENT '结束时间',
  `office` varchar(45) DEFAULT NULL COMMENT '游戏局',
  `type` varchar(45) DEFAULT NULL COMMENT '比赛类型',
  `room_id` int(11) NOT NULL COMMENT '房间编号',
  `judgment_id` int(11) NOT NULL COMMENT '裁判',
  PRIMARY KEY (`id`),
  KEY `fk_game_room1_idx` (`room_id`),
  KEY `fk_game_user1_idx` (`judgment_id`),
  CONSTRAINT `fk_game_room1` FOREIGN KEY (`room_id`) REFERENCES `room` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_game_user1` FOREIGN KEY (`judgment_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=1059 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of game
-- ----------------------------
INSERT INTO `game` VALUES ('997', '1-常规赛-107', '18', null, '2.5', null, '游戏中', '2016-02-16 17:15:11', null, '1', '常规赛', '55', '18');
INSERT INTO `game` VALUES ('998', '1-常规赛-108', '18', null, '2.5', null, '游戏中', '2016-02-18 02:18:40', null, '1', '常规赛', '53', '18');
INSERT INTO `game` VALUES ('999', '3-常规赛-110', '18', null, '2.5', null, '游戏中', '2016-02-18 02:29:26', null, '3', '常规赛', '56', '18');
INSERT INTO `game` VALUES ('1000', '3-常规赛-2323', '18', null, '2.5', null, '游戏中', '2016-02-18 02:30:28', null, '3', '常规赛', '54', '18');
INSERT INTO `game` VALUES ('1001', '1-常规赛-107', '18', null, '2.5', null, '游戏中', '2016-02-18 02:31:23', null, '1', '常规赛', '55', '18');
INSERT INTO `game` VALUES ('1002', '3-常规赛-107', '18', null, '2.5', null, '游戏中', '2016-02-18 02:40:11', null, '3', '常规赛', '55', '18');
INSERT INTO `game` VALUES ('1003', '3-常规赛-107', '18', null, '2.5', null, '游戏中', '2016-02-18 03:01:00', null, '3', '常规赛', '55', '18');
INSERT INTO `game` VALUES ('1004', '1-常规赛-107', '18', null, '2.5', null, '游戏中', '2016-02-18 05:20:32', null, '1', '常规赛', '55', '18');
INSERT INTO `game` VALUES ('1005', '1-常规赛-107', '4', null, '2.5', null, '游戏中', '2016-02-19 13:56:04', null, '1', '常规赛', '55', '4');
INSERT INTO `game` VALUES ('1006', '1-常规赛-108', '4', null, '2.5', null, '游戏中', '2016-02-19 14:08:26', null, '1', '常规赛', '53', '4');
INSERT INTO `game` VALUES ('1007', '3-常规赛-107', '4', null, '2.5', null, '游戏中', '2016-02-22 07:11:17', null, '3', '常规赛', '55', '4');
INSERT INTO `game` VALUES ('1008', '1-常规赛-2323', '4', null, '2.5', null, '游戏中', '2016-02-23 15:20:08', null, '1', '常规赛', '54', '4');
INSERT INTO `game` VALUES ('1009', '3-常规赛-107', '4', null, '2.5', null, '游戏中', '2016-03-03 00:44:25', null, '3', '常规赛', '55', '4');
INSERT INTO `game` VALUES ('1010', '3-常规赛-108', '4', null, '2.5', null, '游戏中', '2016-03-03 00:47:05', null, '3', '常规赛', '53', '4');
INSERT INTO `game` VALUES ('1011', '1-常规赛-110', '4', null, '2.5', null, '游戏中', '2016-03-03 00:50:30', null, '1', '常规赛', '56', '4');
INSERT INTO `game` VALUES ('1012', '3-常规赛-107', '4', null, '2.5', null, '游戏中', '2016-03-03 00:54:35', null, '3', '常规赛', '55', '4');
INSERT INTO `game` VALUES ('1013', '3-常规赛-107', '4', null, '2.5', null, '游戏中', '2016-03-03 01:05:36', null, '3', '常规赛', '55', '4');
INSERT INTO `game` VALUES ('1014', '3-常规赛-108', '4', null, '2.5', null, '游戏中', '2016-03-03 01:15:24', null, '3', '常规赛', '53', '4');
INSERT INTO `game` VALUES ('1015', '3-常规赛-110', '4', null, '2.5', null, '游戏中', '2016-03-03 01:17:20', null, '3', '常规赛', '56', '4');
INSERT INTO `game` VALUES ('1016', '3-常规赛-199', '4', null, '2.5', null, '游戏中', '2016-03-03 02:34:10', null, '3', '常规赛', '57', '4');
INSERT INTO `game` VALUES ('1017', '1-常规赛-107', '4', null, '2.5', null, '游戏中', '2016-03-03 05:07:15', null, '1', '常规赛', '55', '4');
INSERT INTO `game` VALUES ('1018', '1-常规赛-108', '4', null, '2.5', null, '游戏中', '2016-03-03 05:10:20', null, '1', '常规赛', '53', '4');
INSERT INTO `game` VALUES ('1019', '1-常规赛-110', '4', null, '2.5', null, '游戏中', '2016-03-03 05:13:42', null, '1', '常规赛', '56', '4');
INSERT INTO `game` VALUES ('1020', '1-常规赛-110', '4', null, '2.5', null, '游戏中', '2016-03-03 05:14:24', null, '1', '常规赛', '56', '4');
INSERT INTO `game` VALUES ('1021', '1-常规赛-107', '4', null, '2.5', null, '游戏中', '2016-03-03 05:15:07', null, '1', '常规赛', '55', '4');
INSERT INTO `game` VALUES ('1022', '1-常规赛-107', '4', null, '2.5', null, '游戏中', '2016-03-03 05:15:28', null, '1', '常规赛', '55', '4');
INSERT INTO `game` VALUES ('1023', '1-常规赛-199', '4', null, '2.5', null, '游戏中', '2016-03-03 05:16:31', null, '1', '常规赛', '57', '4');
INSERT INTO `game` VALUES ('1024', '1-常规赛-199', '4', null, '2.5', null, '游戏中', '2016-03-03 05:16:59', null, '1', '常规赛', '57', '4');
INSERT INTO `game` VALUES ('1025', '1-常规赛-2323', '4', null, '2.5', null, '游戏中', '2016-03-03 05:18:50', null, '1', '常规赛', '54', '4');
INSERT INTO `game` VALUES ('1026', '1-常规赛-2323', '4', null, '2.5', null, '游戏中', '2016-03-03 05:19:04', null, '1', '常规赛', '54', '4');
INSERT INTO `game` VALUES ('1027', '1-常规赛-107', '4', null, '2.5', null, '游戏中', '2016-03-03 05:25:14', null, '1', '常规赛', '55', '4');
INSERT INTO `game` VALUES ('1028', '1-常规赛-108', '4', null, '2.5', null, '游戏中', '2016-03-03 05:28:38', null, '1', '常规赛', '53', '4');
INSERT INTO `game` VALUES ('1029', '3-常规赛-110', '4', null, '2.5', null, '游戏中', '2016-03-03 05:34:46', null, '3', '常规赛', '56', '4');
INSERT INTO `game` VALUES ('1030', '1-常规赛-199', '4', null, '2.5', null, '游戏中', '2016-03-03 05:36:17', null, '1', '常规赛', '57', '4');
INSERT INTO `game` VALUES ('1031', '1-常规赛-2323', '4', null, '2.5', null, '游戏中', '2016-03-03 07:11:19', null, '1', '常规赛', '54', '4');
INSERT INTO `game` VALUES ('1032', '1-常规赛-107', '4', null, '2.5', null, '游戏中', '2016-03-03 08:20:55', null, '1', '常规赛', '55', '4');
INSERT INTO `game` VALUES ('1033', '3-常规赛-107', '4', null, '2.5', null, '游戏中', '2016-03-04 00:33:09', null, '3', '常规赛', '55', '4');
INSERT INTO `game` VALUES ('1034', '3-常规赛-107', '4', null, '2.5', null, '游戏中', '2016-03-04 01:46:23', null, '3', '常规赛', '55', '4');
INSERT INTO `game` VALUES ('1035', '3-常规赛-108', '4', null, '2.5', null, '游戏中', '2016-03-04 02:02:36', null, '3', '常规赛', '53', '4');
INSERT INTO `game` VALUES ('1036', '3-常规赛-110', '4', null, '2.5', null, '游戏中', '2016-03-04 02:03:25', null, '3', '常规赛', '56', '4');
INSERT INTO `game` VALUES ('1037', '3-常规赛-199', '4', null, '2.5', null, '游戏中', '2016-03-04 02:04:47', null, '3', '常规赛', '57', '4');
INSERT INTO `game` VALUES ('1038', '3-常规赛-2323', '4', null, '2.5', null, '游戏中', '2016-03-04 02:06:18', null, '3', '常规赛', '54', '4');
INSERT INTO `game` VALUES ('1039', '3-常规赛-107', '4', null, '2.5', null, '游戏中', '2016-03-04 02:19:38', null, '3', '常规赛', '55', '4');
INSERT INTO `game` VALUES ('1040', '3-常规赛-108', '4', null, '2.5', null, '游戏中', '2016-03-04 02:25:27', null, '3', '常规赛', '53', '4');
INSERT INTO `game` VALUES ('1041', '3-常规赛-110', '4', null, '2.5', null, '游戏中', '2016-03-04 02:37:26', null, '3', '常规赛', '56', '4');
INSERT INTO `game` VALUES ('1042', '3-常规赛-199', '4', null, '2.5', null, '游戏中', '2016-03-04 02:38:01', null, '3', '常规赛', '57', '4');
INSERT INTO `game` VALUES ('1043', '3-常规赛-2323', '4', null, '2.5', null, '游戏中', '2016-03-04 02:46:00', null, '3', '常规赛', '54', '4');
INSERT INTO `game` VALUES ('1044', '3-常规赛-107', '4', null, '2.5', null, '游戏中', '2016-03-04 02:52:04', null, '3', '常规赛', '55', '4');
INSERT INTO `game` VALUES ('1045', '3-常规赛-108', '4', null, '2.5', null, '游戏中', '2016-03-04 02:58:10', null, '3', '常规赛', '53', '4');
INSERT INTO `game` VALUES ('1046', '3-常规赛-110', '4', null, '2.5', null, '游戏中', '2016-03-04 03:08:05', null, '3', '常规赛', '56', '4');
INSERT INTO `game` VALUES ('1047', '1-常规赛-199', '4', null, '2.5', null, '游戏中', '2016-03-04 03:15:21', null, '1', '常规赛', '57', '4');
INSERT INTO `game` VALUES ('1048', '1-常规赛-2323', '4', null, '2.5', null, '游戏中', '2016-03-04 03:17:23', null, '1', '常规赛', '54', '4');
INSERT INTO `game` VALUES ('1049', '3-常规赛-107', '4', null, '2.5', null, '游戏中', '2016-03-04 05:31:35', null, '3', '常规赛', '55', '4');
INSERT INTO `game` VALUES ('1050', '3-常规赛-108', '4', null, '2.5', null, '游戏中', '2016-03-04 05:44:42', null, '3', '常规赛', '53', '4');
INSERT INTO `game` VALUES ('1051', '1-常规赛-110', '4', null, '2.5', null, '游戏中', '2016-03-04 05:52:18', null, '1', '常规赛', '56', '4');
INSERT INTO `game` VALUES ('1052', '3-常规赛-199', '4', null, '2.5', null, '游戏中', '2016-03-04 05:58:08', null, '3', '常规赛', '57', '4');
INSERT INTO `game` VALUES ('1053', '1-常规赛-2323', '4', null, '2.5', null, '游戏中', '2016-03-04 05:59:38', null, '1', '常规赛', '54', '4');
INSERT INTO `game` VALUES ('1054', '1-常规赛-2323', '4', null, '2.5', null, '游戏中', '2016-03-04 06:22:07', null, '1', '常规赛', '54', '4');
INSERT INTO `game` VALUES ('1055', '1-常规赛-107', '4', null, '2.5', null, '游戏中', '2016-03-04 06:32:16', null, '1', '常规赛', '55', '4');
INSERT INTO `game` VALUES ('1056', '1-常规赛-107', '4', null, '2.5', null, '游戏中', '2016-03-11 10:35:00', null, '1', '常规赛', '55', '4');
INSERT INTO `game` VALUES ('1057', '1-常规赛-107', '4', null, '2.5', null, '游戏中', '2016-03-11 10:48:55', null, '1', '常规赛', '55', '4');
INSERT INTO `game` VALUES ('1058', '3-常规赛-107', '4', null, '2.5', null, '游戏中', '2016-03-11 11:21:25', null, '3', '常规赛', '55', '4');

-- ----------------------------
-- Table structure for goods
-- ----------------------------
DROP TABLE IF EXISTS `goods`;
CREATE TABLE `goods` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(25) DEFAULT NULL COMMENT '商品编号',
  `goodsName` varchar(100) DEFAULT NULL COMMENT '商品名称',
  `unit` varchar(25) DEFAULT NULL COMMENT '商品单位',
  `stockNum` int(11) DEFAULT NULL COMMENT '库存数量',
  `bidSum` double DEFAULT '0' COMMENT '总计',
  `status` tinyint(4) DEFAULT '1',
  `price` float(10,2) DEFAULT '0.00' COMMENT '售价',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of goods
-- ----------------------------
INSERT INTO `goods` VALUES ('11', '1455671471780', '火腿肠 htc', '根', '700', '0', '1', '2.00');
INSERT INTO `goods` VALUES ('12', '1455673152419', '老谭牛肉面 ltnrm', '个', '96', '0', '1', '5.00');
INSERT INTO `goods` VALUES ('13', '1455757131773', '风味面包 fwmb', '个', '993', '0', '1', '9.00');
INSERT INTO `goods` VALUES ('14', '1455757625323', '吐司 ts', '个', '497', '0', '1', '10.00');

-- ----------------------------
-- Table structure for member
-- ----------------------------
DROP TABLE IF EXISTS `member`;
CREATE TABLE `member` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `grade` int(11) DEFAULT NULL COMMENT '(0普通/1白金/2黑金)',
  `userName` varchar(45) DEFAULT NULL COMMENT '姓名',
  `phone` varchar(45) DEFAULT NULL,
  `birthday` datetime DEFAULT NULL,
  `integration` int(11) DEFAULT NULL COMMENT '可用积分',
  `accountCash` double DEFAULT NULL COMMENT '账户现金',
  `giftCash` double DEFAULT NULL COMMENT '赠送现金',
  `dredgeTime` datetime DEFAULT NULL COMMENT '开卡时间',
  `status` varchar(45) DEFAULT '1' COMMENT '4挂失/3换卡/2退卡1正常/0停用',
  `isDebt` tinyint(4) DEFAULT NULL COMMENT '是否赊账(0：否 1：是）',
  `createUser` varchar(45) DEFAULT NULL COMMENT '录入人员',
  `level` varchar(45) DEFAULT NULL COMMENT '游戏等级',
  `code` varchar(45) DEFAULT NULL COMMENT '会员编号',
  `image_url` varchar(45) DEFAULT NULL COMMENT '头像地址',
  `name` varchar(45) DEFAULT NULL COMMENT '会员昵称',
  `sex` varchar(11) DEFAULT NULL COMMENT '性别0男1女',
  `wechatNum` varchar(45) DEFAULT NULL COMMENT '微信号',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of member
-- ----------------------------
INSERT INTO `member` VALUES ('41', '0', '乔明星', '15666468765', '2016-02-17 00:00:00', '393', '502', '402', '2016-02-17 15:25:55', '1', '0', null, null, '20160217001', 'files/img/1455693955336.png', '乔哥', '0', '46586566');
INSERT INTO `member` VALUES ('42', '0', '不知道', '13245678767', '2016-02-16 00:00:00', '45', '78', '300', '2016-02-17 16:08:09', '1', '0', null, null, '20160217002', 'files/img/1455696489422.png', '吴明', '0', '46566519649654');
INSERT INTO `member` VALUES ('43', '0', '李文斌', '13209097878', '2016-02-16 00:00:00', '25', '25', '25', '2016-02-18 08:49:35', '1', '0', null, null, '20160218003', 'files/img/1455756575722.png', '斌斌', '0', '98878786666');
INSERT INTO `member` VALUES ('44', '0', '金秀通', '13209097878', '2016-02-17 00:00:00', '0', '566', '223', '2016-02-18 09:01:25', '1', '0', null, null, '20160218004', 'files/img/1455757285811.png', '通通', '0', '43532454523');
INSERT INTO `member` VALUES ('45', '0', '张文发', '13209097878', '2016-02-18 00:00:00', '40', '26', '284', '2016-02-18 10:56:16', '1', '0', null, null, '20160218005', 'files/img/1455764176453.png', '发哥', '0', '32433434');
INSERT INTO `member` VALUES ('46', '1', '秦敬蜜', '18790678367', '2016-02-18 00:00:00', '25', '34', '111', '2016-02-18 10:57:42', '1', '0', null, null, '20160218006', 'files/img/1455764262171.png', '吉姆', '0', '4533653535');
INSERT INTO `member` VALUES ('48', '0', '朱应凯', '18790678367', '2016-02-17 00:00:00', '40', '341', '3', '2016-02-18 10:59:25', '1', '0', null, null, '20160218007', 'files/img/1455764365297.png', '时尚凯', '0', '322353543532');
INSERT INTO `member` VALUES ('49', '0', '杨鲁鹏', '15678567845', '2015-02-17 00:00:00', '0', '331', '75', '2016-02-18 11:00:47', '1', '0', null, null, '20160218008', 'files/img/1455764447530.png', '鹏鹏', '0', '425246345');
INSERT INTO `member` VALUES ('50', '0', '董长安', '13245677656', '2016-02-18 00:00:00', '15', '3412', '3223', '2016-02-18 11:01:32', '1', '0', null, null, '20160218009', 'files/img/1455764492042.png', '安安', '0', '43534532525');
INSERT INTO `member` VALUES ('51', '0', '李波', '13209097878', '2016-02-18 00:00:00', '25', '789', '57', '2016-02-18 11:02:23', '1', '0', null, null, '20160218010', 'files/img/1455764543646.png', '波波仔', '0', '345353464364');
INSERT INTO `member` VALUES ('52', '0', '朱继鹏', '13245677656', '2016-02-17 00:00:00', '25', '2', '3', '2016-02-18 11:03:13', '1', '0', null, null, '20160218011', 'files/img/1455764593465.png', '老猪', '0', '43532454523');
INSERT INTO `member` VALUES ('53', '0', '曹跃', '13209097878', '2016-02-18 00:00:00', '25', '765', '3494', '2016-02-18 11:03:53', '1', '0', null, null, '20160218012', 'files/img/1455764633325.png', '超越梦想', '0', '46566519649654');
INSERT INTO `member` VALUES ('54', '0', '公维超', '13209097878', '2016-02-18 00:00:00', '25', '65', '54', '2016-02-18 11:04:39', '1', '0', null, null, '20160218013', 'files/img/1455764679745.png', '超超', '1', '32424324');
INSERT INTO `member` VALUES ('55', '0', '张京莲', '13209097878', '2016-02-15 00:00:00', '55', '325', '532', '2016-02-18 11:05:17', '1', '0', null, null, '20160218014', 'files/img/1455764717065.png', '金莲', '1', '23456444');
INSERT INTO `member` VALUES ('56', '0', '王潇雪', '13245677656', '2016-02-10 00:00:00', '55', '5499', '370', '2016-02-18 11:05:58', '1', '0', null, null, '20160218015', 'files/img/1455764758408.png', '小雪', '1', '345353464364');
INSERT INTO `member` VALUES ('57', '0', '卢振国', '13209097878', '2016-02-18 00:00:00', '0', '65', '33', '2016-02-18 11:07:12', '1', '0', null, null, '20160218016', 'files/img/1455764832792.png', 'luke', '0', '46566519649654');
INSERT INTO `member` VALUES ('58', '0', '刘娅妮', '13245677656', '2016-02-17 00:00:00', '40', '66', '887', '2016-02-18 11:08:20', '1', '0', null, null, '20160218017', 'files/img/1455764900773.png', '妮妮', '1', '32424324');
INSERT INTO `member` VALUES ('59', '0', '狄元君', '13209097878', '2016-02-08 00:00:00', '20', '87', '55', '2016-02-18 11:09:08', '1', '0', null, null, '20160218018', 'files/img/1455764948831.png', '狄大人', '1', '345353464364');
INSERT INTO `member` VALUES ('60', '0', '秦静谧', '15965585803', '2016-03-03 00:00:00', '0', '44', '55', '2016-03-03 07:03:08', '1', '0', null, null, '3545657899', null, '水电费等', '0', '');
INSERT INTO `member` VALUES ('61', '0', '尹彬', '15965585803', '2016-03-04 00:00:00', '0', '33', '44', '2016-03-04 06:03:14', '1', '0', null, null, '20170303002', null, '尹彬', '0', '28345583');
INSERT INTO `member` VALUES ('62', '0', '张三', '15957723721', '2016-03-11 00:00:00', '0', '33', '63', '2016-03-11 11:31:43', '1', '0', null, null, '20160217838', 'files/img/1457667103292.png', '张三丰', '0', '');

-- ----------------------------
-- Table structure for order
-- ----------------------------
DROP TABLE IF EXISTS `order`;
CREATE TABLE `order` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `status` tinyint(4) DEFAULT NULL COMMENT '状态(待结算0/已结算1/赊账2)\n',
  `sum_price` double DEFAULT NULL,
  `ctime` datetime DEFAULT NULL COMMENT '打卡时间',
  `pay_time` datetime DEFAULT NULL COMMENT '支付时间',
  `begin_time` datetime DEFAULT NULL COMMENT '游戏开始时间',
  `desc` varchar(225) DEFAULT NULL,
  `member_id` int(11) NOT NULL,
  `code` varchar(45) DEFAULT NULL COMMENT '订单编号',
  `end_time` datetime DEFAULT NULL COMMENT '游戏结束时间',
  PRIMARY KEY (`id`),
  KEY `fk_order_member1_idx` (`member_id`),
  CONSTRAINT `fk_order_member1` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of order
-- ----------------------------
INSERT INTO `order` VALUES ('45', '1', '0', '2016-03-03 05:25:20', '2016-03-10 10:32:55', '2016-03-10 22:52:35', null, '41', '1456953920849', '2016-03-10 10:32:53');
INSERT INTO `order` VALUES ('46', '1', '0', '2016-03-03 05:25:27', '2016-03-10 10:35:48', '2016-03-10 22:52:35', null, '43', '1456953927077', '2016-03-10 10:35:39');
INSERT INTO `order` VALUES ('47', '1', '0', '2016-03-03 05:25:33', '2016-03-10 10:38:42', '2016-03-10 22:52:35', null, '42', '1456953933150', '2016-03-10 10:38:40');
INSERT INTO `order` VALUES ('48', '1', '0', '2016-03-03 05:25:39', '2016-03-10 10:59:16', '2016-03-10 22:52:35', null, '45', '1456953939463', '2016-03-10 10:59:15');
INSERT INTO `order` VALUES ('49', '1', '0', '2016-03-03 05:25:45', '2016-03-10 11:00:20', '2016-03-10 22:52:35', null, '48', '1456953945527', '2016-03-10 11:00:10');
INSERT INTO `order` VALUES ('50', '1', '0', '2016-03-03 05:25:50', '2016-03-10 10:41:26', '2016-03-10 22:52:35', null, '53', '1456953950521', '2016-03-10 10:40:31');
INSERT INTO `order` VALUES ('51', '0', '0', '2016-03-03 05:25:54', null, '2016-03-10 22:52:35', null, '55', '1456953954941', '2016-03-11 11:18:05');
INSERT INTO `order` VALUES ('52', '0', '0', '2016-03-03 05:26:00', null, '2016-03-10 22:52:35', null, '57', '1456953960113', '2016-03-10 15:09:49');
INSERT INTO `order` VALUES ('53', '1', '0', '2016-03-03 05:26:04', '2016-03-10 11:07:36', '2016-03-10 22:52:35', null, '56', '1456953964652', '2016-03-10 11:07:10');
INSERT INTO `order` VALUES ('54', '0', '0', '2016-03-03 05:26:08', null, '2016-03-10 22:52:35', null, '52', '1456953968500', null);
INSERT INTO `order` VALUES ('55', '0', '0', '2016-03-03 05:26:12', null, '2016-03-10 22:52:35', null, '54', '1456953972423', null);
INSERT INTO `order` VALUES ('56', '0', '0', '2016-03-03 05:29:30', null, '2016-03-10 22:52:35', null, '58', '1456954170072', null);
INSERT INTO `order` VALUES ('57', '0', '0', '2016-03-03 05:30:09', null, '2016-03-10 22:52:35', null, '50', '1456954209122', null);
INSERT INTO `order` VALUES ('58', '0', '0', '2016-03-03 05:30:22', null, '2016-03-10 22:52:35', null, '46', '1456954222743', null);
INSERT INTO `order` VALUES ('59', '0', '0', '2016-03-03 05:30:55', null, '2016-03-10 22:52:35', null, '51', '1456954255718', null);
INSERT INTO `order` VALUES ('60', '0', '0', '2016-03-03 05:31:07', null, '2016-03-10 22:52:35', null, '49', '1456954267466', '2016-03-10 15:09:59');
INSERT INTO `order` VALUES ('61', '0', '0', '2016-03-03 05:31:12', null, '2016-03-10 22:52:35', null, '59', '1456954272893', null);
INSERT INTO `order` VALUES ('62', '0', '0', '2016-03-04 06:04:00', null, '2016-03-10 22:52:35', null, '61', '1457042640154', null);
INSERT INTO `order` VALUES ('63', '0', '0', '2016-03-11 11:25:54', null, null, null, '41', '1457666754271', null);
INSERT INTO `order` VALUES ('64', '0', '0', '2016-03-11 11:26:02', null, null, null, '42', '1457666762118', null);
INSERT INTO `order` VALUES ('65', '0', '0', '2016-03-11 11:26:06', null, null, null, '43', '1457666766568', null);
INSERT INTO `order` VALUES ('66', '0', '0', '2016-03-11 11:26:13', null, null, null, '44', '1457666773874', null);
INSERT INTO `order` VALUES ('67', '0', '0', '2016-03-11 11:26:19', null, null, null, '56', '1457666779223', null);
INSERT INTO `order` VALUES ('68', '0', '0', '2016-03-11 11:26:54', null, null, null, '48', '1457666814007', null);
INSERT INTO `order` VALUES ('69', '0', '0', '2016-03-11 11:26:58', null, null, null, '53', '1457666818679', null);
INSERT INTO `order` VALUES ('70', '0', '0', '2016-03-11 11:32:14', null, null, null, '62', '1457667134590', null);
INSERT INTO `order` VALUES ('71', '0', '0', '2016-03-11 11:32:19', null, null, null, '45', '1457667139710', null);

-- ----------------------------
-- Table structure for order_has_games
-- ----------------------------
DROP TABLE IF EXISTS `order_has_games`;
CREATE TABLE `order_has_games` (
  `order_id` int(11) NOT NULL,
  `game_id` int(11) NOT NULL,
  `status` tinyint(4) DEFAULT NULL COMMENT '0出局/1游戏中',
  `seat_code` varchar(45) DEFAULT NULL COMMENT '座位编号',
  `identity` varchar(45) DEFAULT NULL COMMENT '游戏身份',
  `integral` int(11) DEFAULT '0' COMMENT '积分',
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `room_id` int(11) DEFAULT NULL,
  `is_dead` int(11) DEFAULT '0' COMMENT '0活1死',
  `member_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_member_has_game_game1_idx` (`game_id`),
  KEY `fk_member_has_game_member1_idx` (`order_id`),
  CONSTRAINT `fk_order_has_games_game1` FOREIGN KEY (`game_id`) REFERENCES `game` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_order_has_games_order1` FOREIGN KEY (`order_id`) REFERENCES `order` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=322 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of order_has_games
-- ----------------------------
INSERT INTO `order_has_games` VALUES ('46', '1028', '1', '2', null, '0', '1', null, '0', null);
INSERT INTO `order_has_games` VALUES ('45', '1028', '1', '1', null, '0', '2', null, '0', null);
INSERT INTO `order_has_games` VALUES ('47', '1028', '1', '3', null, '0', '3', null, '0', null);
INSERT INTO `order_has_games` VALUES ('48', '1028', '1', '4', null, '0', '4', null, '0', null);
INSERT INTO `order_has_games` VALUES ('49', '1028', '1', '5', null, '0', '5', null, '0', null);
INSERT INTO `order_has_games` VALUES ('50', '1028', '1', '桌子', null, '0', '6', null, '0', null);
INSERT INTO `order_has_games` VALUES ('51', '1028', '1', '6', null, '0', '7', null, '0', null);
INSERT INTO `order_has_games` VALUES ('52', '1028', '1', '7', null, '0', '8', null, '0', null);
INSERT INTO `order_has_games` VALUES ('53', '1028', '1', '8', null, '0', '9', null, '0', null);
INSERT INTO `order_has_games` VALUES ('54', '1028', '1', '9', null, '0', '10', null, '0', null);
INSERT INTO `order_has_games` VALUES ('55', '1028', '1', '10', null, '0', '11', null, '0', null);
INSERT INTO `order_has_games` VALUES ('45', '1029', '1', '1', null, '0', '12', null, '0', null);
INSERT INTO `order_has_games` VALUES ('47', '1029', '1', '3', null, '0', '13', null, '0', null);
INSERT INTO `order_has_games` VALUES ('46', '1029', '1', '2', null, '0', '14', null, '0', null);
INSERT INTO `order_has_games` VALUES ('48', '1029', '1', '4', null, '0', '15', null, '0', null);
INSERT INTO `order_has_games` VALUES ('49', '1029', '1', '5', null, '0', '16', null, '0', null);
INSERT INTO `order_has_games` VALUES ('50', '1029', '1', '桌子', null, '0', '17', null, '0', null);
INSERT INTO `order_has_games` VALUES ('51', '1029', '1', '6', null, '0', '18', null, '0', null);
INSERT INTO `order_has_games` VALUES ('52', '1029', '1', '7', null, '0', '19', null, '0', null);
INSERT INTO `order_has_games` VALUES ('53', '1029', '1', '8', null, '0', '20', null, '0', null);
INSERT INTO `order_has_games` VALUES ('54', '1029', '1', '9', null, '0', '21', null, '0', null);
INSERT INTO `order_has_games` VALUES ('55', '1029', '1', '10', null, '0', '22', null, '0', null);
INSERT INTO `order_has_games` VALUES ('56', '1029', '1', '11', null, '0', '23', null, '0', null);
INSERT INTO `order_has_games` VALUES ('57', '1029', '1', '12', null, '0', '24', null, '0', null);
INSERT INTO `order_has_games` VALUES ('58', '1029', '1', '13', null, '0', '25', null, '0', null);
INSERT INTO `order_has_games` VALUES ('60', '1029', '1', '15', null, '0', '26', null, '0', null);
INSERT INTO `order_has_games` VALUES ('59', '1029', '1', '14', null, '0', '27', null, '0', null);
INSERT INTO `order_has_games` VALUES ('61', '1029', '1', '16', null, '0', '28', null, '0', null);
INSERT INTO `order_has_games` VALUES ('45', '1030', '1', '1', null, '0', '29', null, '0', null);
INSERT INTO `order_has_games` VALUES ('46', '1030', '1', '2', null, '0', '30', null, '0', null);
INSERT INTO `order_has_games` VALUES ('48', '1030', '1', '4', null, '0', '31', null, '0', null);
INSERT INTO `order_has_games` VALUES ('50', '1030', '1', '6', null, '0', '32', null, '0', null);
INSERT INTO `order_has_games` VALUES ('49', '1030', '1', '5', null, '0', '33', null, '0', null);
INSERT INTO `order_has_games` VALUES ('47', '1030', '1', '3', null, '0', '34', null, '0', null);
INSERT INTO `order_has_games` VALUES ('51', '1030', '1', '7', null, '0', '35', null, '0', null);
INSERT INTO `order_has_games` VALUES ('52', '1030', '1', '8', null, '0', '36', null, '0', null);
INSERT INTO `order_has_games` VALUES ('53', '1030', '1', '9', null, '0', '37', null, '0', null);
INSERT INTO `order_has_games` VALUES ('54', '1030', '1', '10', null, '0', '38', null, '0', null);
INSERT INTO `order_has_games` VALUES ('55', '1030', '1', '11', null, '0', '39', null, '0', null);
INSERT INTO `order_has_games` VALUES ('56', '1030', '1', '12', null, '0', '40', null, '0', null);
INSERT INTO `order_has_games` VALUES ('57', '1030', '1', '13', null, '0', '41', null, '0', null);
INSERT INTO `order_has_games` VALUES ('58', '1030', '1', '14', null, '0', '42', null, '0', null);
INSERT INTO `order_has_games` VALUES ('60', '1030', '1', '16', null, '0', '43', null, '0', null);
INSERT INTO `order_has_games` VALUES ('59', '1030', '1', '15', null, '0', '44', null, '0', null);
INSERT INTO `order_has_games` VALUES ('61', '1030', '1', '17', null, '0', '45', null, '0', null);
INSERT INTO `order_has_games` VALUES ('51', '1030', '1', '18', null, '0', '46', '57', '0', null);
INSERT INTO `order_has_games` VALUES ('46', '1031', '1', '2', null, '0', '47', null, '0', null);
INSERT INTO `order_has_games` VALUES ('45', '1031', '1', '1', null, '0', '48', null, '0', null);
INSERT INTO `order_has_games` VALUES ('49', '1031', '1', '5', null, '0', '49', null, '0', null);
INSERT INTO `order_has_games` VALUES ('47', '1031', '1', '3', null, '0', '50', null, '0', null);
INSERT INTO `order_has_games` VALUES ('48', '1031', '1', '4', null, '0', '51', null, '0', null);
INSERT INTO `order_has_games` VALUES ('50', '1031', '1', '6', null, '0', '52', null, '0', null);
INSERT INTO `order_has_games` VALUES ('51', '1031', '1', '7', null, '0', '53', null, '0', null);
INSERT INTO `order_has_games` VALUES ('52', '1031', '1', '8', null, '0', '54', null, '0', null);
INSERT INTO `order_has_games` VALUES ('53', '1031', '1', '9', null, '0', '55', null, '0', null);
INSERT INTO `order_has_games` VALUES ('54', '1031', '1', '10', null, '0', '56', null, '0', null);
INSERT INTO `order_has_games` VALUES ('55', '1031', '1', '11', null, '0', '57', null, '0', null);
INSERT INTO `order_has_games` VALUES ('56', '1031', '1', '12', null, '0', '58', null, '0', null);
INSERT INTO `order_has_games` VALUES ('57', '1031', '1', '13', null, '0', '59', null, '0', null);
INSERT INTO `order_has_games` VALUES ('58', '1031', '1', '14', null, '0', '60', null, '0', null);
INSERT INTO `order_has_games` VALUES ('59', '1031', '1', '15', null, '0', '61', null, '0', null);
INSERT INTO `order_has_games` VALUES ('60', '1031', '1', '16', null, '0', '62', null, '0', null);
INSERT INTO `order_has_games` VALUES ('61', '1031', '1', '17', null, '0', '63', null, '0', null);
INSERT INTO `order_has_games` VALUES ('47', '1032', '1', '3', null, '0', '64', null, '0', null);
INSERT INTO `order_has_games` VALUES ('46', '1032', '1', '2', null, '0', '65', null, '0', null);
INSERT INTO `order_has_games` VALUES ('45', '1032', '1', '1', null, '0', '66', null, '0', null);
INSERT INTO `order_has_games` VALUES ('48', '1032', '1', '4', null, '0', '67', null, '0', null);
INSERT INTO `order_has_games` VALUES ('49', '1032', '1', '5', null, '0', '68', null, '0', null);
INSERT INTO `order_has_games` VALUES ('50', '1032', '1', '6', null, '0', '69', null, '0', null);
INSERT INTO `order_has_games` VALUES ('51', '1032', '1', '7', null, '0', '70', null, '0', null);
INSERT INTO `order_has_games` VALUES ('52', '1032', '1', '8', null, '0', '71', null, '0', null);
INSERT INTO `order_has_games` VALUES ('53', '1032', '1', '9', null, '0', '72', null, '0', null);
INSERT INTO `order_has_games` VALUES ('54', '1032', '1', '10', null, '0', '73', null, '0', null);
INSERT INTO `order_has_games` VALUES ('55', '1032', '1', '11', null, '0', '74', null, '0', null);
INSERT INTO `order_has_games` VALUES ('56', '1032', '1', '12', null, '0', '75', null, '0', null);
INSERT INTO `order_has_games` VALUES ('57', '1032', '1', '13', null, '0', '76', null, '0', null);
INSERT INTO `order_has_games` VALUES ('58', '1032', '1', '14', null, '0', '77', null, '0', null);
INSERT INTO `order_has_games` VALUES ('59', '1032', '1', '15', null, '0', '78', null, '0', null);
INSERT INTO `order_has_games` VALUES ('60', '1032', '1', '16', null, '0', '79', null, '0', null);
INSERT INTO `order_has_games` VALUES ('61', '1032', '1', '17', null, '0', '80', null, '0', null);
INSERT INTO `order_has_games` VALUES ('46', '1033', '1', '2', null, '0', '81', null, '0', null);
INSERT INTO `order_has_games` VALUES ('47', '1033', '1', '3', null, '0', '82', null, '0', null);
INSERT INTO `order_has_games` VALUES ('45', '1033', '1', '1', null, '0', '83', null, '0', null);
INSERT INTO `order_has_games` VALUES ('48', '1033', '1', '4', null, '0', '84', null, '0', null);
INSERT INTO `order_has_games` VALUES ('49', '1033', '1', '5', null, '0', '85', null, '0', null);
INSERT INTO `order_has_games` VALUES ('50', '1033', '1', '6', null, '0', '86', null, '0', null);
INSERT INTO `order_has_games` VALUES ('51', '1033', '1', '7', null, '0', '87', null, '0', null);
INSERT INTO `order_has_games` VALUES ('52', '1033', '1', '8', null, '0', '88', null, '0', null);
INSERT INTO `order_has_games` VALUES ('53', '1033', '1', '9', null, '0', '89', null, '0', null);
INSERT INTO `order_has_games` VALUES ('54', '1033', '1', '10', null, '0', '90', null, '0', null);
INSERT INTO `order_has_games` VALUES ('56', '1033', '1', '12', null, '0', '91', null, '0', null);
INSERT INTO `order_has_games` VALUES ('55', '1033', '1', '11', null, '0', '92', null, '0', null);
INSERT INTO `order_has_games` VALUES ('57', '1033', '1', '13', null, '0', '93', null, '0', null);
INSERT INTO `order_has_games` VALUES ('58', '1033', '1', '14', null, '0', '94', null, '0', null);
INSERT INTO `order_has_games` VALUES ('59', '1033', '1', '15', null, '0', '95', null, '0', null);
INSERT INTO `order_has_games` VALUES ('60', '1033', '1', '16', null, '0', '96', null, '0', null);
INSERT INTO `order_has_games` VALUES ('61', '1033', '1', '17', null, '0', '97', null, '0', null);
INSERT INTO `order_has_games` VALUES ('46', '1033', '1', '18', null, '0', '98', '55', '0', null);
INSERT INTO `order_has_games` VALUES ('45', '1033', '1', '1', '乌鸦', '40', '99', '55', '2', '41');
INSERT INTO `order_has_games` VALUES ('46', '1033', '1', '2', '狼人', '0', '100', '55', '2', '43');
INSERT INTO `order_has_games` VALUES ('47', '1033', '1', '3', '平民', '25', '101', '55', '0', '42');
INSERT INTO `order_has_games` VALUES ('48', '1033', '1', '4', '白痴', '40', '102', '55', '7', '45');
INSERT INTO `order_has_games` VALUES ('49', '1033', '1', '5', '平民', '25', '103', '55', '4', '48');
INSERT INTO `order_has_games` VALUES ('50', '1033', '1', '6', '平民', '25', '104', '55', '0', '53');
INSERT INTO `order_has_games` VALUES ('51', '1033', '1', '7', '女巫', '40', '105', '55', '4', '55');
INSERT INTO `order_has_games` VALUES ('52', '1033', '1', '8', '狼人', '0', '106', '55', '2', '57');
INSERT INTO `order_has_games` VALUES ('53', '1033', '1', '9', '预言家', '40', '107', '55', '4', '56');
INSERT INTO `order_has_games` VALUES ('54', '1033', '1', '10', '平民', '25', '108', '55', '0', '52');
INSERT INTO `order_has_games` VALUES ('55', '1033', '1', '11', '平民', '25', '109', '55', '4', '54');
INSERT INTO `order_has_games` VALUES ('56', '1033', '1', '12', '猎人', '40', '110', '55', '4', '58');
INSERT INTO `order_has_games` VALUES ('57', '1033', '1', '13', '狼人', '0', '111', '55', '6', '50');
INSERT INTO `order_has_games` VALUES ('58', '1033', '1', '14', '平民', '25', '112', '55', '0', '46');
INSERT INTO `order_has_games` VALUES ('59', '1033', '1', '15', '平民', '25', '113', '55', '0', '51');
INSERT INTO `order_has_games` VALUES ('60', '1033', '1', '16', '狼人', '0', '114', '55', '2', '49');
INSERT INTO `order_has_games` VALUES ('61', '1033', '1', '17', '狼人', '0', '115', '55', '2', '59');
INSERT INTO `order_has_games` VALUES ('46', '1033', '1', '18', '平民', '25', '116', '55', '0', '43');
INSERT INTO `order_has_games` VALUES ('45', '1034', '1', '1', null, '0', '117', null, '0', null);
INSERT INTO `order_has_games` VALUES ('46', '1034', '1', '2', null, '0', '118', null, '0', null);
INSERT INTO `order_has_games` VALUES ('47', '1034', '1', '3', null, '0', '119', null, '0', null);
INSERT INTO `order_has_games` VALUES ('48', '1034', '1', '4', null, '0', '120', null, '0', null);
INSERT INTO `order_has_games` VALUES ('50', '1034', '1', '6', null, '0', '121', null, '0', null);
INSERT INTO `order_has_games` VALUES ('49', '1034', '1', '5', null, '0', '122', null, '0', null);
INSERT INTO `order_has_games` VALUES ('51', '1034', '1', '7', null, '0', '123', null, '0', null);
INSERT INTO `order_has_games` VALUES ('53', '1034', '1', '9', null, '0', '124', null, '0', null);
INSERT INTO `order_has_games` VALUES ('52', '1034', '1', '8', null, '0', '125', null, '0', null);
INSERT INTO `order_has_games` VALUES ('54', '1034', '1', '10', null, '0', '126', null, '0', null);
INSERT INTO `order_has_games` VALUES ('55', '1034', '1', '11', null, '0', '127', null, '0', null);
INSERT INTO `order_has_games` VALUES ('56', '1034', '1', '12', null, '0', '128', null, '0', null);
INSERT INTO `order_has_games` VALUES ('57', '1034', '1', '13', null, '0', '129', null, '0', null);
INSERT INTO `order_has_games` VALUES ('58', '1034', '1', '14', null, '0', '130', null, '0', null);
INSERT INTO `order_has_games` VALUES ('59', '1034', '1', '15', null, '0', '131', null, '0', null);
INSERT INTO `order_has_games` VALUES ('60', '1034', '1', '16', null, '0', '132', null, '0', null);
INSERT INTO `order_has_games` VALUES ('61', '1034', '1', '17', null, '0', '133', null, '0', null);
INSERT INTO `order_has_games` VALUES ('46', '1039', '1', '2', null, '0', '134', null, '0', null);
INSERT INTO `order_has_games` VALUES ('45', '1039', '1', '1', null, '0', '135', null, '0', null);
INSERT INTO `order_has_games` VALUES ('47', '1039', '1', '3', null, '0', '136', null, '0', null);
INSERT INTO `order_has_games` VALUES ('48', '1039', '1', '4', null, '0', '137', null, '0', null);
INSERT INTO `order_has_games` VALUES ('49', '1039', '1', '5', null, '0', '138', null, '0', null);
INSERT INTO `order_has_games` VALUES ('50', '1039', '1', '6', null, '0', '139', null, '0', null);
INSERT INTO `order_has_games` VALUES ('51', '1039', '1', '7', null, '0', '140', null, '0', null);
INSERT INTO `order_has_games` VALUES ('52', '1039', '1', '8', null, '0', '141', null, '0', null);
INSERT INTO `order_has_games` VALUES ('53', '1039', '1', '9', null, '0', '142', null, '0', null);
INSERT INTO `order_has_games` VALUES ('54', '1039', '1', '10', null, '0', '143', null, '0', null);
INSERT INTO `order_has_games` VALUES ('55', '1039', '1', '11', null, '0', '144', null, '0', null);
INSERT INTO `order_has_games` VALUES ('56', '1039', '1', '12', null, '0', '145', null, '0', null);
INSERT INTO `order_has_games` VALUES ('57', '1039', '1', '13', null, '0', '146', null, '0', null);
INSERT INTO `order_has_games` VALUES ('58', '1039', '1', '14', null, '0', '147', null, '0', null);
INSERT INTO `order_has_games` VALUES ('45', '1040', '1', '1', null, '0', '148', null, '0', null);
INSERT INTO `order_has_games` VALUES ('46', '1040', '1', '2', null, '0', '149', null, '0', null);
INSERT INTO `order_has_games` VALUES ('47', '1040', '1', '3', null, '0', '150', null, '0', null);
INSERT INTO `order_has_games` VALUES ('48', '1040', '1', '4', null, '0', '151', null, '0', null);
INSERT INTO `order_has_games` VALUES ('49', '1040', '1', '5', null, '0', '152', null, '0', null);
INSERT INTO `order_has_games` VALUES ('50', '1040', '1', '6', null, '0', '153', null, '0', null);
INSERT INTO `order_has_games` VALUES ('51', '1040', '1', '7', null, '0', '154', null, '0', null);
INSERT INTO `order_has_games` VALUES ('52', '1040', '1', '8', null, '0', '155', null, '0', null);
INSERT INTO `order_has_games` VALUES ('53', '1040', '1', '9', null, '0', '156', null, '0', null);
INSERT INTO `order_has_games` VALUES ('54', '1040', '1', '10', null, '0', '157', null, '0', null);
INSERT INTO `order_has_games` VALUES ('55', '1040', '1', '11', null, '0', '158', null, '0', null);
INSERT INTO `order_has_games` VALUES ('56', '1040', '1', '12', null, '0', '159', null, '0', null);
INSERT INTO `order_has_games` VALUES ('57', '1040', '1', '13', null, '0', '160', null, '0', null);
INSERT INTO `order_has_games` VALUES ('58', '1040', '1', '14', null, '0', '161', null, '0', null);
INSERT INTO `order_has_games` VALUES ('59', '1040', '1', '15', null, '0', '162', null, '0', null);
INSERT INTO `order_has_games` VALUES ('60', '1040', '1', '16', null, '0', '163', null, '0', null);
INSERT INTO `order_has_games` VALUES ('61', '1040', '1', '17', null, '0', '164', null, '0', null);
INSERT INTO `order_has_games` VALUES ('46', '1040', '1', '18', null, '0', '165', null, '0', null);
INSERT INTO `order_has_games` VALUES ('45', '1041', '1', '1', null, '0', '166', null, '0', null);
INSERT INTO `order_has_games` VALUES ('46', '1041', '1', '2', null, '0', '167', null, '0', null);
INSERT INTO `order_has_games` VALUES ('47', '1041', '1', '3', null, '0', '168', null, '0', null);
INSERT INTO `order_has_games` VALUES ('49', '1041', '1', '5', null, '0', '169', null, '0', null);
INSERT INTO `order_has_games` VALUES ('48', '1041', '1', '4', null, '0', '170', null, '0', null);
INSERT INTO `order_has_games` VALUES ('50', '1041', '1', '6', null, '0', '171', null, '0', null);
INSERT INTO `order_has_games` VALUES ('51', '1041', '1', '7', null, '0', '172', null, '0', null);
INSERT INTO `order_has_games` VALUES ('52', '1041', '1', '8', null, '0', '173', null, '0', null);
INSERT INTO `order_has_games` VALUES ('53', '1041', '1', '9', null, '0', '174', null, '0', null);
INSERT INTO `order_has_games` VALUES ('54', '1041', '1', '10', null, '0', '175', null, '0', null);
INSERT INTO `order_has_games` VALUES ('55', '1041', '1', '11', null, '0', '176', null, '0', null);
INSERT INTO `order_has_games` VALUES ('56', '1041', '1', '12', null, '0', '177', null, '0', null);
INSERT INTO `order_has_games` VALUES ('57', '1041', '1', '13', null, '0', '178', null, '0', null);
INSERT INTO `order_has_games` VALUES ('58', '1041', '1', '14', null, '0', '179', null, '0', null);
INSERT INTO `order_has_games` VALUES ('59', '1041', '1', '15', null, '0', '180', null, '0', null);
INSERT INTO `order_has_games` VALUES ('60', '1041', '1', '16', null, '0', '181', null, '0', null);
INSERT INTO `order_has_games` VALUES ('61', '1041', '1', '17', null, '0', '182', null, '0', null);
INSERT INTO `order_has_games` VALUES ('46', '1041', '1', '18', null, '0', '183', null, '0', null);
INSERT INTO `order_has_games` VALUES ('45', '1042', '1', '1', null, '0', '184', null, '0', null);
INSERT INTO `order_has_games` VALUES ('46', '1042', '1', '2', null, '0', '185', null, '0', null);
INSERT INTO `order_has_games` VALUES ('47', '1042', '1', '3', null, '0', '186', null, '0', null);
INSERT INTO `order_has_games` VALUES ('48', '1042', '1', '4', null, '0', '187', null, '0', null);
INSERT INTO `order_has_games` VALUES ('49', '1042', '1', '5', null, '0', '188', null, '0', null);
INSERT INTO `order_has_games` VALUES ('50', '1042', '1', '6', null, '0', '189', null, '0', null);
INSERT INTO `order_has_games` VALUES ('51', '1042', '1', '7', null, '0', '190', null, '0', null);
INSERT INTO `order_has_games` VALUES ('53', '1042', '1', '9', null, '0', '191', null, '0', null);
INSERT INTO `order_has_games` VALUES ('52', '1042', '1', '8', null, '0', '192', null, '0', null);
INSERT INTO `order_has_games` VALUES ('54', '1042', '1', '10', null, '0', '193', null, '0', null);
INSERT INTO `order_has_games` VALUES ('55', '1042', '1', '11', null, '0', '194', null, '0', null);
INSERT INTO `order_has_games` VALUES ('56', '1042', '1', '12', null, '0', '195', null, '0', null);
INSERT INTO `order_has_games` VALUES ('57', '1042', '1', '13', null, '0', '196', null, '0', null);
INSERT INTO `order_has_games` VALUES ('59', '1042', '1', '15', null, '0', '197', null, '0', null);
INSERT INTO `order_has_games` VALUES ('58', '1042', '1', '14', null, '0', '198', null, '0', null);
INSERT INTO `order_has_games` VALUES ('60', '1042', '1', '16', null, '0', '199', null, '0', null);
INSERT INTO `order_has_games` VALUES ('61', '1042', '1', '17', null, '0', '200', null, '0', null);
INSERT INTO `order_has_games` VALUES ('46', '1042', '1', '18', null, '0', '201', null, '0', null);
INSERT INTO `order_has_games` VALUES ('45', '1043', '1', '1', null, '0', '202', null, '0', null);
INSERT INTO `order_has_games` VALUES ('46', '1043', '1', '2', null, '0', '203', null, '0', null);
INSERT INTO `order_has_games` VALUES ('47', '1043', '1', '3', null, '0', '204', null, '0', null);
INSERT INTO `order_has_games` VALUES ('48', '1043', '1', '4', null, '0', '205', null, '0', null);
INSERT INTO `order_has_games` VALUES ('49', '1043', '1', '5', null, '0', '206', null, '0', null);
INSERT INTO `order_has_games` VALUES ('50', '1043', '1', '6', null, '0', '207', null, '0', null);
INSERT INTO `order_has_games` VALUES ('51', '1043', '1', '7', null, '0', '208', null, '0', null);
INSERT INTO `order_has_games` VALUES ('52', '1043', '1', '8', null, '0', '209', null, '0', null);
INSERT INTO `order_has_games` VALUES ('53', '1043', '1', '9', null, '0', '210', null, '0', null);
INSERT INTO `order_has_games` VALUES ('54', '1043', '1', '10', null, '0', '211', null, '0', null);
INSERT INTO `order_has_games` VALUES ('55', '1043', '1', '11', null, '0', '212', null, '0', null);
INSERT INTO `order_has_games` VALUES ('56', '1043', '1', '12', null, '0', '213', null, '0', null);
INSERT INTO `order_has_games` VALUES ('57', '1043', '1', '13', null, '0', '214', null, '0', null);
INSERT INTO `order_has_games` VALUES ('58', '1043', '1', '14', null, '0', '215', null, '0', null);
INSERT INTO `order_has_games` VALUES ('59', '1043', '1', '15', null, '0', '216', null, '0', null);
INSERT INTO `order_has_games` VALUES ('60', '1043', '1', '16', null, '0', '217', null, '0', null);
INSERT INTO `order_has_games` VALUES ('61', '1043', '1', '17', null, '0', '218', null, '0', null);
INSERT INTO `order_has_games` VALUES ('46', '1043', '1', '18', null, '0', '219', null, '0', null);
INSERT INTO `order_has_games` VALUES ('45', '1044', '1', '1', null, '0', '220', null, '0', null);
INSERT INTO `order_has_games` VALUES ('46', '1044', '1', '2', null, '0', '221', null, '0', null);
INSERT INTO `order_has_games` VALUES ('47', '1044', '1', '3', null, '0', '222', null, '0', null);
INSERT INTO `order_has_games` VALUES ('48', '1044', '1', '4', null, '0', '223', null, '0', null);
INSERT INTO `order_has_games` VALUES ('50', '1044', '1', '6', null, '0', '224', null, '0', null);
INSERT INTO `order_has_games` VALUES ('49', '1044', '1', '5', null, '0', '225', null, '0', null);
INSERT INTO `order_has_games` VALUES ('51', '1044', '1', '7', null, '0', '226', null, '0', null);
INSERT INTO `order_has_games` VALUES ('52', '1044', '1', '8', null, '0', '227', null, '0', null);
INSERT INTO `order_has_games` VALUES ('53', '1044', '1', '9', null, '0', '228', null, '0', null);
INSERT INTO `order_has_games` VALUES ('54', '1044', '1', '10', null, '0', '229', null, '0', null);
INSERT INTO `order_has_games` VALUES ('55', '1044', '1', '11', null, '0', '230', null, '0', null);
INSERT INTO `order_has_games` VALUES ('56', '1044', '1', '12', null, '0', '231', null, '0', null);
INSERT INTO `order_has_games` VALUES ('57', '1044', '1', '13', null, '0', '232', null, '0', null);
INSERT INTO `order_has_games` VALUES ('58', '1044', '1', '14', null, '0', '233', null, '0', null);
INSERT INTO `order_has_games` VALUES ('59', '1044', '1', '15', null, '0', '234', null, '0', null);
INSERT INTO `order_has_games` VALUES ('60', '1044', '1', '16', null, '0', '235', null, '0', null);
INSERT INTO `order_has_games` VALUES ('61', '1044', '1', '17', null, '0', '236', null, '0', null);
INSERT INTO `order_has_games` VALUES ('46', '1044', '1', '18', null, '0', '237', null, '0', null);
INSERT INTO `order_has_games` VALUES ('45', '1045', '1', '1', null, '0', '238', '53', '0', null);
INSERT INTO `order_has_games` VALUES ('46', '1045', '1', '2', null, '0', '239', '53', '0', null);
INSERT INTO `order_has_games` VALUES ('47', '1045', '1', '3', null, '0', '240', '53', '0', null);
INSERT INTO `order_has_games` VALUES ('49', '1045', '1', '4', null, '0', '241', '53', '0', null);
INSERT INTO `order_has_games` VALUES ('45', '1046', '1', '1', null, '0', '242', '56', '0', null);
INSERT INTO `order_has_games` VALUES ('46', '1046', '1', '2', null, '0', '243', '56', '0', null);
INSERT INTO `order_has_games` VALUES ('52', '1047', '1', '1', null, '0', '244', '57', '0', null);
INSERT INTO `order_has_games` VALUES ('46', '1048', '1', '1', null, '0', '245', '54', '0', null);
INSERT INTO `order_has_games` VALUES ('46', '1048', '1', '2', null, '0', '246', '54', '0', null);
INSERT INTO `order_has_games` VALUES ('45', '1049', '1', '18', null, '0', '247', '55', '0', null);
INSERT INTO `order_has_games` VALUES ('45', '1050', '1', '18', null, '0', '248', '53', '0', null);
INSERT INTO `order_has_games` VALUES ('46', '1050', '1', '8', null, '0', '249', '53', '0', null);
INSERT INTO `order_has_games` VALUES ('47', '1051', '1', '1', null, '0', '250', '56', '0', null);
INSERT INTO `order_has_games` VALUES ('54', '1051', '1', '18', null, '0', '251', '56', '0', null);
INSERT INTO `order_has_games` VALUES ('47', '1051', '1', '9', null, '0', '252', '56', '0', null);
INSERT INTO `order_has_games` VALUES ('47', '1051', '1', '9', null, '0', '253', '56', '0', null);
INSERT INTO `order_has_games` VALUES ('53', '1051', '1', '6', null, '0', '254', '56', '0', null);
INSERT INTO `order_has_games` VALUES ('56', '1051', '1', '14', null, '0', '255', '56', '0', null);
INSERT INTO `order_has_games` VALUES ('56', '1051', '1', '14', null, '0', '256', '56', '0', null);
INSERT INTO `order_has_games` VALUES ('56', '1051', '1', '14', null, '0', '257', '56', '0', null);
INSERT INTO `order_has_games` VALUES ('56', '1051', '1', '14', null, '0', '258', '56', '0', null);
INSERT INTO `order_has_games` VALUES ('45', '1052', '1', '10', null, '0', '259', '57', '0', null);
INSERT INTO `order_has_games` VALUES ('46', '1052', '1', '4', null, '0', '260', '57', '0', null);
INSERT INTO `order_has_games` VALUES ('51', '1053', '1', '13', null, '0', '261', '54', '0', null);
INSERT INTO `order_has_games` VALUES ('50', '1053', '1', '10', null, '0', '262', '54', '0', null);
INSERT INTO `order_has_games` VALUES ('56', '1053', '1', '17', null, '0', '263', '54', '0', null);
INSERT INTO `order_has_games` VALUES ('45', '1053', '1', '8', null, '0', '264', '54', '0', null);
INSERT INTO `order_has_games` VALUES ('47', '1053', '1', '6', null, '0', '265', '54', '0', null);
INSERT INTO `order_has_games` VALUES ('49', '1053', '1', '10', null, '0', '266', '54', '0', null);
INSERT INTO `order_has_games` VALUES ('50', '1053', '1', '12', null, '0', '267', '54', '0', null);
INSERT INTO `order_has_games` VALUES ('54', '1053', '1', '14', null, '0', '268', '54', '0', null);
INSERT INTO `order_has_games` VALUES ('57', '1053', '1', '18', null, '0', '269', '54', '0', null);
INSERT INTO `order_has_games` VALUES ('59', '1053', '1', '16', null, '0', '270', '54', '0', null);
INSERT INTO `order_has_games` VALUES ('61', '1053', '1', '4', null, '0', '271', '54', '0', null);
INSERT INTO `order_has_games` VALUES ('51', '1053', '1', '3', null, '0', '272', '54', '0', null);
INSERT INTO `order_has_games` VALUES ('53', '1053', '1', '2', null, '0', '273', '54', '0', null);
INSERT INTO `order_has_games` VALUES ('62', '1053', '1', '5', null, '0', '274', '54', '0', null);
INSERT INTO `order_has_games` VALUES ('53', '1053', '1', '2', '平民', '15', '275', '54', '0', '56');
INSERT INTO `order_has_games` VALUES ('51', '1053', '1', '3', '平民', '15', '276', '54', '0', '55');
INSERT INTO `order_has_games` VALUES ('61', '1053', '1', '4', '预言家', '20', '277', '54', '0', '59');
INSERT INTO `order_has_games` VALUES ('47', '1053', '1', '6', '白痴', '20', '278', '54', '0', '42');
INSERT INTO `order_has_games` VALUES ('45', '1053', '1', '8', '猎人', '20', '279', '54', '4', '41');
INSERT INTO `order_has_games` VALUES ('49', '1053', '1', '10', '平民', '15', '280', '54', '4', '48');
INSERT INTO `order_has_games` VALUES ('50', '1053', '1', '12', '狼人', '0', '281', '54', '7', '53');
INSERT INTO `order_has_games` VALUES ('54', '1053', '1', '14', '狼人', '0', '282', '54', '2', '52');
INSERT INTO `order_has_games` VALUES ('59', '1053', '1', '16', '狼人', '0', '283', '54', '0', '51');
INSERT INTO `order_has_games` VALUES ('57', '1053', '1', '18', '平民', '15', '284', '54', '2', '50');
INSERT INTO `order_has_games` VALUES ('45', '1054', '1', '16', null, '0', '285', '54', '0', null);
INSERT INTO `order_has_games` VALUES ('49', '1055', '1', '18', null, '0', '286', '55', '0', null);
INSERT INTO `order_has_games` VALUES ('55', '1055', '1', '7', null, '0', '287', '55', '0', null);
INSERT INTO `order_has_games` VALUES ('55', '1055', '1', '7', null, '0', '288', '55', '0', null);
INSERT INTO `order_has_games` VALUES ('55', '1055', '1', '7', null, '0', '289', '55', '0', null);
INSERT INTO `order_has_games` VALUES ('55', '1055', '1', '7', null, '0', '290', '55', '0', null);
INSERT INTO `order_has_games` VALUES ('53', '1055', '1', '13', null, '0', '291', '55', '0', null);
INSERT INTO `order_has_games` VALUES ('53', '1055', '1', '13', null, '0', '292', '55', '0', null);
INSERT INTO `order_has_games` VALUES ('53', '1055', '1', '13', null, '0', '293', '55', '0', null);
INSERT INTO `order_has_games` VALUES ('53', '1055', '1', '13', null, '0', '294', '55', '0', null);
INSERT INTO `order_has_games` VALUES ('54', '1055', '1', '8', null, '0', '295', '55', '0', null);
INSERT INTO `order_has_games` VALUES ('56', '1055', '1', '12', null, '0', '296', '55', '0', null);
INSERT INTO `order_has_games` VALUES ('57', '1055', '1', '14', null, '0', '297', '55', '0', null);
INSERT INTO `order_has_games` VALUES ('57', '1055', '1', '14', null, '0', '298', '55', '0', null);
INSERT INTO `order_has_games` VALUES ('57', '1055', '1', '14', null, '0', '299', '55', '0', null);
INSERT INTO `order_has_games` VALUES ('56', '1058', '1', '1', null, '0', '300', '55', '0', null);
INSERT INTO `order_has_games` VALUES ('54', '1058', '1', '4', null, '0', '301', '55', '0', null);
INSERT INTO `order_has_games` VALUES ('60', '1058', '1', '16', null, '0', '302', '55', '0', null);
INSERT INTO `order_has_games` VALUES ('58', '1058', '1', '15', null, '0', '303', '55', '0', null);
INSERT INTO `order_has_games` VALUES ('62', '1058', '1', '10', null, '0', '304', '55', '0', null);
INSERT INTO `order_has_games` VALUES ('52', '1058', '1', '5', null, '0', '305', '55', '0', null);
INSERT INTO `order_has_games` VALUES ('61', '1058', '1', '7', null, '0', '306', '55', '0', null);
INSERT INTO `order_has_games` VALUES ('58', '1058', '1', '9', null, '0', '307', '55', '0', null);
INSERT INTO `order_has_games` VALUES ('59', '1058', '1', '11', null, '0', '308', '55', '0', null);
INSERT INTO `order_has_games` VALUES ('55', '1058', '1', '13', null, '0', '309', '55', '0', null);
INSERT INTO `order_has_games` VALUES ('51', '1058', '1', '15', null, '0', '310', '55', '0', null);
INSERT INTO `order_has_games` VALUES ('51', '1058', '1', '15', null, '0', '311', '55', '0', null);
INSERT INTO `order_has_games` VALUES ('65', '1058', '1', '2', null, '0', '312', '55', '0', null);
INSERT INTO `order_has_games` VALUES ('68', '1058', '1', '3', null, '0', '313', '55', '0', null);
INSERT INTO `order_has_games` VALUES ('66', '1058', '1', '6', null, '0', '314', '55', '0', null);
INSERT INTO `order_has_games` VALUES ('69', '1058', '1', '8', null, '0', '315', '55', '0', null);
INSERT INTO `order_has_games` VALUES ('61', '1058', '1', '12', null, '0', '316', '55', '0', null);
INSERT INTO `order_has_games` VALUES ('57', '1058', '1', '14', null, '0', '317', '55', '0', null);
INSERT INTO `order_has_games` VALUES ('63', '1058', '1', '12', null, '0', '318', '55', '0', null);
INSERT INTO `order_has_games` VALUES ('55', '1058', '1', '17', null, '0', '319', '55', '0', null);
INSERT INTO `order_has_games` VALUES ('70', '1058', '1', '17', null, '0', '320', '55', '0', null);
INSERT INTO `order_has_games` VALUES ('64', '1058', '1', '18', null, '0', '321', '55', '0', null);

-- ----------------------------
-- Table structure for order_has_goods
-- ----------------------------
DROP TABLE IF EXISTS `order_has_goods`;
CREATE TABLE `order_has_goods` (
  `goods_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `sum` int(11) DEFAULT '0' COMMENT '总计',
  `privilege` varchar(11) DEFAULT '' COMMENT '0:无1:9折',
  `date` datetime DEFAULT NULL,
  `status` tinyint(1) DEFAULT '1' COMMENT '0可用1不可用',
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  KEY `fk_order_has_goods_goods1_idx` (`goods_id`),
  KEY `fk_order_has_goods_order1_idx` (`order_id`),
  CONSTRAINT `order_has_goods_ibfk_1` FOREIGN KEY (`goods_id`) REFERENCES `goods` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `order_has_goods_ibfk_2` FOREIGN KEY (`order_id`) REFERENCES `order` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of order_has_goods
-- ----------------------------
INSERT INTO `order_has_goods` VALUES ('12', '45', '3', '', '2016-03-09 16:31:45', '1', '1');
INSERT INTO `order_has_goods` VALUES ('12', '50', '3', '', '2016-03-10 10:40:33', '1', '2');
INSERT INTO `order_has_goods` VALUES ('12', '50', '4', '', '2016-03-10 10:40:55', '1', '3');
INSERT INTO `order_has_goods` VALUES ('13', '48', '2', '', '2016-03-10 10:54:52', '1', '4');
INSERT INTO `order_has_goods` VALUES ('12', '49', '2', '', '2016-03-10 11:00:14', '1', '5');
INSERT INTO `order_has_goods` VALUES ('14', '49', '3', '', '2016-03-10 11:00:38', '1', '6');
INSERT INTO `order_has_goods` VALUES ('13', '53', '5', '', '2016-03-10 11:07:03', '1', '7');
INSERT INTO `order_has_goods` VALUES ('12', '53', '2', '', '2016-03-10 11:07:24', '1', '8');
INSERT INTO `order_has_goods` VALUES ('13', '57', '1', '', '2016-03-10 15:11:32', '1', '9');
INSERT INTO `order_has_goods` VALUES ('11', '57', '1', '', '2016-03-10 15:11:48', '1', '10');
INSERT INTO `order_has_goods` VALUES ('11', '51', '2', '', '2016-03-11 11:18:30', '1', '11');
INSERT INTO `order_has_goods` VALUES ('13', '51', '1', '', '2016-03-11 11:18:39', '1', '12');

-- ----------------------------
-- Table structure for room
-- ----------------------------
DROP TABLE IF EXISTS `room`;
CREATE TABLE `room` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(45) DEFAULT NULL COMMENT '房间编号',
  `seatCount` int(11) DEFAULT NULL COMMENT '座位数量',
  `status` int(11) DEFAULT NULL COMMENT '0未占用/1占用中/2删除',
  `layoutJson` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of room
-- ----------------------------
INSERT INTO `room` VALUES ('53', '108', '18', '0', '[{\"x\":2,\"y\":0,\"width\":1,\"height\":1,\"name\":\"1\"},{\"x\":3,\"y\":0,\"width\":1,\"height\":1,\"name\":\"2\"},{\"x\":4,\"y\":0,\"width\":1,\"height\":1,\"name\":\"3\"},{\"x\":5,\"y\":0,\"width\":1,\"height\":1,\"name\":\"4\"},{\"x\":2,\"y\":1,\"width\":1,\"height\":1,\"name\":\"5\"},{\"x\":3,\"y\":1,\"width\":2,\"height\":7,\"name\":\"桌子\"},{\"x\":5,\"y\":1,\"width\":1,\"height\":1,\"name\":\"6\"},{\"x\":2,\"y\":2,\"width\":1,\"height\":1,\"name\":\"7\"},{\"x\":5,\"y\":2,\"width\":1,\"height\":1,\"name\":\"8\"},{\"x\":2,\"y\":3,\"width\":1,\"height\":1,\"name\":\"9\"},{\"x\":5,\"y\":3,\"width\":1,\"height\":1,\"name\":\"10\"},{\"x\":2,\"y\":4,\"width\":1,\"height\":1,\"name\":\"11\"},{\"x\":5,\"y\":4,\"width\":1,\"height\":1,\"name\":\"12\"},{\"x\":2,\"y\":5,\"width\":1,\"height\":1,\"name\":\"13\"},{\"x\":5,\"y\":5,\"width\":1,\"height\":1,\"name\":\"14\"},{\"x\":2,\"y\":6,\"width\":1,\"height\":1,\"name\":\"15\"},{\"x\":5,\"y\":6,\"width\":1,\"height\":1,\"name\":\"16\"},{\"x\":2,\"y\":7,\"width\":1,\"height\":1,\"name\":\"17\"},{\"x\":5,\"y\":7,\"width\":1,\"height\":1,\"name\":\"18\"},{\"x\":3,\"y\":8,\"width\":2,\"height\":1,\"name\":\"裁判\"}]');
INSERT INTO `room` VALUES ('54', '2323', '11', '0', '[{\"x\":2,\"y\":0,\"width\":1,\"height\":1,\"name\":\"1\"},{\"x\":3,\"y\":0,\"width\":1,\"height\":1,\"name\":\"2\"},{\"x\":4,\"y\":0,\"width\":1,\"height\":1,\"name\":\"3\"},{\"x\":5,\"y\":0,\"width\":1,\"height\":1,\"name\":\"4\"},{\"x\":2,\"y\":1,\"width\":1,\"height\":1,\"name\":\"5\"},{\"x\":3,\"y\":1,\"width\":2,\"height\":7,\"name\":\"桌子\"},{\"x\":5,\"y\":1,\"width\":1,\"height\":1,\"name\":\"6\"},{\"x\":2,\"y\":2,\"width\":1,\"height\":1,\"name\":\"7\"},{\"x\":5,\"y\":2,\"width\":1,\"height\":1,\"name\":\"8\"},{\"x\":2,\"y\":3,\"width\":1,\"height\":1,\"name\":\"9\"},{\"x\":5,\"y\":3,\"width\":1,\"height\":1,\"name\":\"10\"},{\"x\":2,\"y\":4,\"width\":1,\"height\":1,\"name\":\"11\"},{\"x\":5,\"y\":4,\"width\":1,\"height\":1,\"name\":\"12\"},{\"x\":2,\"y\":5,\"width\":1,\"height\":1,\"name\":\"13\"},{\"x\":5,\"y\":5,\"width\":1,\"height\":1,\"name\":\"14\"},{\"x\":2,\"y\":6,\"width\":1,\"height\":1,\"name\":\"15\"},{\"x\":5,\"y\":6,\"width\":1,\"height\":1,\"name\":\"16\"},{\"x\":2,\"y\":7,\"width\":1,\"height\":1,\"name\":\"17\"},{\"x\":5,\"y\":7,\"width\":1,\"height\":1,\"name\":\"18\"},{\"x\":3,\"y\":8,\"width\":2,\"height\":1,\"name\":\"裁判\"}]');
INSERT INTO `room` VALUES ('55', '107', '18', '1', '[{\"x\":2,\"y\":0,\"width\":1,\"height\":1,\"name\":\"1\"},{\"x\":3,\"y\":0,\"width\":1,\"height\":1,\"name\":\"2\"},{\"x\":4,\"y\":0,\"width\":1,\"height\":1,\"name\":\"3\"},{\"x\":5,\"y\":0,\"width\":1,\"height\":1,\"name\":\"4\"},{\"x\":2,\"y\":1,\"width\":1,\"height\":1,\"name\":\"5\"},{\"x\":3,\"y\":1,\"width\":2,\"height\":7,\"name\":\"桌子\"},{\"x\":5,\"y\":1,\"width\":1,\"height\":1,\"name\":\"6\"},{\"x\":2,\"y\":2,\"width\":1,\"height\":1,\"name\":\"7\"},{\"x\":5,\"y\":2,\"width\":1,\"height\":1,\"name\":\"8\"},{\"x\":2,\"y\":3,\"width\":1,\"height\":1,\"name\":\"9\"},{\"x\":5,\"y\":3,\"width\":1,\"height\":1,\"name\":\"10\"},{\"x\":2,\"y\":4,\"width\":1,\"height\":1,\"name\":\"11\"},{\"x\":5,\"y\":4,\"width\":1,\"height\":1,\"name\":\"12\"},{\"x\":2,\"y\":5,\"width\":1,\"height\":1,\"name\":\"13\"},{\"x\":5,\"y\":5,\"width\":1,\"height\":1,\"name\":\"14\"},{\"x\":2,\"y\":6,\"width\":1,\"height\":1,\"name\":\"15\"},{\"x\":5,\"y\":6,\"width\":1,\"height\":1,\"name\":\"16\"},{\"x\":2,\"y\":7,\"width\":1,\"height\":1,\"name\":\"17\"},{\"x\":5,\"y\":7,\"width\":1,\"height\":1,\"name\":\"18\"},{\"x\":3,\"y\":8,\"width\":2,\"height\":1,\"name\":\"裁判\"}]');
INSERT INTO `room` VALUES ('56', '110', '16', '1', '[{\"x\":2,\"y\":0,\"width\":1,\"height\":1,\"name\":\"1\"},{\"x\":3,\"y\":0,\"width\":1,\"height\":1,\"name\":\"2\"},{\"x\":4,\"y\":0,\"width\":1,\"height\":1,\"name\":\"3\"},{\"x\":5,\"y\":0,\"width\":1,\"height\":1,\"name\":\"4\"},{\"x\":2,\"y\":1,\"width\":1,\"height\":1,\"name\":\"5\"},{\"x\":3,\"y\":1,\"width\":2,\"height\":7,\"name\":\"桌子\"},{\"x\":5,\"y\":1,\"width\":1,\"height\":1,\"name\":\"6\"},{\"x\":2,\"y\":2,\"width\":1,\"height\":1,\"name\":\"7\"},{\"x\":5,\"y\":2,\"width\":1,\"height\":1,\"name\":\"8\"},{\"x\":2,\"y\":3,\"width\":1,\"height\":1,\"name\":\"9\"},{\"x\":5,\"y\":3,\"width\":1,\"height\":1,\"name\":\"10\"},{\"x\":2,\"y\":4,\"width\":1,\"height\":1,\"name\":\"11\"},{\"x\":5,\"y\":4,\"width\":1,\"height\":1,\"name\":\"12\"},{\"x\":2,\"y\":5,\"width\":1,\"height\":1,\"name\":\"13\"},{\"x\":5,\"y\":5,\"width\":1,\"height\":1,\"name\":\"14\"},{\"x\":2,\"y\":6,\"width\":1,\"height\":1,\"name\":\"15\"},{\"x\":5,\"y\":6,\"width\":1,\"height\":1,\"name\":\"16\"},{\"x\":2,\"y\":7,\"width\":1,\"height\":1,\"name\":\"17\"},{\"x\":5,\"y\":7,\"width\":1,\"height\":1,\"name\":\"18\"},{\"x\":3,\"y\":8,\"width\":2,\"height\":1,\"name\":\"裁判\"}]');
INSERT INTO `room` VALUES ('57', '199', '11', '1', '[{\"x\":2,\"y\":0,\"width\":1,\"height\":1,\"name\":\"1\"},{\"x\":3,\"y\":0,\"width\":1,\"height\":1,\"name\":\"2\"},{\"x\":4,\"y\":0,\"width\":1,\"height\":1,\"name\":\"3\"},{\"x\":5,\"y\":0,\"width\":1,\"height\":1,\"name\":\"4\"},{\"x\":2,\"y\":1,\"width\":1,\"height\":1,\"name\":\"5\"},{\"x\":3,\"y\":1,\"width\":2,\"height\":7,\"name\":\"桌子\"},{\"x\":5,\"y\":1,\"width\":1,\"height\":1,\"name\":\"6\"},{\"x\":2,\"y\":2,\"width\":1,\"height\":1,\"name\":\"7\"},{\"x\":5,\"y\":2,\"width\":1,\"height\":1,\"name\":\"8\"},{\"x\":2,\"y\":3,\"width\":1,\"height\":1,\"name\":\"9\"},{\"x\":5,\"y\":3,\"width\":1,\"height\":1,\"name\":\"10\"},{\"x\":2,\"y\":4,\"width\":1,\"height\":1,\"name\":\"11\"},{\"x\":5,\"y\":4,\"width\":1,\"height\":1,\"name\":\"12\"},{\"x\":2,\"y\":5,\"width\":1,\"height\":1,\"name\":\"13\"},{\"x\":5,\"y\":5,\"width\":1,\"height\":1,\"name\":\"14\"},{\"x\":2,\"y\":6,\"width\":1,\"height\":1,\"name\":\"15\"},{\"x\":5,\"y\":6,\"width\":1,\"height\":1,\"name\":\"16\"},{\"x\":2,\"y\":7,\"width\":1,\"height\":1,\"name\":\"17\"},{\"x\":5,\"y\":7,\"width\":1,\"height\":1,\"name\":\"18\"},{\"x\":3,\"y\":8,\"width\":2,\"height\":1,\"name\":\"裁判\"}]');

-- ----------------------------
-- Table structure for settings
-- ----------------------------
DROP TABLE IF EXISTS `settings`;
CREATE TABLE `settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `value` varchar(10000) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of settings
-- ----------------------------
INSERT INTO `settings` VALUES ('1', '1', '{\"消费账户设置\":{\"现金账户可消费\":{\"游戏\":1,\"商品\":1},\"赠送账户可消费\":{\"游戏\":1,\"商品\":0},\"赠送账户金额\":10},\"游戏价格设置\":{\"小时\":4,\"元\":25,\"超出后每小时元\":5},\"晋级设置\":{\"分数\":500},\"比赛种类设置\":{\"种类\":[{\"名字\":\"常规赛\",\"分数\":25},{\"名字\":\"晋级赛\",\"分数\":30},{\"名字\":\"年赛\",\"分数\":35}]},\"积分设置\":{\"种类\":[{\"名字\":\"10-11\",\"分数\":[20,20,15]},{\"名字\":\"12-13-14\",\"分数\":[30,30,20]},{\"名字\":\"15-16-17-18\",\"分数\":[40,40,25]}]},\"游戏积分设置\":{\"0\":500,\"1\":1500,\"2\":3000,\"3\":5000,\"4\":7500,\"5\":10000,\"6\":15000,\"7\":20000},\"优惠设置\":{\"会员优惠\":[{\"普通卡\":9,\"优惠期\":\"2015.10.10 — 2015.11.10.10\",\"优惠范围\":{\"游戏\":1,\"商品\":1}},{\"黑金卡\":8,\"优惠期\":\"2015.10.10 — 2015.11.10.10\",\"优惠范围\":{\"游戏\":1,\"商品\":1}},{\"白金卡\":7.7,\"优惠期\":\"2015.10.10 — 2015.11.10.10\",\"优惠范围\":{\"游戏\":1,\"商品\":1}}],\"游戏优惠\":[{\"名称\":\"优惠1\",\"元\":25,\"小时\":4,\"是否会员价优惠\":1},{\"名称\":\"优惠2\",\"元\":25,\"小时\":4,\"是否会员价优惠\":1},{\"名称\":\"优惠3\",\"元\":25,\"小时\":4,\"是否会员价优惠\":1},{\"名称\":\"优惠4\",\"元\":25,\"小时\":4,\"是否会员价优惠\":1}],\"商品优惠\":[{\"商品名称\":\"商品1\",\"优惠方式\":{\"单件折扣优\":{\"状态\":1,\"值\":7.7},\"满减优惠\":{\"状态\":0,\"满\":100,\"减\":15},\"件数优惠\":{\"状态\":0,\"满\":10,\"减\":1}},\"是否会原价基础优惠\":1},{\"商品名称\":\"商品2\",\"优惠方式\":{\"单件折扣优\":{\"状态\":1,\"值\":7.7},\"满减优惠\":{\"状态\":0,\"满\":100,\"减\":15},\"件数优惠\":{\"状态\":0,\"满\":10,\"减\":1}},\"是否会原价基础优惠\":1},{\"商品名称\":\"商品3\",\"优惠方式\":{\"单件折扣优\":{\"状态\":1,\"值\":7.7},\"满减优惠\":{\"状态\":0,\"满\":100,\"减\":15},\"件数优惠\":{\"状态\":0,\"满\":10,\"减\":1}},\"是否会原价基础优惠\":1}]},\"权限设置\":{\"权限\":[{\"收银台\":1,\"详细\":{\"结算\":1,\"订单详情\":1,\"开加单\":1,\"删单\":1,\"清空\":1}},{\"游戏间\":1,\"详细\":{\"游戏开间\":1,\"游戏间查询\":1,\"更换裁判\":1,\"游戏主持\":1}},{\"游戏间\":1,\"详细\":{\"游戏开间\":1,\"游戏间查询\":1,\"更换裁判\":1,\"游戏主持\":1}},{\"会员管理\":1,\"详细\":{\"会员注册\":1,\"会员查询\":1,\"会员删除\":1,\"会员编辑\":1,\"会员充值\":1,\"消费详情\":1,\"会员状态\":1,\"赠送账户\":1}},{\"商品管理\":1,\"详细\":{\"商品查询\":1,\"商品删除\":1,\"商品编辑\":1,\"商品状态\":1}},{\"商品入库\":1,\"详细\":{\"入库查询\":1,\"商品入库\":1,\"商品编辑\":1,\"商品删除\":1}},{\"消息\":1,\"详细\":{}},{\"基本设置\":1,\"详细\":{\"房间设置\":1,\"优惠设置\":1,\"积分设置\":1,\"消费账户设置\":1,\"用户设置\":1}}]}}');
INSERT INTO `settings` VALUES ('3', '2', '[{\"名字\":\"消费账户设置\",\"现金账户可消费\":{\"游戏\":1,\"商品\":1},\"赠送账户可消费\":{\"游戏\":1,\"商品\":0},\"赠送账户金额\":10},{\"名字\":\"优惠设置\",\"会员优惠\":[{\"普通卡\":9,\"优惠期\":\"2015.10.10 — 2015.11.10.10\",\"优惠范围\":{\"游戏\":1,\"商品\":1}},{\"黑金卡\":8,\"优惠期\":\"2015.10.10 — 2015.11.10.10\",\"优惠范围\":{\"游戏\":1,\"商品\":1}},{\"白金卡\":7.7,\"优惠期\":\"2015.10.10 — 2015.11.10.10\",\"优惠范围\":{\"游戏\":1,\"商品\":1}}],\"游戏优惠\":[{\"名称\":\"优惠1\",\"元\":25,\"小时\":4,\"是否会员价优惠\":1},{\"名称\":\"优惠2\",\"元\":25,\"小时\":4,\"是否会员价优惠\":1},{\"名称\":\"优惠3\",\"元\":25,\"小时\":4,\"是否会员价优惠\":1},{\"名称\":\"优惠4\",\"元\":25,\"小时\":4,\"是否会员价优惠\":1}],\"商品优惠\":[{\"商品名称\":\"商品1\",\"优惠方式\":{\"单件折扣优\":{\"状态\":1,\"值\":7.7},\"满减优惠\":{\"状态\":0,\"满\":100,\"减\":15},\"件数优惠\":{\"状态\":0,\"满\":10,\"减\":1}},\"是否会原价基础优惠\":1},{\"商品名称\":\"商品2\",\"优惠方式\":{\"单件折扣优\":{\"状态\":1,\"值\":7.7},\"满减优惠\":{\"状态\":0,\"满\":100,\"减\":15},\"件数优惠\":{\"状态\":0,\"满\":10,\"减\":1}},\"是否会原价基础优惠\":1},{\"商品名称\":\"商品3\",\"优惠方式\":{\"单件折扣优\":{\"状态\":1,\"值\":7.7},\"满减优惠\":{\"状态\":0,\"满\":100,\"减\":15},\"件数优惠\":{\"状态\":0,\"满\":10,\"减\":1}},\"是否会原价基础优惠\":1}]}]');
INSERT INTO `settings` VALUES ('4', '3', '{\"消费账户设置\":{\"现金账户可消费\":{\"游戏\":1,\"商品\":1},\"赠送账户可消费\":{\"游戏\":1,\"商品\":0},\"赠送账户金额\":10},\"游戏价格设置\":{\"小时\":4,\"元\":25,\"超出后每小时元\":5},\"晋级设置\":{\"分数\":500},\"比赛种类设置\":{\"种类\":[{\"名字\":\"常规赛\",\"分数\":25},{\"名字\":\"晋级赛\",\"分数\":30},{\"名字\":\"年赛\",\"分数\":35}]},\"积分设置\":{\"种类\":[{\"名字\":\"10-11\",\"分数\":[20,20,15]},{\"名字\":\"12-13-14\",\"分数\":[30,30,20]},{\"名字\":\"15-16-17-18\",\"分数\":[40,40,25]}]},\"游戏积分设置\":{\"0\":500,\"1\":1500,\"2\":3000,\"3\":5000,\"4\":7500,\"5\":10000,\"6\":15000,\"7\":20000},\"优惠设置\":{\"会员优惠\":{\"普通卡\":{\"折扣\":9,\"优惠期\":\"2015.10.10 — 2015.11.10.10\",\"优惠范围\":{\"游戏\":1,\"商品\":1}},\"黑金卡\":{\"折扣\":8,\"优惠期\":\"2015.10.10 — 2015.11.10.10\",\"优惠范围\":{\"游戏\":1,\"商品\":1}},\"白金卡\":{\"折扣\":7.7,\"优惠期\":\"2015.10.10 — 2015.11.10.10\",\"优惠范围\":{\"游戏\":1,\"商品\":1}}},\"游戏优惠\":{\"优惠1\":{\"元\":25,\"小时\":4,\"是否会员价优惠\":1},\"优惠2\":{\"元\":25,\"小时\":4,\"是否会员价优惠\":1},\"优惠3\":{\"元\":25,\"小时\":4,\"是否会员价优惠\":1},\"优惠4\":{\"元\":25,\"小时\":4,\"是否会员价优惠\":1}},\"商品优惠\":{\"商品1\":{\"优惠方式\":{\"单件折扣优\":{\"状态\":1,\"值\":7.7},\"满减优惠\":{\"状态\":0,\"满\":100,\"减\":15},\"件数优惠\":{\"状态\":0,\"满\":10,\"减\":1}},\"是否会原价基础优惠\":1},\"商品2\":{\"优惠方式\":{\"单件折扣优\":{\"状态\":1,\"值\":7.7},\"满减优惠\":{\"状态\":0,\"满\":100,\"减\":15},\"件数优惠\":{\"状态\":0,\"满\":10,\"减\":1}},\"是否会原价基础优惠\":1},\"商品3\":{\"优惠方式\":{\"单件折扣优\":{\"状态\":1,\"值\":7.7},\"满减优惠\":{\"状态\":0,\"满\":100,\"减\":15},\"件数优惠\":{\"状态\":0,\"满\":10,\"减\":1}},\"是否会原价基础优惠\":1}}},\"权限设置\":{\"权限\":[{\"收银台\":1,\"详细\":{\"结算\":1,\"订单详情\":1,\"开加单\":1,\"删单\":1,\"清空\":1}},{\"游戏间\":1,\"详细\":{\"游戏开间\":1,\"游戏间查询\":1,\"更换裁判\":1,\"游戏主持\":1}},{\"游戏间\":1,\"详细\":{\"游戏开间\":1,\"游戏间查询\":1,\"更换裁判\":1,\"游戏主持\":1}},{\"会员管理\":1,\"详细\":{\"会员注册\":1,\"会员查询\":1,\"会员删除\":1,\"会员编辑\":1,\"会员充值\":1,\"消费详情\":1,\"会员状态\":1,\"赠送账户\":1}},{\"商品管理\":1,\"详细\":{\"商品查询\":1,\"商品删除\":1,\"商品编辑\":1,\"商品状态\":1}},{\"商品入库\":1,\"详细\":{\"入库查询\":1,\"商品入库\":1,\"商品编辑\":1,\"商品删除\":1}},{\"消息\":1,\"详细\":{}},{\"基本设置\":1,\"详细\":{\"房间设置\":1,\"优惠设置\":1,\"积分设置\":1,\"消费账户设置\":1,\"用户设置\":1}}]}}');
INSERT INTO `settings` VALUES ('5', '4', '{\"游戏价格设置\":{\"小时\":4,\"元\":25,\"超出后每小时元\":5},\"比赛种类设置\":{\"种类\":[{\"名字\":\"常规赛\",\"分数\":25},{\"名字\":\"晋级赛\",\"分数\":30},{\"名字\":\"年赛\",\"分数\":35}]},\"游戏积分设置\":{\"1\":500,\"2\":1500,\"3\":3000,\"4\":5000,\"5\":7500,\"6\":10000,\"7\":15000,\"8\":20000},\"优惠设置\":{\"游戏优惠\":{\"1\":0.98,\"2\":0.96,\"3\":0.94,\"4\":0.92,\"5\":0.9,\"6\":0.88,\"7\":0.86,\"8\":0.84}},\"权限设置\":{\"收银员\":[\"商品管理\",\"商品入库\",\"消息管理\",\"关于系统\",\"收银台\"],\"管理员\":[\"商品管理\",\"商品入库\",\"消息管理\",\"关于系统\",\"会员管理\",\"游戏间\",\"收银台\",\"基本设置\",\"员工管理\"],\"裁判\":[\"游戏间\",\"消息管理\",\"关于系统\"]},\"游戏设置\":{\"1\":{\"游戏人数限制\":{\"最少\":10,\"最多\":11},\"狼人数量限制\":3,\"局的名称\":\"10/11人局\",\"身份特征\":\"3狼3身份\",\"从第几天开始\":0,\"是否有村长\":false,\"获胜所得分数配置\":{\"狼人\":20,\"身份\":20,\"平民\":15},\"从第几个环节开始\":0,\"游戏流程环节配置\":[{\"环节名称\":\"狼人环节\",\"是否显示\":true},{\"环节名称\":\"猎人环节\",\"是否显示\":true},{\"环节名称\":\"白痴环节\",\"是否显示\":true},{\"环节名称\":\"预言家环节\",\"是否显示\":true},{\"环节名称\":\"投票环节\",\"是否显示\":true}],\"身份名称\":[\"预言家\",\"白痴\",\"猎人\"]},\"2\":{\"游戏人数限制\":{\"最少\":12,\"最多\":14},\"狼人数量限制\":4,\"局的名称\":\"12/13/14人局\",\"身份特征\":\"4狼4身份\",\"从第几天开始\":0,\"是否有村长\":false,\"获胜所得分数配置\":{\"狼人\":30,\"身份\":30,\"平民\":20},\"从第几个环节开始\":0,\"游戏流程环节配置\":[{\"环节名称\":\"狼人环节\",\"是否显示\":true},{\"环节名称\":\"女巫环节\",\"是否显示\":true},{\"环节名称\":\"猎人环节\",\"是否显示\":true},{\"环节名称\":\"白痴环节\",\"是否显示\":true},{\"环节名称\":\"预言家环节\",\"是否显示\":true},{\"环节名称\":\"竞选村长环节\",\"是否显示\":true},{\"环节名称\":\"投票环节\",\"是否显示\":true}],\"身份名称\":[\"预言家\",\"白痴\",\"猎人\",\"女巫\"]},\"3\":{\"游戏人数限制\":{\"最少\":15,\"最多\":18},\"狼人数量限制\":5,\"局的名称\":\"15/16/17/18人局\",\"身份特征\":\"5狼5身份\",\"从第几天开始\":0,\"是否有村长\":false,\"获胜所得分数配置\":{\"狼人\":40,\"身份\":40,\"平民\":25},\"从第几个环节开始\":0,\"游戏流程环节配置\":[{\"环节名称\":\"狼人环节\",\"是否显示\":true},{\"环节名称\":\"女巫环节\",\"是否显示\":true},{\"环节名称\":\"猎人环节\",\"是否显示\":true},{\"环节名称\":\"白痴环节\",\"是否显示\":true},{\"环节名称\":\"乌鸦环节\",\"是否显示\":true},{\"环节名称\":\"预言家环节\",\"是否显示\":true},{\"环节名称\":\"竞选村长环节\",\"是否显示\":true},{\"环节名称\":\"投票环节\",\"是否显示\":true}],\"身份名称\":[\"预言家\",\"白痴\",\"猎人\",\"女巫\",\"乌鸦\"]}}}');

-- ----------------------------
-- Table structure for storage
-- ----------------------------
DROP TABLE IF EXISTS `storage`;
CREATE TABLE `storage` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(45) DEFAULT NULL COMMENT '商品编号',
  `bid` double DEFAULT NULL COMMENT '商品进价',
  `bidSum` double DEFAULT NULL COMMENT '总计',
  `storedTime` datetime DEFAULT NULL COMMENT '入库日期',
  `buyer` varchar(45) DEFAULT NULL COMMENT '采购人员',
  `createUser` varchar(45) DEFAULT NULL COMMENT '录入人员',
  `remark` varchar(45) DEFAULT NULL COMMENT '备注',
  `status` tinyint(4) DEFAULT NULL COMMENT '状态:0不可用,1可用',
  `stockCode` varchar(100) DEFAULT NULL COMMENT '入库编号',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=82 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of storage
-- ----------------------------
INSERT INTO `storage` VALUES ('73', '1455671471780', '2', '12', '2016-02-19 11:01:53', '1', 'admin', '1', '1', null);
INSERT INTO `storage` VALUES ('74', '1455671471780', '3', '22', '2016-02-24 14:55:11', '1', 'admin', '1', '1', null);
INSERT INTO `storage` VALUES ('75', '1455673152419', '1', '1', '2016-02-24 14:55:43', '1', 'admin', '1', '1', null);
INSERT INTO `storage` VALUES ('76', '1455671471780', '1', '1', '2016-02-24 14:56:14', '1', 'admin', '1', '1', null);
INSERT INTO `storage` VALUES ('77', '1455671471780', '6', '100', '2016-03-10 10:50:22', '', 'admin', '', '1', null);
INSERT INTO `storage` VALUES ('78', '1455673152419', '5', '30', '2016-03-10 10:50:39', '', 'admin', '', '1', null);
INSERT INTO `storage` VALUES ('79', '1455757625323', '8', '200', '2016-03-10 10:53:38', '', 'admin', '', '1', null);
INSERT INTO `storage` VALUES ('80', '1455673152419', '7', '66', '2016-03-10 10:54:19', '', 'admin', '', '1', null);
INSERT INTO `storage` VALUES ('81', '1455757131773', '6', '88', '2016-03-10 11:06:05', '', 'admin', '', '1', null);

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) DEFAULT NULL COMMENT '工号',
  `password` varchar(100) DEFAULT NULL,
  `realName` varchar(45) DEFAULT NULL COMMENT '姓名',
  `role` varchar(45) DEFAULT NULL COMMENT '角色(管理员/裁判收银员)',
  `menu_id` varchar(1500) DEFAULT NULL COMMENT '菜单',
  `action_id` varchar(1500) DEFAULT NULL COMMENT '按钮',
  `status` tinyint(4) DEFAULT '1' COMMENT '1正常，0不可用',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('4', 'felixyin', '123456', '尹彬', '裁判', '裁判', null, '1');
INSERT INTO `user` VALUES ('15', 'zhangkai', '123456', '张凯', '管理员', '管理员', null, '0');
INSERT INTO `user` VALUES ('16', 'admin', '123456', 'jinxiutong', '管理员', '管理员', null, '1');
INSERT INTO `user` VALUES ('17', 'caipan', '123456', '狄元军', '裁判', '裁判', null, '1');
INSERT INTO `user` VALUES ('18', 'qinjingmi', '123456', '亲静谧', '裁判', '裁判', null, '1');
INSERT INTO `user` VALUES ('42', 'shouyinyuan', '123456', '曹越', '收银员', '收银员', null, '1');
