/**
 * 用户注册登陆等
 */
'use strict';

var express = require('express');
var http = require('http');
var request = require('request-json');
var router = express.Router();
var userService = require('../service/user/index');
var settingService = require('../service/settings/index');

router.get('/', function (req, res, next) {
    res.render('login');
});

router.get('/sessionLess', function (req, res, next) {
    res.render('session_less');
});

router.post('/login', function (req, res, next) {
    var params = req.body;
    userService.login(params.username, params.password, function (data) {
        if (data.rs) {
            settingService.getJsonFromFile(4, function (err, jsonRow) {
                var json = JSON.parse(jsonRow[0].value);
                var menus = json['权限设置'][data.auth];
                req.session.userid = params.userid;
                req.session.username = params.username;
                req.session.auth = data.auth;
                //req.session.menus = menus;
                //console.error(params.username, data.auth, menus);
                res.render('home', {menus: menus});// 默认不在显示首页，而是直接默认显示用户管理页面
            });
        } else {
            res.render('login', {'msg': data.ms});
        }
    });
    //if (params.username == 'admin' && params.password == '123456') {
    //    res.redirect('user');// 默认不在显示首页，而是直接默认显示用户管理页面
    //    //res.render('index', {user: {username: params.username}});
    //} else {
    //    res.render('login', {'msg': '用户名密码错误'});
    //}
});

router.get('/logout', function (req, res, next) {
    req.session.destroy(function (err) {
        // cannot access session here
        res.redirect('/');
    });
});

router.get('/test', function (req, res, next) {
    res.render('test');
});

router.get('/test/screen', function (req, res, next) {
    res.render('test/screen');
});

router.get('/screen', function (req, res, next) {
    res.render('screen');
});


module.exports = router;
