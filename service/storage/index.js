/**
 * Created by HZC on 2015/09/04.
 */
var dateFormat = require('date-format');
var fs = require('fs');
var sp = require('../../lib/pager/select-pager');
var db = require('../../config/db');
var date = require('../../lib/date');
var dbutil = require('../../lib/db/dbutil');
var _ = require('underscore');
/**
 * 查询所有裁判或者收银员
 * @param role
 * @param cb
 */
exports.selectUserByRole = function (role, cb) {
    db.pool.query('SELECT * FROM user WHERE role = ?', role, cb);
};

exports.selectAllJudgment = function (cb) {
    this.selectUserByRole('裁判', cb);

};
/**
 * 查询所有用户
 */
exports.list = function (req, res, next) {
    //var params = URL.parse(req.url, true).query;
    var selectSql = "SELECT st.*, g.goodsName FROM `storage` st LEFT JOIN goods g ON st.`code` = g.`code`";
    var whereSql = " WHERE 1 = 1 \n";
    req.body.bid && (whereSql += " AND st.bid LIKE '%:bid%' /*商品进价*/");
    req.body.goodsName && (whereSql += " AND g.goodsName LIKE '%:goodsName%' /*商品名称*/");
    req.body.buyer && (whereSql += " AND st.buyer LIKE '%:buyer%' /*录入人员*/");

    sp.selectPager(req, res, db, selectSql, whereSql);
};
/**
 * 增加用户
 * @param memberInfo
 * @param cb
 */
exports.addStorageInfo = function (storageInfo, cb) {
    var tuple = dbutil.getInsertSeletiveSql(storageInfo);
    var sql = ['INSERT INTO storage ' + tuple.sql].join();
    db.pool.query(sql, tuple.param, cb);
};

/**
 * 更改用户状态
 * @param memberId
 * @param cb
 */
exports.updateStorageStatus = function (storageId, status, cb) {
    var updateSql = ' UPDATE storage SET `status` =? WHERE id = ?';
    db.pool.query(updateSql, [status, storageId], cb);

};


/**
 * 编辑信息
 */
exports.updateStorageInfo = function (id, storageInfo, cb) {
    var storageInfo = _.clone(storageInfo);
    delete storageInfo['id'];
    var tuple = dbutil.getUpdateSeletiveSql(storageInfo);
    tuple.param.push(id);
    db.pool.query('UPDATE storage SET ' + tuple.sql + ' WHERE id = ?', tuple.param, cb)
};
