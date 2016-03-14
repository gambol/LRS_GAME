/**
 * Created by Administrator on 2016/1/6 0006.
 */

var _ = require('underscore');

exports.getInsertSeletiveSql = function (bean) {
    if (!_.isObject(bean) || _.isEmpty(bean) || _.isArray(bean) && _.isFunction(bean)) {
        throw new Error('程序错误，传入的不是标准json对象');
    }
    var columnsSql = [];
    var valuesSql = [];
    var param = [];
    for (var key in bean) {
        var value = bean[key];
        columnsSql.push(key);
        valuesSql.push('?');
        param.push(value);
    }
    return {
        sql: '('+columnsSql.join(',') + ') values (' + valuesSql.join(',')+')',
        param: param
    }
};

exports.getUpdateSeletiveSql = function (bean) {
    if (!_.isObject(bean) || _.isEmpty(bean) || _.isArray(bean) && _.isFunction(bean)) {
        throw new Error('程序错误，传入的不是标准json对象');
    }
    var setSql = [];
    var param = [];
    for (var key in bean) {
        var value = bean[key];
        setSql.push(key + '=?');
        param.push(value);
    }
    return {
        sql: setSql.join(','),
        param: param
    }
};
