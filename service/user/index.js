/**
 * Created by HZC on 2015/09/04.
 */
var dateFormat = require('date-format');
var fs = require('fs');
var sp = require('../../lib/pager/select-pager');
var db = require('../../config/db');
var date = require('../../lib/date');
var dbutil = require('../../lib/db/dbutil');
var _ = require('underscore');
/**
 * 查询所有裁判或者收银员
 * @param role
 * @param cb
 */
exports.selectUserByRole = function (role, cb) {
    db.pool.query('SELECT * FROM user WHERE role = ?', role, cb);
};

exports.selectAllJudgment = function (cb) {
    this.selectUserByRole('裁判', cb);

};
/**
 * 查询所有用户
 */
exports.list = function (req, res, next) {
    //var params = URL.parse(req.url, true).query;
    var selectSql = "SELECT * FROM user";

    var whereSql = " WHERE 1 = 1 \n";
    req.body.realName && (whereSql += " AND realName LIKE '%:realName%' /*真实姓名*/");
    req.body.username && (whereSql += " AND username LIKE '%:username%' /*用户名*/");
    req.body.role && (whereSql += " AND role LIKE '%:role%' /*角色*/");
    req.body.status && (whereSql += " AND status = :status /*角色*/");

    sp.selectPager(req, res, db, selectSql, whereSql);
};
/**
 * 增加用户
 * @param memberInfo
 * @param cb
 */
exports.addUserInfo = function (userInfo, cb) {
    var tuple = dbutil.getInsertSeletiveSql(userInfo);
    var sql = ['INSERT INTO user ' + tuple.sql].join();
    db.pool.query(sql, tuple.param, cb);
};

/**
 * 更改用户状态
 * @param memberId
 * @param cb
 */
exports.updateUserStatus = function (userId, status, cb) {
    var updateSql = ' UPDATE user SET `status` =? WHERE id = ?';
    db.pool.query(updateSql, [status, userId], cb);

};


/**
 * 编辑信息
 */
exports.updateUserInfo = function (id, user, cb) {
    var userInfo = _.clone(user);
    delete userInfo['id'];
    var tuple = dbutil.getUpdateSeletiveSql(userInfo);
    tuple.param.push(id);
    db.pool.query('UPDATE user SET ' + tuple.sql + ' WHERE id = ?', tuple.param, cb)
};
exports.login = function (username, password, callback) {
    if (!username) return callback({rs: false, ms: '用户名不能为空'});
    if (username.length < 1 || username.length > 15) return callback({rs: false, ms: '用户名长度需在1到15之间'});
    if (!password) return callback({rs: false, ms: '密码不能为空'});
    if (password.length < 4 || password.length > 10) return callback({rs: false, ms: '密码长度需在４到10之间'});
    var loginSql = 'SELECT id,password,status,role FROM user WHERE username = ?';
    db.pool.query(loginSql, username, function (error, row, field) {
        if (row && row[0]) {
            var user = row[0];
            if (password === user.password) {
                if (user.status !== 1) return callback({rs: false, ms: '账号不可用'});
                //console.error({ms: username, auth: user.role});
                callback({rs: true, ms: user.id, auth: user.role});
            } else callback({rs: false, ms: '密码错误'});
        } else callback({rs: false, ms: '用户名不存在'});
    });
};

exports.validate = function (username, cb) {
    var selectSql = 'SELECT id FROM user WHERE username = ?';
    db.pool.query(selectSql, [username], cb);
};
/**
 * 用户密码校验
 * @param id
 * @param cb
 */
exports.passwordValidate = function (id, cb) {
    var selectSql = 'SELECT password FROM user WHERE id = ?';
    db.pool.query(selectSql, [id], cb);
};
