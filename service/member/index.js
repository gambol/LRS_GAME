/**
 * Created by fy on 15-12-25.
 */
'use strict';
var sp = require('../../lib/pager/select-pager');
var db = require('../../config/db');
var dateFormat = require('date-format');
var fs = require('fs');
var date = require('../../lib/date');
var _ = require('underscore');

/**
 *  查询用户的信息，带有分页
 */
exports.list = function (req, res, next) {
    //var params = URL.parse(req.url, true).query;
    var selectSql = "SELECT * FROM member";

    var whereSql = " WHERE 1 = 1 \n";
    req.body.code && (whereSql += " AND code LIKE '%:code%' /*会员ID*/");
    req.body.userName && (whereSql += " AND userName LIKE '%:userName%' /*姓名*/\n");
    req.body.phone && (whereSql += " AND phone LIKE '%:phone%' /*手机*/\n");
    req.body.birthday && (whereSql += " AND (IFNULL(':bithday', '') LIKE '%:birthday%') /*生日*/\n");
    req.body.grade && (whereSql += " AND grade = :grade /*会员等级*/\n");
    req.body.status && (whereSql += " AND status = :status /*状态*/\n");
    req.body.name && (whereSql += " AND name LIKE '%:name%' /*会员昵称*/\n");

    sp.selectPager(req, res, db, selectSql, whereSql);
};

/**
 * 查询会员是否存在
 * @param memberCode
 * @param cb
 */
exports.checkUserExits = function (memberCode, cb) {
    var sql = "SELECT\n" +
        "	mem.*, o.id as order_id\n" +
        "FROM\n" +
        "	`order` o\n" +
        "INNER JOIN member mem ON o.member_id = mem.id\n" +
        "WHERE\n" +
        "	o.`status` = 0\n" +
        "AND mem.`code` = ?";
    db.pool.query(sql, memberCode, cb);
};

/**
 * 在应用启动的时候或者在进入游戏之前，缓存在本地
 * @param cb
 */
exports.getAllMemberForCache = function (cb) {
    // FIXME 这个sql还得继续完善，如果已经在一个游戏间中玩游戏了，就不要再在另一个房间中使用
    var sql = "SELECT\n" +
        "	concat(m.`code`, ',', m.name) AS content\n" +
        "FROM\n" +
        "	member m\n" +
        "INNER JOIN `order` o ON m.id = o.member_id\n" +
        "WHERE\n" +
        "	o. STATUS = 0 /*未结算状态*/ AND m.status = 1/*正常使用*/";
    console.log(sql);
    db.pool.query(sql, function (err, result) {
        cb(err, _.map(result, function (row) {
            return row.content;
        }));
    });
};
/**
 * 得到所有的会员
 * @param cb
 */
exports.getAllMember = function (cb) {
    var sql = "SELECT\n" +
        "	concat(m.`code`, ',', m.name) AS content\n" +
        "FROM\n" +
        "	member m\n" +
        "WHERE\n" +
        "	m.id NOT IN (\n" +
        "		SELECT\n" +
        "			o.member_id\n" +
        "		FROM\n" +
        "			`order` o\n" +
        "		WHERE\n" +
        "			o. STATUS IN (0, 2)\n" +
        "	)";
    db.pool.query(sql, function (err, result) {
        cb(err, _.map(result, function (row) {
            return row.content;
        }));
    });
};


/**
 * 累加用户所得的积分
 * @param memberId
 * @param integration
 * @param cb
 */
exports.updateIntegration = function (memberId, integration, cb) {
    var updateSql = 'UPDATE member SET integration = integration + ? WHERE id = ?';
    db.pool.query(updateSql, [integration, memberId], cb);
};

var dbutil = require('../../lib/db/dbutil');
/**
 * 编辑会员信息
 */
exports.updateMemberInfo = function (id, member, cb) {
    var memberInfo = _.clone(member);
    delete memberInfo['id'];
    var tuple = dbutil.getUpdateSeletiveSql(memberInfo);
    tuple.param.push(id);
    db.pool.query('UPDATE member SET ' + tuple.sql + ' WHERE id = ?', tuple.param, cb)
};

/**
 * 增加用户信息
 * @param memberInfo
 * @param cb
 */
exports.addMemberInfo = function (memberInfo, cb) {
    var tuple = dbutil.getInsertSeletiveSql(memberInfo);
    var sql = ['INSERT INTO member ' + tuple.sql].join();
    db.pool.query(sql, tuple.param, cb);
};
/**
 * 删除用户信息
 * @param memberId
 * @param cb
 */
exports.delMemberInfo = function (memberId, cb) {
    var delSql = ' UPDATE member SET `status` =0 WHERE id = ?';
    db.pool.query(delSql, [memberId], cb);
};
/**
 * 校验用户编号是否已经存在
 * @param code
 * @param cb
 */
exports.validateMemberCode = function (code, cb) {
    var selSql ='SELECT id FROM member m WHERE m.code = ?' ;
    db.pool.query(selSql, [code], cb);
};


exports.validateMemberName = function (userName, cb) {
    var sql = 'SELECT * FROM member m WHERE m.name = ?';
    db.pool.query(sql, userName, cb);
};

exports.saveXX = function (vo, cb) {
    vo.x;
    cb({status: true, data: data});
};
