/**
 * Created by fy on 16-1-8.
 */
'use strict';

var ShenFen = {

    qingSuan: function () {
        $('.grid-stack-item').each(function () {
            var data = Data.getAllData(this);
            if (data.memberCode) { //没有登记的不要进行标记
                if (!data.shenfen /*&& data.cunzhang != '村长'*/) { //村长跟身份没有半毛钱关系
                    data.shenfen = '平民';
                    $(this).children().first().append('<span class="my-badge"><img src="pictures/shenfen/pingmin.jpg" style="width:18px;"/></span>');
                }
            }
        });
    },
    getChuJuData: function () {
        var tempData = null;
        $('.grid-stack-item').each(function () {
            var data = Data.getAllData(this);
            var status = Data.status.getStatus(this);
            var isRegister = !!data.memberCode; // 已经座次登记
            var isChuJU = status === 2;// 已经出局
            var isDangTian = Data.isNowDay(this);
            if (isChuJU && isRegister && isDangTian) tempData = data;
            if (data.baichiChuju === 1 && isRegister && isDangTian) tempData = data;// 仅仅为了播报语音和显示大屏
        });
        return tempData;
    },
    /**
     * @deprecated 这个计算不准
     * @returns {*|jQuery}
     */
    getWillChuJuCount: function () {
        return $('.grid-stack-item').filter(function () {
            var isRegister = !!Data.getData(this, 'memberCode'); // 已经座次登记
            var isChuJU = Data.getData(this, '_chuju') === '出';// 已经出局
            var isDangTian = Data.isNowDay(this);
            return (isChuJU && isRegister && isDangTian);
        }).size();
    },
    chuJu: function (ele, cb) {
        $(ele).find('.my-badge').last().after('<div class="my-badge-si">出</div>').parent();
        //Popover.addForPersonPanel(x, 'shenfen', shenfen);
        cb();
    },
    noChuJu: function (ele, cb) {
        $(ele).find('.my-badge-si').filter(':contains("出")').remove().end().end();
        //Popover.removePersonPanel(x, 'shenfen');
        cb();
    },
    getDeadPerson: function () {
        return $('.grid-stack-item').filter(function () {
            var status = Data.status.getStatus(this);
            var isRegister = !!Data.getData(this, 'memberCode'); // 已经座次登记
            var isDead = !(status === 0 || status === 1);// 已经死了
            return isDead && isRegister && Data.isNowDay(this);
            //return _.filter(status, function (num) {
            //        return parseInt(num) > 1; // 状态大于1的为死了
            //    }).length > 0;
        });
    },
    getLiveSeatNum: function () {
        var seatNumList = $('.grid-stack-item').filter(function () {
            var status = Data.status.getStatus(this);
            var isRegister = !!Data.getData(this, 'memberCode'); // 已经座次登记
            var isLive = (status === 0 || status === 1);// 活着的
            return isLive && isRegister;
        }).map(function () {
            return parseInt(Data.getData(this, 'seatNum'));
        }).get();
        return _.sortBy(seatNumList);
    },
    getDeadSeatNum: function () {
        return $('.grid-stack-item').filter(function () {
            var status = Data.status.getStatus(this);
            var isRegister = !!Data.getData(this, 'memberCode'); // 已经座次登记
            var isNowDay = Data.getData(this, 'dieDay') === Setting.getNowDay();
            var allStatus = Data.status.getAllStatus(this);
            var isDead = Data.status.isHaveStatus(allStatus, 4) && status !== 2;// 已经死了
            return isDead && isRegister && isNowDay;
        }).map(function () {
            return parseInt(Data.getData(this, 'seatNum'));
        }).get();
    },
    /**
     * 所有进行过座次登记的那些座位
     * @returns {*|jQuery|HTMLElement}
     */
    getSeatOfHavePeople: function () {

    },
    /**
     * 非平安夜
     */
    hasDeadPerson: function () {
        var size = this.getDeadPerson().size();
        return !!size;
    },

    /**
     * 获取死掉的人对应的身份
     * @returns {*|jQuery}
     */
    getDeadFlowNames: function () {
        return this.getDeadPerson().map(function () {
            return Data.getData(this, 'shenfen');
        }).get();
    },
    hasLivePerson: function () {
        var size = $('.grid-stack-item').filter(function () {
            var status = Data.status.getStatus(this);
            return status === 0 || status === 1;
        }).size();
        return !!size;
    }
};

