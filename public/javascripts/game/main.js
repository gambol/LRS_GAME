/**
 * Created by fy on 16-1-8.
 */
'use strict';


(function (W) {
    /**
     * 打卡
     */
    W.addOrderInfo = function (owner, id) {
        var html = jade.templates.punch({action: "checkout/add"});
        W.__myDialog = bootbox.dialog({
            title: '打卡对话框',
            message: html,
            buttons: {
                tiJiao: {
                    label: "打卡",
                    className: "btn-success my-submit-btn-id",
                    callback: function () {
                        var memberId = $("#memberId").val().split(",")[0];
                        $('#submit').trigger('click');
                        return false;
                    }
                }
            }
        });
        setTimeout(function () {
            var orderCode = new Date() - 1;
            $("#orderCode1").val(orderCode);
            $("#ctime").val(FORMAT.timeYMDHMS(new Date()));
            $("#sum_price").val(0);
            $("#status1").val(0);
        }, 1000);
        //加载所有的会员
        setTimeout(function () {
            $.post('member/allMember', function (result) {
                if (!result) {
                    alert('现在还没有会员，请录入！');
                    window.close();
                }
                var memberArr = [];
                for (var i = 0; i < result.length; i++) {
                    memberArr.push(result[i]);
                }
                $("#memberId").autocomplete({
                    source: memberArr
                });
            });
        }, 1000)
    };

})(window);


/**
 * 显示桌面布局的处理,主函数
 */
$(function () {

    //　初始化游戏界面布局的方法
    var options = {
        width: 8,
        float: true,
        cell_height: 50,
        vertical_margin: 10,
        resizable: false,
        draggable: false
    };

    // 取消选中事件
    !function distachSelectText() {
        document.onselectstart = function () {
            return false;
        }; //for ie
        //document.onselectstart = new Function('event.returnValue=false;');
    }();

    // 检查系统是否存在用户
    Http.checkAndCacheAllMember();

    // 初始化局

    SettingsIndex.getGameSettings(function (result) {
        window.__settings = result.data;

        var juSetting = window.__settings[office];

        // 生成flow流程界面
        var flowsHtml = jade.templates.flow(juSetting);
        $('#flowContent').html(flowsHtml);

        // 移除当前局不允许的身份
        $('#shenfen').children().each(function () {
            var allowOptions = juSetting.shenFen.join(',') + ',狼人,平民';
            if (allowOptions.indexOf($(this).text()) === -1) {
                $(this).remove();
            }
        });

        //修改标题
        $('#juLabel').text(Flow.getGameTitle());
        $('#stopwatch').trigger('click');
        window.sessionStorage.clear('userInfo');
        Toast.show('请先进行座次等级后，再点击＂开始＂按钮');
    });

    //　注册桌面布局插件
    $('.grid-stack').gridstack(options);

    // 绘制桌面
    window.GridStack = new function () {
        this.serialized_data = Http.getLayoutJsonById(roomId);

        this.grid = $('.grid-stack').data('gridstack');

        this.load_grid = function () {
            var self = this;
            this.grid.remove_all();
            var items = GridStackUI.Utils.sort(this.serialized_data);
            _.each(items, function (node) {
                var item = $('<div><div class="grid-stack-item-content" data-toggle="context" data-target="#context-menu"><span>' + (node.name || "") + '</span></div><div/>');
                item.data('extras', {name: node.name});
                self.grid.add_widget(item, node.x, node.y, node.width, node.height);
            }, this);
            $('#saved-data').val(JSON.stringify(this.serialized_data, null, '    '));

            // 批量添加右键菜单事件
            ContextMenu.eventContextMenu($('.grid-stack-item-content'));

            // 界面显示完毕之后，立刻的恢复上次游戏的所有座位
            initSeats();
        }.bind(this);

        this.load_grid();

        this.grid.movable('.grid-stack-item', false);
        this.grid.resizable('.grid-stack-item', false);

        return this;
    };

    // 注册控制面板按钮事件
    $('.my-btn').click(Control.handler);

});

/**
 * 恢复座位
 */
