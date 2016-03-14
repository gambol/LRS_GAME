/**
 * Created by fy on 15-9-8.
 */
(function (W) {
    W.storagePageInit = function () {

        W.grid_selector = "#grid-table";
        W.pager_selector = "#grid-pager";
        W.search_form = '#search-form-id';
        W._title = '商品入库';
        W.str = location.search;
        W._url = BASE_URL + "storage/list";
        W._sortname = 'storedTime';
        W._sortorder = 'desc';
        $('.date').datepicker();
        W._postData = {};
        /*`id`, `username`, `password`, `company`, `department`, `name`, `phone`, `status`, `cdate`, `udate`*/
        W._colNames = ['入库编号', '商品名称', '商品编号', '商品进价', '入库数量', '采购人员', '录入人员', '入库日期', '备注', /*'操作'*/];
        W._colModel = [
            {name: 'stockCode', width: 80, index: 'stockCode', align: "left", sortable: true, hidden: true},
            {name: 'goodsName', width: 150, index: 'goodsName', align: "center", sortable: true},
            {name: 'code', width: 80, index: 'code', align: "left", sortable: true, hidden: true},
            {
                name: 'bid', width: 80, index: 'bid', align: "right", sortable: true,
                formatter: function (value, options, row) {
                    return value + '元';
                }
            },

            {name: 'bidSum', width: 80, index: 'bidSum', align: "right", sortable: true},
            {name: 'buyer', width: 100, index: 'buyer', align: "left", sortable: true},
            {name: 'createUser', width: 100, index: 'createUser', align: "left", sortable: true, hidden: true},
            {
                name: 'storedTime',
                width: 80,
                index: 'storedTime',
                align: "left",
                sortable: true,
                formatter: FORMAT.timeYMD
            },
            {name: 'remark', width: 100, index: 'remark', align: "left", sortable: true}
            //{
            //    name: '操作', width: 150, index: '', sortable: false,
            //    formatter: function (value, options, row) {
            //        var storageId = row.id;
            //        var rowJson = encodeURIComponent(JSON.stringify(row));
            //        var unused = '<button onclick="updateStorageStatus(this,' + storageId + ',0);">使之失效</button>';
            //        var used = '<button onclick="updateStorageStatus(this,' + storageId + ',1);">使之有效</button>';
            //        var edit = '<button onclick="editStorageInfo(this,' + storageId + ',\'' + rowJson + '\');">编辑</button>';
            //        var status = row.status;
            //        if (status == 0)return "" + '<span style="margin:0 10px;"></span>'
            //            + used
            //            + '<span style="margin:0 10px;"></span>'
            //        // + edit
            //        if (status == 1)return "" + '<span style="margin:0 10px;"></span>'
            //            + unused
            //            + '<span style="margin:0 10px;"></span>'
            //        // + edit
            //        //if (status == 1)return '<a onclick="updateUserStatus(this,' + userId + ',3);">通过</a>'
            //        //    + '<span style="margin:0 10px;"></span>'
            //        //    + '<a onclick="updateUserStatus(this,' + userId + ',2);">未通过</a>';
            //        //if (status == 2)return '<a onclick="updateUserStatus(this,' + userId + ',3);">通过</a>'
            //        //    + '<span style="margin:0 10px;"></span>'
            //        //    + unused;
            //
            //        return '';
            //    }
            //}
        ];

        W.updateStorageStatus = function (owner, storageId, status) {
            $.post('storage/update', {storageId: storageId, status: status}, function (result) {
                var msg = '修改失败', color = 'red';
                if (result && result.status) msg = '修改成功', color = 'green';
                $(owner).parent().empty().append('<span style="color:' + color + ';">' + msg + '<span>');
                setTimeout(function () {
                    jQuery(grid_selector).trigger("reloadGrid");
                }, 1000);
            });
        };
        /**
         * 商品入库
         */
        W.addStorageInfo = function () {
            var html = jade.templates.addStorageInfo({action: 'storage/add'});
            W.__myDialog = bootbox.dialog({
                title: "商品入库",
                message: html,
                buttons: {
                    tiJiao: {
                        label: "保存",
                        className: "btn-success my-submit-btn-id",
                        callback: function () {
                            $('.my-submit-btn-id').hide();
                            $('#submit').trigger('click');
                            return false;
                        }
                    }
                }
            });
            setTimeout(function () {
                /**
                 * 加载所有的商品编号和商品
                 */
                $.post('goods/allGoods', function (result) {
                    if (!result) {
                        alert('现在还没有商品，请先录入！');
                        window.close();
                    }
                    var goodsArr = [];
                    for (var i = 0; i < result.length; i++) {
                        goodsArr.push(result[i]);
                    }
                    $("#code").autocomplete({
                        source: goodsArr
                    });
                });
            }, 1500);
        };

        /**
         * 添加入库信息
         */
        //W.addStorageInfo = function (owner, id) {
        //    $("#stockCode").val(new Date() - 1);
        //    var dialog = $("#stockDialog").removeClass('hide').dialog({
        //        autoOpen: true,
        //        title: '商品入库',
        //        title_html: true,
        //        buttons: [
        //            {
        //                text: "取消",
        //                "class": "btn btn-xs",
        //                click: function () {
        //                    $(this).dialog("close");
        //                }
        //            },
        //            {
        //                text: "保存",
        //                "class": "btn-success my-submit-btn-id",
        //                click: function () {
        //                    $('.my-submit-btn-id').hide();
        //                    $('#stockForm').submit();
        //                    return false;
        //                }
        //            }
        //        ]
        //    });
        //    /**
        //     * 加载所有的商品编号和商品
        //     */
        //    $.post('goods/allGoods', function (result) {
        //        if (!result) {
        //            alert('现在还没有商品，请先录入！');
        //            window.close();
        //        }
        //        var goodsArr = [];
        //        for (var i = 0; i < result.length; i++) {
        //            goodsArr.push(result[i]);
        //        }
        //        $("#code").autocomplete({
        //            source: goodsArr
        //        });
        //    });
        //};
    };
    /**
     * 编辑会员信息
     */
    W.editStorageInfo = function (owner, storageId, rowJson) {
        var row = JSON.parse(decodeURIComponent(rowJson));
        row.storageId = storageId;
        var html = jade.templates.editStorageInfo(row);
        W.__myDialog = bootbox.dialog({
            //size: 'small',
            title: "编辑入库信息",
            message: html,
            buttons: {
                tiJiao: {
                    label: "保存",
                    className: "btn-success my-add-btn-id",
                    callback: function () {
                        $('.my-add-btn-id').hide();
                        var storageInfo = $('#editForm').getFormData();
                        StorageIndex.updateStorageInfo(storageId, storageInfo, function (result) {
                            if (result && !result.err)alert('success');
                            else alert('error');
                        });
                        return false;
                    }
                }
            }
        });
    };
})(window);

