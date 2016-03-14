/**
 * Created by yinbin on 2015/9/4.
 */
'use strict';

var mysql = require('mysql');

/**
 * 生产机配置
 */
var poolOptions = {
    connectionLimit: process.env.MYSQL_CONNECTION_LIMIT || 50,
    host: process.env.MYSQL_IP || '192.168.1.86',
    user: process.env.MYSQL_USERNAME || 'lrs',
    password: process.env.MYSQL_PASSWORD || 'lrs2016',
    database: process.env.MYSQL_SCHEMA || 'lrs'
};
/*
var poolOptions = {
    connectionLimit: process.env.MYSQL_CONNECTION_LIMIT || 50,
    host: process.env.MYSQL_IP || 'localhost',
    database: process.env.MYSQL_SCHEMA || 'lrs',
    user: process.env.MYSQL_USERNAME || 'root',
    password: process.env.MYSQL_PASSWORD || '123456'
};
*/
var pool = mysql.createPool(poolOptions);

setInterval(function () {
    pool.query('SELECT 1');
}, 10000);

exports.pool = pool;
