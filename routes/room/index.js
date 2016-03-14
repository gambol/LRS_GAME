/**
 * Created by fy on 15-12-22.
 */
'use strict';
var express = require('express');
var router = express.Router();
var fs = require('fs');
var utils = require('../../lib/utils');
var roomService = require('../../service/room/index');
var userService = require('../../service/user/index');

router.get('/', function (req, res) {
    res.render('room/index');
});

router.route('/list').get(roomService.list).post(roomService.list);

function validate(res, code, seatCount, cb) {
    if (!code || code.length < 2 || code.length > 6) {
        return utils.jsonpAndEnd(res, 'parent.validate("code","房间号长度须在3到5之间")');
    }
    if (!seatCount || seatCount < 10 || seatCount > 18) {
        return utils.jsonpAndEnd(res, 'parent.validate("seatCount","座位数量必须在10到18之间")');
    }
    cb();
}

router.post('/add', function (req, res) {
    var code = req.body.code,
        seatCount = req.body.seatCount;
    validate(res, code, seatCount, function () {
        roomService.add(code, seatCount, 0, function (err, result) {
            res.send('<script>parent.cbJsonp(' + result.insertId + ', true)</script>');
        });
    });
});

router.post('/update', function (req, res) {
    var roomId = req.body.roomId,
        code = req.body.code,
        seatCount = req.body.seatCount,
        status = req.body.status;
    validate(res, code, seatCount, function () {
        roomService.updateRoom(code, seatCount, status, roomId, function () {
            res.send('<script>parent.cbJsonp(' + roomId + ', true)</script>');
        });
    });
});

router.get('/layout', function (req, res) {
    res.render('room/layout', {roomId: req.query.id, code: req.query.code});
});

router.post('/saveLayout', function (req, res) {
    var id = req.body.id,
        layoutJson = req.body.layoutJson;
    roomService.saveOrUpdateLayout(id, layoutJson, function (err, result) {
        res.send(result);
    });
});

router.post('/getLayout', function (req, res) {
    roomService.getRoomById(req.body.id, function (err, result) {
        if (err) {
            throw err;
        }
        res.send(result[0].layoutJson);
    });
});

/**
 * 跳转到游戏界面
 */
router.get('/open', function (req, res) {
    var roomCode = req.query.roomCode,
        judgment = req.query.judgment,
        office = req.query.office,
        type = req.query.type,
        roomId = req.query.roomId,
        judgmentId = req.query.judgmentId,
        gameName = office + '-' + type + '-' + roomCode;

    roomService.saveGame(gameName, judgment, office, type, roomId, judgmentId,
        function (err, result) {
            if (err) {
                throw err;
            }
            res.render('room/game',
                {roomId: roomId, roomCode: roomCode, office: office, type: type, gameId: result.insertId});
        });
});

/**
 * 座次登记
 */
router.post('/register', function (req, res) {
    var memberCode = req.body.memberCode,
        gameId = req.body.gameId,
        seatCode = req.body.seatCode,
        roomId = req.body.roomId;
    roomService.register(roomId, memberCode, gameId, seatCode, function (err, result) {
        if (err) {
            result = {msg: err.toString()};
        }
        result.status = !err;
        res.send(result);//{status:true,member:{id:xx,code:9102}}
    });
});

/**
 * 更新用户的身份
 */
router.post('/addIdentity', function (req, res) {
    var memberId = req.body.memberId,
        gameId = req.body.gameId,
        identity = req.body.identity;
    roomService.addIdentity(gameId, memberId, identity, function (err) {
        res.send({status: !err});
    });
});

/**
 * 罚分
 */
router.post('/penalty', function (req, res) {
    var penalty = req.body.penalty,
        gameId = req.body.gameId,
        memberId = req.body.memberId;
    roomService.updatePenalty(gameId, memberId, penalty, function (err) {
        res.send({status: !err});
    });
});

/**
 * 保存游戏所得分数给每个赢了的人
 */
router.post('/gameOver', function (req, res) {
    roomService.gameOver(req.body.roomId, req.body.score, function (err) {
        res.send({status: !err});
    });
});

/**
 * 得到所有的房间ID
 */
router.post('/all', function (req, res) {
    roomService.getAllRoomCode(function (err, result) {
        if (err) {
            throw err;
        }
        res.send(result);
    });
});

module.exports = router;
