/**
 * Created by fy on 16-1-8.
 */
'use strict';

/**
 * 个人信息面板对象
 * @type {{eventPopover: Function, addForPersonPanel: Function}}
 */
var Popover = {

    /**
     * 鼠标单击显示pop框
     * @param ele
     * @param title ？
     * @param content ？
     */
    eventPopover: function (ele, content, title) {
        if (content)
            return $(ele).attr({
                'data-rel': 'popover',
                'data-placement': 'right',
                'data-content': content,
                'data-original-title': title || "<i class='icon-ok green'></i> 个人信息面板"
            }).popover({html: true});
        else return $(ele).popover({html: true});
    },


    /**
     * 添加到用户基本信息面板
     * @param ele
     * @param key
     * @param value
     */
    addForPersonPanel: function (ele, key, value) {
        var extras = Data.saveAndUpdateData(ele, key, value);
        var content = jade.templates.info({infos: [extras]});
        this.eventPopover(ele, content);
    },
    /**
     * 删除个人信息面板
     * @param ele
     * @param key
     */
    removePersonPanel: function (ele, key) {
        var extras = Data.deleData(ele, key);
        var content = jade.templates.info({infos: [extras]});
        this.eventPopover(ele, content);
    }
};

/**
 * 所有对话框对象
 * @type {{showGameOverDialog: Function, showAudioDialog: Function, showDialogForRegister: Function, showDialogForShenFen: Function, showDialogForCunZhang: Function, showDialogForPenalty: Function}}
 */
