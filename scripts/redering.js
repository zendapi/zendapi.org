/**
 * Created by liushuai <ln6265431@163.com> on 2017/10/28.
 *
 */

var cdnUrlPrefix = '/statics/';
var args = process.argv;
var hasQn = args.indexOf('qiniu');
if (hasQn > -1) {
    hexo.config.staticDir = hexo.config.qiniu.cdnUrlPrefix;
    cdnUrlPrefix=hexo.config.qiniu.cdnUrlPrefix;
}
function qiniucss(css) {
    var ret = '';
    for (var i=0; i<arguments.length; i++) {
        var url = cdnUrlPrefix + arguments[i] +"?"  + Date.parse(new Date());
        ret += '<link rel="stylesheet" href="' + url + '" />';
    }
    return ret;
}
function qiniujs(js) {
    var ret = '';
    for (var i=0; i<arguments.length; i++) {
        var url = cdnUrlPrefix + arguments[i] +"?"  + Date.parse(new Date());
        ret += '<script src="' + url + '"></script>';
    }
    return ret;
}
function qiniuimg(img, className = '', style='') {
    var ret = '';
    if (className != '') {
        className = 'class="' + className + '"';
    }
    var url = cdnUrlPrefix + img + "?" + Date.parse(new Date());
    ret += '<img src="' + url + '" ' + className + ' style="' + style +'"/>';
    return ret;
}
hexo.extend.helper.register('qiniucss', qiniucss);
hexo.extend.helper.register('qiniujs', qiniujs);
hexo.extend.helper.register('qiniuimg', qiniuimg);
