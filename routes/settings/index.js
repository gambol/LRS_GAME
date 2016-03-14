/**
 * Created by fy on 15-12-22.
 */
'use strict';
var express = require('express');
var router = express.Router();
var fs = require('fs');
var utils = require('../../lib/utils');
var settingsService = require('../../service/settings/index');

router.get('/', function (req, res, next) {
    res.render('settings/index');
});

router.get('/user', function (req, res, next) {
    res.render('settings/user');
});


module.exports = router;
