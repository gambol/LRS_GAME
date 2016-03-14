/**
 * Created by fy on 15-12-22.
 */
'use strict';
var sp = require('../../lib/pager/select-pager');
var db = require('../../config/db');
var dateFormat = require('date-format');
var fs = require('fs');
var date = require('../../lib/date');
var memberService = require('../member/index');
var settingsService = require('../settings/index');
var _ = require('underscore');

var defaultRoomLayoutJson = JSON.stringify([
    {
        "x": 2,
        "y": 0,
        "width": 1,
        "height": 1,
        "name": "1"
    },
    {
        "x": 3,
        "y": 0,
        "width": 1,
        "height": 1,
        "name": "2"
    },
    {
        "x": 4,
        "y": 0,
        "width": 1,
        "height": 1,
        "name": "3"
    },
    {
        "x": 5,
        "y": 0,
        "width": 1,
        "height": 1,
        "name": "4"
    },
    {
        "x": 2,
        "y": 1,
        "width": 1,
        "height": 1,
        "name": "5"
    },
    {
        "x": 3,
        "y": 1,
        "width": 2,
        "height": 7,
        "name": "桌子"
    },
    {
        "x": 5,
        "y": 1,
        "width": 1,
        "height": 1,
        "name": "6"
    },
    {
        "x": 2,
        "y": 2,
        "width": 1,
        "height": 1,
        "name": "7"
    },
    {
        "x": 5,
        "y": 2,
        "width": 1,
        "height": 1,
        "name": "8"
    },
    {
        "x": 2,
        "y": 3,
        "width": 1,
        "height": 1,
        "name": "9"
    },
    {
        "x": 5,
        "y": 3,
        "width": 1,
        "height": 1,
        "name": "10"
    },
    {
        "x": 2,
        "y": 4,
        "width": 1,
        "height": 1,
        "name": "11"
    },
    {
        "x": 5,
        "y": 4,
        "width": 1,
        "height": 1,
        "name": "12"
    },
    {
        "x": 2,
        "y": 5,
        "width": 1,
        "height": 1,
        "name": "13"
    },
    {
        "x": 5,
        "y": 5,
        "width": 1,
        "height": 1,
        "name": "14"
    },
    {
        "x": 2,
        "y": 6,
        "width": 1,
        "height": 1,
        "name": "15"
    },
    {
        "x": 5,
        "y": 6,
        "width": 1,
        "height": 1,
        "name": "16"
    },
    {
        "x": 2,
        "y": 7,
        "width": 1,
        "height": 1,
        "name": "17"
    },
    {
        "x": 5,
        "y": 7,
        "width": 1,
        "height": 1,
        "name": "18"
    },
    {
        "x": 3,
        "y": 8,
        "width": 2,
        "height": 1,
        "name": "裁判"
    }
]);

exports.index = function () {
    return 'room';
};

exports.list = function (req, res, next) {
    var selectSql = "SELECT * FROM room";
    var whereSql = " WHERE 1 = 1 \n";
    req.body.code && (whereSql += " AND code LIKE '%:code%' /*房间编号*/");
    req.body.status && (whereSql += " AND status = :status /*房间状态*/\n");
    sp.selectPager(req, res, db, selectSql, whereSql);
};

exports.add = function (code, seatCount, status, cb) {
    db.pool.query('INSERT INTO `room` (`code`, `seatCount`, `layoutJson`, `status`) VALUES (?, ?, ?, ?)', [code, seatCount, defaultRoomLayoutJson, status || 0], cb);
};

exports.updateRoom = function (code, seatCount, status, roomId, cb) {
    db.pool.query('UPDATE room SET code = ?, seatCount = ?, status = ? WHERE id = ?', [code, seatCount, status, roomId], cb);
};

exports.saveOrUpdateLayout = function (id, layoutJson, cb) {
    db.pool.query('UPDATE room SET layoutJson = ? WHERE id = ?', [layoutJson, id], cb);
};

exports.getRoomById = function (id, cb) {
    db.pool.query('SELECT * FROM room WHERE id = ?', [id], cb);
};

exports.updateRoomStatus = function (roomId, status, cb) {
    db.pool.query('UPDATE room SET status = ? WHERE id = ?', [status, roomId], cb);
};

/**
 * 建立游戏
 * @param gameName
 * @param judgment
 * @param office
 * @param type
 * @param roomId
 * @param judgmentId
 * @param cb
 */
exports.saveGame = function (gameName, judgment, office, type, roomId, judgmentId, cb) {
    var self = this;
    //todo 全局单价 需要变为可以配置
    var timePrice = 2.5;
    self.updateRoomStatus(roomId, 1, function (err, result) {
        if (!err) {
            var now = date.now();
            var status = '游戏中';
            db.pool.query('INSERT INTO `game` (`name`, `judgment`, `timePrice`, ' +
                '`status`, `startTime`, `office`, `type`, `room_id`, `judgment_id`) ' +
                'VALUES (?,?,?,?,?,?,?,?,?)',
                [gameName, judgment, timePrice, status, now, office, type, roomId, judgmentId], cb);
        }
    });

};

/**
 *
 * @param memberId
 * @param cb
 */
