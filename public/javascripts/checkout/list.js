/**
 * Created by fy on 15-9-8.
 */

(function (W) {

    W.checkoutPageInit = function () {
        var checkbox = "";
        W.grid_selector = "#grid-table";
        W.pager_selector = "#grid-pager";
        W.search_form = '#search-form-id';
        W._title = '订单管理';
        W.str = location.search;
        W._url = BASE_URL + "checkout/list";
        W._sortname = 'status';
        W._sortorder = 'asc';
        $('.date').datepicker();
        W._postData = {};
        W._colNames = ['订单编号', '会员编号', '姓名', '昵称', '手机', '现金账户', '赠送账户', '开始时间', '结束时间', '支付状态', /*'房间号', '座位号', '游戏状态',*/ '操作'];
        W._colModel = [
            {name: 'orderCode', width: 80, index: 'orderCode', align: "left", sortable: true},
            {name: 'memCode', width: 80, index: 'memCode', align: "left", sortable: true},
            {name: 'userName', width: 80, index: 'userName', align: "left", sortable: true, hidden: true},
            {name: 'name', width: 80, index: 'name', align: "left", sortable: true},
            {name: 'phone', width: 80, index: 'phone', align: "left", sortable: true},
            {
                name: 'accountCash', width: 80, index: 'accountCash', align: "right", sortable: true,
                formatter: function (value) {
                    return value + '元';
                }
            },
            {
                name: 'giftCash', width: 80, index: 'giftCash', align: "right", sortable: true,
                formatter: function (value) {
                    return value + '元';
                }
            },
            {
                name: 'begin_time', width: 120, index: 'begin_time', align: "left", sortable: true,
                formatter: function (value) {
                    return FORMAT.timeYMDHMS(value);
                }
            }, {
                name: 'end_time', width: 120, index: 'end_time', align: "left", sortable: true,
                formatter: function (value) {
                    return FORMAT.timeYMDHMS(value);
                }
            },
            {
                name: 'status', width: 100, index: 'status', align: "center", sortable: true,
                formatter: function (value) {
                    if (value == 0) {
                        return '未结算';
                    } else if (value == 1) {
                        return '已结算';
                    } else {
                        return '赊单';
                    }
                }
            },
            //{name: 'roomCode', width: 100, index: 'roomCode', align: "left", sortable: true},
            //{name: 'seat_code', width: 100, index: 'seat_code', align: "left", sortable: true},
            //{name: 'gameStatus', width: 100, index: 'gameStatus', align: "left", sortable: true},
            {
                name: '操作', width: 260, index: '', sortable: false,
                formatter: function (value, options, row) {
                    var checkoutId = row.id;
                    var memberId = row.member_id;
                    var rowJson = encodeURIComponent(JSON.stringify(row));
                    var buy = '<button class="btn btn-sm btn-primary" onclick="buy(this,' + memberId + ',\'' + rowJson + '\');">购买</button>';
                    var charge = '<button class="btn btn-sm btn-primary" onclick="charge(this,' + memberId + ',\'' + rowJson + '\');">充值</button>';
                    var checkout = '<button class="btn btn-sm btn-primary" onclick="checkout(this,+' + memberId + ',' + checkoutId + ',\'' + rowJson + '\');">结账</button>';
                    var status = row.status;
                    if (status == 0)return ""
                        + '<span style="margin:0 10px;"></span>'
                        + charge
                        + '<span style="margin:0 10px;"></span>'
                        + buy
                        + '<span style="margin:0 10px;"></span>'
                        + checkout;
                    if (status == 1)return ""
                        + '<span style="margin:0 10px;"></span>'
                        + charge;
                    //+ '<span style="margin:0 10px;"></span>'
                    //+ buy
                    if (status == 2)return ""
                        + '<span style="margin:0 10px;"></span>'
                        + charge
                            //+ '<span style="margin:0 10px;"></span>'
                            //+ buy
                        + '<span style="margin:0 10px;"></span>'
                        + checkout;
                    return '';
                }
            }
        ];
    };

    function TOalert(msg) {
        $("#alert").text(msg).css({display: "block", opacity: "0.5"});
        $("#alert").animate({opacity: "1"}, 500, function () {
            setTimeout(function () {
                $("#alert").animate({opacity: "0"}, 500, function () {
                    $("#alert").css("display", "none")
                })
            }, 500)
        })
    }

    /**
     * 充值
     * @param owner
     * @param memberId
     * @param rowJson
     */
    W.charge = function (owner, memberId, rowJson) {
        var row = JSON.parse(decodeURIComponent(rowJson));
        row.memberId = memberId;
        var html = jade.templates.editCheckoutInfo(row);
        W.__myDialog = bootbox.dialog({
            //size: 'small',
            title: "充值",
            message: html,
            buttons: {
                tiJiao: {
                    label: "充值",
                    className: "btn-success my-add-btn-id",
                    callback: function () {
                        $('.my-add-btn-id').hide();
                        $("#member_id").remove();
                        $("#code").remove();
                        $("#userName").remove();
                        var chargeInfo = $('#editForm1').getFormData();
                        //console.log(chargeInfo);
                        CheckoutIndex.updateChargeInfo(memberId, chargeInfo, W.cbJsonpForRpc);
                    }
                }
            }
        });
    };
    /**
     * 游戏中购买商品弹窗
     * @param onwer
     * @param id
     */
    W.shopping = function (owner) {
        var html = jade.templates.shopInGame({action: "goods/createOrder"});
        W.__myDialog = bootbox.dialog({
            title: '购买商品',
            message: html,
            buttons: {
                tiJiao: {
                    label: "购买",
                    className: "btn-success my-submit-btn-id",
                    callback: function () {
                        $('#submit').trigger('click');
                        return false;
                    }
                }
            }
        });
        setTimeout(function () {
            //加载所有的房间
            $.post('room/all', function (result) {
                if (!result) {
                    alert('现在还没有房间，请录入！');
                    window.close();
                }
                var codeArr = [];
                for (var i = 0; i < result.length; i++) {
                    codeArr.push(result[i]['code']);
                }
                //console.log(codeArr);
                $("#memberCode").autocomplete({
                    source: codeArr
                });
            });
            //加载所有的座位
            $("#seat_code").autocomplete({
                source: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18"]
            });
            //加载所有的商品名
            $.post('goods/all', function (result) {
                if (!result) {
                    alert('现在还没有商品，请入库！');
                    window.close();
                }
                var codeArr = [];
                for (var i = 0; i < result.length; i++) {
                    codeArr.push(result[i]['goodsName']);
                }
                //console.log(codeArr);
                $("#goodsName").autocomplete({
                    source: codeArr
                });
            });
        }, 1000);
    };
    /**
     * 未玩游戏购买弹窗
     * @param onwer
     * @param id
     */
    W.buy = function (owner, memberId, rowJson) {
        var row = JSON.parse(decodeURIComponent(rowJson));
        var html = jade.templates.shopNotInGame({action: "goods/createUserOrder"});
        W.__myDialog = bootbox.dialog({
            title: '购买商品',
            message: html,
            buttons: {
                tiJiao: {
                    label: "购买",
                    className: "btn-success my-submit-btn-id",
                    callback: function () {
                        $('#submit').trigger('click');
                        return false;
                    }
                }
            }
        });
        setTimeout(function () {
            $("#memId").val(memberId);
            $("#Name").val(row.userName);
            $("#order_id").val(row.id);
            //加载所有的商品名
            $.post('goods/all', function (result) {
                if (!result) {
                    alert('现在还没有商品，请入库！');
                    window.close();
                }
                var codeArr = [];
                for (var i = 0; i < result.length; i++) {
                    codeArr.push(result[i]['goodsName']);
                }
                //console.log(codeArr);
                $("#goodsname").autocomplete({
                    source: codeArr
                });
            });
        }, 500);
    };

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
    /**
     * 结账弹窗
     * @param owner
     */
    W.checkout = function (owner, memberId, checkoutId, rowJson) {
        setTimeout(function () {
            $("input").val('');
            var row = JSON.parse(decodeURIComponent(rowJson));

            if (row.begin_time) {
                $('#startTimeBtn').replaceWith('<span>' + FORMAT.timeYMDHMS(row.begin_time) + '</span>');
            }

            var gameDiscountMoney = 0.0;//游戏优惠金额
            var expenseSetting;
            var gamePriceSetting;
            var discountSetting;
            var discountMoney = 0.0;
            var totalMoney = 0.0;
            var gameExpense = 0.0;
            row.checkoutId = checkoutId;

            $('#accountCash').text(row.accountCash);
            $('#giftCash').text(row.giftCash);
            //得到json配置对象
            $.get('checkout/getJsonFile', function (result) {
                if (!result) {
                    alert('没有获取相应的设置！');
                    window.close();
                } else {
                    var jsonFile = JSON.parse(result.data[0].value);
                    expenseSetting = jsonFile["消费账户设置"];
                    gamePriceSetting = jsonFile["游戏价格设置"];
                    discountSetting = jsonFile["优惠设置"];
                }
            });

            //得到订单信息
            $.get('checkout/getOrderInfo', {checkoutId: checkoutId}, function (result) {
                if (!result) {
                    alert('此用户还没有产生订单！');
                    window.close();
                } else {
                    $("#userName").text(result.data.userName);
                    $("#orderCode").text(result.data.orderCode);
                    $("#memberCode1").text(result.data.memberCode);
                    $('#startTimeBtn').click(function () {
                        CheckoutIndex.updateTimeForBeginGame(checkoutId, function (result) {
                            if (!result.err) {
                                W.cbJsonpForRpc({err: null});
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
                    });
                    $('#endTimeBtn').click(function () {
                        function hand(zzz) {
                            try {
                                var v = zzz;//$.trim($(this).val());
                                if (!v) {
                                    $('#zheHou').text(0);
                                    return;
                                }
                                var zheKou = parseFloat($('#zheKou').text());
                                if (_.isNaN(zheKou))return;
                                var gameCash = parseFloat(v);
                                if (_.isNaN(gameCash)) {
                                    $.gritter.add({
                                        title: '金额只能入数字',
                                        class_name: 'gritter-error gritter-light'
                                    });
                                    return;
                                }
                                var result = (gameCash * zheKou).toFixed(2);
                                if (_.isNaN(result))return;
                                $('#zheHou').text(result);
                                $('#giftCash1').val(Math.ceil(result));
                            } catch (e) {
                                $.gritter.add({
                                    title: '金额只能入数字',
                                    class_name: 'gritter-error gritter-light'
                                });
                            }
                        }

                        CheckoutIndex.updateTimeForEndGame(checkoutId, function (result) {
                            if (!result.err) {
                                var timeStr = '';
                                if (result.data.xiaoShi) {
                                    timeStr += result.data.xiaoShi + '小时';
                                }
                                if (result.data.fenZhong) {
                                    timeStr += result.data.fenZhong + '分钟';
                                }
                                $('#totalTimeInput').html(timeStr);
                                $("#money").text(result.data.qian);
                                hand(result.data.qian);
                                jQuery(grid_selector).trigger('reloadGrid');
                                $.gritter.add({
                                    title: '结束计时成功',
                                    class_name: 'gritter-error gritter-light'
                                });
                            }
                        });
                    });
                    /* var startTime = new Date(result.data.startTime);
                     var endTime = new Date(result.data.endTime);
                     var totalTime = ((endTime.getTime() - startTime.getTime()) / 3600000).toFixed(1);
                     var grade = result.data.grade;
                     $("#accountCash").val(result.data.accountCash)
                     $("#giftCash").val(result.data.giftCash)
                     $("#userName").text(result.data.userName);
                     $("#orderCode").text(result.data.orderCode);
                     $("#memberCode1").text(result.data.memberCode);
                     if (result.data.startTime == null) {
                     $("#startTime").text("未开始");
                     $("#startTime").text(FORMAT.timeYMDHMS(result.data.startTime));
                     }
                     if (result.data.endTime == null) {
                     $("#endTime").text("未结束")
                     } else {
                     $("#endTime").text(FORMAT.timeYMDHMS(result.data.endTime));
                     }
                     $("#totalTime").text(totalTime + "小时");
                     var countHour = gamePriceSetting["小时"];
                     var countFee = gamePriceSetting["元"];
                     var beyondFee = gamePriceSetting["超出后每小时元"];
                     if (totalTime < countHour || totalTime == countHour) {
                     if (totalTime == 0) {
                     gameExpense = 0.0;
                     $("#money").val(0);
                     } else {
                     gameExpense = countFee;
                     $("#money").val(countFee);
                     }
                     } else {
                     gameExpense = parseFloat(countFee) + round(totalTime - countHour) * parseFloat(beyondFee);
                     $("#money").val(parseFloat(countFee) + round(totalTime - countHour) * parseFloat(beyondFee));
                     }
                     */
                }
            });
            $.get('checkout/getGoodsList', {checkoutId: checkoutId}, function (result) {
                var goodsTotalPrice = 0.0;
                if (!result) {
                    alert('此用户没有购买商品！');
                    window.close();
                }
                $("#goodsList").empty();
                for (var i = 0; i < result.data.length; i++) {
                    $("#goodsList").append('<tr> ' +
                        '<td  for="sum_price">' + result.data[i].goodsName + '</td> ' +
                        '<td  for="sum_price">' + result.data[i].price + '</td> ' +
                        '<td  for="sum_price">' + result.data[i].sum + '</td> ' +
                        '<td  for="sum_price">' + (result.data[i].price) * (result.data[i].sum) + '</td> ' +
                        '</tr> ');
                    goodsTotalPrice += (result.data[i].price) * (result.data[i].sum);
                }
                $("#goodsTotalPrice").text(goodsTotalPrice);
                $("#accountCash1").val(goodsTotalPrice);
                totalMoney = parseFloat(gameExpense) + parseFloat(goodsTotalPrice);
                //$("#totalMoney").text(totalMoney);
                //$("#getMoney").val(totalMoney);
            });

            $('#jiFen').text(row.integration);

            SettingsIndex.getDengJi(row.integration, function (data) {
                //console.log(data.data);
                $('#dengJi').text(data.data);
                SettingsIndex.getZheKou(data.data, function (data) {
                    //console.log(data.data);
                    $('#zheKou').text(data.data);

                    //$('#giftCash1').change(hand).keyup(hand);
                });
            });

        }, 1000);
        /**
         * window begin
         */
        var html = jade.templates.checkout({action: "checkout/add"});
        W.__myDialog = bootbox.dialog({
            title: '结账',
            message: html,
            size: 'small',
            buttons: {
                jiezhang: {
                    label: "结账",
                    className: "btn-success my-submit-btn-id",
                    callback: function () {
                        var gc1 = $('#giftCash1').val() || '0';
                        var ac1 = $('#accountCash1').val() || '0';
                        var updateOrderInfo = {
                            giftCash: parseInt(-gc1),
                            accountCash: parseInt(-ac1)
                        };
                        //console.log(updateOrderInfo);
                        CheckoutIndex.updateChargeInfo(memberId, updateOrderInfo, function (result) {
                            if (!result.err) {
                                CheckoutIndex.updateOrderInfo(checkoutId, 1, W.cbJsonpForRpc)
                            } else alert('结算失败');
                        });
                        return false;
                    }
                },
                miandan: {
                    label: "现金支付",
                    className: "btn-success my-submit-btn-id",
                    callback: function () {
                        $("#giftCash1").val(0);
                        $("#accountCash1").val(0);
                        var updateOrderInfo = $('#checkout').getFormData();
                        CheckoutIndex.updateChargeInfo(memberId, updateOrderInfo, function (result) {
                            if (!result.err) {
                                CheckoutIndex.updateOrderInfo(checkoutId, 1, W.cbJsonpForRpc)
                            } else alert('免单失败');
                        });
                        return false;
                    }
                },
                shedan: {
                    label: "赊单",
                    className: "btn-success my-submit-btn-id",
                    callback: function () {
                        $("#giftCash1").val(0);
                        $("#accountCash1").val(0);
                        var updateOrderInfo = $('#checkout').getFormData();
                        CheckoutIndex.updateChargeInfo(memberId, updateOrderInfo, function (result) {
                            if (result != null && result.err == null) {
                                CheckoutIndex.updateOrderInfo(checkoutId, 2, W.cbJsonpForRpc)
                            } else alert('error');
                        });
                        $(this).dialog("close");
                        return false;
                    }
                }
            }
        });
    };
})(window);

