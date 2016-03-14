/**
 * Created by FY on 2016/1/28.
 */

/**
 * 获取用户设置的房间的布局信息
 */
function getLayoutJsonById(id) {
    var layoutJson = null;
    $.ajax({
        type: "POST",
        url: "room/getLayout",
        dataType: "json",
        async: false,
        data: {
            id: id
        },
        success: function (result) {
            layoutJson = result;
        },
        error: function () {
            return null;
        }
    });
    return layoutJson;
}

/**
 * 保存房间布局请求
 */
function saveOrUpdateLayoutJson(id, layoutJson) {
    $.post('room/saveLayout', {
        id: id,
        layoutJson: layoutJson
    }, function (result) {
        if (result) {
            alert('房间布局保存成功');
        } else {
            alert('房间布局保存失败');
        }
    }, 'json');
}

/**
 * 添加右键菜单事件
 */
function eventContextMenu(e) {
    e.contextmenu({
        target: '#context-menu',
        onItem: function (context, e) {
            e.preventDefault();
            var ele = $(e.target);
            var text = ele.text();
            if (text == '删除') {
                GridStack.remove_grid(context);
            } else if (text == '修改名称') {
                showDialogForUpdateName(context, e);
            }
        }
    });
}

/**
 * 显示更新名称的对话框
 *  @context 右键点击的目标元素
 *  @ele 当前右键菜单项
 */
function showDialogForUpdateName(context, ele) {
    var dialog = $("#dialog-message").removeClass('hide').dialog({
        modal: true,
        title: '修改座位',
        title_html: true,
        buttons: [
            {
                text: "取消",
                "class": "btn btn-xs",
                click: function () {
                    $(this).dialog("close");
                }
            },
            {
                text: "确定",
                "class": "btn btn-primary btn-xs",
                click: function () {
                    var nf = $('#nameForm');
                    var name = nf.find('[name="name"]').val();
                    nf.get(0).reset();
                    var ele = context.html(name).parent();
                    ele.data('extras', {name: name});
                    $(this).dialog("close");
                }
            }
        ]
    }).data('context', context);
}

//　初始化游戏界面布局的方法
$('.grid-stack').gridstack({
    width: 8,
    float: true,
    cell_height: 50,
    vertical_margin: 10,
    resizable: true,
    draggable: true,
});

var GridStack = new function () {
    var oldLayoutJson = getLayoutJsonById(roomId);

    if (oldLayoutJson) {
        this.serialized_data = oldLayoutJson;
    } else {
        this.serialized_data = [
            {
                "x": 2,
                "y": 0,
                "width": 1,
                "height": 1,
                "name": "1"
            },
            {
                "x": 3,
                "y": 0,
                "width": 1,
                "height": 1,
                "name": "2"
            },
            {
                "x": 4,
                "y": 0,
                "width": 1,
                "height": 1,
                "name": "3"
            },
            {
                "x": 5,
                "y": 0,
                "width": 1,
                "height": 1,
                "name": "4"
            },
            {
                "x": 2,
                "y": 1,
                "width": 1,
                "height": 1,
                "name": "5"
            },
            {
                "x": 3,
                "y": 1,
                "width": 2,
                "height": 7,
                "name": "桌子"
            },
            {
                "x": 5,
                "y": 1,
                "width": 1,
                "height": 1,
                "name": "6"
            },
            {
                "x": 2,
                "y": 2,
                "width": 1,
                "height": 1,
                "name": "7"
            },
            {
                "x": 5,
                "y": 2,
                "width": 1,
                "height": 1,
                "name": "8"
            },
            {
                "x": 2,
                "y": 3,
                "width": 1,
                "height": 1,
                "name": "9"
            },
            {
                "x": 5,
                "y": 3,
                "width": 1,
                "height": 1,
                "name": "10"
            },
            {
                "x": 2,
                "y": 4,
                "width": 1,
                "height": 1,
                "name": "11"
            },
            {
                "x": 5,
                "y": 4,
                "width": 1,
                "height": 1,
                "name": "12"
            },
            {
                "x": 2,
                "y": 5,
                "width": 1,
                "height": 1,
                "name": "13"
            },
            {
                "x": 5,
                "y": 5,
                "width": 1,
                "height": 1,
                "name": "14"
            },
            {
                "x": 2,
                "y": 6,
                "width": 1,
                "height": 1,
                "name": "15"
            },
            {
                "x": 5,
                "y": 6,
                "width": 1,
                "height": 1,
                "name": "16"
            },
            {
                "x": 2,
                "y": 7,
                "width": 1,
                "height": 1,
                "name": "17"
            },
            {
                "x": 5,
                "y": 7,
                "width": 1,
                "height": 1,
                "name": "18"
            },
            {
                "x": 3,
                "y": 8,
                "width": 2,
                "height": 1,
                "name": "裁判"
            }
        ];
    }

    this.grid = $('.grid-stack').data('gridstack');
    this.remove_grid = function (ele) {
        this.grid.remove_widget(ele.parent());
    }.bind(this);
    this.add_grid = function () {
        var ele = $('<div><div class="grid-stack-item-content" data-toggle="context" data-target="#context-menu">无</div><div/>');
        ele.data('extras', {name: '无'});
        eventContextMenu(ele.children('.grid-stack-item-content'));
        this.grid.add_widget(ele, {x: 1, y: 1, width: 1, height: 1});
    }.bind(this);
    this.load_grid = function () {
        var self = this;
        this.grid.remove_all();
        var items = GridStackUI.Utils.sort(this.serialized_data);
        _.each(items, function (node) {
            var item = $('<div><div class="grid-stack-item-content" data-toggle="context" data-target="#context-menu">' + (node.name || "") + '</div><div/>');
            item.data('extras', {name: node.name});
            self.grid.add_widget(item, node.x, node.y, node.width, node.height);
        }, this);
        $('#saved-data').val(JSON.stringify(this.serialized_data, null, '    '));
    }.bind(this);
    this.save_grid = function () {
        this.serialized_data = _.map($('.grid-stack > .grid-stack-item:visible'), function (el) {
            el = $(el);
            var node = el.data('_gridstack_node');
            var extras = el.data('extras');
            return {
                x: node.x,
                y: node.y,
                width: node.width,
                height: node.height,
                name: extras.name
            };
        }, this);
        var layoutJson = JSON.stringify(this.serialized_data, null, '    ');
        saveOrUpdateLayoutJson(roomId, layoutJson);
        $('#saved-data').val(layoutJson);
    }.bind(this);
    this.clear_grid = function () {
        this.grid.remove_all();
    }.bind(this);
    $('#add-grid').click(this.add_grid);
    $('#save-grid').click(this.save_grid);
    $('#load-grid').click(this.load_grid);
    $('#clear-grid').click(this.clear_grid);
    this.load_grid();
    return this;
};

// 批量添加右键菜单事件
eventContextMenu($('.grid-stack-item-content'));
