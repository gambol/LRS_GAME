/**
 * Created by fy on 15-12-22.
 */
'use strict';
var express = require('express');
var router = express.Router();
var fs = require('fs');
var utils = require('../../lib/utils');
var multer = require('multer');
var memberService = require('../../service/member/index');
var pdfService = require('../../service/book/pdf');

/**
 * 会员管理列表
 */
router.get('/', function (req, res, next) {
    res.render('member/list');
});


/**
 * ａｊａｘ　查询管理分页列表
 */
router.route('/list').get(memberService.list).post(memberService.list);

/**
 * 返回所有会员
 */
router.post('/all', function (req, res, next) {
    memberService.getAllMemberForCache(function (err, result) {
        res.send(result);
    });
});
/**
 * 打卡时返回所有的会员
 */
router.post('/allMember', function (req, res, next) {
    memberService.getAllMember(function (err, result) {
        res.send(result);
    });
});
var upload = multer({dest: 'public/files/img/'});
router.post('/add', upload.fields([{name: 'image_url', maxCount: 1}]), function (req, res, next) {
    var params = req.body;
    var code = params.code,
        userName = params.userName,
        phone = params.phone,
        birthday = params.birthday,
        integration = params.integration,
        name = params.name,
        wechatNum = params.wechatNum;
    var newObj = {
        code: params.code,
        userName: params.userName,
        phone: params.phone,
        birthday: params.birthday,
        integration: params.integration,
        accountCash: params.accountCash,
        giftCash: params.giftCash,
        isDebt: params.idDebt,
        name: params.name,
        wechatNum: params.wechatNum,
        sex: params.sex
    };
    newObj.grade = 0;
    newObj.isDebt = 0;
    newObj.status = '1';
    newObj.dredgeTime = timeYMDHMS(new Date());
    if (req.files['image_url']) {
        var file = req.files['image_url'][0];
        if (!file)
            return utils.jsonpAndEnd(res, 'parent.validate("img","必须上传封面图片")');
        var newName = new Date().getTime();
        var extensionName = file.originalname.split(".")[1];
        var dest = (file.destination + newName + "." + extensionName);
        fs.renameSync(file.path, dest);
        newObj.image_url = dest.replace('public/', '');
    }
    validate(res, code, userName, phone, birthday, name, function () {
        memberService.addMemberInfo(newObj, function (err, result) {
            if (err) {
                res.send('<script>parent.cbJsonp(' + result.insertId + ', false)</script>');
            } else {
                res.send('<script>parent.cbJsonp(' + result.insertId + ', true)</script>');
            }
        });
    });
});

function validate(res, code, userName, phone, birthday, name, cb) {
    if (!code || code.length < 2 || code.length > 25) {
        return utils.jsonpAndEnd(res, 'parent.validate("code","会员编号在2到25位之间")');
    }
    if (!userName) {
        return utils.jsonpAndEnd(res, 'parent.validate("userName","姓名为必填字段")');
    }
    if (!phone || phone.length != 11) {
        return utils.jsonpAndEnd(res, 'parent.validate("phone","您填写的手机号格式不正确")');
    }
    if (!birthday) {
        return utils.jsonpAndEnd(res, 'parent.validate("birthday","生日为必填字段")');
    }
    if (!name) {
        return utils.jsonpAndEnd(res, 'parent.validate("name","昵称为必填字段")');
    }
    cb();
}
/**
 * 编辑用户信息
 */
router.post('/edit', upload.fields([{name: 'image_url', maxCount: 1}]), function (req, res, next) {
    var id = req.body.id;
    var params = req.body;
    var code = params.code,
        userName = params.userName,
        phone = params.phone,
        birthday = params.birthday,
        integration = params.integration,
        name = params.name,
        wechatNum = params.wechatNum;
    var newObj = {
        code: params.code,
        grade: params.grade,
        userName: params.userName,
        phone: params.phone,
        integration: params.integration,
        status: params.status,
        name: params.name,
        wechatNum: params.wechatNum
    };
    if (req.files['image_url']) {
        var file = req.files['image_url'][0];
        if (!file)
            return utils.jsonpAndEnd(res, 'parent.validate("img","必须上传封面图片")');
        var newName = new Date().getTime();
        var extensionName = file.originalname.split(".")[1];
        var dest = (file.destination + newName + "." + extensionName);
        fs.renameSync(file.path, dest);
        newObj.image_url = dest.replace('public/', '');
    }
    validate(res, code, userName, phone, birthday, name, function () {
        memberService.updateMemberInfo(id, newObj, function (err, result) {
            if (err) {
                res.send('<script>parent.cbJsonp(' + result.insertId + ', false)</script>');
            } else {
                res.send('<script>parent.cbJsonp(' + result.insertId + ', true)</script>');
            }
        });
    });
});
/**
 * 删除用户的信息
 */
router.post('/del', function (req, res, next) {
    var id = req.body.memberId;
    memberService.delMemberInfo(id, function (err, result) {
        res.send({status: !err});
    });
});
/**
 * 校验用户的编号是否重复
 */
router.post('/validateMemberCode', function (req, res, next) {
    var code = req.body.memberCode;
    memberService.validateMemberCode(code, function (err, result) {
        if(err) throw err;
        if(result[0]["id"]!=null) {
            res.send({status: "no"});
        }else {
            res.send({status: "yes"});
        }
    });
});

/**
 * 校验用户的名称是否重复
 */
router.post('/validateMemberName', function (req, res, next) {
    var userName = req.body.userName;
    memberService.validateMemberName(userName, function (err, result) {
        if (err) throw err;
        if (result[0]["id"] != null) {
            res.send({status: "no"});
        } else {
            res.send({status: "yes"});
        }
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
}
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
