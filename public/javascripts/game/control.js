/**
 * Created by fy on 15-1-6.
 */
'use strict';

/**
 * 下一步按钮的处理
 * @type {{atLangRenFlow: Function, atNvWuFlow: Function, atLieRenFlow: Function, atBaiChiFlow: Function, atWuYaFlow: Function, atYuYanJiaFlow: Function, atJingXuanCunZhangFlow: Function, atTouPiaoFlow: Function}}
 * @private
 */
var _At = {
    atLangRenFlow: function () {
        Flow.nextFlowStyle(); // FIXME first 不需要，特例,请确认这个有没有问题？
        //play('天黑请闭眼');
        Play.liucheng("tianheiqingbiyan", function () {
            //play('狼人请睁眼');
            Play.liucheng("langrenqingzhengyan", function () {
                if (Setting.isFirstDay()) {
                    Toast.show('请裁判标记狼人位置');
                    Event.identitty.langRenEvent(goToShaRen);
                } else {
                    goToShaRen();
                }
            });

            //狼人去杀人的操作
            function goToShaRen() {
                // play('狼人请杀人');
                Play.liucheng("langrenqingsharen", function () {
                    Toast.show('请裁判标记狼人所杀的人');
                    Event.goToDo.langRenKillEvent(function () {
                        //play('狼人请闭眼');
                        Play.liucheng("langrenqingbiyan", function () {
                            //MyScreen.clear();
                            Flow.nextFlow();
                        });
                    });
                });
            }
        });

    },
    atNvWuFlow: function () {
        function killOrJiuhuo() {
            //判断是否有救人药
            if (NvWu.haveJiuRenYao()) {
                //救人  大屏显示已死亡的人
                var data = Data.getAllData(Event.goToDo.getSeatFornvWuCanJiu().parent());
                var memberName = data.memberName;
                var seatNum = data.seatNum;
                MyScreen.showNvwu1([
                    {
                        touXiang: data.headImg,//'/pictures/uesrimg.png',
                        zuoWei: seatNum,
                        huiYuan: memberName
                    }
                ]);
                //MyScreen.showText("<div>显示已经死亡的人......</div>");
            }
            //play('女巫是否用药');
            Play.liucheng("nvwushifouyongyao", function () {
                Toast.show('请裁注意女巫手势进行选择操作');
                NvWu.showButton();
                Event.clickButton.nvWuChoice(function () {
                    NvWu.hideButton();
                    //play('女巫请闭眼');
                    Play.liucheng("nvwuqingbiyan", function () {
                        $('#qrDuSiBtn,#qrJiuHuoBtn').hide();
                        Flow.nextFlow();
                        //MyScreen.clear();
                    });
                });
            });
        }

        Flow.nextFlowStyle();
        //Flow.nextSubFlow();
        //判断女巫是否活着
        //play('女巫请睁眼');
        Play.liucheng("nvwuqingzhengyan", function () {
            if (Setting.isFirstDay()) {
                // TODO 座位事件处理
                Toast.show('请裁判标记女巫位置');
                Event.identitty.nvWuEvent(killOrJiuhuo);
            } else  killOrJiuhuo();
        });
    },
    atLieRenFlow: function () {
        MyScreen.clear();
        Flow.nextFlowStyle();
        if (Setting.isFirstDay()) {
            //play('猎人请睁眼');
            Play.liucheng("lierenqingzhengyan", function () {
                Toast.show('请裁判标记猎人位置');
                Event.identitty.lieRenEvent(function () {
                    //play('猎人请闭眼');
                    Play.liucheng("lierenqingbiyan", function () {
                        Flow.nextFlow();
                    });
                });
            });
        }
    },
    atBaiChiFlow: function () {
        Flow.nextFlowStyle();
        if (Setting.isFirstDay()) {
            //play('白痴请睁眼');
            Play.liucheng("baichiqingzhengyan", function () {
                Toast.show('请裁判标记白痴位置');
                Event.identitty.baiChiEvent(function () {
                    //play('白痴请闭眼');
                    Play.liucheng("baichiqingbiyan", function () {
                        Flow.nextFlow();
                    });
                });
            });
        }
    },
    atWuYaFlow: function () {
        function biaoJi() {
            //play('乌鸦请标记');
            Play.liucheng("wuyaqingbiaoji", function () {
                Toast.show('请裁判标记乌鸦制定的人');
                Event.goToDo.wuYaBiaoJiEvent(function () {
                    //play('乌鸦请闭眼');
                    Play.liucheng("wuyaqingbiyan", function () {
                        //MyScreen.clear();
                        Flow.nextFlow();
                    });
                });
            });
        }

        Flow.nextFlowStyle();
        //play('乌鸦请睁眼');
        Play.liucheng("wuyaqingzhengyan", function () {
            if (Setting.isFirstDay()) {
                Toast.show('请裁判标记乌鸦位置');
                Event.identitty.wuYaEvent(biaoJi);
            } else {
                biaoJi();
            }
        });
    },
    atYuYanJiaFlow: function () {
        function yanRen() {
            // play('预言家请验人');
            Play.liucheng("yuyanjiaqingyanren", function () {
                Toast.show('请裁判点击预言家所验的人');
                Event.goToDo.yuYanJiaYanRenEvent(function () {
                    //var sto = setTimeout(function () { // 解决天亮了时，预言家所验之人还显示的问题
                    Play.liucheng("yuyanjiaqingbiyan", function () {
                        Flow.nextFlow();
                        //clearTimeout(sto);
                    });
                    //}, 2000);
                });
            });
        }

        Flow.nextFlowStyle();
        //play('预言家请睁眼');
        Play.liucheng("yuyanjiaqingzhengyan", function () {
            if (Setting.isFirstDay()) {
                Toast.show('请裁判标记预言家位置');
                Event.identitty.yuYanJiaEvent(function () {
                    yanRen();
                    // TODO 设置平民
                    //Event.identitty.getSeatForPingMin().append('<span class="my-badge">民</span>');
                    //Data.saveAndUpdateData(Event.identitty.getSeatForPingMin(), 'shenfen', '民');
                });
            } else {
                yanRen();
            }
        });
    },
    atJingXuanCunZhangFlow: function () {

        $('#nexthuanjie').hide();
        Flow.nextFlowStyle();
        // play('狗狗 楼  偶~~'); //鸡叫特效 //TODO 暂时没有mp3文件
        //play('天亮了,请大家睁眼,现在开始竞选村长');

        Play.liucheng("xianzaikaishijingxuancunzhang", function () {

            Event.say.sayYiQuan(function () {
                //play('现在开始投票,请大家第一时间投票,跟票无效!');
                Play.touPiao(function () {
                    // play('当当当当当');//TODO 暂时没有
                    Toast.show('请裁判标记村长位置');
                    Event.identitty.cunZhangEvent(function (x) {
                        if (x) { //没有人当选村长
                            Flow.nextFlow();
                            return;
                        }
                        var data = CunZhang.getData();
                        //play(data.seatNum + '号玩家当选村长');
                        MyScreen.showYuyanjia2([
                            {
                                touXiang: data.headImg,//'/pictures/uesrimg.png',
                                zuoWei: data.seatNum,
                                huiYuan: data.memberName
                                //shenFen: GetImg.getByShenFen(data.shenfen)
                            }
                        ]);
                        //MyScreen.showText(data.seatNum + '号玩家当选村长');// TODO 还要显示头像、会员号等，从data上取出来
                        Flow.removeFlows(['村长']);
                        Play.cunzhang(data.seatNum, function () {
                            //MyScreen.clear();
                            Flow.nextFlow();
                        });
                    });
                });
            });
        });
    },
    atTouPiaoFlow: function () {
        Flow.nextFlowStyle();
        $('#nexthuanjie').hide();
        // FIXME 自动判断精选出村长，这个在投票环节后，在清理流程的时候处理
        if (Setting.isFirstDay()) {
            Flow.removeFlows(['猎人', '白痴']); //只有在第一天睁眼
            ShenFen.qingSuan();//将没有身份的标为平民
        }
        if (!NvWu.haveYao()) {
            Flow.removeFlows(['女巫']);
        }
        if (ShenFen.hasDeadPerson()) {//非平安夜
            var playString = '昨晚';
            var showCount = [];
            Event.identitty.getSeatOfHavePeople().each(function () {
                var data = Data.getAllData($(this).parent());
                var allState = data.status;

                // 没有身份的其他人的身份就是平民
                if (!data.shenfen) {
                    data.shenfen = '平民';
                }

                var shenfen = data.shenfen;
                var seatNum = data.seatNum;
                if (Data.status.isHaveStatus(allState, 4)) {//被狼杀
                    playString += seatNum + '号被玩家被狼杀,身份为' + shenfen;
                    showCount.push({
                        zuoWei: seatNum, siyin: '被狼杀', order: 1, huiYuan: shenfen,
                        shenfen: GetImg.getByShenFen(shenfen)
                    });
                }
                if (Data.status.isHaveStatus(allState, 6)) {//被毒杀
                    playString += seatNum + '号被玩家被毒害,身份为' + shenfen;
                    showCount.push({
                        zuoWei: seatNum, siyin: '被毒害', order: 2, huiYuan: shenfen,
                        shenfen: GetImg.getByShenFen(shenfen)
                    });
                }
                if (data.wuyaFlag === 1 /*&& data.biaoJiDay === Setting.getNowDay()*/) {                   //被乌鸦标记
                    playString += seatNum + '号被玩家被标记';
                    showCount.push({
                        zuoWei: seatNum, siyin: '被标记', order: 3, huiYuan: null/*乌鸦不播放身份*/,
                        shenfen: GetImg.getByShenFen(shenfen)
                    });
                }
            });
            //alert(playString);
            //play('昨晚yy号被杀,ff号玩家被毒害');
            //play(playString);
            //MyScreen.showText('昨晚X号玩家被杀，身份为YY。昨晚X号玩家被毒，身份为YY');
            showCount = _.sortBy(showCount, function (item) {
                return item.order;
            });
            MyScreen.showToupiao1(showCount);
            Play.zuowanQingkuang(showCount, function () {

                // 清理已经死亡的人的身份所对应的游戏流程，使得下一天不在经过此流程
                Flow.removeFlows(ShenFen.getDeadFlowNames());
                var lieRenData = LieRen.isDeadAndNotDuSi();
                if (lieRenData) {// 被杀的是猎人，排除被毒死的情况
                    Play.lierenBeiSha(lieRenData.seatNum, function () {
                        Event.clickButton.shoot(function () {
                            if (CunZhang.isBeiQiangSha()) { //猎人强杀村长的情况
                                //play('请村长移交工作');
                                Play.yijiaogongzuo(function () {
                                    Event.clickButton.yiJiaoCunZhang(_next1);
                                });
                            } else if (CunZhang.isDead()) {//即是猎人也是村长的情况
                                //play('请村长移交工作');
                                Play.yijiaogongzuo(function () {
                                    Event.clickButton.yiJiaoCunZhang(_next1);
                                });
                            } else _next1();
                        });
                    });
                } else if (CunZhang.isDead()) {
                    //play('请村长移交工作');
                    Play.yijiaogongzuo(function () {
                        Event.clickButton.yiJiaoCunZhang(_next1);
                    });
                } else  _next1();
            });
        } else {
            //MyScreen.showText('平安夜');
            MyScreen.showToupiao4();
            //play('昨晚为平安夜');
            Play.pinganye(function () {
                var seatNum = WuYa.getSeatNumForBiaoJi();
                if (seatNum) {
                    //play(seatNum + '号玩家被标记');
                    Play.beiwuyabiaoji(seatNum, _next2);
                } else {
                    _next2();
                }
            });
        }

        //start by if(被杀的是村长)
        /* function _next0() {
         if (CunZhang.isDead()) {
         //play('请村长移交工作');
         Play.yijiaogongzuo(function () {
         Event.clickButton.yiJiaoCunZhang(_next1);
         });
         } else {
         _next1();//回归流程主干
         }
         }*/

        //start by if(有被乌鸦标记的时候)
        function _next1() {
            //var seatNum = WuYa.getSeatNumForBiaoJi();
            //if (seatNum) {
            //    //play(seatNum + '号玩家被标记');
            //    Play.beiwuyabiaoji(seatNum, _next2);
            //} else {
            _next2();
            //}
        }

        //TODO start by if(非平安夜)
        function _next2() {
            if (ShenFen.hasDeadPerson()) {
                Play.qingcongfayan(Seat.getSeatAfterDiePersion(), _next3);
                //play('请从xx号玩家开发发言', _next3);
            } else {
                if (CunZhang.isExist()) {
                    Play.qingcongfayan(Seat.getSeatAfterCunZhang(), _next3);
                    //play('请从xx号玩家开发发言', _next3);
                } else {
                    Play.qingcongfayan(Seat.getMinSeat(), _next3);
                    //play('请从xx号玩家开发发言', _next3);
                }
            }
        }

        //start by 开发发言
        function _next3() {
            Event.say.sayYiQuan(function () {
                //play('现在开始投票,请大家第一时间投票,跟票无效!');
                Play.touPiao(function () {
                    Event.clickButton.chuJu(function () {
                        Flow.removeFlows(ShenFen.getDeadFlowNames());
                        var chuJuData = ShenFen.getChuJuData();

                        if (chuJuData.shenfen === '白痴') {
                            _next4(chuJuData, Flow.resetFlow);
                        } else if (chuJuData.shenfen === '猎人') {
                            MyScreen.showToupiao8([
                                {
                                    zuoWei: chuJuData.seatNum,
                                    huiYuan: chuJuData.shenfen,
                                    shenfen: GetImg.getByShenFen(chuJuData.shenfen)
                                }
                            ]);
                            Play.lierenBeiGongTou(chuJuData.seatNum, function () {
                                Event.clickButton.shoot(function () {
                                    if (CunZhang.isBeiQiangSha()) {
                                        //play('请村长移交工作');
                                        Play.yijiaogongzuo(function () {
                                            Event.clickButton.yiJiaoCunZhang(Flow.resetFlow);
                                        });
                                    } else  Flow.resetFlow();
                                });
                            });
                        } else if (CunZhang.isDead()) {
                            _next4(chuJuData, function () {
                                //play('请村长移交工作');
                                Play.yijiaogongzuo(function () {
                                    Event.clickButton.yiJiaoCunZhang(Flow.resetFlow);
                                });
                            });
                        } else {
                            _next4(chuJuData, Flow.resetFlow);
                        }
                    });
                });

            });
        }

        function _next4(chuJuData, cb) {
            //MyScreen.showText(chuJuData.seatNum + '号玩家被公投出局，身份为' + chuJuData.shenfen);
            MyScreen.showToupiao8([
                {
                    zuoWei: chuJuData.seatNum,
                    huiYuan: chuJuData.shenfen,
                    shenfen: GetImg.getByShenFen(chuJuData.shenfen)
                }
            ]);
            //play(chuJuData.seatNum + '号玩家被公投出局，身份为' + chuJuData.shenfen);
            Play.beigongtou(chuJuData.seatNum, chuJuData.shenfen, cb);
        }
    }
};