/**
 * 检查村长是否存在
 * @returns {number}　４：则村长不存在，３：存在
 */
function checkCunZhangExits() {
    var cunzhangSize = $('.grid-stack-item').filter(function () {
        return Data.getData(this, 'shenfen') === '村长' && Data.status.getStatus(this) === 0;
    }).size();
    return cunzhangSize ? 3 : 4;
}


/**
 * 获取某个身份的数量
 * @param shenFen
 * @returns {*|jQuery}
 */
function _getShenFenCount(shenFen) {
    return $('.grid-stack-item').filter(function () {
        return Data.getData(this, 'shenfen') === shenFen;
    }).size();
}

/**
 *  删除身份的方法
 * @param ele
 * @param memberId
 * @param cb
 * @private
 */
function _removeIdentity(ele, memberId, cb) {
    //Http.updateIdentity({
    //    roomId: roomId,
    //    memberId: memberId,
    //    identity: null
    //}, function (result) {
    //    if (result && result.status) {// 更新数据库成功
    var x = $(ele).find('.my-badge').remove().end().parent();
    Popover.removePersonPanel(x, 'shenfen');
    cb();
    //}
    //});
}

/**
 * 判断用户是否已经注册了
 * @param context
 * @returns {boolean}
 */
function checkIsRegister(context) {
    var memberCode = Data.getData(context.parent(), 'memberCode');
    if (!memberCode) {
        Toast.show('您还没有进行座次登记');
    }
    return !!memberCode;
}

/**
 * 女巫逻辑处理对象
 * @type {{getNvWuDom: Function, isAtNextFlow: Function, kill: Function, jiuHuo: Function}}
 */
