/**
 * Created by fy on 16-1-8.
 */
'use strict';

window.__gaming = false;

/**
 * 局的配置对象
 * window.__settings[office]
 * @type {{1: {office: string, shenfen: string}, 2: {office: string, shenfen: string}, 3: {office: string, shenfen: string}}}
 * @private
 */
window.__settings = {
    1: {
        personCount: {
            min: 10,
            max: 11
        },
        langRenCount: 3,
        office: '10/11人局',
        shenfen: '3狼3身份',
        nowDay: 0,
        haveCunZhang: false,
        score: {langRen: 20, shenFen: 20, pingMin: 15},
        flowIndex: 0,
        flowNames: [
            {name: '狼人环节', step: 4, show: true},
            //{name: '女巫环节', step: 3,show: true},
            {name: '猎人环节', step: 2, show: true},
            {name: '白痴环节', step: 2, show: true},
            //{name: '乌鸦环节', step: 3,show: true},
            {name: '预言家环节', step: 3, show: true},
            //{name: '竞选村长环节', step: 2, show: true},
            {name: '投票环节', step: 4, show: true}
        ],
        shenFen: ['预言家', '白痴', '猎人']
    },
    2: {
        personCount: {
            min: 12,
            max: 14
        },
        langRenCount: 4,
        office: '12/13/14人局', shenfen: '4狼4身份',
        nowDay: 0,
        haveCunZhang: false,
        score: {langRen: 30, shenFen: 30, pingMin: 20},
        flowIndex: 0,
        flowNames: [
            {name: '狼人环节', step: 4, show: true},
            {name: '女巫环节', step: 3, show: true},
            {name: '猎人环节', step: 2, show: true},
            {name: '白痴环节', step: 2, show: true},
            //{name: '乌鸦环节', step: 3,show: true},
            {name: '预言家环节', step: 3, show: true},
            {name: '竞选村长环节', step: 2, show: true},
            {name: '投票环节', step: 4, show: true}
        ],
        shenFen: ['预言家', '白痴', '猎人', '女巫']
    },
    3: {
        personCount: {
            min: 15,
            max: 18
        },
        langRenCount: 5,
        office: '15/16/17/18人局', shenfen: '5狼5身份',
        nowDay: 0,
        haveCunZhang: false,
        score: {langRen: 40, shenFen: 40, pingMin: 25},
        flowIndex: 0,
        flowNames: [
            {name: '狼人环节', step: 4, show: true},
            {name: '女巫环节', step: 3, show: true},
            {name: '猎人环节', step: 2, show: true},
            {name: '白痴环节', step: 2, show: true},
            {name: '乌鸦环节', step: 3, show: true},
            {name: '预言家环节', step: 3, show: true},
            {name: '竞选村长环节', step: 2, show: true},
            {name: '投票环节', step: 4, show: true}
        ],
        shenFen: ['女巫', '猎人', '白痴', '乌鸦', '预言家']
    }
};

/**
 * 设置对象的访问器
 * @type {{s: *, getShenfenText: Function}}
 */
var Setting = {
    s: window.__settings[office],
    getShenfenText: function () {
        return this.s.shenfen;
    },
    getLangRenCount: function () {
        return this.s.langRenCount;
    },
    getNowDay: function () {
        return this.s.nowDay;
    },
    addNowDay: function () {
        this.s.nowDay++;
    },
    isFirstDay: function () {
        var nowDay = this.s.nowDay;
        //因为在流程一开始就调用了resetFlow导致了nowDay的加一，所以这里应该判断一是第一天，二是第二天，。。。。以此类推
        return nowDay === 1;
    },
    /**
     *
     * @returns
     */
    getAndCheckPersonCount: function () {
        var size = $('.grid-stack-item').filter(function () {
            return !!Data.getData(this, 'memberCode');
        }).size();
        // FIXME 记得在生产环境下放开下面的注释
        if (size < this.s.personCount.min || size > this.s.personCount.max) {
            Toast.show('座次登记人数不符合局人数的要求，您设置的人数是：' + size);
            return false;
        }
        return size;
    },
    getScore: function () {
        //langRen: 30, shenFen: 30, pingMin: 20}
        return this.s.score;
    },
    getSetting: function () {
        return this.s;
    }
};

