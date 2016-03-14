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

/**s
 * 跳转到用户管理页面
 */
router.get('/', function (req, res, next) {
    res.render('shopping/list');
});


router.route('/list').get(goodsService.list).post(goodsService.list);

/**
 *
 */
router.post('/add', function (req, res, next) {
    goodsService.addGoodsInfo(req.body, function (err, result) {
        utils.jsonpAndEnd(res, 'parent.addCategoryJsonp(' + result.insertId + ', true)');
    });
});
/**
 * 更改用户状态
 */
router.post('/update', function (req, res, next) {
    var id = req.body.goodsId;
    var status = req.body.status
    goodsService.updateGoodsStatus(id, status, function (err, result) {
        res.send({status: !err});
    });

});

module.exports = router;
