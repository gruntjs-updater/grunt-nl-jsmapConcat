/**
 * Created by gzq on 14-2-25.
 */
exports.core = function (grunt,comment,banner,footer,options) {
    var $NL = {};
    $NL.script={};
    $NL.script.jsmaps=[];
    $NL.f=null;
    /**
     * 判断一个变量是否是Function类型
     * @param {Object} fn 要判断的变量
     * @return {Boolean}
     */
    function isFunction(fn) {
        return (typeof fn == 'function') || (fn instanceof Function);
    }

    $NL.defined = function () {
        var ns = arguments[0], ref, fun, nsObj;
        if (arguments.length == 2) {
            fun = arguments[1];
        } else if (arguments.length == 3) {
            ref = arguments[1];
            fun = arguments[2];
            if (typeof (ref) == "string") ref = [ref];
        }
        if (isFunction(fun)) {
            return fun();
        }
        return null;
    }
    $NL.cls = function () {
        var fun = null;
        if (arguments.length == 1) {
            fun = arguments[0];
        }
        else if (arguments.length == 2) {
            fun = arguments[1];
        }
        else if (arguments.length == 3) {
            fun = arguments[2];
        }

        if (isFunction(fun)) {
            return fun();
        }
    }

    $NL.script.pushMap=function(arr){
        //$NL.script.jsmaps=$NL.script.jsmaps.concat(arr);
        $NL.script.jsmaps=arr;
        if(arr[0].key=="admin_jsmapModule"){
            grunt.log.writeln(arr[0].compress);
        }
        if (!!$NL.script.jsmaps && $NL.script.jsmaps.length > 0) {
            //grunt.log.writeln("length:" + $NL.script.jsmaps.length);
            for (var i = 0; i < $NL.script.jsmaps.length; i++) {
                var a = $NL.script.jsmaps[i];
                if (a.src.length > 0) {
                    var src = banner;
                    for (var k = 0; k < a.src.length; k++) {
                        var m = a.src[k];
                        var url = "./" + m.url;
                        if (grunt.file.exists(url)) {
                            // grunt.log.writeln("file:"+m.url);
                            var sf = grunt.file.read(url);
                            //grunt.log.writeln(sf);
                            // Process files as templates if requested.
                            if (typeof options.process === 'function') {
                                sf = options.process(sf, url);
                            } else if (options.process) {
                                sf = grunt.template.process(sf, options.process);
                            }
                            // Strip banners if requested.
                            if (options.stripBanners) {
                                sf = comment.stripBanner(sf, options.stripBanners);
                            }
                            src += sf + options.separator;
                        }
                    }
                    src += footer;
                    // Write the destination file.
                    grunt.file.write($NL.f.dest + "/" + a.compress, src);

                    // Print a success message.
                    grunt.log.writeln('File "' + $NL.f.dest + "/" + a.compress + '" created.');
                }
            }
        }
    }
    return $NL;
}