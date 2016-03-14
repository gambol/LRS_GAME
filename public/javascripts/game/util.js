/**
 * Created by fy on 16-1-8.
 */
"use strict";


/**
 * 显示提示的对象
 * @type {{show: Function, hide: Function}}
 */
var Toast = {
    show: function (title, text) {
        this.hide(function () {
            $.gritter.add({
                title: title,
                text: text,
                class_name: 'gritter-error gritter-light'
            });
        });
    },
    hide: function (cb) {
        $.gritter.removeAll();
        setTimeout(cb, 500);
    }
};


/**
 * 绑定和传递数据的对象
 * @type {{saveAndUpdateData: Function, deleData: Function, getData: Function, getAllData: Function}}
 */
var Data = {
    /**
     * @deprecated
     * 已经包含到了status.setStatus方法中了。
     * 更新当前座位的死亡日期
     * @param context
     */
    updateDate: function (context) {
        this.saveAndUpdateData(context, 'dieDay', Setting.getNowDay());//设置天数
    },

    /**
     * 保存数据到元素上
     * @param ele
     * @param key
     * @param value
     */
    saveAndUpdateData: function (ele, key, value) {
        var extras = $(ele).data('extras');
        if (extras) {
            extras[key] = value;
        } else {
            var obj = {};
            obj[key] = value;
            $(ele).data('extras', obj);
        }
        return extras;
    },

    /**
     * 删除某个标签上保存的data
     * @param ele
     * @param key
     */
    deleData: function (ele, key) {
        var extras = $(ele).data('extras');
        if (extras) {
            delete extras[key];
            return extras;
        } else {
            $(ele).data('extras', {});
            return {};
        }
    },

    /**
     * 获取绑定到某个标签上的数据
     * @param ele
     * @param key
     */
    getData: function (ele, key) {
        var extras = $(ele).data('extras');
        if (extras)return extras[key];
        else {
            $(ele).data('extras', {});
            return {};
        }
    },
    /**
     * 判断是否是当天
     * @param ele
     * @returns {boolean}
     */
    isNowDay: function (ele) {
        return Data.getData(ele, 'dieDay') === Setting.getNowDay();
    },
    /**
     * 返回所有的绑定的数据
     * @param ele
     * @returns {*|jQuery}
     */
    getAllData: function (ele) {
        return $(ele).data('extras');
    },
    status: {
        isLive: function (ele) {
            var s = this.getStatus(ele);
            return s === 0 || s === 1;
        },
        getStatus: function (ele) {
            var status = Data.getData($(ele), "status");
            if (!status) status = [];
            return parseInt(_.last(status));
        },
        getAllStatus: function (ele) {
            var status = Data.getData($(ele), "status");
            if (!status) status = [];
            return status;
        },
        isHaveStatus: function (status, sta) {
            if (!status) status = [];
            return _.contains(status, sta);
        },
        setStatus: function (ele, value) {
            value = parseInt(value);//转为int
            var statusList = Data.getData(ele, "status");
            if (!statusList) {
                Data.saveAndUpdateData(ele, "status", []);
            }
            statusList = Data.getData(ele, "status");
            if (!statusList) {
                statusList = [];
            }
            if (_.contains([2, 3, 4, 5, 6, 7], value)) {
                Data.saveAndUpdateData(ele, 'dieDay', Setting.getNowDay());
                // 这里会存在新老村长问题，最多会存在3村长
                if (Data.getData(ele, 'cunzhang') === '村长') {
                    Data.saveAndUpdateData(ele, 'yaoyijiao', true);
                }
            } else {
                Data.saveAndUpdateData(ele, 'dieDay', -1);
            }
            statusList.push(value);
            Data.saveAndUpdateData($(ele), "status", statusList /*_.union(statusList)*/);
        }
    }
};

