/**
 * Created by fy on 15-9-4.
 */
'use strict';

var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({dest: 'public/files/excel/'});
var storageService = require('../../service/storage/index');
var goodsService = require('../../service/goods/index');
var utils = require('../../lib/utils');

/**s
 * 跳转到用户管理页面
 */
router.get('/', function (req, res, next) {
    res.render('storage/list');
});


router.route('/list').get(storageService.list).post(storageService.list);

/**
 * 添加入库信息
 */
router.post('/add', function (req, res, next) {
    var params = req.body;
    var multiCode = params.code;
    var code = multiCode.split(",")[1];
    var storedTime = timeYMDHMS(new Date());
    var bid = params.bid;
    var bidSum = params.bidSum;
    var newObj = {
        stockCode: params.stockCode,
        code: code,
        bid: bid,
        storedTime: storedTime,
        bidSum: bidSum,
        remark: params.remark,
        status: 1,
        buyer: params.buyer,
        createUser: req.session.username
    };
    validate(res, code, bid, bidSum, function () {
        storageService.addStorageInfo(newObj, function (err, result) {
            if (err) {
                res.send('<script>parent.cbJsonp(' + result.insertId + ', false)</script>');
            } else {
                goodsService.plusStock(code, params.bidSum, function (err, result) {
                    if (err) {
                        res.send('<script>parent.cbJsonp(' + result.insertId + ', false)</script>');
                    } else {
                        res.send('<script>parent.cbJsonp(' + result.insertId + ', true)</script>');
                    }
                });
            }
        });
    });
});

/**
 * 商品入库信息校验
 * @param res
 * @param code
 * @param bid
 * @param bidSum
 * @param cb
 */
function validate(res, code, bid, bidSum, cb) {
    if (!code || code.length < 2 || code.length > 25) {
        return utils.jsonpAndEnd(res, 'parent.validate("code","商品名称为必填字段")');
    }
    if (!bid) {
        return utils.jsonpAndEnd(res, 'parent.validate("bid","商品进价为必填字段")');
    }
    if (!bidSum) {
        return utils.jsonpAndEnd(res, 'parent.validate("bidSum","入库数量为必填字段")');
    }
    cb();
};

/**
 * 更改用户状态
 */
router.post('/update', function (req, res, next) {
    var id = req.body.storageId;
    var status = req.body.status
    storageService.updateStorageStatus(id, status, function (err, result) {
        res.send({status: !err});
    });
});
function timeYMDHMS(value) {
    //var value = arguments[0];
    if (value) {
        var d = _my_prarse_date(value);
        var mouS = d.M;
        if (mouS < 10) mouS = '0' + mouS;
        var dayS = d.d;
        if (dayS < 10)  dayS = '0' + dayS;
        var hourS = d.h;
        if (hourS < 10)  hourS = '0' + hourS;
        var minS = d.m;
        if (minS < 10)  minS = '0' + minS;
        var sS = d.s;
        if (sS < 10)  sS = '0' + sS;
        return d.y + '-' + mouS + '-' + dayS + ' ' + hourS + ':' + minS + ':' + sS;
    } else {
        return "";
    }
};
function _my_prarse_date(ds) {
    var d = new Date(Date.parse(ds));
    return {
        y: d.getFullYear(),
        M: d.getMonth() + 1, //month
        d: d.getDate(), //day
        h: d.getHours(), //hour
        m: d.getMinutes(), //minute
        s: d.getSeconds(), //second
        q: Math.floor((d.getMonth() + 3) / 3), //quarter
        S: d.getMilliseconds() //millisecond
    };
}
module.exports = router;