exports.getOrderForNoPayByMemberId = function (memberId, cb) {
    var sql = "SELECT\n" +
        "   o.id\n" +
        "FROM\n" +
        "   `order` o\n" +
        "INNER JOIN member mem ON o.member_id = mem.id\n" +
        "WHERE\n" +
        "   o.`status` = 0\n" +
        "AND mem.id = ?";
    db.pool.query(sql, memberId, function (err, rows, field) {
        if (err) {
            return cb(false);
        }
        if (rows && rows.length === 1) {
            cb(rows[0].id);
        } else {
            cb(false);
        }
    });
};

/**
 * 记录游戏和人员和座位之间的关系
 * @param roomId
 * @param orderId
 * @param memberId
 * @param gameId
 * @param seatCode
 * @param cb
 */
exports.saveGameHasMember = function (roomId, orderId, memberId, gameId, seatCode, cb) {
    var insertSql = "INSERT INTO `order_has_games` (\n" +
        "	`order_id`,\n" +
        "	`game_id`,\n" +
        "	`status`,\n" +
        "	`seat_code`,\n" +
        "	`room_id`\n" +
        ")\n" +
        "VALUES	(?,?,?,?,?)";
    db.pool.query(insertSql, [orderId, gameId, 1, seatCode, roomId], cb);
};
exports.getGameHasMemberById = function (id, cb) {
    var selectSql = 'SELECT * FROM `member_has_game` WHERE id = ?';
    db.pool.query(selectSql, id, cb);
};
/**
 * 根据积分获取登记
 * @param jifen
 * @param cb
 */
exports.getDengJiByJiFen = function (jifen, cb) {
    settingsService.getJsonFromFile(4, function (err, data) {
        if (data.length > 0) {
            var raw = data[0].value;
            var json = JSON.parse(raw);//{"名字":"消费账户设置","现金账户可消费":{"游戏":1,"商品":1},"赠送账户可消费":{"游戏":1,"商品":0},"赠送账户金额":10};
            var jsonjf = json["游戏积分设置"];
            var resultKey = 1;

            for (var key in jsonjf) if (jifen > jsonjf[key]) resultKey = (parseInt(key) + 1);
            cb(err, resultKey);
        }
    });

};

/**
 * 座位登记
 * @param roomId
 * @param memberCode
 * @param gameId
 * @param seatCode 座位编号
 * @param cb
 */
exports.register = function (roomId, memberCode, gameId, seatCode, cb) {
    var self = this;
    memberService.checkUserExits(memberCode, function (err, result) {
        if (err) return cb(new Error('系统不存在此会员或还没有打卡'), result);
        if (!result || result.length !== 1) return cb(new Error('数据错误,没有找到此会员或找到了同名的多个会员'), null);
        var member = result[0];
        self.saveGameHasMember(roomId, member.order_id, member.id, gameId, seatCode, function (err, result) {
            if (err) return cb(new Error('此会员已经在游戏中'), result);
            result.member = member;
            self.getDengJiByJiFen(member.integration, function (err, dj) {
                if (err) return cb(new Error('查询等级了的身份出错'), result);
                result.dj = dj;
                cb(err, result);
            });
        });
    });
};

/**
 * 更改用户身份
 * @param gameId
 * @param memberId
 * @param identify
 * @param cb
 */
exports.addIdentity = function (gameId, memberId, identify, cb) {
    var updateSql = 'UPDATE member_has_game SET identity = ? WHERE member_id = ? AND game_id = ?';
    db.pool.query(updateSql, [identify, memberId, gameId], cb);
};

/**
 * 罚分
 * @param gameId
 * @param memberId
 * @param penalty
 * @param cb
 */
exports.updatePenalty = function (gameId, memberId, penalty, cb) {
    var updateSql = 'UPDATE member_has_game SET integral = ? WHERE member_id = ? AND game_id = ?';
    db.pool.query(updateSql, [penalty, memberId, gameId], cb);
};

/**
 * 批量修改用户在当前游戏中所得或缩减的积分
 * @param score
 */
exports.updateScore = function (score) {
    var self = this;
    _.each(score, function (s) {
        self.updatePenalty(s.gameId, s.memberId, s.penalty, function (err, result) {
            if (!err) {// 累加到总积分上
                memberService.updateIntegration(s.memberId, s.penalty, function () {
                });
            }
        });
    });
};

/**
 * 游戏结束的处理
 * @param roomId
 * @param score
 * @param cb
 */
exports.gameOver = function (roomId, score, cb) {
    this.updateScore(score);
    this.updateRoomStatus(roomId, 0/*空闲*/, cb);
};

exports.getAllRoomCode = function (cb) {
    db.pool.query('SELECT code FROM room ', cb);
};

/**
 * 游戏结束
 * @param memberGameInfoList
 * @param cb
 */
var async = require('async');
exports.saveOrderHasGame = function (memberGameInfoList, cb) {
    if (!memberGameInfoList || memberGameInfoList.length == 0) {
        return cb(true);
    } else {
        var sql = 'INSERT INTO order_has_games ' +
            '(order_id,game_id,room_id,member_id,seat_code,identity,integral,is_dead,status) ' +
            'VALUES (?,?,?,?,?,?,?,?,?)';
        async.eachSeries(memberGameInfoList, function iterator(m, callback) {
            db.pool.query(sql, [m.order_id, m.game_id, m.room_id, m.member_id, m.seat_code, m.identity || '', m.integral, m.is_dead, m.status || 1], function (err, rows) {
                var insertSql = 'UPDATE member m SET m.integration = m.integration+? WHERE id  = ?';
                db.pool.query(insertSql, [m.integral, m.member_id], callback);
            });
        }, function done() {
            cb(false, true);
        });
    }
};
