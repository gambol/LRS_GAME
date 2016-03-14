/**
 * Created by fy on 16-1-8.
 */
'use strict';

/**
 * 下一步的流程控制对象
 *
 * @type {{getFlowIndex: Function, getFlowItem: Function, getFlowName: Function, getSubFlowStep: Function, nextSubFlow: Function, nextFlow: Function, resetFlow: Function, getGameTitle: Function, jumpFlow: Function, isFlowName: Function, isAtNwFlow: Function, nextFlowStyle: Function, resetFlowAndStyle: Function}}
 */
var Flow = {
    getFlowIndex: function () {
        return window.__settings[office].flowIndex;
    },
    getFlowItem: function () {
        var juSetting = window.__settings[office];
        return juSetting.flowNames[juSetting.flowIndex];
    },
    getFlowName: function () {
        return this.getFlowItem().name;
    },
    nextFlow: function () {
        Toast.show('请裁判点击下一步按钮');
        $("#nexthuanjie").show();
        var juSetting = window.__settings[office];
        juSetting.flowIndex++;
        for (var i = 0; i < juSetting.flowNames.length; i++)
            if (!juSetting.flowNames[juSetting.flowIndex].show)
                juSetting.flowIndex++;
    },
    /**
     * 清理流程环节
     * 必须在resetFlow之前调用，也就是调用后必须调用resetFlow方法重置流程
     */
    removeFlows: function (delFlowNames) {
        var flowNames = window.__settings[office].flowNames;

        function delFlow(flowName) {
            for (var i = 0; i < flowNames.length; i++)
                if (flowNames[i].name === flowName) {
                    flowNames[i].show = false;
                    // FIXME 这里先hide，需要改成某个图片表示这个流程已经不存在了，执行的时候会跳过去
                    $('.timeline-item').filter(':contains("' + flowName + '")').find('i').hide();
                }
        }

        if (_.contains(delFlowNames, '女巫')) {
            delFlow('女巫环节');
        }
        if (_.contains(delFlowNames, '猎人')) {
            delFlow('猎人环节');
        }
        if (_.contains(delFlowNames, '白痴')) {
            delFlow('白痴环节');
        }
        if (_.contains(delFlowNames, '乌鸦')) {
            delFlow('乌鸦环节');
        }
        if (_.contains(delFlowNames, '预言家')) {
            delFlow('预言家环节');
        }
        if (_.contains(delFlowNames, '村长')) {
            delFlow('竞选村长环节');
        }
    },
    _resetFlow: function () {
        window.__settings[office].flowIndex = 0;
    },
    getGameTitle: function () {
        var juSetting = window.__settings[office];
        return juSetting.office + ',' + juSetting.shenfen;
    },
    jumpFlow: function () {
        var juSetting = window.__settings[office];
        delete juSetting.flowNames[juSetting.flowIndex];
        --juSetting.flowNames.length;
    },
    isFlowName: function (name) {
        return this.getFlowName() === name;
    },
    isAtNwFlow: function () {
        return this.isFlowName('女巫环节');
    },

    /**
     * 下一环节时,修改样式
     */
    nextFlowStyle: function () {
        MyScreen.clear();//防止一闪而过
        //<img src="assets/avatars/avatar1.png"/>
        $('#flow-' + (Flow.getFlowIndex())).find('i').replaceWith('<img src="assets/avatars/down.png" style="width: 40px;height:40px;   "/>');
    },

    /**
     * 重新开始游戏时需要初始化一些
     */
    resetFlow: function () {
        Setting.addNowDay();
        $('#nexthuanjie').show();
        // 重置流程的样式
        var flowNames = window.__settings[office].flowNames;
        for (var i = 0; i < flowNames.length; i++) {//将还存在的流程重置
            if (flowNames[i].show === true) {
                $('.timeline-item').find('img').replaceWith('<i class="timeline-indicator icon-star-empty btn btn-success no-hover"></i>');
            }
        }
        WuYa.clearBiaoJi();
        //重置游戏环节和子环节控制对象
        var dayText = ['第', Setting.getNowDay(), '天'].join('');
        Toast.show(dayText);
        $('.label-success').children().last().html(dayText);
        Flow._resetFlow();
        //flowIndex = 0;
        //flowStepClone = $.map(flowStep, function (i) { //克隆一个新的
        //    return i
        //});
    }
};