var NvWu = {
    /**
     * 返回活着的女巫ｄｏｍ
     * @returns {*|jQuery}
     */
    getNvWuDom: function () {
        if (this.nvDom)return this.nvDom;
        this.nvDom = $('.grid-stack-item').filter(function () {
            return Data.getData(this, 'shenfen') === '女巫' /*&& Data.status.getStatus(this) === 0*/;
        });
        return this.nvDom;
    },
    /**
     * 获取女巫是否活着有没有设置确认身份都可以
     * @returns {boolean}
     */
    isLive: function () {
        return $('.grid-stack-item').filter(function () {
                return Data.getData(this, 'shenfen') === '女巫' && Data.status.getStatus(this) === 0;
            }).size() === 1;
    },
    haveYao: function () {
        var nvWuDom = this.getNvWuDom();
        var jiuhuoCount = Data.getData(nvWuDom, 'jiuhuoCount');
        var shasiCount = Data.getData(nvWuDom, 'shasiCount');
        return !(jiuhuoCount === 0 && shasiCount === 0);
    },
    haveJiuRenYao: function () {
        var nvWuDom = this.getNvWuDom();
        var jiuhuoCount = Data.getData(nvWuDom, 'jiuhuoCount');
        return jiuhuoCount !== 0;
    },
    haveDuYao: function () {
        var nvWuDom = this.getNvWuDom();
        var shasiCount = Data.getData(nvWuDom, 'shasiCount');
        return shasiCount !== 0;
    },
    showButton: function () {
        if (this.haveJiuRenYao()) {
            $("#nvwujiu").show();
        } else {
            $("#nvwujiu").hide();
        }
        if (this.haveDuYao() && ShenFen.hasLivePerson()) {
            $("#nvwudu").show();
        } else {
            $("#nvwudu").hide();
        }
        $("#nvwubtn").show();
    },
    hideButton: function () {
        $("#nvwubtn").hide();
    },
    isAtNextFlow: function () {
        var nvWuDom = this.getNvWuDom();
        var shasiCount = Data.getData(nvWuDom, 'shasiCount');
        var jiuHuoCount = Data.getData(nvWuDom, 'jiuhuoCount');
        if (!jiuHuoCount) {
            //TODO 理应移除救活菜单
        }
        if (!shasiCount && !jiuHuoCount) {//药用完了
            Flow.jumpFlow();//下个流程跳过女巫环节
        }
    },
    kill: function (context) {
        var nvWuDom = this.getNvWuDom();
        var shasiCount = Data.getData(nvWuDom, 'shasiCount') || 1;
        if (shasiCount) {
            //TODO 声音特效
            var ele1 = $(context).find('.my-badge-si').remove().end().append('<div class="my-badge-si">死</div>').parent();
            //Data.saveAndUpdateData(context, 'status', 6);
            Data.status.setStatus(ele1, 6);
            if (nvWuDom) Popover.addForPersonPanel(nvWuDom, 'shasiCount', 0);
            //checkIsGameOver();
        } else {
            this.isAtNextFlow();
        }
    },
    jiuHuo: function (context) {
        if (Flow.getFlowIndex() == 1) { //在女巫环节，才可以救活人/杀人
            var nvWuDom = this.getNvWuDom();
            var jiuHuoCount = Data.getData(nvWuDom, 'jiuhuoCount') || 1;
            if (jiuHuoCount) {
                var ele1 = $(context).find('.my-badge-si').remove().end().parent();
                //Data.saveAndUpdateData(ele1, 'status', 1);
                Data.status.setStatus(ele1, 1);
                Popover.addForPersonPanel(nvWuDom, 'jiuhuoCount', 0);
                //MyScreen.showUserInfo(ele1);
            } else {
                this.isAtNextFlow();
            }
        } else { // 一般不会执行到这里,就会跳过了.
            Toast.show('只有女巫可以救活别人,女巫已死或，不在女巫环节');
        }
    },
    getCount: function () {
        return _getShenFenCount('女巫');
    },
    addIdentity: function (ele, memberId, cb) {
        //Http.updateIdentity({
//    roomId: roomId,
//    memberId: memberId,
//    identity: shenfen
//}, function (result) {
//    if (result && result.status) {// 更新数据库成功
        var x = $(ele).find('.my-badge').remove().end().append('<span class="my-badge"><img src="pictures/shenfen/nvwu.jpg"/></span>').parent();
        Popover.addForPersonPanel(x, 'shenfen', '女巫');
        cb();
//}
//});
    },
    removeIdentity: function (ele, memberId, cb) {
        _removeIdentity(ele, memberId, cb);
    }

};

/**
 * 狼人逻辑处理对象
 * @type {{kill: Function}}
 */
var LangRen = {
    kill: function (context) {
        //TODO 声音特效
        var ele1 = $(context).find('.my-badge-si').remove().end().append('<div class="my-badge-si">死</div>').parent();
        //Data.saveAndUpdateData(context, 'status', 4);
        Data.status.setStatus(ele1, 4);
        //MyScreen.showUserInfo(ele1);
        //checkIsGameOver();
    },
    getCount: function () {
        return _getShenFenCount('狼人');
    },
    addIdentity: function (ele, memberId, cb) {
        //Http.updateIdentity({
//    roomId: roomId,
//    memberId: memberId,
//    identity: shenfen
//}, function (result) {
//    if (result && result.status) {// 更新数据库成功
        var x = $(ele).find('.my-badge').remove().end().append('<span class="my-badge"><img src="pictures/shenfen/langren.jpg"/></span>').parent();
        Popover.addForPersonPanel(x, 'shenfen', '狼人');
        cb();
//}
//});
    },
    removeIdentity: function (ele, memberId, cb) {
        _removeIdentity(ele, memberId, cb);
    }
};
/**
 * 猎人逻辑处理对象
 * @type {{kill: Function}}
 */