/**
 * 控制面板上的按钮事件处理
 * @type {{goToNextFlow: Function, start: Function, stop: Function, handler: Function}}
 */
var Control = {
    isPlayForTianLiang: false,
    goToNextFlow: function () {
        var self = this;
        var flowName = Flow.getFlowName();
        if (flowName === '狼人环节') {//狼人环节
            Play.playBgMusic();
            _At.atLangRenFlow();
        } else if (flowName === '女巫环节') {//女巫环节
            _At.atNvWuFlow();
        } else if (flowName === '猎人环节') {// 猎人环节
            _At.atLieRenFlow();
        } else if (flowName === '白痴环节') {// 白痴环节
            _At.atBaiChiFlow();
        } else if (flowName === '乌鸦环节') {// 乌鸦环节
            _At.atWuYaFlow();
        } else if (flowName === '预言家环节') { //预言家环节
            _At.atYuYanJiaFlow();
        } else if (flowName === '竞选村长环节') {//天亮了,竞选村长环节
            MyScreen.clear();
            window.setTimeout(function () {
                Play.liucheng('tianliangleqingdajiazhengyan', function () {
                    Play.pauseBgMusic();
                    self.isPlayForTianLiang = true;
                    _At.atJingXuanCunZhangFlow();
                });
            }, 1000);
        } else if (flowName === '投票环节') {// 投票环节
            if (self.isPlayForTianLiang) {
                Play.pauseBgMusic();
                _At.atTouPiaoFlow();
            } else {
                MyScreen.clear();
                window.setTimeout(function () {
                    Play.liucheng('tianliangleqingdajiazhengyan', function () {
                        Play.pauseBgMusic();
                        _At.atTouPiaoFlow();
                    });
                }, 1000);
            }
            self.isPlayForTianLiang = false;
        }
    },
    start: function (owner) {
        Example1.Timer.toggle();
        Flow.resetFlow();
        //play('本轮游戏即将开始,共' + Setting.getAndCheckPersonCount() + '人,' + Setting.getShenfenText() + '局,请在局玩家再次确认身份牌,抬头靠后坐,戴好面罩,场外作弊是最不能容忍的行为,另外请将手机静音');
        Play.kaitou(Setting.getAndCheckPersonCount(), function () {
            $(owner).text('结束');
            MyScreen.clear();
            window.__gaming = true;
            Toast.show('点击下一环节继续');
        });
    },
    stop: function (owner) {
        //Example1.Timer.toggle();
        //play('游戏结束,请大家离场.');//TODO 暂时没有mp3文件
        // TODO 这里要插入结束逻辑
        Dialog.showGameOverDialog();
        //$(owner).text('开始');
        //MyScreen.hide();
        //window.__gaming = false;
    },

    /**
     * 事件处理函数
     * this 不是Control
     */
    handler: function () {
        //　this 是按钮
        var btnText = $(this).text();
        if (btnText === '开始') {
            if (!Setting.getAndCheckPersonCount()) alert('请先进行座次登记');
            else Control.start(this);
        } else if (btnText === '结束') {
            Control.stop(this);
        } else if (btnText === '下一环节') {
            if (window.__gaming) Control.goToNextFlow();
            else Toast.show('游戏还没有开始，请先点击开始');
        } else if (btnText === '隐藏身份') {
            $('.my-badge').hide();
            $(this).text('显示身份');
        } else if (btnText === '显示身份') {
            $('.my-badge').show();
            $(this).text('隐藏身份');
        } else if (btnText === '语音播报') {
            Dialog.showAudioDialog();
        } else if (btnText === '下局占位') {
            //TODO
            alert('下局占位TODO');
        } else if (btnText === '打开大屏') {
            MyScreen.show();
        }
    }
};

