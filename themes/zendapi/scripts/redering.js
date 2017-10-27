/**
 * Created by liushuai <ln6265431@163.com> on 2017/10/28.
 *
 */
const minify = require('html-minifier').minify;
const UglifyJS = require('uglify-es');
var CleanCSS = require('clean-css');

hexo.extend.filter.register('after_render:html', function(str, data){
    return minify(str, {
        enable: true,
        exclude: [],
        ignoreCustomComments: [/^\s*more/],
        removeComments: true,
        removeCommentsFromCDATA: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        removeEmptyAttributes: true,
        minifyJS: true,
        minifyCSS: true
    });
});

hexo.extend.filter.register('after_render:js', function(str, data){
    var result = UglifyJS.minify(str);
    return result.code;
});

hexo.extend.filter.register('after_render:css', function (str, data) {
    var result = new CleanCSS({
        enable: true,
        exclude: ['*.min.css']
    }).minify(str);
    return result.styles;
});