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
    var selectSql = "SELECT * FROM goods";

    var whereSql = " WHERE 1 = 1 \n";
    req.body.goodsName && (whereSql += " AND goodsName LIKE '%:goodsName%' /*商品名称*/");
    req.body.code && (whereSql += " AND code LIKE '%:code%' /*商品编号*/");
    req.body.stockNum && (whereSql += " AND stockNum LIKE '%:stockNum%' /*库存数量*/");
    req.body.status && (whereSql += " AND `status` LIKE '%:status%' /*状态*/");

    sp.selectPager(req, res, db, selectSql, whereSql);
};
/**
 * 增加用户
 * @param memberInfo
 * @param cb
 */
exports.addGoodsInfo = function (goodsInfo, cb) {
    var tuple = dbutil.getInsertSeletiveSql(goodsInfo);
    var sql = ['INSERT INTO goods ' + tuple.sql].join();
    db.pool.query(sql, tuple.param, cb);
};

/**
 * 更改用户状态
 * @param memberId
 * @param cb
 */
exports.updateGoodsStatus = function (goodsId, status, cb) {
    var updateSql = ' UPDATE goods SET `status` =? WHERE id = ?';
    db.pool.query(updateSql, [status, goodsId], cb);

};


/**
 * 编辑信息
 */
exports.updateGoodsInfo = function (id, goodsInfo, cb) {
    var goodsInfo = _.clone(goodsInfo);
    delete goodsInfo['id'];
    var tuple = dbutil.getUpdateSeletiveSql(goodsInfo);
    tuple.param.push(id);
    db.pool.query('UPDATE goods SET ' + tuple.sql + ' WHERE id = ?', tuple.param, cb)
};

/**
 * 购买商品
 */
exports.shopping = function (memberParams, goodsParams, cb) {
    var goodsInfo = _.clone(goodsInfo);
    delete goodsInfo['id'];
    var tuple = dbutil.getUpdateSeletiveSql(goodsInfo);
    tuple.param.push(id);
    db.pool.query('UPDATE goods SET ' + tuple.sql + ' WHERE id = ?', tuple.param, cb)
};
//得到所有的商品名
exports.getAllGoodsName = function (cb) {
    db.pool.query("SELECT concat(`goodsName`,',库存:', `stockNum`,`unit`) as goodsName FROM goods WHERE goods.stockNum>0", cb);
};
//创建订单
exports.createOrder = function (orderInfo, cb) {
    var tuple = dbutil.getInsertSeletiveSql(orderInfo);
    var sql = ['INSERT INTO order_has_goods ' + tuple.sql].join();
    db.pool.query(sql, tuple.param, cb);
};

//根据座位号拿到订单号
exports.getOrderIdBySeatcode = function (seatcode, roomcode, cb) {
    db.pool.query('SELECT ohg.order_id FROM order_has_games ohg LEFT JOIN room r ON ohg.room_id = r.id WHERE ohg.seat_code = ? AND r.`code` = ? AND r.`status` = 1', [seatcode, roomcode], cb);
};
//根据订商品名拿到商品的id
exports.getGoodsIdByGoodsName = function (goodsname, cb) {
    db.pool.query('SELECT id FROM goods WHERE goodsName = ?', goodsname, cb);
};
exports.minusStock = function (id, sum, cb) {
    db.pool.query('UPDATE goods SET stockNum = stockNum-? WHERE id = ?', [sum, id], cb);
};

exports.getAllGoodsCodeAndName = function (cb) {
    db.pool.query("SELECT concat(`goodsName`,',', `code`) as content FROM goods where status =1", function (err, result) {
        cb(err, _.map(result, function (row) {
            return row.content;
        }));
    });
};
/**
 * 入库后增加库存
 * @param code
 * @param bidSum
 * @param cb
 */
exports.plusStock = function (code, bidSum, cb) {
    db.pool.query('UPDATE goods SET stockNum = stockNum+? WHERE code = ?', [bidSum, code], cb);
};

