/**
 * Created by ThinkPad on 2016/1/19.
 */
"use strict";
/**
 * 事件处理
 * @type {{langRenEvent: Function, xxEvent: Function}}
 */
var Event = {
    identitty: {
        /**
         * 所有进行过座次登记的那些座位
         * @returns {*|jQuery|HTMLElement}
         */
        getSeatForLangRen: function () {
            return $('.grid-stack-item').filter(function () {
                return !!Data.getData(this, 'memberId');
            }).children().filter('div:nth-child(1)');
        },
        /**
         * 所有进行过座次登记的那些座位
         * @returns {*|jQuery|HTMLElement}
         */
        getSeatOfHavePeople: function () {
            return $('.grid-stack-item').filter(function () {
                return !!Data.getData(this, 'memberId') && Data.isNowDay(this);
            }).children().filter('div:nth-child(1)');
        },
        getSeatForCunZang: function () {
            return this.getSeatForLangRen();
        },
        // 获取女巫的可能位置(非狼人且没有被狼人杀)
        getSeatForNvWu: function () {
            return $('.grid-stack-item').filter(function () {
                return !!Data.getData(this, 'memberId') && Data.getData(this, 'shenfen') !== '狼人';
            }).children().filter('div:nth-child(1)');
        },
        //获取猎人的可能位置(非狼人女巫的会员位置)
        getSeatForLieRen: function () {
            return $('.grid-stack-item').filter(function () {
                return !!Data.getData(this, 'memberId') && Data.getData(this, 'shenfen') !== '狼人'
                    && Data.getData(this, 'shenfen') !== '女巫';
            }).children().filter('div:nth-child(1)');
        },
        //获取白痴的可能位置(非狼人，女巫，猎人的会员位置)
        getSeatForBaiChi: function () {
            return $('.grid-stack-item').filter(function () {
                return !!Data.getData(this, 'memberId') && Data.getData(this, 'shenfen') !== '狼人'
                    && Data.getData(this, 'shenfen') !== '女巫' && Data.getData(this, 'shenfen') !== '猎人';
            }).children().filter('div:nth-child(1)');
        },
        getSeatForWuYa: function () {
            return $('.grid-stack-item').filter(function () {
                return !!Data.getData(this, 'memberId') && Data.getData(this, 'shenfen') !== '狼人'
                    && Data.getData(this, 'shenfen') !== '女巫' && Data.getData(this, 'shenfen') !== '猎人'
                    && Data.getData(this, 'shenfen') !== '白痴';
            }).children().filter('div:nth-child(1)');
        },
        getSeatForYuYanJia: function () {
            return $('.grid-stack-item').filter(function () {
                return !!Data.getData(this, 'memberId') && Data.getData(this, 'shenfen') !== '狼人'
                    && Data.getData(this, 'shenfen') !== '女巫' && Data.getData(this, 'shenfen') !== '猎人'
                    && Data.getData(this, 'shenfen') !== '白痴' && Data.getData(this, 'shenfen') !== '乌鸦';
            }).children().filter('div:nth-child(1)');
        },
        langRenEvent: function (cb) {
            var self = this;

            /**
             * 确认狼人身份按钮事件
             */
            function showQueRenBtnHander() {
                $('#qrLangRenBtn').show().unbind('click').click(function () {
                    if (LangRen.getCount() === Setting.getLangRenCount()) {
                        $(this).hide();
                        Popover.eventPopover(self.getSeatForLangRen().unbind('click').parent());
                        cb();
                    } else {
                        Toast.show('请先设置好所有的狼人');
                    }
                });
            }

            $("#nexthuanjie").hide();
            //unbind  1:面板  2:防止重复
            self.getSeatForLangRen().parent().unbind('click').end().unbind("click").click(function (e) {
                $('#qrLangRenBtn').show();

                // todo 判断狼人人数
                var data = Data.getAllData($(this).parent());
                var shenfen = data.shenfen;
                var memberId = data.memberId;

                if (shenfen && shenfen === "狼人") { // 如果已经设置了则清理掉
                    LangRen.removeIdentity(this, memberId, showQueRenBtnHander);
                } else { // 否则添加
                    if (LangRen.getCount() < Setting.getLangRenCount()) {
                        // todo 重复点击进行切换
                        LangRen.addIdentity(this, memberId, showQueRenBtnHander)
                    } else {
                        Toast.show('设置的狼人身份多余本局应有狼人数量');
                    }
                }
            });
        },
        nvWuEvent: function (cb) {
            var self = this;

            /**
             * 确认女巫身份按钮事件
             */
            function showQueRenBtnHander() {
                $('#qrNvWuBtn').show().unbind('click').show().click(function () {
                    if (NvWu.getCount() < 1) {
                        Toast.show('请先设置好女巫身份');
                    } else {
                        Popover.eventPopover(self.getSeatForNvWu().unbind('click').parent());
                        $(this).hide();
                        cb();
                    }
                });
            }

            $("#nexthuanjie").hide();
            self.getSeatForNvWu().parent().unbind('click').end().unbind('click').click(function (e) {

                var data = Data.getAllData($(this).parent());
                var shenfen = data.shenfen;
                var memberId = data.memberId;

                // TODO 重复点击进行切换
                if (shenfen && shenfen === "女巫") { // 如果已经设置了则清理掉
                    NvWu.removeIdentity(this, memberId, showQueRenBtnHander);
                } else { // 否则添加
                    if (NvWu.getCount() > 1) {//限定女巫最多只有一个
                        Toast.show('设置的女巫身份多余本局应有女巫数量');
                    } else {
                        NvWu.addIdentity(this, memberId, showQueRenBtnHander);
                    }
                }
            });
        },
        lieRenEvent: function (cb) {
            var self = this;

            /**
             * 确认猎人身份按钮事件
             */
            function showQueRenBtnHander() {
                $('#qrLieRenBtn').show().unbind('click').click(function () {
                    if (LieRen.getCount() < 1) {
                        Toast.show('请先设置好猎人身份');
                    } else {
                        Popover.eventPopover(self.getSeatForLieRen().unbind('click').parent());
                        $(this).hide();
                        cb();
                    }
                });
            }

            $("#nexthuanjie").hide();
            self.getSeatForLieRen().parent().unbind('click').end().unbind('click').click(function (e) {
                var data = Data.getAllData($(this).parent());
                var shenfen = data.shenfen;
                var memberId = data.memberId;

                // TODO 重复点击进行切换
                if (shenfen && shenfen === "猎人") { // 如果已经设置了则清理掉
                    LieRen.removeIdentity(this, memberId, showQueRenBtnHander);
                } else { // 否则添加
                    if (LieRen.getCount() > 1) {//限定猎人最多只有一个
                        Toast.show('设置的猎人身份多余本局应有猎人数量');
                    } else {
                        LieRen.addIdentity(this, memberId, showQueRenBtnHander);
                    }
                }
            });
        },
        baiChiEvent: function (cb) {
            var self = this;

            /**
             * 确认白痴身份按钮事件
             */
            function showQueRenBtnHander() {
                $('#qrBaiChiBtn').show().unbind('click').click(function () {
                    if (BaiChi.getCount() < 1) {
                        Toast.show('请先设置好白痴身份');
                    } else {
                        Popover.eventPopover(self.getSeatForBaiChi().unbind('click').parent());
                        $(this).hide();
                        cb();
                    }
                });
            }

            $("#nexthuanjie").hide();
            self.getSeatForBaiChi().parent().unbind('click').end().unbind('click').click(function (e) {
                var data = Data.getAllData($(this).parent());
                var shenfen = data.shenfen;
                var memberId = data.memberId;

                // TODO 重复点击进行切换
                if (shenfen && shenfen === "白痴") { // 如果已经设置了则清理掉
                    BaiChi.removeIdentity(this, memberId, showQueRenBtnHander);
                } else { // 否则添加
                    if (BaiChi.getCount() > 1) {//限定白痴最多只有一个
                        Toast.show('设置的白痴身份多余本局应有白痴数量');
                    } else {
                        BaiChi.addIdentity(this, memberId, showQueRenBtnHander);
                    }
                }
            });
        },
        wuYaEvent: function (cb) {
            var self = this;

            /**
             * 确认乌鸦身份按钮事件
             */
            function showQueRenBtnHander() {
                $('#qrWuYaBtn').show().unbind('click').click(function () {
                    if (WuYa.getCount() < 1) {
                        Toast.show('请先设置好乌鸦身份');
                    } else {
                        Popover.eventPopover(self.getSeatForWuYa().unbind('click').parent());
                        $(this).hide();
                        cb();
                    }
                });
            }

            $("#nexthuanjie").hide();
            self.getSeatForWuYa().parent().unbind('click').end().unbind('click').click(function (e) {
                var data = Data.getAllData($(this).parent());
                var shenfen = data.shenfen;
                var memberId = data.memberId;

                if (shenfen && shenfen === "乌鸦") { // 如果已经设置了则清理掉
                    WuYa.removeIdentity(this, memberId, showQueRenBtnHander);
                } else { // 否则添加
                    if (WuYa.getCount() > 1) {//限定白痴最多只有一个
                        Toast.show('设置的乌鸦身份多余本局应有乌鸦数量');
                    } else {
                        WuYa.addIdentity(this, memberId, showQueRenBtnHander);
                    }
                }
            });
        },
        yuYanJiaEvent: function (cb) {
            var self = this;

            /**
             * 确认预言家身份按钮事件
             */
            function showQueRenBtnHander() {
                $('#qrYuYanJiaBtn').show().unbind('click').click(function () {
                    if (YuYanJia.getCount() < 1) {
                        Toast.show('请先设置好预言家身份');
                    } else {
                        Popover.eventPopover(self.getSeatForYuYanJia().unbind('click').parent());
                        $(this).hide();
                        cb();
                    }
                });
            }

            $("#nexthuanjie").hide();
            self.getSeatForYuYanJia().parent().unbind('click').end().unbind('click').click(function (e) {
                var data = Data.getAllData($(this).parent());
                var shenfen = data.shenfen;
                var memberId = data.memberId;

                if (shenfen && shenfen === "预言家") { // 如果已经设置了则清理掉
                    YuYanJia.removeIdentity(this, memberId, showQueRenBtnHander);
                } else { // 否则添加
                    if (YuYanJia.getCount() > 1) {//限定白痴最多只有一个
                        Toast.show('最多只能有一个预言家');
                    } else {
                        YuYanJia.addIdentity(this, memberId, showQueRenBtnHander);
                    }
                }
            });
        },
        cunZhangEvent: function (cb) {
            var self = this;

            $('#meiYouXuanChuCunZhang').show().unbind('click').click(function () {
                if (CunZhang.getCount() > 0) {
                    Toast.show('请先去掉村长身份');
                } else {
                    Popover.eventPopover(self.getSeatForCunZang().unbind('click').parent());
                    $('#qrCunZhangBtn,#meiYouXuanChuCunZhang').hide();
                    cb(true);
                }
            });

            /**
             * 确认村长按钮事件
             */
            function showQueRenBtnHander() {
                $('#qrCunZhangBtn').show().unbind('click').click(function () {
                    if (CunZhang.getCount() < 1) {
                        Toast.show('请先设置好村长身份');
                    } else {
                        Popover.eventPopover(self.getSeatForCunZang().unbind('click').parent());
                        $('#qrCunZhangBtn,#meiYouXuanChuCunZhang').hide();
                        cb();
                    }
                });
            }

            $("#nexthuanjie").hide();
            self.getSeatForCunZang().parent().unbind('click').end().unbind('click').click(function (e) {
                var data = Data.getAllData($(this).parent());
                var cunzhang = data.cunzhang;
                var memberId = data.memberId;

                if (cunzhang && cunzhang === "村长") { // 如果已经设置了则清理掉
                    CunZhang.removeIdentity(this, memberId, showQueRenBtnHander);
                } else { // 否则添加
                    if (CunZhang.getCount() > 1) {//限定最多只有一个
                        Toast.show('最多只能有一个村长');
                    } else {
                        CunZhang.addIdentity(this, memberId, showQueRenBtnHander);
                    }
                }
            });
        }
    },
    goToDo: {
        /**
         * 所有进行过座次登记的并且狼人可以杀的那些座位
         * @returns {*|jQuery|HTMLElement}
         */
        getSeatForLangRenCanKill: function () {
            return $('.grid-stack-item').filter(function () {
                return !!Data.getData(this, 'memberId') && (Data.status.getStatus(this) === 0 || Data.status.getStatus(this) === 1) /*&& Data.getData(this, 'shenfen') != '狼人'*/;
            }).children().filter('div:nth-child(1)');
        },
        getSeatForWuYaCanBiaoJi: function () {
            return $('.grid-stack-item').filter(function () {
                return !!Data.getData(this, 'memberId') /*&& Data.getData(this, 'shenfen') != '预言家'*/;
            }).children().filter('div:nth-child(1)');
        },
        getSeatFornvWuCanJiu: function () {
            return $('.grid-stack-item').filter(function () {
                return !!Data.getData(this, 'memberId') && Data.status.getStatus(this) === 4 && Data.isNowDay(this);
            }).children().filter('div:nth-child(1)');
        },
        // 获取女巫可以kill的座位
        getSeatFornvWuCanDu: function () {
            return $('.grid-stack-item').filter(function () {
                return !!Data.getData(this, 'memberId') && Data.getData(this, 'shenfen') !== '女巫';
            }).children().filter('div:nth-child(1)');
        },
        langRenKillEvent: function (cb) {
            var self = this;

            /**
             * 确认狼人杀人按钮事件
             */
            function showQueRenBtnHander(context) {
                $("#qrBeiShaBtn").show().unbind('click').click(function () {
                    //执行狼人杀人
                    LangRen.kill(context);
                    Popover.eventPopover(self.getSeatForLangRenCanKill().unbind('click').parent());
                    $(this).hide();
                    cb();
                });
            }

            $("#nexthuanjie").hide();
            self.getSeatForLangRenCanKill().parent().unbind('click').end().click(function (e) {
                var context = $(this).parent();
                var data = Data.getAllData(context);
                var memberName = data.memberName;
                var seatNum = $(this).children().first().text();
                // TODO 点击要杀的人的座位应该有个颜色的区分
                //MyScreen.showText("狼人要杀" + memberId + "玩家？");
                MyScreen.showLangren([
                    {
                        touXiang: data.headImg,
                        zuoWei: seatNum,
                        huiYuan: memberName
                    }
                ]);
                showQueRenBtnHander(this);
            });
        },
        wuYaBiaoJiEvent: function (cb) {
            var self = this;

            /**
             * 确认乌鸦标记按钮事件
             */
            function showQueRenBtnHander(context) {
                $("#qrBiaoJiBtn").show().unbind('click').click(function () {
                    $(this).hide();
                    Popover.eventPopover(self.getSeatForWuYaCanBiaoJi().unbind('click').parent());
                    //执行乌鸦标记
                    WuYa.biaoJi(context);
                    cb();
                    //Play.beiwuyabiaoji(Data.getData(context, 'seatNum'), cb);
                });
            }

            $("#nexthuanjie").hide();
            self.getSeatForWuYaCanBiaoJi().parent().unbind('click').end().click(function (e) {
                // 防止高频点击，导致数据没有返回，再去出现脏数据的问题
                //if (!self._time)self._time = new Date().getTime();
                //if (new Date().getTime() - self._time <= 2000)return;
                //self._time = new Date().getTime();
                var data = Data.getAllData($(this).parent());
                MyScreen.showLangren([
                    {
                        touXiang: data.headImg,//'/pictures/uesrimg.png',
                        zuoWei: data.seatNum,
                        huiYuan: data.memberName
                    }
                ]);
                //MyScreen.showText("请确认要标记" + memberId + "玩家？");
                showQueRenBtnHander(this);
            });
        },
        yuYanJiaYanRenEvent: function (cb) {
            var self = this;

            /**
             * 确认预言家验人按钮事件
             */
            function showQueRenBtnHander(context) {
                $("#qrChaKanShenFenBtn").show().unbind('click').click(function () {
                    //执行预言家验人 TODO ??
                    $(this).hide();
                    YuYanJia.yanRen($(context).parent());
                    Popover.eventPopover(self.getSeatForWuYaCanBiaoJi().unbind('click').parent());
                    cb();
                });
            }

            $("#nexthuanjie").hide();
            self.getSeatForWuYaCanBiaoJi().parent().unbind('click').end().click(function (e) {
                var data = Data.getAllData($(this).parent());
                MyScreen.showLangren([
                    {
                        touXiang: data.headImg,//'/pictures/uesrimg.png',
                        zuoWei: data.seatNum,
                        huiYuan: data.memberName
                    }
                ]);
                //MyScreen.showText("请确认要查看" + memberId + "玩家的身份信息？");
                showQueRenBtnHander(this);
            });
        },
        nvWuChoiceEvent: function (kill, cb) {
            var self = this;

            /**
             * 确认女巫救或杀按钮事件
             */
            function showQueRenBtnHander(context) {
                if (kill) {
                    $('#qrDuSiBtn').show().unbind('click').click(function () {
                        //执行女巫杀人
                        NvWu.kill(context);
                        Popover.eventPopover(self.getSeatFornvWuCanDu().unbind('click').parent());
                        //play("咔咔");
                        $('#qrDuSiBtn').hide();
                        cb();
                    });
                } else {
                    $('#qrJiuHuoBtn').show().unbind('click').click(function () {
                        NvWu.jiuHuo(context);
                        Popover.eventPopover(self.getSeatFornvWuCanDu().unbind('click').parent());
                        $(this).hide();
                        cb();
                    });
                }
            }

            $("#nexthuanjie").hide();
            if (kill) {
                self.getSeatFornvWuCanDu().parent().unbind('click').end().unbind('click').click(function (e) {
                    // 防止高频点击，导致数据没有返回，再去出现脏数据的问题
                    //if (!self._time)self._time = new Date().getTime();
                    //if (new Date().getTime() - self._time <= 2000)return;
                    //self._time = new Date().getTime();
                    var data = Data.getAllData($(this).parent());
                    MyScreen.showNvwu3([
                        {
                            touXiang: data.headImg,//'/pictures/uesrimg.png',
                            zuoWei: data.seatNum,
                            huiYuan: data.memberName
                        }
                    ]);
                    //MyScreen.showText("女巫要毒杀" + memberId + "玩家？");
                    showQueRenBtnHander(this);
                });
            } else {
                self.getSeatFornvWuCanJiu().parent().unbind('click').end().unbind('click').click(function (e) {
                    // 防止高频点击，导致数据没有返回，再去出现脏数据的问题
                    //if (!self._time)self._time = new Date().getTime();
                    //if (new Date().getTime() - self._time <= 2000)return;
                    //self._time = new Date().getTime();
                    var data = Data.getAllData($(this).parent());
                    MyScreen.showNvwu2([
                        {
                            touXiang: data.headImg,//'/pictures/uesrimg.png',
                            zuoWei: data.seatNum,
                            huiYuan: data.memberName
                        }
                    ]);
                    //MyScreen.showText("女巫要救活" + memberId + "玩家？");
                    showQueRenBtnHander(this);
                });
            }
        },
        kaiQiangEvent: function (cb) {

            /**
             * 确认猎人开枪杀死某人的按钮
             */
            function showQueRenBtnHander(context) {
                $('#qrShootBtn').show().unbind('click').click(function () {
                    //执行猎人开枪杀人
                    LieRen.kill(context);
                    $(this).hide();
                    var data = Data.getAllData($(context).parent());
                    //data.seatNum
                    //data.shenfen
                    //data.memberName
                    //play("砰");
                    data._qiangSha = '枪';
                    //play(data.seatNum + '号玩家被猎人开枪杀害，身份为' + data.shenfen);
                    MyScreen.showYuyanjia2([
                        {
                            touXiang: data.headImg,//'/pictures/uesrimg.png',
                            zuoWei: data.seatNum,
                            huiYuan: data.memberName,
                            shenFen: GetImg.getByShenFen(data.shenfen)
                        }
                    ]);
                    //MyScreen.showText("（头像、座位、会员名），已经被枪杀");
                    Popover.eventPopover(Event.identitty.getSeatForLangRen().unbind('click').parent());
                    Play.kaiqiangshahai(data.seatNum, data.shenfen, cb);
                });
            }

            $("#nexthuanjie").hide();
            Event.identitty.getSeatForLangRen().parent().unbind('click').end().unbind('click').click(function (e) {
                var data = Data.getAllData($(this).parent());
                MyScreen.showLangren([
                    {
                        touXiang: data.headImg,//'/pictures/uesrimg.png',
                        zuoWei: data.seatNum,
                        huiYuan: data.memberName
                    }
                ]);

                //MyScreen.showText("（头像、座位、会员名）" + memberId + "，确认被枪杀？");
                showQueRenBtnHander(this);
            });
        }
    },
    clickButton: {
        nvWuChoice: function (cb) {
            //救人
            $("#nvwujiu").unbind('click').click(function () {
                //监听座位
                Toast.show('请裁判标记女巫用药救活之人');
                Event.goToDo.nvWuChoiceEvent(false, function () {
                    cb();
                });
            });
            //毒人
            $("#nvwudu").unbind('click').click(function () {
                //监听座位
                Toast.show('请裁判标记女巫用药毒杀之人');
                Event.goToDo.nvWuChoiceEvent(true, function () {
                    cb();
                });
            });
            //不操作
            $("#nvwunouse").unbind('click').click(function () {
                cb();
            });
        },
        shoot: function (cb) {
            $('#shoot').show();
            //开枪
            $('#kaiQiang').unbind('click').click(function () {
                Toast.show('请裁判点击猎人要杀的人的座位');
                Event.goToDo.kaiQiangEvent(function () {
                    $('#shoot').hide();
                    cb();
                });
            });
            //不开枪
            $('#buKaiQiang').unbind('click').click(function () {
                $('#shoot').hide();
                cb();
            });
        },
        yiJiaoCunZhang: function (callback) {
            var cb = function () { // aop
                Popover.eventPopover(Event.identitty.getSeatForCunZang().unbind('click').parent());
                $('#buYiJiaoCunZhangBtn').hide();
                $('#qrCunZhangBtn').hide();
                callback();
            };
            //不移交村长则直接往下执行
            /*function () {
             // FIXME 需要判断村长的数量
             //if (CunZhang.getCount() > 0) {
             //    Toast.show('请裁判先去掉刚刚设置的村长');
             //} else {
             cb();
             //}
             }*/
            $('#buYiJiaoCunZhangBtn').show().unbind('click').click(function () {
                CunZhang.buYiJiaoNever();
                cb();
            });

            var seatNum = 1;

            /**
             * 确认村长按钮事件
             */
            function showQueRenBtnHander(context) {
                $('#qrCunZhangBtn').show().unbind('click').click(function () {
                    if (CunZhang.getCount() < 2) {// FIXME 老村长，新村长，加起来至少有两个吧！
                        Toast.show('请先设置好村长身份');
                    } else {
                        Data.saveAndUpdateData(context, 'yaoyijiao', false);
                        $(this).hide();
                        Play.dangXuanCunZhang(seatNum, cb);
                    }
                });
            }

            Toast.show('请裁判根据老村长的手势，点击新村张的座位号');
            Event.identitty.getSeatForCunZang().parent().unbind('click').end().unbind('click').click(function (e) {
                //$('#yiJiaoCunZhangBtn').show().unbind('click').click(function () {
                var data = Data.getAllData($(this).parent());
                var cunzhang = data.cunzhang;
                var memberId = data.memberId;
                seatNum = data.seatNum;

                // FIXME 这个设置新村长的逻辑判断有待完善
                if (cunzhang && cunzhang === "村长" /*&& (status === 0 || status == 1)*/) {
                    CunZhang.removeIdentity(this, memberId, /*seatNum,*/ showQueRenBtnHander);
                } else { // 否则添加
                    CunZhang.addIdentity(this, memberId, /*seatNum,*/ showQueRenBtnHander);
                }
            });
        },
        chuJu: function (cb) {

            /**
             * 确认出局按钮事件
             */
            function showQueRenBtnHander(ownerBtn, context) {
                $('#qrChuJuBtn').show().unbind('click').click(function () {
                    //if (ShenFen.getWillChuJuCount() === 1) {
                    $(ownerBtn).hide();
                    $('#qrChuJuBtn').hide();
                    Data.deleData(context, '_chuju');//清理，已防止多天后出局人数不对的情况
                    var shenfen = Data.getData(context, 'shenfen');
                    if (shenfen !== '白痴') {// 白痴不出局
                        Data.status.setStatus(context, 2);//出局
                    } else {
                        Data.saveAndUpdateData(context, 'baichiChuju', 1);
                        Data.saveAndUpdateData(context, 'dieDay', Setting.getNowDay());
                    }
                    Popover.eventPopover(Event.identitty.getSeatForLangRen().unbind('click').parent());
                    cb();
                    //} else {
                    //    Toast.show("出局人数不对");
                    //}
                });
            }

            //unbind  1:面板  2:防止重复
            Event.identitty.getSeatForLangRen().parent().unbind('click').end().unbind("click").click(function (e) {
                var context = $(this).parent();
                var data = Data.getAllData(context);

                if (data._chuju === '出') { // 如果已经设置了则清理掉
                    ShenFen.noChuJu(this, function () {
                        data._chuju = '不出';
                        Data.saveAndUpdateData(context, 'dieDay', Data.getData(context, 'dieDay') || -1);
                        showQueRenBtnHander(this, context);
                    });
                } else { // 否则添加
                    ShenFen.chuJu(this, function () {
                        data._chuju = '出';
                        Data.saveAndUpdateData(context, 'dieDay', Setting.getNowDay());
                        showQueRenBtnHander(this, context);
                    });
                }
            });
        }
    },

    say: {
        sayYiQuan: function (cb) {
            $('#sayBtn').show();
            var iter = null;

            $('#startFaYan').click(function () {
                $(this).attr('disabled', 'disabled');
                $('#stopFaYan').removeAttr('disabled');
                var djs = $('#daoJiShi');
                var i = 80;
                iter = setInterval(function () {
                    if (parseInt(djs.text()) > 0) djs.text(--i);
                    if (i === 3) Play.dangDangDang(); // 第75秒后播放倒计时音效
                }, 1000);
            });

            $('#stopFaYan').click(function () {
                $(this).attr('disabled', 'disabled');
                if (iter)clearInterval(iter);
                $('#daoJiShi').text(80);
                $('#startFaYan').removeAttr('disabled');
            });

            $('#touPiao').click(function () {
                $('#sayBtn').hide();
                cb();
            });
        }
    }
    // other event
};