var Dialog = {

    /**
     * 游戏结束对话框
     */
    showGameOverDialog: function () {
        var html = jade.templates.gameOver({
            setting: Setting.getSetting()
        });
        window.__myDialog = bootbox.dialog({
            title: "游戏结束对话框",
            message: html,
            buttons: {
                close: {
                    label: '返回游戏',
                    className: 'btn-success',
                    callback: function () {
                        window.__myDialog.modal('hide');
                        return false;
                    }
                },
                logout: {
                    label: '退出游戏',
                    className: 'btn-success',
                    callback: function () {
                        MyScreen.clear();
                        MyScreen.close();
                        //window.__myDialog.modal('hide');
                        window.history.back();
                        return false;
                    }
                },
                confirm: {
                    label: '保存得分并继续游戏',
                    className: 'btn-success',
                    callback: function () {
                        var win = $(':radio[name="whowin"]').filter(':checked').val();

                        var gameResult = $('.grid-stack-item').filter(function () {
                            return !!Data.getData(this, 'memberCode');
                        }).map(function () {
                            var data = Data.getAllData(this);
                            var status = Data.status.getStatus(this);
                            var order_id = data.order_id;
                            var setting = Setting.getSetting();
                            var leiJiJiFen = data.leiJiJiFen ? parseInt(data.leiJiJiFen) : 0;
                            var memberId = data.memberId;
                            var integral = 0;
                            if (data.shenfen) {
                                //'女巫', '猎人', '白痴', '乌鸦', '预言家'
                                if (win == 'haoren') {
                                    if (_.contains(setting.shenFen, data.shenfen)) {
                                        integral = setting.score.shenFen;
                                    } else {
                                        if ('狼人' != data.shenfen) {
                                            integral = setting.score.pingMin;
                                        }
                                    }
                                }
                                if (win == 'langren') { //langren
                                    if ('狼人' == data.shenfen) {
                                        integral = setting.score.langRen;
                                    }
                                }
                            }
                            /* console.log({
                             touXiang: data.headImg,//'/pictures/uesrimg.png',
                             huiYuan: data.memberName,
                             dengJi: data.dj + '级',
                             zuoWei: data.seatNum,
                             jiFen: integral,
                             leiJiJiFen: leiJiJiFen + integral,
                             shenFen: GetImg.getByShenFen(data.shenfen)
                             });*/

                            MyScreen.showRuzuoScreen({
                                touXiang: data.headImg,//'/pictures/uesrimg.png',
                                huiYuan: data.memberName,
                                dengJi: data.dj + '级',
                                zuoWei: data.seatNum,
                                jiFen: integral,
                                leiJiJiFen: leiJiJiFen + integral,
                                shenFen: GetImg.getByShenFen(data.shenfen)
                            });
                            return {
                                member_id: memberId,
                                order_id: order_id,
                                room_id: roomId,
                                game_id: gameId,
                                seat_code: data.seatNum,
                                identity: data.shenfen,
                                integral: integral,
                                is_dead: status
                            };
                        }).get();

                        var _data = $('.grid-stack-item').filter(function () {
                            return !!Data.getData(this, 'memberCode');
                        }).map(function () {
                            return Data.getAllData(this);
                        }).get();

                        window.localStorage.setItem('__pre_game', JSON.stringify(_data));

                        if (win == 'haoren')  Play.other('cunMinHuoDeShengLi', saveGameOver);
                        if (win == 'langren')  Play.other('langRenHuoDeShengLi', saveGameOver);

                        function saveGameOver() {
                            RoomIndex.saveOrderHasGame(gameResult, function (data) {
                                window.__gaming = false;
                                if (!data.err) {
                                    Example1.Timer.toggle();
                                    //window.__myDialog.modal('hide');
                                    alert('保存成功，确定后继续游戏');
                                    //MyScreen.clear();
                                    window.location.reload();
                                } else {
                                    alert('保存失败');
                                }
                            });
                        }

                        return true;
                    }
                }

            }
        });
    },

    /**
     * 显示语音播报对话框
     */
    showAudioDialog: function () {
        //var audios = ['请玩家遵守游戏规则', '请玩家文明游戏', '请已出局玩家保持安静', '请屋内玩家保持安静'];
        var audios = [{
            text: '请玩家注意发言内容',
            key: 'faYanNeiRong'
        }, {
            text: '请玩家注意发言时间',
            key: 'faYanShiJian'
        }, {
            text: '请正确使用游戏面具',
            key: 'zhengQueShiYongMianJu'
        }, {
            text: '请尊重玩家发言保持安静',
            key: 'zunZhongFaYanShiJian'
        }
        ];
        var html = jade.templates.audio({
            audios: audios
        });
        window.__myDialog = bootbox.dialog({
            title: "语音播报对话框",
            message: html,
            buttons: {
                close: {
                    label: '关闭',
                    className: 'btn-success',
                    callback: function () {
                        window.__myDialog.modal('hide');
                        return false;
                    }
                }
            }
        });
    },


    /**
     * 座次登记对话框
     *  @context 右键点击的目标元素
     *  @ele 当前右键菜单项
     */
    showDialogForRegister: function (context, ele) {

        Http.checkAndCacheAllMember(function (allMembers) {


            var dialog = $("#dialog-register").removeClass('hide').dialog({
                modal: true,
                title: '座次登记对话框',
                title_html: true,
                buttons: [
                    {
                        text: "取消",
                        "class": "btn btn-xs",
                        click: function () {
                            $(this).dialog("close");
                        }
                    },
                    {
                        text: "确定",
                        "class": "btn btn-primary btn-xs",
                        click: function () {
                            var self = this;
                            var nf = $('#memberForm');
                            var autoCompleteValue = nf.find('[name="memberCode"]').val();

                            var member = autoCompleteValue.split(',');
                            var memberCode = member[0];
                            var memberName = member[1];//姓名
                            var seatCode = context.parent().data('extras').name;


                            var params = {roomId: roomId, memberCode: memberCode, gameId: gameId, seatCode: seatCode};

                            Http.register(params, function (data) {
                                if (data.status) {
                                    nf.get(0).reset();
                                    var ele = context.parent();
                                    // TODO 座位改变颜色
                                    context.addClass('my-seat-light-blue');
                                    // TODO 大屏显示：显示在座会员信息
                                    MyScreen.showRuzuoScreen({
                                        touXiang: data.member.image_url,//'/pictures/uesrimg.png',
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

                                    /*var newMembers = _.without(allMembers, autoCompleteValue);
                                     console.log(newMembers);
                                     $("#memberCode").autocomplete({
                                     source: newMembers
                                     });*/
                                    $(self).dialog("close");

                                } else {
                                    alert(data.msg);
                                }
                            });
                        }
                    }
                ]
            }).data('context', context);
            // 自动完成
            $("#memberCode").autocomplete({
                source: window.__all_member
            });

        });

        //custom autocomplete (category selection)
        /*$.widget("custom.catcomplete", $.ui.autocomplete, {
         _renderMenu: function (ul, items) {
         var that = this,
         currentCategory = "";
         $.each(items, function (index, item) {
         if (item.category != currentCategory) {
         ul.append("<li class='ui-autocomplete-category'>" + item.category + "</li>");
         currentCategory = item.category;
         }
         that._renderItemData(ul, item);
         });
         }
         });*/
    },

    /**
     * 更改身份对话框
     *  @context 右键点击的目标元素
     *  @ele 当前右键菜单项
     */
    showDialogForShenFen: function (context, ele) {
        var dialog = $("#dialog-shenfen").removeClass('hide').dialog({
            modal: true,
            title: '更改身份对话框',
            title_html: true,
            buttons: [
                {
                    text: "取消",
                    "class": "btn btn-xs",
                    click: function () {
                        $(this).dialog("close");
                    }
                },
                {
                    text: "确定",
                    "class": "btn btn-primary btn-xs",
                    click: function () {
                        var self = this;
                        var nf = $('#shenfenForm');
                        var shenfen = nf.find('[name="shenfen"]').val();
                        var memberId = Data.getData(context.parent(), 'memberId');

                        Http.updateIdentity({
                            roomId: roomId,
                            memberId: memberId,
                            identity: shenfen
                        }, function (result) {
                            if (result && result.status) {// 更新数据库成功
                                nf.get(0).reset();
                                var ele = context.find('.my-badge').remove().end().append('<span class="my-badge">' + shenfen.split('|')[0] + '</span>').parent();
                                Popover.addForPersonPanel(ele, 'shenfen', shenfen);
                                $(self).dialog("close");
                            }
                        });
                    }
                }
            ]
        }).data('context', context);
    },

    /**
     *  显示罚分对话框
     * @param context
     * @param e
     */
    showDialogForPenalty: function (context, e) {
        var dialog = $("#dialog-penalty").removeClass('hide').dialog({
            modal: true,
            title: '罚分对话框',
            title_html: true,
            buttons: [
                {
                    text: "取消",
                    "class": "btn btn-xs",
                    click: function () {
                        $(this).dialog("close");
                    }
                },
                {
                    text: "确定",
                    "class": "btn btn-primary btn-xs",
                    click: function () {
                        var self = this;
                        var nf = $('#penaltyForm');
                        var penalty = -parseInt(nf.find('[name="penalty"]').val());
                        var memberId = Data.getData(context.parent(), 'memberId');

                        Http.penalty(
                            {
                                penalty: penalty,
                                gameId: gameId,
                                memberId: memberId
                            }, function (data) {
                                if (data.status) {
                                    nf.get(0).reset();
                                    var ele = context.parent();
                                    var oldPenalty = Data.getData(ele, 'penalty') || 0;
                                    Popover.addForPersonPanel(ele, 'penalty', penalty + oldPenalty);
                                    $(self).dialog("close");
                                } else {
                                    Toast.show('后台发生异常!');
                                }
                            });
                    }
                }
            ]
        }).data('context', context);
    }

};
