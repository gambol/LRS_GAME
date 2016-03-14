/**
 * Created by fy on 15-12-24
 */
'use strict';

/*
 /!**
 * 检查游戏是否结束了，
 * 逻辑是：
 * <pre>
 * 1:如果狼人死光了，猎人赢
 * 2:如果猎人死光了，狼人赢
 * 3:否则游戏继续
 * </pre>
 *!/
 function checkIsGameOver() {

 //todo 狼人分数
 var langFen = 40;
 //todo 好人分数
 var haoFen = 30;

 var seatDoms = $('.grid-stack-item');
 var lieRenCount = seatDoms.filter(function () {
 return Data.getData(this, 'shenfen') === '猎';
 }).size();
 var langRenCount = seatDoms.filter(function () {
 return Data.getData(this, 'shenfen') === '狼';
 }).size();

 if (lieRenCount <= 0) { // 狼人赢
 //TODO 显示结束对话框
 var ret = ['获胜者：狼人'];
 var score = seatDoms.filter(function () {
 return Data.getData(this, 'shenfen') === '狼';
 }).map(function () {
 var memberId = Data.getData(this, 'memberId');
 var memberName = Data.getData(this, 'memberName');
 var penalty = Data.getData(this, 'penalty') || 0;
 var shenfen = Data.getData(this, 'shenfen');
 // todo 这里不同的身份要加入不同的分数
 var winerFen = penalty + haoFen;
 ret.push(memberName + '加分:' + winerFen);
 return {
 gameId: gameId,
 roomId: roomId,
 memberId: memberId,
 penalty: winerFen
 }
 }).get();
 $.post('room/gameOver', {
 roomId: roomId,
 score: score
 }, function (result) {
 if (result && result.status) {
 Toast.show('保存分数成功！');
 Dialog.showGameOverDialog(ret);
 } else {
 Toast.show('保存分数失败！');
 }
 });
 return false;
 }
 if (langRenCount <= 0) { //　好人赢
 var ret = ['获胜者：好人'];
 var score = seatDoms.filter(function () {
 return Data.getData(this, 'shenfen') != '狼';
 }).map(function () {
 var memberId = Data.getData(this, 'memberId');
 var memberName = Data.getData(this, 'memberName');
 var penalty = Data.getData(this, 'penalty') || 0;
 var shenfen = Data.getData(this, 'shenfen');
 // todo 这里不同的身份要加入不同的分数
 var winerFen = penalty + haoFen;
 ret.push(memberName + '加分:' + winerFen);
 return {
 gameId: gameId,
 roomId: roomId,
 memberId: memberId,
 penalty: winerFen
 }
 }).get();
 $.post('room/gameOver', {
 roomId: roomId,
 score: score
 }, function (result) {
 if (result && result.status) {
 Dialog.showGameOverDialog(ret);
 Toast.show('保存分数成功！');
 } else {
 Toast.show('保存分数失败！');
 }
 });
 return false;
 }
 //otherwise 游戏继续
 return true;
 }
 */

/**
 * 在座位上右键的操作处理
 * @type {{text: string, isContextMenu: Function, eventContextMenu: Function}}
 */
