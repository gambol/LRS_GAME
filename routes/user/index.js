/**
 * Created by fy on 15-9-4.
 */
'use strict';

var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({dest: 'public/files/excel/'});
var userService = require('../../service/user/index');
var utils = require('../../lib/utils');

/**
 * 跳转到用户管理页面
 */
router.get('/', function (req, res, next) {
    res.render('user/list');
});

/**
 * 获取所有的裁判
 */
router.get('/getJudgment', function (req, res, next) {
    userService.selectAllJudgment(function (err, result) {
        if (err)throw err;
        res.send(result);
    });
});

router.route('/list').get(userService.list).post(userService.list);

/**
 * 增加用户
 */
router.post('/add', function (req, res, next) {
    var params = req.body;
    var username = params.username;
    var realName = params.realName;
    var password = params.password;
    var password1 = params.password1;
    var newObj = {
        username: username,
        realName: realName,
        role: params.role,
        menu_id: params.role,
        password: password,
        status: 1
    };
    validate(res, username, realName, password,password1, function () {
        userService.addUserInfo(newObj, function (err, result) {
            res.send('<script>parent.cbJsonp(' + result.insertId + ', true)</script>');
        });
    });
});
/**
 * 编辑用户
 */
router.post('/updateUserInfo', function (req, res, next) {
    var params = req.body;
    var username = params.username;
    var realName = params.realName;
    var password = params.password;
    var password1 = params.password1;
    var userId = params.id;
    var status = params.status;
    var newObj = {
        username: username,
        realName: realName,
        role: params.role,
        menu_id: params.role,
        password: password,
        status: status
    };
    validate(res, username, realName, password,password1, function () {
        userService.updateUserInfo(userId,newObj, function (err, result) {
            res.send('<script>parent.cbJsonp(' + result.insertId + ', true)</script>');
        });
    });
});
function validate(res, username, realName, password,password1, cb) {
    if (!username || username.length < 5 || username.length > 25) {
        return utils.jsonpAndEnd(res, 'parent.validate("code","登陆账号长度须在5到25之间")');
    }
    if (!realName || realName.length < 2 || realName.length > 25) {
        return utils.jsonpAndEnd(res, 'parent.validate("realName","姓名长度必须在2到7之间")');
    }
    if (!password || password.length < 6 || password.length > 24) {
        return utils.jsonpAndEnd(res, 'parent.validate("password","密码长度必须在6到25之间")');
    }
    if(password != password1) {
        return utils.jsonpAndEnd(res, 'parent.validate("password","两次输入的密码不一致，请重新输入！")');
    }
    cb();
}
/**
 * 更改用户状态
 */
router.post('/update', function (req, res, next) {
    var id = req.body.userId;
    var status = req.body.status;
    userService.updateUserStatus(id, status, function (err, result) {
        res.send({status: !err});
    });

});
router.post('/validate', function (req, res, next) {
    var username = req.body.username;
    userService.validate(username, function (err, result) {
        if (result && result[0] != null) {
            res.send({status: "no"});
        } else {
            res.send({status: "yes"});
        }
    });
});

router.post('/passwordValidate', function (req, res, next) {
    var oldpassword = req.body.password;
    var userId = req.body.id;
    userService.passwordValidate(userId, function (err, result) {
        if (err)throw err;
        if (oldpassword === result[0]["password"]) {
            res.send({status: "yes"});
        } else {
            res.send({staus: "no"});
        }
    });
});

module.exports = router;
