module.exports = function (express, helperUrl, rpcClientClassName, remoteObj) {

    var Mustache = require('mustache');
    var fs = require('fs');

    var rpcRouter = express.Router();

    rpcRouter.get('/test', function (req, res) {
        res.send(200, "test successful...");
    });

    rpcRouter.get(helperUrl, function (req, res) {

        var port = (process.env.lrs_PORT || '8080');

        var data = {
            RPCClientClassName: rpcClientClassName,
            methods: [],
            port: port,
            host: req.host
        };

        for (method in remoteObj) {
            if (typeof(remoteObj[method]) === 'function') {
                data.methods.push({method_name: method});
            }
        }

        var helperTemplatePath = require('path').resolve(__dirname, 'helper.mustache');

        var jsContent = Mustache.render(fs.readFileSync(helperTemplatePath).toString(), data);

        res.end(jsContent);
    });


    rpcRouter.post('/:method', function (req, res) {
        var method = req.params.method;
        var args = JSON.parse(req.body.args);
        console.log('params:');
        console.log(req.body.args);

        if (remoteObj.hasOwnProperty(method) && typeof(remoteObj[method]) === 'function') {
            var fn = remoteObj[method];
            args.push(function (err, result) {
                var param = {
                    err: err,
                    data: result
                };

                res.set('Content-Type', 'application/json');
                var json = JSON.stringify(param);
                console.log('return:');
                console.log(json);
                res.send(200, json);
            });

            remoteObj.request = req;
            fn.apply(remoteObj, args);
        } else {
            res.send(500);
        }

    });

    return rpcRouter;


};