var LieRen = {
    kill: function (context) {
        var ele1 = $(context).find('.my-badge-si').remove().end().append('<div class="my-badge-si">死</div>').parent();
        //Data.saveAndUpdateData(context, 'status', 4);
        Data.status.setStatus(ele1, 7);
        MyScreen.showUserInfo(ele1);
        //checkIsGameOver();
    },
    /*shoot: function (context) {
     //TODO 声音特效
     var ele1 = $(context).find('.my-badge-si').remove().end().append('<div class="my-badge-si">死</div>').parent();
     //Data.saveAndUpdateData(context, 'status', 4);
     Data.status.setStatus(context, 7);
     MyScreen.showUserInfo(context);
     //checkIsGameOver();
     },*/
    getCount: function () {
        return _getShenFenCount('猎人');
    },
    addIdentity: function (ele, memberId, cb) {
        //Http.updateIdentity({
//    roomId: roomId,
//    memberId: memberId,
//    identity: shenfen
//}, function (result) {
//    if (result && result.status) {// 更新数据库成功
        var x = $(ele).find('.my-badge').remove().end().append('<span class="my-badge"><img src="pictures/shenfen/lieren.jpg"/></span>').parent();
        Popover.addForPersonPanel(x, 'shenfen', '猎人');
        cb();
//}
//});
    },
    removeIdentity: function (ele, memberId, cb) {
        _removeIdentity(ele, memberId, cb);
    },
    isDeadAndNotDuSi: function () {
        var temData = null; //相当于false
        ShenFen.getDeadPerson().each(function () {
            var context = $(this);//修改$(this).parent()->$(this)
            var data = Data.getAllData(context);
            var status = Data.status.getStatus(context);
            // 被杀之人是猎人并排除被毒杀的情况
            if (data.shenfen === '猎人' && status !== 6) {
                temData = data;
            }
        });
        return temData;
    }
};

/**
 * 白痴逻辑处理对象
 * @type {{kill: Function}}
 */
var BaiChi = {
    kill: function (context) {
        //TODO 声音特效
        var ele1 = $(context).find('.my-badge-si').remove().end().append('<div class="my-badge-si">死</div>').parent();
        //Data.saveAndUpdateData(context, 'status', 4);
        Data.status.setStatus(context, 7);
        MyScreen.showUserInfo(context);
        //checkIsGameOver();
    },
    getCount: function () {
        return _getShenFenCount('白痴');
    },
    addIdentity: function (ele, memberId, cb) {
        //Http.updateIdentity({
//    roomId: roomId,
//    memberId: memberId,
//    identity: shenfen
//}, function (result) {
//    if (result && result.status) {// 更新数据库成功
        var x = $(ele).find('.my-badge').remove().end().append('<span class="my-badge"><img src="pictures/shenfen/baichi.jpg"/></span>').parent();
        Popover.addForPersonPanel(x, 'shenfen', '白痴');
        cb();
//}
//});
    },
    removeIdentity: function (ele, memberId, cb) {
        _removeIdentity(ele, memberId, cb);
    }
};

/**
 * 乌鸦逻辑处理对象
 * @type {{biaoJi: Function}}
 */
