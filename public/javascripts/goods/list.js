/**
 * Created by fy on 15-9-8.
 */
(function (W) {
    W.goodsPageInit = function () {

        W.grid_selector = "#grid-table";
        W.pager_selector = "#grid-pager";
        W.search_form = '#search-form-id';
        W._title = '商品管理';
        W.str = location.search;
        W._url = BASE_URL + "goods/list";
        W._sortname = 'stockNum';
        W._sortorder = 'desc';
        $('.date').datepicker();
        W._postData = {};
        /*`id`, `username`, `password`, `company`, `department`, `name`, `phone`, `status`, `cdate`, `udate`*/
        W._colNames = ['商品名称', '售价', '商品编号', '库存数量', '商品单位', '状态', '操作'];
        W._colModel = [
            {name: 'goodsName', width: 120, index: 'goodsName', align: "center", sortable: true},
            {
                name: 'price',
                width: 80,
                index: 'price',
                align: "right",
                sortable: true,
                formatter: function (value, options, row) {
                    return value + '元';
                }
            },
            {name: 'code', width: 80, index: 'code', align: "left", sortable: true, hidden: true},
            {
                name: 'stockNum',
                width: 80,
                index: 'stockNum',
                align: "right",
                sortable: true,
                formatter: function (value, options, row) {
                    return value + row.unit;
                }
            },
            {name: 'unit', width: 80, index: 'unit', align: "left", sortable: true, hidden: true},
            {
                name: 'status', width: 80, index: 'status', align: "center", sortable: true,
                formatter: function (value) {
                    if (value == 0) {
                        return '无效';
                    }
                    if (value == 1) {
                        return '有效';
                    }
                }
            },
            {
                name: '操作', width: 150, index: '', sortable: false, align: "center",
                formatter: function (value, options, row) {
                    var goodsId = row.id;
                    var rowJson = encodeURIComponent(JSON.stringify(row));
                    var unused = '<button class="btn btn-sm btn-primary" onclick="updateGoodsStatus(this,' + goodsId + ',0);">使之失效</button>';
                    var used = '<button class="btn btn-sm btn-primary" onclick="updateGoodsStatus(this,' + goodsId + ',1);">使之有效</button>';
                    var edit = '<button class="btn btn-sm btn-primary" onclick="editGoodsInfo(this,' + goodsId + ',\'' + rowJson + '\');">编辑</button>';
                    var status = row.status;
                    if (status == 0)return ""
                        + '<span style="margin:0 10px;"></span>'
                        + edit;
                    if (status == 1)return ""
                        + '<span style="margin:0 10px;"></span>'
                        + edit;
                    //if (status == 1)return '<a onclick="updateUserStatus(this,' + userId + ',3);">通过</a>'
                    //    + '<span style="margin:0 10px;"></span>'
                    //    + '<a onclick="updateUserStatus(this,' + userId + ',2);">未通过</a>';
                    //if (status == 2)return '<a onclick="updateUserStatus(this,' + userId + ',3);">通过</a>'
                    //    + '<span style="margin:0 10px;"></span>'
                    //    + unused;

                    return '';
                }
            }
        ];

        W.updateGoodsStatus = function (owner, goodsId, status) {
            $.post('goods/update', {goodsId: goodsId, status: status}, function (result) {
                var msg = '修改失败', color = 'red';
                if (result && result.status) msg = '修改成功', color = 'green';
                $(owner).parent().empty().append('<span style="color:' + color + ';">' + msg + '<span>');
                setTimeout(function () {
                    jQuery(grid_selector).trigger("reloadGrid");
                }, 1000);
            });
        };

        W.validateGoodsName = function (owner) {
            var goodsName = $("#goodsName").val();
            var gName = $("#gName").val();
            $.ajax({
                url: 'goods/validateGoodsname',
                data: {
                    goodsName: goodsName,
                },
                type: 'post',
                dataType: 'json',
                success: function (data) {
                    if (data.status == "yes") {
                    } else {
                        if (goodsName === gName) {
                        } else {
                            $("#file_upload_form").data("cantSubmit", 1);
                            $("#editForm").data("cantSubmit", 1);
                            $("#errorInfo").html("该商品已经录入！");
                        }
                    }
                },
                error: function () {
                    alert("err");
                }
            });

        };

        /**
         * 添加商品
         */
        W.addGoodsInfo = function (onwer, id) {
            var addUrl = 'goods/add'; // 添加请求
            var code = new Date() - 1;
            var html = '<div class="row" style="margin: 0px;padding:0px;">' +
                '<iframe id="file_upload_iframe" name="file_upload_iframe" width="0" height="0" style="display: none;"></iframe>' +
                '<div class="col-md-12"> ' +
                '<form id="file_upload_form" class="form-horizontal" action="' + addUrl + '" method="post" target="file_upload_iframe">' +
                '<span id="errorInfo" style="margin-left: 366px; color: red"></span>';

            html += '<div class="form-group"> ' +
                '<label class="col-md-3 control-label" for="code">商品编号:</label> ' +
                '<div class="col-md-8"> ' +
                '<input type="text" name="code" id="code" value=' + code + ' class="form-control input-md" readonly="readonly"/> ' +
                '</div> ' +
                '</div> ';

            html += '<div class="form-group"> ' +
                '<label class="col-md-3 control-label" for="goodsName">商品名称:</label> ' +
                '<div class="col-md-8"> ' +
                '<input type="text" name="goodsName"  id="goodsName" placeholder="商品名称的长度在2到25之间" class="form-control input-md" onblur="validateGoodsName(this.value)"> ' +
                '</div> ' +
                '</div> ';

            html += '<div class="form-group"> ' +
                '<label class="col-md-3 control-label" for="price">售价:</label> ' +
                '<div class="col-md-8"> ' +
                '<input type="text" name="price"  id="price" class="form-control input-md"> ' +
                '</div> ' +
                '</div> ';


            html += '<div class="form-group" style="display: none"> ' +
                '<label class="col-md-3 control-label" for="stockNum">库存数量:</label> ' +
                '<div class="col-md-8"> ' +
                '<input type="text" name="stockNum" value=0 hidden="true" class="form-control input-md" > ' +
                '</div> ' +
                '</div> ';

            html += '<div class="form-group"> ' +
                '<label class="col-md-3 control-label" for="unit">商品单位:</label> ' +
                '<div class="col-md-8"> ' +
                '<input type="text" name="unit" class="form-control input-md" placeholder="按照销售时的单位（例如：个，碗...）"> ' +
                '</div> ' +
                '</div> ';

            window.__myDialog = bootbox.dialog({
                //size: 'small',
                title: "增加商品",
                message: html,
                buttons: {
                    tiJiao: {
                        label: "保存",
                        className: "btn-success my-submit-btn-id",
                        callback: function () {
                            if ($('#file_upload_form').data("cantSubmit") === 1) {
                                return false;
                            }
                            $('.my-submit-btn-id').hide();
                            $('#file_upload_form').submit();
                            return false;
                        }
                    }
                }
            });
        };
        /**
         * 服务器导入用户成功后的ｊｓｏｎｐ回调函数
         */
        W.importCallback = function (status, sMsg) {
            var msg = '导入失败', color = 'red';
            if (status) {
                msg = '导入结束', color = 'green';
            } else {
                $('.my-add-btn-id').show();
            }
            $('#progress-id').replaceWith('<span style="font-size:13px;color:' + color + ';">' + msg + '~~~<span><br/><div>' + sMsg + '</div>');
            //setTimeout(function () {
            //    window.__myDialog.modal('hide');
            jQuery(grid_selector).trigger('reloadGrid');
            //}, 1500);
        };

        /**
         * 显示导入用户的消息
         */
        W.showMessage = function (msg) {
            $('#message-id').append('<div style="width:800px;">' + msg + '</div>');
        };

        /**
         * 导入进度的方法
         */
        W.importProgress = function (progress) {
            $('#progress-id').show().attr('data-percent', progress);
            $('#progress-bar-id').css('width', progress);
        };

        /**
         * 添加分类的ｊｓｏｎｐ回调函数
         */
        W.addUserJsonp = function (id, status) {
            var msg = '保存失败', color = 'red';
            if (status) {
                window.__myDialog.modal('hide');
                msg = '保存成功', color = 'green';
                setTimeout(function () {
                    jQuery(grid_selector).trigger('reloadGrid');
                }, 1000);
            } else {
                $('.my-add-btn-id').show();
                return;
            }
            $('.my-a-' + id).parent().empty().append('<span style="color:' + color + ';">' + msg + '<span>');
        };

    };
    /**
     * 编辑商品信息
     */
    W.editGoodsInfo = function (owner, goodsId, rowJson) {
        var row = JSON.parse(decodeURIComponent(rowJson));
        row.goodsId = goodsId;
        var html = jade.templates.editGoodsInfo(row);
        W.__myDialog = bootbox.dialog({
            title: "编辑商品",
            message: html,
            buttons: {
                tiJiao: {
                    label: "保存",
                    className: "btn-success my-submit-btn-id",
                    callback: function () {
                        if ($('#editForm').data("cantSubmit") === 1) {
                            return false;
                        }
                        $("#gName").remove();
                        $('.my-submit-btn-id').hide();
                        $('#editForm').submit();
                        return false;
                    }
                }
            }
        });
    };
})(window);