var ContextMenu = {
    text: '',//菜单名称
    shaDiao: function () {
        if (Flow.isAtNwFlow()) { //在女巫环节，才可以救活人/杀人
            NvWu.kill(this.context);
        } else { //狼人环节,狼人所杀,显示狼人所杀人员信息
            LangRen.kill(this.context);
        }
    },
    baoLang: function () {
        //　判断是否是狼
        var identity = Data.getData(this.context.parent(), 'shenfen');
        if (!identity) {
            Toast.show('hi,我还没有身份呢!!');
            return;
        }
        if (identity !== '狼') {
            Toast.show('hi,这不是狼!!');
            return;
        }
        var ele1 = this.context.find('.my-badge-si').remove().end().append('<div class="my-badge-si">死</div>').parent();
        //Popover.addForPersonPanel(ele1, 'status', 5);
        Data.status.setStatus(ele1, 5);
        // TODO 爆狼后直接进入晚上环节
        Flow.resetFlow();

    },
    wuYaBiaoJi: function () {
        var ele1 = this.context.find('.my-badge-biao').remove().end().append('<div class="my-badge-biao">标</div>').parent();
        Popover.addForPersonPanel(ele1, 'wuyaFlag', 1);
        MyScreen.showUserInfo(ele1);
    },
    gongTouChuJu: function () {
        var ele1 = this.context.find('.my-badge-si').remove().end().append('<div class="my-badge-si">死</div>').parent();
        //Popover.addForPersonPanel(ele1, 'status', 2);
        Data.status.setStatus(ele1, 2)
    },
    wuZhengYanChuJu: function () {
        var ele1 = this.context.find('.my-badge-si').remove().end().append('<div class="my-badge-si">死</div>').parent();
        //Popover.addForPersonPanel(ele1, 'status', 3);
        Data.status.setStatus(ele1, 3);
    },
    isContextMenu: function (name) {
        return this.text === name;
    },
    eventContextMenu: function (doms) {
        var self = this;
        doms.filter(function () {
            var t = $.trim($(this).children().first().text());
            return (t.indexOf('裁判') === -1 && t.indexOf('桌') === -1 && t.indexOf('屏') === -1);
        }).contextmenu({
            target: '#context-menu',
            onItem: function (context, e) {
                e.preventDefault();
                self.text = $(e.target).text();
                self.context = context;


                if (!self.isContextMenu('座次登记') && !checkIsRegister(context)) return;//校验是否已经登记座次

                if (self.isContextMenu('座次登记')) {
                    Dialog.showDialogForRegister(context, e);
                } else if (self.isContextMenu('清理座次登记')) {
                    var ele = $(context).removeClass('my-seat-light-blue').parent();

                    MyScreen.removeSeatForRuZuoScreen(Data.getData(ele, 'seatNum'));
                    Data.deleData(ele, 'leiJiJiFen');
                    Data.deleData(ele, 'dj');
                    Data.deleData(ele, 'order_id');
                    Data.deleData(ele, 'memberId');
                    Data.deleData(ele, 'seatNum');
                    Data.deleData(ele, 'headImg');
                    Data.deleData(ele, 'status');
                    Data.deleData(ele, 'memberCode');
                    Data.deleData(ele, 'memberName');
                    $(ele).find('.for_clear').remove();

                } else if (self.isContextMenu('开始计时')) {
                    var ele = $(context).parent();

                    var checkoutId = Data.getData(ele, 'order_id');
                    CheckoutIndex.updateTimeForBeginGame(checkoutId, function (result) {
                        if (!result.err) {
                            $.gritter.removeAll();
                            setTimeout(function () {
                                $.gritter.add({
                                    title: '开始计时成功',
                                    class_name: 'gritter-error gritter-light'
                                });
                            }, 500);
                            W.__myDialog.dialog('close');
                        } else {
                            $.gritter.removeAll();
                            setTimeout(function () {
                                $.gritter.add({
                                    title: result.err,
                                    class_name: 'gritter-error gritter-light'
                                });
                            }, 500);
                        }
                    });
                } else if (self.isContextMenu('更改身份')) {
                    Dialog.showDialogForShenFen(context, e);
                } else if (self.isContextMenu('罚分')) {
                    Dialog.showDialogForPenalty(context, e);
                } else if (self.isContextMenu('杀掉')) {
                    self.shaDiao()
                } else if (self.isContextMenu('救活')) {
                    NvWu.jiuHuo(context);
                } else if (self.isContextMenu('爆狼')) {
                    self.baoLang();
                } else if (self.isContextMenu('告知发言')) {
                    Play.qingcongfayan(context.children().first().text());
                } else if (self.isContextMenu('禁止发言')) {
                    play('请' + context.children().first().text() + '号玩家结束发言');
                } else if (self.isContextMenu('乌鸦标记')) {
                    self.wuYaBiaoJi();
                } else if (self.isContextMenu('公投出局')) {
                    self.gongTouChuJu();
                } else if (self.isContextMenu('误睁眼出局')) {
                    self.wuZhengYanChuJu();
                } else if (self.isContextMenu('购买商品')) {
                    alert('购买商品');
                }
            }
        });
    }

};

