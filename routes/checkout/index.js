/**
 * Created by fy on 15-9-4.
 */
'use strict';

var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({dest: 'public/files/excel/'});
var checkoutService = require('../../service/checkout/index');
var utils = require('../../lib/utils');
var db = require('../../config/db');
var settingService = require('../../service/settings/index');
/**s
 * 跳转到用户管理页面
 */
router.get('/', function (req, res, next) {
    res.render('checkout/list');
});

/**
 * 加载所有的订单
 */
router.route('/list').get(checkoutService.list).post(checkoutService.list);

/**
 * 打卡
 */
router.post('/add', function (req, res, next) {
    let memberInfo = req.body.member_id;
    let code = memberInfo.split(",")[0];
    //根据会员的编号拿到他的ID并重新封装req.body
    validate(res, memberInfo, function () {
        checkoutService.getMemberIdByCode(code, function (err, result) {
            if (result.length !== 1) {
                return utils.jsonpAndEnd(res, 'parent.validate("member_id","不存在此会员")');
            }
            var memberId = result[0].id;
            req.body.member_id = memberId;
            checkoutService.addCheckoutInfo(req.body, function (err, result) {
                res.send('<script>parent.cbJsonp(' + result.insertId + ', true);</script>');
            });
        });
    });
});
/**
 * 打卡时校验
 * @param res
 * @param memberCode
 * @param cb
 */
function validate(res, memberCode, cb) {
    if (!memberCode) {
        return utils.jsonpAndEnd(res, 'parent.validate("member_id","您必须输入正确的会员编号")');
    }
    cb();
}

/**
 * 得到订单信息
 */
router.get('/getOrderInfo', function (req, res, next) {
    var checkoutId = req.query.checkoutId;
    checkoutService.getOrderInfo(checkoutId, function (err, result) {
        res.send({
            status: !err,
            data: result ? result[0] : null
        });
    });
});
/**
 * 得到商品消费列表
 */
router.get('/getGoodsList', function (req, res, next) {
    var checkoutId = req.query.checkoutId;
    checkoutService.getGoodsList(checkoutId, function (err, result) {
        res.send({
            status: !err,
            data: result
        });
    });
});
/**
 * 得到优惠设置
 */
router.get('/getJsonFile', function (req, res, next) {
    settingService.getJsonFromFile(4, function (err, result) {
        res.send({
            status: !err,
            data: result
        });
    });
});
/**
 * 更新订单状态
 */
router.post('/updateOrder', function (req, res, next) {
    checkoutService.addCheckoutInfo(req.body, function (err, result) {
        utils.jsonpAndEnd(res, 'parent.addCategoryJsonp(' + result.insertId + ', true)');
    });
});
module.exports = router;
