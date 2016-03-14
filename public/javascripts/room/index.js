/**
 * Created by fy on 15-12-22.
 */
'use strict';
(function (W) {

    !function () {
        W.grid_selector = "#grid-table";
        W.pager_selector = "#grid-pager";
        W.search_form = '#search-form-id';
        W._title = '游戏房间管理';
        W.str = location.search;
        W._url = BASE_URL + "room/list";
        W._sortname = 'code';
        W._sortorder = 'ASC';
        $('.date').datepicker();
        W._postData = {};
        W._colNames = ['房间号', '状态', '最多容纳人数', '操作'];
        W._colModel = [
            {name: 'code', width: 80, index: 'code', align: "center", sortable: true},
            {
                name: 'status', width: 100, index: 'status', align: "center", sortable: true,
                formatter: function (value, options, row) {
                    if (row.status === 0)return '空闲';
                    else if (row.status === 1)return '游戏中';
                    else if (row.status === 2)return '删除';
                }
            },
            {
                name: 'seatCount',
                width: 100,
                index: 'seatCount',
                align: "right",
                sortable: true,
                formatter: function (value, options, row) {
                    return value + '人';
                }
            },
            {
                name: '操作', width: 300, index: '', sortable: false, align: "center",
                formatter: function (value, options, row) {
                    var id = row.id,
                        code = row.code,
                        seatCount = row.seatCount,
                        status = row.status;

                    var buJu = '<a class="btn btn-sm btn-success" href="room/layout?id=' + id + '&code=' + code + '">房间布局</a>';
                    var update = '<a class="btn btn-sm btn-success" href="javascript:updateRoom(this,' + id + ',\'' + code + '\',' + seatCount + ',' + status + ');">修改</a>';
                    var jinRu = '<a class="btn btn-sm btn-info" href="javascript:openRoom(this,' + id + ',\'' + code + '\');" ' +
                        ' style="width:120px;">游戏开间<i class="icon-arrow-right icon-on-right"></i></a>';

                    if (status === 0)return buJu +
                        '<span style="margin:0 10px;"></span>' +
                        '<span style="margin:0 10px;"></span>' +
                        update +
                        '<span style="margin:0 10px;"></span>' +
                        '<span style="margin:0 10px;"></span>' +
                        jinRu;
                    if (status === 1) return update;
                    if (status === 2) return update;
                    return '';
                }
            }
        ];
    }();

    W.addRoom = function (onwer, id) {
        var html = jade.templates.add({action: 'room/add'});
        W.__myDialog = bootbox.dialog({
            //size: 'small',
            title: "增加房间对话框",
            message: html,
            buttons: {
                tiJiao: {
                    label: "添加",
                    className: "btn-success my-submit-btn-id",
                    callback: function () {
                        $('.my-submit-btn-id').hide();
                        $('#addForm').submit();
                        return false;
                    }
                }
            }
        });
    };

    W.updateRoom = function (onwer, id, code, seatCount, status) {
        var html = jade.templates.update({
            action: 'room/update',
            roomId: id,
            code: code,
            seatCount: seatCount,
            status: status
        });
        W.__myDialog = bootbox.dialog({
            //size: 'small',
            title: "修改房间对话框",
            message: html,
            buttons: {
                tiJiao: {
                    label: "修改",
                    className: "btn-success my-submit-btn-id",
                    callback: function () {
                        $('.my-submit-btn-id').hide();
                        $('#updateForm').submit();
                        return false;
                    }
                }
            }
        });
    };

    W.openRoom = function (owner, id, code) {
        $.get('user/getJudgment', function (judgments) {
            if (!judgments || judgments.length == 0) {
                alert('系统还没有裁判，请先去添加裁判');
                return;
            }
            SettingsIndex.getGameOffices(function (result) {
                if (result.err) {
                    alert('游戏配置错误，请管理员检查');
                    return;
                }
                var html = jade.templates.open({
                    action: 'room/open',
                    roomId: id,
                    roomCode: code,
                    judgments: judgments,
                    offices: result.data
                });
                W.__myDialog = bootbox.dialog({
                    title: "游戏开间对话框",
                    message: html,
                    buttons: {
                        kaiJian: {
                            label: '进入房间',
                            className: 'btn-success my-submit-btn-id',
                            callback: function () {
                                $('.my-submit-btn-id').hide();
                                $('#openForm').submit();
                                window.__myDialog.modal('hide');
                                return false;
                            }
                        }
                    }
                });
            });
        });
    };

    W.delRoom = function (owner, id) {
        $.post('room/remove', {roomId: id}, function (result) {
            if (result && result.status) {
                setTimeout(function () {
                    jQuery(grid_selector).trigger('reloadGrid');
                }, 1000);
                alert('删除成功');
            } else {
                alert('删除失败');
            }
        });
    };

})(window);