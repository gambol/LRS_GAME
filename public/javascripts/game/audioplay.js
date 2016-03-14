/**
 * 播放音频的方法
 * 无论音频是否播放都要调用callback，通过boolean参数确定是否播放成功
 * @param src
 * @param cb
 * @private
 */
function _play(src, cb) {
    window.___play_callback = cb || function () {
        };
    var audioDom = $('#__audio');
    if (audioDom.size() === 0) $(document.body).append($(['<audio id="__audio" src="', src, '" autoplay="autoplay" onended="___play_callback(true)" onerror="___play_callback(false)" />'].join('')));
    else audioDom.attr('src', src);
}

/**
 * 播放音频的方法
 * 无论音频是否播放都要调用callback，通过boolean参数确定是否播放成功
 * @param src
 * @param cb
 * @private
 */
function _playShenfen(src, cb) {
    window.___play_callback2 = cb || function () {
        };
    var audioDom = $('#__audio2');
    if (audioDom.size() === 0) $(document.body).append($(['<audio id="__audio2" src="', src, '" autoplay="autoplay" onended="___play_callback2(true)" onerror="___play_callback2(false)" />'].join('')));
    else audioDom.attr('src', src);
}

function convertToEn(zhCnText){
	var enUs = '';
	switch(zhCnText){
		case '狼人':
			enUs = 'langren';
			break;
		case '女巫':
			enUs = 'nvwu';
			break;
		case '猎人':
			enUs = 'lieren';
			break;
		case '乌鸦':
			enUs = 'wuya';
			break;
		case '白痴':
			enUs = 'baichi';
			break;
		case '预言家':
			enUs = 'yuyanjia';
			break;
		case '平民':
			enUs = 'pingmin';
			break;
	}
	return enUs;
}

