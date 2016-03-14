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
var settingsService = require('../settings/index');
/**
 * 根据会员的ID查询所有的订单
 * @param member_id
 * @param cb
 */
exports.selectOrderByMemberId = function (member_id, cb) {
    db.pool.query('SELECT * FROM order WHERE member_id = ?', member_id, cb);
};
/**
 * 根据会员的ID查询游戏消费的订单
 * @param member_id
 * @param cb
 */
exports.selectGameOrderByMemberId = function (member_id, cb) {
    db.pool.query('SELECT * FROM order_has_game ohg WHERE ohg.member_id = ?', member_id, cb);
};

/**
 * 根据会员的ID查询商品消费的订单
 */
exports.selectGoodsOrderByMemberId = function (member_id, cb) {

};
/**
 *
 */
exports.list = function (req, res, next) {
    var whereSql = "WHERE 1=1";
    var selectSql = "SELECT\n" +
        "	o.id,\n" +
        "	o.`code` AS orderCode,\n" +
        "	o.member_id,\n" +
        "	m.code AS memCode,\n" +
        "	m.userName,\n" +
        "	m.phone,\n" +
        "	m.accountCash,\n" +
        "	m.giftCash,\n" +
        "	m.integration,\n" +
        "	o.`status`,\n" +
        "	o.*,\n" +
        "	m.name\n" +
            // "	ohg.seat_code,\n" +
            //"  ohg.`status` AS gameStatus,\n" +
            // "  r.`code` AS roomCode\n" +
        "FROM\n" +
        "	`order` o\n" +
        "LEFT JOIN member m ON o.member_id = m.id\n";
    //"LEFT JOIN order_has_games ohg ON o.id = ohg.order_id\n" +
    //"LEFT JOIN room r ON ohg.room_id = r.id\n";

    req.body.code && (whereSql += " AND m.`code` LIKE '%:code%' /*会员ID*/");
    req.body.phone && (whereSql += " AND m.phone LIKE '%:phone%' /*手机号*/");
    req.body.userName && (whereSql += " AND m.userName LIKE '%:userName%' /*会员名称*/");
    if (req.body.status == -1) {

    } else if (req.body.status > 0) {
        whereSql += " AND o.status =:status /*订单状态*/";
    } else {
        whereSql += " AND o.status =0 /*订单状态(0未结账)*/";
    }


    sp.selectPager(req, res, db, selectSql, whereSql);
};

/**
 * 打卡
 * @param memberInfo
 * @param cb
 */
exports.addCheckoutInfo = function (checkoutInfo, cb) {
    var tuple = dbutil.getInsertSeletiveSql(checkoutInfo);
    var sql = ['INSERT INTO `order` ' + tuple.sql].join();
    db.pool.query(sql, tuple.param, cb);
};

/**
 * 充值
 * @param memberId
 * @param cb
 */
exports.updateChargeInfo = function (id, chargeInfo, cb) {
    var cashInfo = {};
    var chargeInfo = _.clone(chargeInfo);
    delete chargeInfo['member_id'];
    db.pool.query('SELECT accountCash, giftCash FROM member WHERE id = ?', [id], function (err, row, field) {
        if (err) throw  err;
        if (row && row[0]) {
            cashInfo = {
                accountCash: row[0].accountCash || 0,
                giftCash: row[0].giftCash || 0
            };
            for (var key in chargeInfo) {
                var a = chargeInfo[key];
                var b = cashInfo[key];
                a = parseFloat(a) + parseFloat(b);
                chargeInfo[key] = a;
            }
            db.pool.query('UPDATE member SET accountCash = ?, giftCash = ? WHERE id = ?',
                [chargeInfo.accountCash, chargeInfo.giftCash, id], function (err, rows) {
                    cb(err, rows);
                });
        }
    });
};
/**
 * 得到账单信息除了商品消费和优惠
 * @param memberId
 * @param checkoutId
 * @param cb
 */
exports.getOrderInfo = function (checkoutId, cb) {
    db.pool.query("SELECT\n" +
        "	o.`code` AS orderCode,\n" +
        "	mem.`code` AS memberCode,\n" +
        "	mem.userName,\n" +
        "	mem.accountCash,\n" +
        "	mem.giftCash,\n" +
        "   mem.grade,\n" +
        "	g.startTime,\n" +
        "	g.endTime\n" +
        "FROM\n" +
        "	`order` o\n" +
        "LEFT JOIN member mem ON o.member_id = mem.id\n" +
        "LEFT JOIN order_has_games ohg ON ohg.order_id = o.id\n" +
        "LEFT JOIN game g ON ohg.game_id = g.id\n" +
        "WHERE\n" +
        "	o.id = ?", [checkoutId], cb);
};
/**
 * 得到商品列表
 * @param checkoutId
 * @param cb
 */
