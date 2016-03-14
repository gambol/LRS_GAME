/**
 * Created by fy on 16-1-8.
 */
'use strict';

var Http = {
    /**
     * 获取用户设置的房间的布局信息
     */
    getLayoutJsonById: function (id) {
        var layoutJson = null;
        $.ajax({
            type: "POST",
            url: "room/getLayout",
            dataType: "json",
            async: false,
            data: {
                id: id
            },
            success: function (result) {
                layoutJson = result;
            },
            error: function () {
                return null;
            }
        });
        return layoutJson;
    },
    checkAndCacheAllMember: function (cb) {
        $.post('member/all', function (result) {
            if (!result || result.length === 0) {
                alert('没有查询到满足座次登记条件的会员,请先尝试给会员打卡.');
                //window.history.back();
            }
            window.__all_member = result;
            if (cb)cb(result);
        });
    },
    register: function (params, cb) {
        $.post('room/register', params, cb);
    },
    updateIdentity: function (params, cb) {
        $.ajax({
            url: 'room/addIdentity',
            method: "POST",
            async: false,
            data: params,
            success: cb
        });
        //$.post('room/addIdentity', params, cb);
    },
    penalty: function (params, cb) {
        $.post('room/penalty', params, cb);
    }
};