var Play = {

    playBgMusic: function () {
        var $audio = $('#__audio3');
        if ($audio.size() === 0) $(document.body).append($(['<audio id="__audio3" src="', 'music/backgroundmp3/bg.mp3', '" autoplay="autoplay" loop="loop" volume="0.5"/>'].join('')));
        else $audio.get(0).play();
    },
    pauseBgMusic: function () {
        var $audio = $('#__audio3');
        if ($audio.size() === 1)$audio.get(0).pause();
    },

    dangDangDang: function (cb) {
        _play('music/time/dangdangdang.mp3', cb || function () {
            });
    },
    touPiao: function (cb) {
        _play(['music/liucheng/xzkstpgpwx.mp3'].join(''), function () {
            _play('music/time/dangdangdang.mp3', cb);
        });
    },
    zuoyeBeiSha: function (seatNum, cb) {
        _play(['music/zuoyexbeisha/', seatNum, '.mp3'].join(''), cb);
    },
    zuowanQingkuang: function (showCount, cb) {
        var self = this;
        showCount = _.sortBy(showCount, function (item) {
            return item.order;
        });
        var firstStep = showCount[0];
        var index = 0;

        function _n() {
            var secondStep = showCount[index];
            if (secondStep)  digui(secondStep); else cb();
        }

        function digui(step) {
            index++;
            if (step.siyin === '被狼杀') self.zuoyeBeiSha(step.zuoWei, function () {
                self.boFangShenFen(step.huiYuan, _n);
            });
            else if (step.siyin === '被毒害') self.zuoyebeidu(step.zuoWei, step.huiYuan, _n);
            else if (step.siyin === '被标记') self.beiwuyabiaoji(step.zuoWei, _n);
        }

        digui(firstStep);
    },
    kaitou: function (personCount, cb) {
        _play(['music/kaitou/', personCount, '.mp3'].join(''), cb);
    },
    liucheng: function (dongzuo, cb) {
        var _dongzuo = '';
        switch (dongzuo) {
            case 'baichiqingbiyan':
                _dongzuo = 'bcqby.mp3';
                break;
            case 'baichiqingzhengyan':
                _dongzuo = 'bcqzy.mp3';
                break;
            case 'langrenqingbiyan':
                _dongzuo = 'leqby.mp3';
                break;
            case 'langrenqingsharen':
                _dongzuo = 'leqsr.mp3';
                break;
            case 'langrenqingzhengyan':
                _dongzuo = 'leqzy.mp3';
                break;
            case 'lierenqingbiyan':
                _dongzuo = 'lrqby.mp3';
                break;
            case 'lierenqingzhengyan':
                _dongzuo = 'lrqzy.mp3';
                break;
            case 'nvwuqingbiyan':
                _dongzuo = 'nwqby.mp3';
                break;
            case 'nvwuqingzhengyan':
                _dongzuo = 'nvqzy.mp3';
                break;
            case 'nvwushifouyongyao':
                _dongzuo = 'nwsfyy.mp3';
                break;
            case 'tianheiqingbiyan':
                _dongzuo = 'thqby.mp3';
                break;
            case 'tianliangleqingdajiazhengyan':
                MyScreen.clear();
                _dongzuo = 'tllqdjzy.mp3';
                break;
            case 'wuyaqingbiyan':
                _dongzuo = 'wyqby.mp3';
                break;
            case 'wuyaqingbiaoji':
                _dongzuo = 'wyqbj.mp3';
                break;
            case 'wuyaqingzhengyan':
                _dongzuo = 'wyqzy.mp3';
                break;
            case 'xianzaikaishijingxuancunzhang':
                _dongzuo = 'xzksjxcz.mp3';
                break;
            case 'xianzaikaishitoupiao':
                _dongzuo = 'xzkstpgpwx.mp3';
                break;
            case 'yuyanjiaqingbiyan':
                _dongzuo = 'yyjqby.mp3';
                break;
            case 'yuyanjiaqingyanren':
                _dongzuo = 'yyjqyr.mp3';
                break;
            case 'yuyanjiaqingzhengyan':
                _dongzuo = 'yyjqzy.mp3';
                break;
            default:

        }
        //if (_dongzuo != '') {
        _play(['music/liucheng/', _dongzuo].join(''), cb);
        //}
    },
    cunzhang: function (number, cb) {
        _play(['music/dangxuancunzhang/', number, '.mp3'].join(''), cb);
    },
    zuoyebeisha: function (number, sf, cb) {
        _play(['music/zuoyexbeisha/', number, '.mp3'].join(''), function () {
            sf = convertToEn(sf);
            _playShenfen(['music/shenfen/', sf, '.mp3'].join(''), cb);
        });
    },
    zuoyebeidu: function (number, sf, cb) {
        _play(['music/zuoyexbeidu/', number, '.mp3'].join(''), function () {
sf = convertToEn(sf);
            _playShenfen(['music/shenfen/', sf, '.mp3'].join(''), cb);
        });
    },
    shenfen: function (sf, cb) {
sf = convertToEn(sf);
        _playShenfen(['music/shenfen/', sf, '.mp3'].join(''), cb);
    },
    kaiqiangshahai: function (number, sf, cb) {
        _play(['music/kaiqiangshahai/', number, '.mp3'].join(''), function () {
sf = convertToEn(sf);
            _playShenfen(['music/shenfen/', sf, '.mp3'].join(''), cb);
        });
    },
    yijiaogongzuo: function (cb) {
        _play(['music/qingcunzhangyijiaogongzuo/qczyjgz.mp3'].join(''), cb);
    },
    dangXuanCunZhang: function (seatNum, cb) {
        _play(['music/qingcunzhangyijiaogongzuo/', seatNum, '.mp3'].join(''), cb);
    },
    beiwuyabiaoji: function (number, cb) {
        _play(['music/beiwuyabiaoji/', number, '.mp3'].join(''), cb);
    },
    pinganye: function (cb) {
        _play(['music/beiwuyabiaoji/zwswpay.mp3'].join(''), cb);
    },
    qingcongfayan: function (number, cb) {
        _play(['music/qingcongfayan/', number, '.mp3'].join(''), cb);
    },
    beigongtou: function (number, sf, cb) {
        _play(['music/beigongtou/', number, '.mp3'].join(''), function () {
sf = convertToEn(sf);
            _playShenfen(['music/shenfen/', sf, '.mp3'].join(''), cb);
        });
    },
    zhuyishixiang: function (content, cb) {
        _play(['music/zhuyishixiang/', content, '.mp3'].join(''), cb);
    },
    wanjiabaolang: function (number, cb) {
        _play(['music/wanjiabaolang/', number, '.mp3'].join(''), cb);
    },
    wuzhengyanchuju: function (number, cb) {
        _play(['music/wuzhengyanchuju/', number, '.mp3'].join(''), cb);
    },
    lierenBeiGongTou: function (number, cb) {
        _play(['music/beigongtou/', number, '.mp3'].join(''), function () {
            _play(['music/kaiqiangshahai/sfwlr.mp3'].join(''), cb);
        });
    },
    lierenBeiSha: function (number, cb) {
        _play(['music/zuoyexbeisha/', number, '.mp3'].join(''), function () {
            _play(['music/kaiqiangshahai/sfwlr.mp3'].join(''), cb);
        });
    },
    boFangShenFen: function (shenFen, cb) {
shenFen= convertToEn(shenFen);
        _play(['music/shenfen/', shenFen, '.mp3'].join(''), cb);
    },
    other: function (index, cb) {
        switch (index) {
            case "cunMinHuoDeShengLi":
                _play(['music/zhuyishixiang/cmhdsl.mp3'].join(''), cb);
                break;
            case "langRenHuoDeShengLi":
                _play(['music/zhuyishixiang/lrhdsl.mp3'].join(''), cb);
                break;
            case "faYanNeiRong":
                _play(['music/zhuyishixiang/fynr.mp3'].join(''), cb);
                break;
            case "faYanShiJian":
                _play(['music/zhuyishixiang/fysj.mp3'].join(''), cb);
                break;
            case "zhengQueShiYongMianJu":
                _play(['music/zhuyishixiang/zqymj.mp3'].join(''), cb);
                break;
            case "zunZhongFaYanShiJian":
                _play(['music/zhuyishixiang/zzfy.mp3'].join(''), cb);
                break;
        }
    }
};

!function () {
    $(document).bind('keydown.ctrl_up', function () {
        var $audio = $('#__audio3');
        if ($audio.size() === 1)$audio.get(0).volume += 0.1;
    });
    $(document).bind('keydown.ctrl_down', function () {
        var $audio = $('#__audio3');
        if ($audio.size() === 1)$audio.get(0).volume -= 0.1;
    });

}();