var WuYa = {
    clearBiaoJi: function () {
        $('.grid-stack-item').each(function () {
            $(this).children().children('span').filter(':contains("标")').remove();
            Data.deleData(this, 'wuyaFlag');
        });
    },
    biaoJi: function (context) {
        $(context).append('<span class="my-badge">标</span>');
        Data.saveAndUpdateData($(context).parent(), 'wuyaFlag', 1);
        Data.saveAndUpdateData($(context).parent(), 'biaoJiDay', Setting.getNowDay());
        //MyScreen.showUserInfo(context);
    },
    getSeatNumForBiaoJi: function () {
        var seatNum = null;
        $('.grid-stack-item').each(function () {
            var data = Data.getAllData(this);
            if (data.wuyaFlag === 1 /*&& data.biaoJiDay === Setting.getNowDay()*/) {
                seatNum = data.seatNum;
            }
        });
        return seatNum;
    },
    getCount: function () {
        return _getShenFenCount('乌鸦');
    },
    addIdentity: function (ele, memberId, cb) {
        //Http.updateIdentity({
//    roomId: roomId,
//    memberId: memberId,
//    identity: shenfen
//}, function (result) {
//    if (result && result.status) {// 更新数据库成功
        var x = $(ele).find('.my-badge').remove().end().append('<span class="my-badge"><img src="pictures/shenfen/wuya.jpg"/></span>').parent();
        Popover.addForPersonPanel(x, 'shenfen', '乌鸦');
        cb();
//}
//});
    },
    removeIdentity: function (ele, memberId, cb) {
        _removeIdentity(ele, memberId, cb);
    }
};
/**
 * 获取图片
 * @type {{getByShenFen: Function}}
 */
var GetImg = {
    /**
     * 获取对应身份的图片
     * @param shenFen
     * @returns {*}
     */
    getByShenFen: function (shenFen) {
        if (shenFen === '狼人')
            return "/pictures/shenfen/langren.jpg";
        if (shenFen === '白痴')
            return "/pictures/shenfen/baichi.jpg";
        if (shenFen === '猎人')
            return "/pictures/shenfen/lieren.jpg";
        if (shenFen === '女巫')
            return "/pictures/shenfen/nvwu.jpg";
        if (shenFen === '平民')
            return "/pictures/shenfen/pingmin.jpg";
        if (shenFen === '乌鸦')
            return "/pictures/shenfen/wuya.jpg";
        if (shenFen === '预言家')
            return "/pictures/shenfen/yuyanjia.jpg";
    }
};

/**
 * 获取位置
 */
var Seat = {
    getSeatAfterDiePersion: function () {
        var liveSeatNumList = ShenFen.getLiveSeatNum();
        return liveSeatNumList[_.sortedIndex(liveSeatNumList, 1 + _.max(ShenFen.getDeadSeatNum()))] || liveSeatNumList[0];
    },
    getMinSeat: function () {
        return _.min(ShenFen.getLiveSeatNum());
    },
    getSeatAfterCunZhang: function () {
        var liveSeatNumList = ShenFen.getLiveSeatNum();
        return liveSeatNumList[_.sortedIndex(liveSeatNumList, 1 + CunZhang.getSeatNum())] || liveSeatNumList[0];
    }
};

/**
 * 预言家逻辑处理对象
 * @type {{yanRen: Function}}
 */
var YuYanJia = {
    yanRen: function (context) {
        Data.saveAndUpdateData(context, 'beiYanRen', 1);
        // FIXME 这里要额外显示身份信息,如果beiYanRen的值为1的话
        var data = Data.getAllData(context);
        var shenfen = data.shenfen || '平民';
        var shenfenimg = GetImg.getByShenFen(shenfen);
        MyScreen.showYuyanjia2([
            {
                touXiang: data.headImg,//'/pictures/uesrimg.png',
                zuoWei: data.seatNum,
                huiYuan: data.memberName,
                shenFen: shenfenimg
            }
        ]);
        //MyScreen.showUserInfo(context);
    },
    getCount: function () {
        return _getShenFenCount('预言家');
    },
    addIdentity: function (ele, memberId, cb) {
        //Http.updateIdentity({
//    roomId: roomId,
//    memberId: memberId,
//    identity: shenfen
//}, function (result) {
//    if (result && result.status) {// 更新数据库成功
        var x = $(ele).find('.my-badge').remove().end().append('<span class="my-badge"><img src="pictures/shenfen/yuyanjia.jpg"/></span>').parent();
        Popover.addForPersonPanel(x, 'shenfen', '预言家');
        cb();
//}
//});
    },
    removeIdentity: function (ele, memberId, cb) {
        _removeIdentity(ele, memberId, cb);
    }
};

