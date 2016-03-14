/**
 * Created by yinbin on 2016/3/11.
 */

var settingService = require('../service/settings');

settingService.getGameSettings(function (err, result) {
    console.log(JSON.stringify(result));
});

settingService.getGameOffices(function (err, result) {
    console.log(JSON.stringify(result));
});