function initSeats() {
    function _getDataBySeatNum(list, seatNum) {
        var data = null;
        for (var i = 0; i < list.length; i++) {
            var item = list[i];
            if (parseInt(item.seatNum) == seatNum) {
                data = item;
            }
        }
        return data;
    }

    var preGameData = window.localStorage.getItem('__pre_game');
    if (!preGameData) {
        console.log('请先座次登记，因为：没有发现上一场的记录');
        Toast.show('请先座次登记，因为：没有发现上一场的记录');
        return;
    }
    preGameData = JSON.parse(preGameData);
    console.log(preGameData);

    $('.grid-stack-item-content').not(':contains("桌子")').not(':contains("裁判")').each(function (index, item) {
        //if (index > 18)return false;
        var context = $(item);

        var seatCode = context.parent().data('extras').name;
        console.log(seatCode);
        var dd = _getDataBySeatNum(preGameData, parseInt(seatCode));
        console.log(dd);

        if (!dd)return;
        var memberCode = dd.memberCode;
        var memberName = dd.memberName;//姓名

        var params = {memberCode: memberCode, gameId: gameId, seatCode: seatCode};

        Http.register(params, function (data) {
            if (data.status) {
                var ele = context.parent();
                // TODO 座位改变颜色
                context.addClass('my-seat-light-blue');
                // TODO 大屏显示：显示在座会员信息
                MyScreen.showRuzuoScreen({
                    touXiang: data.member.image_url,
                    huiYuan: memberName,
                    dengJi: data.dj + '级',
                    zuoWei: seatCode,
                    jiFen: 0,
                    leiJiJiFen: data.member.integration
                });
                Data.saveAndUpdateData(ele, 'leiJiJiFen', data.member.integration);
                Data.saveAndUpdateData(ele, 'dj', data.dj);
                Data.saveAndUpdateData(ele, 'order_id', data.member.order_id);
                Data.saveAndUpdateData(ele, 'memberId', data.member.id);
                Data.saveAndUpdateData(ele, 'seatNum', seatCode);
                Data.saveAndUpdateData(ele, 'headImg', data.member.image_url);
                //Data.saveAndUpdateData(ele, 'status', 0);
                Data.status.setStatus(ele, 0);
                Popover.addForPersonPanel(ele, 'memberCode', memberCode);
                Popover.addForPersonPanel(ele, 'memberName', memberName);
                context.append('<div class="for_clear" style="position: inherit;line-height: 16px;"><img style="width: 16px;height: 16px;" src="' + data.member.image_url + '">' + memberName + '</div>');

                //$(self).dialog("close");
            } else {
                alert(data.msg);
            }
        });
    });
}

/**
 * TODO 自动化测试用，生产环境需要去掉，用于自动设置所有座位号
 */
/*
 function initSeats() {

 $('.grid-stack-item-content').not(':contains("桌子")').each(function (index, item) {
 var context = $(item);
 var autoCompleteValue = window.__all_member[index]; //

 var member = autoCompleteValue.split(',');
 var memberCode = member[0];
 var memberName = member[1];//姓名
 var seatCode = context.parent().data('extras').name;


 var params = {memberCode: memberCode, gameId: gameId, seatCode: seatCode};

 Http.register(params, function (data) {
 if (data.status) {
 var ele = context.parent();
 // TODO 座位改变颜色
 context.addClass('my-seat-light-blue');
 // TODO 大屏显示：显示在座会员信息
 MyScreen.showRuzuoScreen({
 touXiang: data.member.image_url,
 huiYuan: memberName,
 dengJi: data.dj + '级',
 zuoWei: seatCode,
 jiFen: 0,
 leiJiJiFen: data.member.integration
 });
 Data.saveAndUpdateData(ele, 'leiJiJiFen', data.member.integration);
 Data.saveAndUpdateData(ele, 'dj', data.dj);
 Data.saveAndUpdateData(ele, 'order_id', data.member.order_id);
 Data.saveAndUpdateData(ele, 'memberId', data.member.id);
 Data.saveAndUpdateData(ele, 'seatNum', seatCode);
 Data.saveAndUpdateData(ele, 'headImg', data.member.image_url);
 //Data.saveAndUpdateData(ele, 'status', 0);
 Data.status.setStatus(ele, 0);
 Popover.addForPersonPanel(ele, 'memberCode', memberCode);
 Popover.addForPersonPanel(ele, 'memberName', memberName);
 context.append('<div class="for_clear" style="position: inherit;line-height: 16px;"><img style="width: 16px;height: 16px;" src="' + data.member.image_url + '">' + memberName + '</div>');
 $(self).dialog("close");
 } else {
 alert('系统中不存在此会员');
 }
 });
 });
 }
 */

