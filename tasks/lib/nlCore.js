/**
 * Created by gzq on 14-2-25.
 */
exports.core = function () {
    var $NL = {};
    $NL.script={};
    $NL.script.jsmaps=[];
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
        $NL.script.jsmaps=$NL.script.jsmaps.concat(arr);
    }
    return $NL;
}