exports.getGoodsList = function (checkoutId, cb) {
    db.pool.query("SELECT\n" +
        "	g.goodsName,\n" +
        "	sum(sum) AS sum,\n" +
        "  g.price\n" +
        "FROM\n" +
        "	order_has_goods ohg\n" +
        "LEFT JOIN goods g ON ohg.goods_id = g.id\n" +
        "WHERE\n" +
        "	ohg.order_id = ?\n" +
        "GROUP BY\n" +
        "	ohg.goods_id", [checkoutId], cb);
};
/**
 * 更新订单状态
 * @param id
 * @param status
 * @param cb
 */
exports.updateOrderInfo = function (id, status, cb) {
    db.pool.query('UPDATE `order` SET `status`=? , pay_time= now() WHERE id = ?', [status, id], cb)
};


/**
 * 开始计时
 */
exports.updateTimeForBeginGame = function (orderId, cb) {
    var selectSql = 'SELECT o.begin_time FROM `order` o WHERE o.id = ?';
    db.pool.query(selectSql, orderId, function (err, rows, field) {
        if (rows && rows.length === 1) {
            var row = rows[0];
            if (row.begin_time) {
                cb('已经开始计时了', null);
                return;
            }
            var updateSql = 'UPDATE `order` o SET o.begin_time = NOW() WHERE o.id = ?';
            db.pool.query(updateSql, orderId, cb);
        }
    });
};
/**
 * 根据会员编号拿到会员的id
 * @param memberId
 * @param cb
 */
exports.getMemberIdByCode = function (memberId, cb) {
    var selectSql = 'SELECT id FROM member WHERE `code` = ?';
    db.pool.query(selectSql, memberId, cb);
};

/**
 * 根据会员的id查到赊账和未结算的订单个数
 * @param id
 * @param cb
 */
exports.validatePunch = function (id, cb) {
    var selectSql = 'SELECT COUNT(*) AS num FROM `order` WHERE member_id = ? AND `status`= 0 OR `status` = 2';
    db.pool.query(selectSql, id, cb);
};

/**
 * 结束计时
 * @param orderId
 * @param cb
 */
var Math = require('mathjs');
exports.updateTimeForEndGame = function (orderId, cb) {

    // 获取配置信息
    settingsService.getGamePrice(function (err, result/*{
     hour: gamePrice['小时'],
     price: gamePrice['元'],
     priceOfHour: gamePrice['超出后每小时元']
     }*/) {

        var s_xiaoShi = result.hour; // 4小时内25元的4小时
        var s_xiaoShi_qian = result.price; // 4小时内25元的25元
        var s_xiaoShi_jia = result.priceOfHour; // 超出4小时，每小时5元的5元

        // 更新订单的结束时间为当前时间
        var updateSql = 'UPDATE `order` o SET o.end_time = NOW() WHERE o.id = ?';
        db.pool.query(updateSql, orderId, function (err, rows) {

                // 查询订单的时长
                var selectSql = 'SELECT begin_time,end_time,sum( unix_timestamp(end_time) - unix_timestamp(begin_time) ) / 60 AS tt FROM `order` WHERE id =?';
                db.pool.query(selectSql, orderId, function (err, rows) {

                    if (rows && rows.length) {

                        var row = rows[0];
                        var zongFenZhong = Math.ceil(row.tt);

                        //console.info(date.format(row.begin_time));
                        //console.info(date.format(row.end_time));
                        //console.info(zongFenZhong);

                        var liuShiFen = 60;

                        /*
                         下面是计算小时和分钟的逻辑
                         */
                        var xiaoShi = 0;
                        var fenZhong = 0;
                        if (zongFenZhong > liuShiFen) {
                            xiaoShi = Math.floor(zongFenZhong / liuShiFen); // 统统舍弃，没有入
                            fenZhong = zongFenZhong % liuShiFen;
                        }

                        /*
                         下面是计算需付款的逻辑
                         */
                        var qian = 0;
                        var _fen = s_xiaoShi * liuShiFen;
                        if (zongFenZhong < _fen) { // 4小时之内算25元
                            qian = s_xiaoShi_qian;
                        } else {
                            zongFenZhong -= _fen;
                            qian += s_xiaoShi_qian;
                            qian += Math.ceil(zongFenZhong / liuShiFen * s_xiaoShi_jia); // 都是入，没有舍
                        }

                        cb(null, {
                                xiaoShi: xiaoShi,
                                fenZhong: fenZhong || 1,
                                qian: qian
                            }
                        );
                    }

                });

            }
        );

    });
};



