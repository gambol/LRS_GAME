/**
 * Created by fy on 15-12-31.
 */
'use strict';
!function (W) {
    W.memberPageInit = function () {
        var sequence = 1;
        W.grid_selector = "#grid-table";
        W.pager_selector = "#grid-pager";
        W.search_form = '#search-form-id';
        W._title = '会员管理';
        W.str = location.search;
        W._url = BASE_URL + "member/list";
        W._sortname = 'dredgeTime';
        W._sortorder = 'asc';
        $('.date').datepicker();
        W._postData = {};
        W._colNames = ['序号', '会员编号', '会员昵称', '性别', '会员等级', '姓名', '手机', '微信号', '生日', '积分', '现金账户', '赠送账户', '开卡时间', '状态', '是否赊账', '操作'];
        W._colModel = [
            {
                name: 'sequence', width: 40, index: '', align: "left", sortable: false, frozen: true,
                formatter: function (value, options, row) {
                    return sequence++;
                }
            },
            {name: 'code', width: 120, index: 'code', align: "left", frozen: true, sortable: true},
            {name: 'name', width: 80, index: 'name', align: "left", frozen: true, sortable: true},
            {
                name: 'sex', width: 50, index: 'sex', align: "left", frozen: true, sortable: true,
                formatter: function (sex) {
                    if (sex == 0) {
                        return '男';
                    } else if (sex == 1) {
                        return '女';
                    } else {
                        return '';
                    }
                }
            },
            {
                name: 'level', width: 70, index: 'level', align: "left", frozen: true, sortable: true,
                formatter: function (level) {
                    switch (level) {
                        case '0':
                            return '普通';
                        case '1':
                            return '白金';
                        case '2':
                            return '黑金';
                        default:
                            return '普通';
                    }
                }
            },
            {name: 'userName', width: 80, index: 'userName', align: "left", frozen: true, sortable: true},
            {name: 'phone', width: 90, index: 'phone', align: "left", sortable: true},
            {name: 'wechatNum', width: 80, index: 'wechatNum', align: "left", sortable: true},
            {name: 'birthday', width: 80, index: 'birthday', align: "left", sortable: true, formatter: FORMAT.timeYMD},
            {name: 'integration', width: 60, index: 'integration', align: "right", sortable: true},
            {
                name: 'accountCash', width: 80, index: 'accountCash', align: "right", sortable: true,
                formatter: function (value) {
                    return value + "元";
                }
            },
            {
                name: 'giftCash', width: 80, index: 'giftCash', align: "right", sortable: true,
                formatter: function (value) {
                    return value + "元";
                }
            },
            {
                name: 'dredgeTime',
                width: 120,
                index: 'dredgeTime',
                align: "left",
                sortable: true,
                formatter: FORMAT.timeYMDHMS
            },
            {
                name: 'status', width: 60, index: 'status', align: "left", sortable: false,
                formatter: function (status) {
                    if (status == 0) {
                        return '停用';
                    } else if (status == 2) {
                        return '退卡';
                    } else if (status == 3) {
                        return '换卡';
                    } else if (status == 4) {
                        return '挂失';
                    } else if (status == 1) {
                        return '正常'
                    }
                }
            },
            {
                name: 'isDebt', width: 70, index: 'isDebt', align: "left", sortable: false,
                formatter: function (isDebt) {
                    if (isDebt == 0) {
                        return '否';
                    } else if (isDebt == 1) {
                        return '是';
                    } else {
                        return '';
                    }
                }
            },
            {
                name: '操作', width: 250, index: '', sortable: false,
                formatter: function (value, options, row) {
                    var memberId = row.id;
                    var rowJson = encodeURIComponent(JSON.stringify(row));
                    var edit = '<button class="btn btn-sm btn-primary" class="my-a-' + memberId + '" onclick="editMemberInfo(this,' + memberId + ',\'' + rowJson + '\',1);">编辑</button>';
                    var charge = '<button class="btn btn-sm btn-primary" onclick="charge(this,' + memberId + ',\'' + rowJson + '\');">充值</button>';
                    var del = '<button class="btn btn-sm btn-primary" onclick="delMemberInfo(this,' + memberId + ',1);">删除</button>';
                    var cardFunctions = [edit, del];
                    if (status == 1)return ""
                        + '<span style="margin:0 10px;"></span>'
                        + edit
                        //+ '<span></span>'
                        //+ del
                        + '<span style="margin:0 10px;"></span>'
                        + charge;
                    if (status == 0 || status == 2 || status == 3 || status == 4)return ""
                        + '<span style="margin:0 10px;"></span>'
                        + edit
                        //+ '<span></span>'
                        //+ del
                        + '<span style="margin:0 10px;"></span>'
                        + charge;
                }
            }
        ];
    };
    /**
     * 会员充值
     * @param owner
     * @param memberId
     * @param rowJson
     */
    W.charge = function (owner, memberId, rowJson) {
        var row = JSON.parse(decodeURIComponent(rowJson));
        row.member_id = memberId;
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
                        CheckoutIndex.updateChargeInfo(memberId, chargeInfo, W.cbJsonpForRpc);
                    }
                }
            }
        });
    };

    /**
     * 新增会员信息
     */
    W.addMemberInfo = function () {
        var jifen = 0;
        var zengsong = 0.0;
        var xianjin = 0.0;
        var html = jade.templates.addMemberInfo({
            action: 'member/add', jifen: jifen, xianjin: xianjin, zengsong: zengsong, auth: auth
        });

        W.__myDialog = bootbox.dialog({
            title: "新增会员信息",
            message: html,
            buttons: {
                tiJiao: {
                    label: "保存",
                    className: "btn-success my-submit-btn-id",
                    callback: function () {
                        if($('#submit').data('cantSubmit')===1){
                            return false;
                        }
                        $('.my-submit-btn-id').hide();
                        $('#submit').trigger('click');
                        return false;
                    }
                }
            }
        });

    };
    /**
     * 编辑会员信息
     */
    W.editMemberInfo = function (owner, memberId, rowJson) {
        var row = JSON.parse(decodeURIComponent(rowJson));
        row.memberId = memberId;
        row.action = 'member/edit';
        row.auth = auth;
        var html = jade.templates.editMemberInfo(row);
        W.__myDialog = bootbox.dialog({
            //size: 'small',
            title: "编辑会员信息",
            message: html,
            buttons: {
                tiJiao: {
                    label: "保存",
                    className: "btn-success my-submit-btn-id",
                    callback: function () {
                        $('.my-submit-btn-id').hide();
                        $('#editForm').submit();
                        return false;
                    }
                }
            }
        });
    };
    W.userValidate = function (owner) {
        var code = $("#code").val().trim();
        $.ajax({
            url: 'member/validateMemberCode',
            data: {
                memberCode: code
            },
            type: 'post',
            dataType: 'json',
            success: function (data) {
                if (data.status === "yes") {
                    $("#spanName").html("该会员编号已存在！");
                } else {
                    $('#submit').data('cantSubmit', 1);
                    $("#spanName").html("该会员编号已存在！");
                }
            },
            error: function () {
                alert("err");
            }
        });
    };

    W.usernameValidate = function (owner) {
        var name = $("#name").val().trim();
        $.ajax({
            url: 'member/validateMemberName',
            data: {
                userName: name
            },
            type: 'post',
            dataType: 'json',
            success: function (data) {
                if (data.status === "yes") {
                    $("#spanName").html("该会员已存在！");
                } else {
                    $('#submit').data('cantSubmit', 1);
                    $("#spanName").html("该会员已存在！");
                }
            },
            error: function () {
                alert("err");
            }
        });
    };

    /**
     * 删除用户信息
     * @param memberId
     */
    W.delMemberInfo = function (owner, memberId) {
        $.post('member/del', {memberId: memberId}, function (result) {
            if (result && result.status) {
                setTimeout(function () {
                    jQuery(grid_selector).trigger('reloadGrid');
                }, 1000);
                alert('删除成功');
            } else {
                alert('删除失败');
            }
        });
    };
    /**
     * 添加分类的ｊｓｏｎｐ回调函数
     */
    window.addCategoryJsonp = function (id, status) {
        window.__myDialog.modal('hide');
        var msg = '修改失败', color = 'red';
        if (status) msg = '修改成功', color = 'green';
        $('.my-a-' + id).parent().empty().append('<span style="color:' + color + ';">' + msg + '<span>');
        setTimeout(function () {
            jQuery(grid_selector).trigger('reloadGrid');
        }, 1000);
    };
}(window);