/**
 * 村长逻辑处理对象
 * @type {{}}
 */
var CunZhang = {
    isBeiQiangSha: function () {
        var size = $('.grid-stack-item').filter(function () {
            var data = Data.getAllData(this);
            var isCunZhang = data.cunzhang === '村长';
            var isNeedYiJiao = data.yaoyijiao === true;
            var status = Data.status.getStatus(this);
            var isNowDay = Data.isNowDay(this);
            var isQiangSha = data._qiangSha === '枪';
            return isCunZhang && !(status === 0 || status === 1) && isNowDay && isNeedYiJiao && isQiangSha;
        }).size();
        return !!size;
        /*  var tempBool = false;
         ShenFen.getDeadPerson().each(function (item) {
         var data = Data.getAllData(item);
         var isQiangSha = data._qiangSha === '枪';
         var isNowDay = Data.isNowDay(item);
         // 被杀之人是猎人并排除被毒杀的情况
         if (data.shenfen === '村长' && isQiangSha && isNowDay) tempBool = true;
         });
         return tempBool;*/
    },
    isExist: function () {
        var tempBool = false;
        $('.grid-stack-item').each(function () {
            var isResiter = !!Data.getData(this, 'memberCode');
            var shenfen = Data.getData(this, 'cunzhang');
            var isLive = Data.status.isLive(this);
            if (isResiter && shenfen === '村长' && isLive) {
                tempBool = true;
            }
        });
        return tempBool;
    },
    getSeatNum: function () {
        return parseInt(Data.getData(this._getCunZhangDom(), 'seatNum'));
    },
    buYiJiaoNever: function () {
        var bool = false;
        $('.grid-stack-item').filter(function () {
            var data = Data.getAllData(this);
            var isCunZhang = data.cunzhang === '村长';
            var status = Data.status.getStatus(this);
            var isNowDay = Data.isNowDay(this);
            if (isCunZhang && !(status === 0 || status === 1) && isNowDay) {
                Data.saveAndUpdateData(this, 'yaoyijiao', false);
                bool = true;
            }
        }).size();
        return bool;
    },
    isDead: function () {
        var size = $('.grid-stack-item').filter(function () {
            var data = Data.getAllData(this);
            var isCunZhang = data.cunzhang === '村长';
            var isNeedYiJiao = data.yaoyijiao === true;
            var status = Data.status.getStatus(this);
            var isNowDay = Data.isNowDay(this);
            return isCunZhang && !(status === 0 || status === 1) && isNowDay && isNeedYiJiao;
        }).size();
        return !!size;
    },
    getData: function () {
        return Data.getAllData(this._getCunZhangDom());
    },
    _getCunZhangDom: function () {
        return $('.grid-stack-item').filter(function () {
            return Data.getData(this, 'cunzhang') === '村长';
        });
    },
    getCount: function () {
        return this._getCunZhangDom().size();
    },
    addIdentity: function (ele, memberId, cb) {
        var shenfen = '村长';
        $(ele).children('span').last().after('<span>村</span>');
        var x = $(ele).parent();
        var status = Data.status.getStatus(x);
        if (_.contains([2, 3, 4, 5, 6, 7], status) && Data.isNowDay(x))
            Data.saveAndUpdateData(x, 'yaoyijiao', true);
        else  Data.saveAndUpdateData(x, 'yaoyijiao', false);
        Popover.addForPersonPanel(x, 'cunzhang', shenfen);
        cb(x);
    },
    removeIdentity: function (ele, memberId, cb) {
        $(ele).children('span').filter(':contains("村")').remove();
        var x = $(ele).parent();
        Popover.removePersonPanel(x, 'cunzhang');
        Data.deleData(x, 'yaoyijiao');
        cb(x);
    }
};