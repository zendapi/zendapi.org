/**
 * Created by liushuai <ln6265431@163.com> on 2017/11/2.
 *
 */

hexo.extend.console.register('qiniu', 'update static file to qiniu', function (args) {
    var fs = require('fs');
    var path = require('path');
    var log = hexo.log;
    global.colors = require('colors');
    var config = hexo.config.qiniu;

    var qiniu = require('qiniu');
    var local_dir = path.dirname(__dirname);

    var dirPrefix = 'public';

    var need_upload_nums = 0;

    qiniu.conf.ACCESS_KEY = config.access_key;
    qiniu.conf.SECRET_KEY = config.secret_key;

    if(config.up_host){
        qiniu.conf.UP_HOST = config.up_host;
    }

    var bucket = config.bucket

    function getEtag(buffer,callback){

        // 判断传入的参数是buffer还是stream还是filepath
        var mode = 'buffer';

        if(typeof buffer === 'string'){
            buffer = require('fs').createReadStream(buffer);
            mode='stream';
        }else if(buffer instanceof require('stream')){
            mode='stream';
        }

        // sha1算法
        var sha1 = function(content){
            var crypto = require('crypto');
            var sha1 = crypto.createHash('sha1');
            sha1.update(content);
            return sha1.digest();
        };

        // 以4M为单位分割
        var blockSize = 4*1024*1024;
        var sha1String = [];
        var prefix = 0x16;
        var blockCount = 0;

        switch(mode){
            case 'buffer':
                var bufferSize = buffer.length;
                blockCount = Math.ceil(bufferSize / blockSize);

                for(var i=0;i<blockCount;i++){
                    sha1String.push(sha1(buffer.slice(i*blockSize,(i+1)*blockSize)));
                }
                process.nextTick(function(){
                    callback(calcEtag());
                });
                break;
            case 'stream':
                var stream = buffer;
                stream.on('readable', function() {
                    var chunk;
                    while (chunk = stream.read(blockSize)) {
                        sha1String.push(sha1(chunk));
                        blockCount++;
                    }
                });
                stream.on('end',function(){
                    callback(calcEtag());
                });
                break;
        }

        function calcEtag(){
            if(!sha1String.length){
                return 'Fto5o-5ea0sNMlW_75VgGJCv2AcJ';
            }
            var sha1Buffer = Buffer.concat(sha1String,blockCount * 20);

            // 如果大于4M，则对各个块的sha1结果再次sha1
            if(blockCount > 1){
                prefix = 0x96;
                sha1Buffer = sha1(sha1Buffer);
            }

            sha1Buffer = Buffer.concat(
                [new Buffer([prefix]),sha1Buffer],
                sha1Buffer.length + 1
            );

            return sha1Buffer.toString('base64')
                .replace(/\//g,'_').replace(/\+/g,'-');

        }

    }

//构造上传函数
    function uploadFile(key, localFile) {
        var putPolicy = new qiniu.rs.PutPolicy(bucket+":"+key);
        var uptoken = putPolicy.token();
        var extra = new qiniu.io.PutExtra();
        log.i(bucket, key, localFile)
        qiniu.io.putFile(uptoken, key, localFile, extra, function(err, ret) {
            if(!err) {
                // 上传成功， 处理返回值
                //console.log(ret.hash, ret.key, ret.persistentId);
            } else {
                // 上传失败， 处理返回代码
                console.log(err);
            }
        });
    }

//构建bucketmanager对象
    var client = new qiniu.rs.Client();



    /**
     * 上传前预先检查
     * file为本地路径(绝对路径或相对路径都可)
     * name为远程文件名
     */
    var check_upload = function (file, name) {
        //uploadFile(config.bucket, file.replace(/\\/g, '/'), name);

        //获取文件信息
        client.stat(config.bucket, name, function(err, ret) {

            if (!err) {
                //console.log(ret.hash, ret.fsize, ret.putTime, ret.mimeType);
                getEtag(file, function (hash) {

                    if(hash != ret.hash){
                        // 不更新已存在的，忽略
                        if (!config.update_exist) {
                            log.i('Don\'t upload exist file: '.yellow + file);
                            return;
                        }

                        need_upload_nums++;
                        log.i('Need upload update file: '.yellow + file);
                        uploadFile(name, file);
                    } else {
                        log.i('Don\'t upload unchange file: '.cyan + file);
                    }

                });

            } else {

                // 文件不存在
                if(err.code == 612){
                    uploadFile(name, file);
                }else{
                    log.e('get file stat err: '.cyan + name + '\n' + err);
                }
            }
        });
    };

    /**
     * 遍历目录进行上传
     */
    var sync = function (dir) {
        if (!dir) {
            dir='';
            log.i('Now start qiniu sync.'.yellow);
            return;
        }
        var files = fs.readdirSync(path.join(local_dir, dirPrefix, dir));
        files.forEach(function(file)  {
            var fname = path.join(local_dir, dirPrefix + '', dir + '', file + '');

            var stat = fs.lstatSync(fname);
            if(stat.isDirectory() == true) {
                sync(path.join(dir + '', file + ''));
            } else  {
                var name = path.join(dir, file).replace(/\\/g, '/').replace(/^\//g, '');
                check_upload(fname, name);
            }
        })
    };

    sync('statics/css');
    sync('statics/fonts');
    sync('statics/images');
    sync('statics/js');
});