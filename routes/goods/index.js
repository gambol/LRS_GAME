/**
 * Created by fy on 15-9-4.
 */
'use strict';

var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({dest: 'public/files/excel/'});
var goodsService = require('../../service/goods/index');
var utils = require('../../lib/utils');
var _ = require('underscore');
var _S = require('underscore.string');

/**s
 * 跳转到用户管理页面
 */
router.get('/', function (req, res, next) {
    res.render('goods/list');
});


router.route('/list').get(goodsService.list).post(goodsService.list);

/**
 * 增加商品信息
 */
router.post('/add', function (req, res, next) {
    var goodsName = req.body.goodsName,
        price = req.body.price,
        unit = req.body.unit;
    validate(res, goodsName, price, unit, function () {
        goodsService.addGoodsInfo(req.body, function (err, result) {
            if (err) {
                res.send('<script>parent.cbJsonp(' + result.insertId + ', false)</script>');
            } else {
                res.send('<script>parent.cbJsonp(' + result.insertId + ', true)</script>');
            }
        });
    });
});

/**
 * 编辑商品信息
 */
router.post('/updateGoodsInfo', function (req, res, next) {
    var goodsId = req.body.id,
        goodsName = req.body.goodsName,
        price = req.body.price,
        unit = req.body.unit;
    validate(res, goodsName, price, unit, function () {
        goodsService.updateGoodsInfo(goodsId, req.body, function (err, result) {
            if (err) {
                res.send('<script>parent.cbJsonp(' + result.insertId + ', false)</script>');
            } else {
                res.send('<script>parent.cbJsonp(' + result.insertId + ', true)</script>');
            }
        });
    });
});


function validate(res, goodsName, price, unit, cb) {
    if (!goodsName || goodsName.length < 2 || goodsName.length > 25) {
        return utils.jsonpAndEnd(res, 'parent.validate("goodsName","商品名称长度在2到25之间")');
    }
    if (!price || price < 0) {
        return utils.jsonpAndEnd(res, 'parent.validate("price","商品价格为必填字段并且必须大于0")');
    }
    if (!unit || unit.length < 1 || unit.length > 5) {
        return utils.jsonpAndEnd(res, 'parent.validate("unit","商品单位长度在1到5之间")');
    }
    cb();
}
/**
 * 更改用户状态
 */
router.post('/update', function (req, res, next) {
    var id = req.body.goodsId;
    var status = req.body.status;;
    goodsService.updateGoodsStatus(id, status, function (err, result) {
        res.send({status: !err});
    });

});
//得到所有的商品名
router.post('/all', function (req, res, next) {
    goodsService.getAllGoodsName(function (err, result) {
        if (err)throw err;
        res.send(result);
    });
});
//创建购物清单
router.post('/createUserOrder', function (req, res, next) {
    var orderInfo = {};
    var order_id = req.param('order_id');
    var goods_id;
    var goodsName = req.param('goodsName').split(',')[0];
    var sum = req.param('sum');
    //根据订商品名拿到商品的id
    validateGoods(res, goodsName,sum, function() {
        goodsService.getGoodsIdByGoodsName(goodsName, function (err, result) {
            if (err)throw err;
            goods_id = result[0]['id'];
            orderInfo.goods_id = goods_id;
            orderInfo.order_id = order_id;
            orderInfo.sum = req.param('sum');
            orderInfo.date = new Date();
            goodsService.minusStock(goods_id, req.param('sum'), function (err, result) {
                if (err) {
                    res.send('<script>parent.cbJsonp(' + result.insertId + ', false)</script>');
                }else {
                    res.send('<script>parent.cbJsonp(' + result.insertId + ', true)</script>');
                }
            });
            goodsService.createOrder(orderInfo, function (err, result) {
                if (err){
                    res.send('<script>parent.cbJsonp(' + result.insertId + ', false)</script>');
                }else {
                    res.send('<script>parent.cbJsonp(' + result.insertId + ', true)</script>');
                }
            });
        });
    });
});

