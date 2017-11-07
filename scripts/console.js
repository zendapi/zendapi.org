/**
 * Created by liushuai <ln6265431@163.com> on 2017/11/7.
 *
 */
hexo.extend.console.register('qndeploy', 'deploy project use qiniu', function (args) {
    hexo.on('deployAfter', function(){
        console.log('aaaaaaaaaaaaaa啊啊发生地方阿斯顿发');
        hexo.call('qiniu',{});
    });
    hexo.config.staticDir = hexo.config.qiniu.cdnUrlPrefix;
    hexo.call('deploy',{
        g: true
    });
});

hexo.extend.console.register('qnserver', 'deploy project use qiniu', function (args) {
    hexo.config.staticDir = hexo.config.qiniu.cdnUrlPrefix;
    hexo.call('server',{});
});