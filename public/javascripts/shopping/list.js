/**
 * Created by fy on 15-9-8.
 */
(function (W) {
    W.goodsInit = function () {

        W.grid_selector = "#grid-table";
        W.pager_selector = "#grid-pager";
        W.search_form = '#search-form-id';
        W._title = '商品列表';
        W.str = location.search;
        W._url = BASE_URL + "goods/list";
        W._sortname = 'stockNum';
        W._sortorder = 'desc';
        $('.date').datepicker();
        W._postData = {};
        /*`id`, `username`, `password`, `company`, `department`, `name`, `phone`, `status`, `cdate`, `udate`*/
        W._colNames = ['商品名称', '库存数量', '购买数量', '操作'];
        W._colModel = [
            {name: 'goodsName', width: 80, index: 'goodsName', align: "left", sortable: true},
            {name: 'stockNum', width: 80, index: 'stockNum', align: "left", sortable: true},
            {name: 'number', width: 80, index: 'number', align: "left", editable: true},
            {
                name: '操作', width: 150, index: '', sortable: false,
                formatter: function (value, options, row) {
                    var goodsId = row.id;
                    var rowJson = encodeURIComponent(JSON.stringify(row));
                    var unused = '<a onclick="updateGoodsStatus(this,' + goodsId + ',0);">使之失效</a>';
                    var used = '<a onclick="updateGoodsStatus(this,' + goodsId + ',1);">使之有效</a>';
                    var edit = '<a onclick="editGoodsInfo(this,' + goodsId + ',\'' + rowJson + '\');">编辑</a>';
                    var status = row.status;
                    if (status == 0)return "" + '<span style="margin:0 10px;"></span>'
                        + used
                        + '<span style="margin:0 10px;"></span>'
                        + edit
                    if (status == 1)return "" + '<span style="margin:0 10px;"></span>'
                        + unused
                        + '<span style="margin:0 10px;"></span>'
                        + edit
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

        /**
         * @name 提交的请求的key的名称
         * @message 错误消息
         */
        W.validate = function (name, message) {
            $.gritter.add({
                title: message,
                class_name: 'gritter-info gritter-center'
            });
            setTimeout(function () {
                $('.my-add-btn-id,.my-update-btn-id').show();
                $.gritter.removeAll();
                $('input[name="' + name + '"],textarea[name="' + name + '"]').focus();
            }, 2000);
        };

        /**
         * 添加用户
         */
        W.addGoodsInfo = function (onwer, id) {
            var addUrl = 'goods/add'; // 添加请求
            var html = '<div class="row" style="margin: 0px;padding:0px;">' +
                '<iframe id="file_upload_iframe" name="file_upload_iframe" width="0" height="0" style="display: none;"></iframe>' +
                '<div class="col-md-12"> ' +
                '<form id="file_upload_form" class="form-horizontal" action="' + addUrl + '" method="post" target="file_upload_iframe">';

            html += '<div class="form-group"> ' +
                '<label class="col-md-3 control-label" for="goodsName">商品名称:</label> ' +
                '<div class="col-md-8"> ' +
                '<input type="text" name="goodsName" class="form-control input-md" > ' +
                '</div> ' +
                '</div> ';

            html += '<div class="form-group"> ' +
                '<label class="col-md-3 control-label" for="code">商品编号:</label> ' +
                '<div class="col-md-8"> ' +
                '<input type="text" name="code" class="form-control input-md" > ' +
                '</div> ' +
                '</div> ';

            html += '<div class="form-group"> ' +
                '<label class="col-md-3 control-label" for="stockNum">库存数量:</label> ' +
                '<div class="col-md-8"> ' +
                '<input type="text" name="stockNum" class="form-control input-md" > ' +
                '</div> ' +
                '</div> ';

            html += '<div class="form-group"> ' +
                '<label class="col-md-3 control-label" for="unit">商品单位:</label> ' +
                '<div class="col-md-8"> ' +
                '<input type="text" name="unit" class="form-control input-md" > ' +
                '</div> ' +
                '</div> ';

            html += '<div class="form-group"> ' +
                '<label class="col-md-3 control-label" for="bidSum">合计:</label> ' +
                '<div class="col-md-8"> ' +
                '<input type="text" name="bidSum" class="form-control input-md" > ' +
                '</div> ' +
                '</div> ';
            window.__myDialog = bootbox.dialog({
                //size: 'small',
                title: "添加商品对话框",
                message: html,
                buttons: {
                    tiJiao: {
                        label: "新建",
                        className: "btn-success my-add-btn-id",
                        callback: function () {
                            $('.my-add-btn-id').hide();
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
            window.__myDialog.modal('hide');
            var msg = '修改失败', color = 'red';
            if (status) msg = '修改成功', color = 'green';
            $('.my-a-' + id).parent().empty().append('<span style="color:' + color + ';">' + msg + '<span>');
            setTimeout(function () {
                jQuery(grid_selector).trigger('reloadGrid');
            }, 1000);
        };

    };
    /**
     * 编辑会员信息
     */
    W.editGoodsInfo = function (owner, goodsId, rowJson) {
        var row = JSON.parse(decodeURIComponent(rowJson));
        row.goodsId = goodsId;
        var html = jade.templates.editGoodsInfo(row);
        W.__myDialog = bootbox.dialog({
            //size: 'small',
            title: "编辑商品信息",
            message: html,
            buttons: {
                tiJiao: {
                    label: "编辑",
                    className: "btn-success my-add-btn-id",
                    callback: function () {
                        $('.my-add-btn-id').hide();
                        var goodsInfo = $('#editForm').getFormData();
                        GoodsIndex.updateGoodsInfo(goodsId, goodsInfo, function (result) {
                            if (result && !result.err)alert('success');
                            else alert('error');
                        });
                        return false;
                    }
                }
            }
        });
    };
    W.getQueryString = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }
    W.buy = function (owner) {
        var memberParams = getQueryString("params")
        var goodsParams = $("#grid-table").getGridParam("selarrrow");
        if (goodsParams.length > 0) {

            GoodsIndex.shopping(memberParams, goodsParams, function (result) {
                if (result && !result.err)alert('购买成功！');
                else alert('购买失败！');
            });
            return false;
        } else {
            alert("您还没有选中商品，请选择！");
        }
    };
})(window);