function validateGoods(res, goodsName, sum, cb) {
    var reg = new RegExp("^[0-9]*$");
    if (!goodsName ) {
        return utils.jsonpAndEnd(res, 'parent.validate("goodsname","您必须填写商品名称")');
    }
    if (!sum || sum <= 0 || !reg.test(sum) ) {
        return utils.jsonpAndEnd(res, 'parent.validate("sum1","您必须填写正确的数量")');
    }
    cb();
}

function validateGoods1(res, code,seatCode, goodsName, sum, cb) {
    var reg = new RegExp("^[0-9]*$");
    if (!code || code < 0 ||!reg.test(code)) {
        return utils.jsonpAndEnd(res, 'parent.validate("code","您必须填写正确的房间号")');
    }
    if (!seatCode || seatCode < 0 || seatCode<1 || seatCode>18 || !reg.test(code) ) {
        return utils.jsonpAndEnd(res, 'parent.validate("seatCode","您必须填写正确的座位号")');
    }
    if (!goodsName || _S.trim(goodsName)=='' || _S.trim(goodsName)== null) {
        return utils.jsonpAndEnd(res, 'parent.validate("goodsName","您必须填写正确的商品名")');
    }
    if (!sum || sum<0 || !reg.test(code) ) {
        return utils.jsonpAndEnd(res, 'parent.validate("sum","您必须填写正确的数量")');
    }
    cb();
}

//创建子订单
router.post('/createOrder', function (req, res, next) {
    var order_id;
    var goods_id;
    var orderInfo = {};
    var seatCode = req.param('seat_code');
    var roomCode = req.param('code');
    var goodsName = req.param('goodsName').split(',')[0];
    var sum = req.param('sum');
    //根据座位号拿到订单号
    validateGoods1(res,roomCode, seatCode, goodsName,sum ,function() {
        goodsService.getOrderIdBySeatcode(seatCode, roomCode, function (err, result) {
            if (err) {
                res.send('<script>parent.cbJsonp(' + result.insertId + ', false)</script>');
            }else {
                res.send('<script>parent.cbJsonp(' + result.insertId + ', true)</script>');
            }
            order_id = result[0]['order_id'];
            //根据订商品名拿到商品的id
            goodsService.getGoodsIdByGoodsName(goodsName, function (err, result) {
                if (err) {
                    res.send('<script>parent.cbJsonp(' + result.insertId + ', false)</script>');
                }else {
                    res.send('<script>parent.cbJsonp(' + result.insertId + ', true)</script>');
                }
                goods_id = result[0]['id'];
                orderInfo.goods_id = goods_id;
                orderInfo.order_id = order_id;
                orderInfo.sum = req.param('sum');
                orderInfo.date = new Date();
                goodsService.minusStock(goods_id, req.param('sum'), function (err, result) {
                    if (err) {
                        res.send('<script>parent.cbJsonp(' + result.insertId + ', false)</script>');
                    }else {
                        res.send('<script>parent.cbJsonp(' + result.insertId + ', true)</script>');
                    }
                });
                goodsService.createOrder(orderInfo, function (err, result) {
                    if (err) {
                        res.send('<script>parent.cbJsonp(' + result.insertId + ', false)</script>');
                    }else {
                        res.send('<script>parent.cbJsonp(' + result.insertId + ', true)</script>');
                    }
                });
            });
        });
    });
});
/**
 * 校验商品名称
 */
router.post('/validateGoodsname', function (req, res, next) {
    var goodsName = req.body.goodsName;
    goodsService.getGoodsIdByGoodsName(goodsName, function (err, result) {
        if (err)throw err;
        if (result[0] != null) {
            if (result[0]["id"] != null) {
                res.send({status: "no"});
            } else {
                res.send({status: "yes"});
            }
        } else {
            res.send({status: "yes"});
        }
    });
});
/**
 * 加载所有的商品编号和商品
 */
router.post('/allGoods', function (req, res, next) {
    goodsService.getAllGoodsCodeAndName(function (err, result) {
        res.send(result);
    });
});
module.exports = router;
