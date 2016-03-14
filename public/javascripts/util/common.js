/**
 * Created by FY on 2016/2/16.
 */

(function (W) {
    /**
     * @name 提交的请求的key的名称
     * @message 错误消息
     */
    W.validate = function (name, message) {
        $.gritter.add({
            title: message,
            class_name: 'gritter-info gritter-center'
        });
        $('input[name="' + name + '"],textarea[name="' + name + '"]').focus();
        $('.my-submit-btn-id').show();
        var x = setTimeout(function () {
            $.gritter.removeAll();
            clearTimeout(x);
        }, 2000);
    };

    /**
     * 成功和失败的通用会掉方法
     * @param id
     * @param status
     */
    W.cbJsonp = function (id, status) {
        window.__myDialog.modal('hide');
        var msg = '保存失败', color = 'red';
        if (status) msg = '保存成功', color = 'green';
        $.gritter.add({
            title: msg,
            //text: msg,
            class_name: 'gritter-error gritter-light'
        });
        //$('.my-a-' + id).parent().empty().append('<span style="color:' + color + ';">' + msg + '<span>');
        setTimeout(function () {
            jQuery(grid_selector).trigger('reloadGrid');
        }, 1000);
    };

    W.cbJsonpForRpc = function (result) {
        W.cbJsonp(null, !result.err);
    };
})(window);