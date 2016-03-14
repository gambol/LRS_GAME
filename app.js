var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var serveStatic = require('serve-static');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var RedisStore = require('connect-redis')(session);

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.disable('etag');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static(path.join(__dirname, 'node_modules')));
app.use(serveStatic('bower_components'));
app.use(cookieParser('fy_'));

app.use(cookieParser());
//app.use(session({
//    secret: 'felix yin',
//    name: 'LrsGame',   //这里的name值得是cookie的name，默认cookie的name是：connect.sid
//    cookie: {maxAge: 60000 * 300},  //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
//    resave: true,
//    saveUninitialized: true
//}));
app.use(session({
    secret: 'felix yin',
    resave: true,
    cookie: {maxAge: 60000 * 3000},
    saveUninitialized: true
}));

app.use(function (req, res, next) {
    var url = req.originalUrl;
    if (url !== "/login" && url !== "/sessionLess" && url !== "/" && !req.session.username) {
        return res.redirect("/sessionLess");
    }
    next();
});

app.use(function (req, res, next) {
    res.locals.userid = req.session.userid || null;
    res.locals.auth = req.session.auth || null;
    res.locals.username = req.session.username || null;
    //res.locals.menus = req.session.menus || null;
    next();
});


// =================================================================================

//注册登陆等
var index = require('./routes/index');
app.use('/', index);
//游戏间
var room = require('./routes/room');
app.use('/room', room);
//购物
var shopping = require('./routes/shopping');
app.use('/shopping', shopping);
//收银台
var checkout = require('./routes/checkout');
app.use('/checkout', checkout);
//用户管理模块
var user = require('./routes/user');
app.use('/user', user);
//会员管理模块
var member = require('./routes/member');
app.use('/member', member);
//商品管理
var goods = require('./routes/goods');
app.use('/goods', goods);
//商品入库
var storage = require('./routes/storage');
app.use('/storage', storage);
//分类管理模块
var category = require('./routes/book/category');
app.use('/book/category', category);
//pdf文件管理模块
var pdf = require('./routes/book/pdf');
app.use('/book/pdf', pdf);
//批量压缩包导入模块
var impt = require('./routes/import/index');
app.use('/import', impt);
//基本设置
var settings = require('./routes/settings/index');
app.use('/settings', settings);

//关于模块
var about = require('./routes/about');
app.use('/about', about);
//app api 接口服务


//自动注册所有ｓｅｒｖｉｃｅ为ｒｐｃ服务
var rpc = require('./lib/rpc');
var dirWalk = require('./lib/myfs/digui');
var _s = require('underscore.string');
var serviceFileFolder = __dirname + '/service';
var serviceFileList = dirWalk.syncWalk(serviceFileFolder, 0);
console.info('页面需引入RPC注册的服务地址是： ');
var rpcScripts = serviceFileList.map(function (o) {
    var service = require('.' + o.rpcPath),
        ret = o.rpcPath.split('/'),
        clientName = _s.capitalize(ret[ret.length - 2]) + _s.capitalize(ret[ret.length - 1].replace('.js', '')),
        script = ['script(src=\'', o.rpcPath, '/helper.js', '\')\n', "script var ", clientName, " = new ", clientName, "('", o.rpcPath, "');\n"].join('');
    app.use(o.rpcPath, rpc(express, '/helper.js', clientName, service));
    console.log(script);
    return script;
});
var fs = require('fs');
var rpcJadePath = __dirname + '/views/include/rpc.jade';
try {
    fs.unlinkSync(rpcJadePath);
} catch (e) {
}
fs.writeFile(rpcJadePath, rpcScripts.join('\n'), function (err, x) {
});

//生成jade模板的导入script
var scriptFolder = '/javascripts/fragment';
var path = [__dirname, '/public', scriptFolder].join('');
var files = fs.readdirSync(path);
fs.writeFileSync(__dirname + '/views/include/template.jade', files.filter(function (item) {
    return item.toString().indexOf('runtime.js') === -1; //排除jade模板运行时
}).map(function (item) {
    return ['script(src="', scriptFolder, '/', item, '")\n'].join('');
}).join(''));
//var serviceList = require('./service/api/service');
//app.use('/rpc', rpc(express, '/helper.js', 'APIClient', serviceList));

// =================================================================================

/*app.use('/test_session', function (req, res, next) {
 var u = req.session.user;
 res.send(u);
 });*/

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    //next(err);
    res.render('404', {
        message: err.message,
        error: err
    });
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        console.log(err);
        res.render('500', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    console.log(JSON.stringify(err));
    res.render('500', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
