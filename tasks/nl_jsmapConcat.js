/*
 * grunt-nl-jsmapConcat
 * https://github.com/guozqiu/grunt-nl-jsmapConcat
 *
 * Copyright (c) 2014 gzq
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
    // Internal lib.
    var comment = require('./lib/comment').init(grunt);

    grunt.registerMultiTask('nl_jsmapConcat', 'Concatenate jsmap files.', function () {
        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            separator: grunt.util.linefeed,
            banner: '',
            footer: '',
            stripBanners: false,
            process: false
        });

        // Normalize boolean options that accept options objects.
        if (options.stripBanners === true) {
            options.stripBanners = {};
        }
        if (options.process === true) {
            options.process = {};
        }

        // Process banner and footer.
        var banner = grunt.template.process(options.banner);
        var footer = grunt.template.process(options.footer);
        var $NL = require('./lib/nlCore.js').core(grunt,comment,banner,footer,options);
//
//      var ad=[1,2];
//      var bd=[3.4];
//      //ad.push(3);
//      ad=ad.concat(bd);
//      grunt.log.writeln(ad.length);
        // Iterate over all src-dest file pairs.
        this.files.forEach(function (f) {
            $NL.f=f;
            // Concat banner + specified files + footer.
            f.src.filter(function (filepath) {
                // Warn on and remove invalid source files (if nonull was set).
                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('Source file "' + filepath + '" not found.');
                    return false;
                } else {
                    return true;
                }
            }).map(function (filepath) {
                    grunt.log.writeln("filepath:" + filepath);
                    // Read file source.
                    var jsmap = grunt.file.read(filepath);
                    eval(jsmap);
                    //grunt.log.write($NL.script.jsmaps[0].key);
                });
//          grunt.log.writeln("eval");
//          grunt.log.writeln($NL.script.jsmaps[0].key);
//            if (!!$NL.script.jsmaps && $NL.script.jsmaps.length > 0) {
//                grunt.log.writeln("length:" + $NL.script.jsmaps.length);
//                for (var i = 0; i < $NL.script.jsmaps.length; i++) {
//                    var a = $NL.script.jsmaps[i];
//                    if (a.src.length > 0) {
//                        var src = banner;
//                        for (var k = 0; k < a.src.length; k++) {
//                            var m = a.src[k];
//                            var url = "./" + m.url;
//                            if (grunt.file.exists(url)) {
//                                // grunt.log.writeln("file:"+m.url);
//                                var sf = grunt.file.read(url);
//                                //grunt.log.writeln(sf);
//                                // Process files as templates if requested.
//                                if (typeof options.process === 'function') {
//                                    sf = options.process(sf, url);
//                                } else if (options.process) {
//                                    sf = grunt.template.process(sf, options.process);
//                                }
//                                // Strip banners if requested.
//                                if (options.stripBanners) {
//                                    sf = comment.stripBanner(sf, options.stripBanners);
//                                }
//                                src += sf + options.separator;
//                            }
//                        }
//                        src += footer;
//                        // Write the destination file.
//                        grunt.file.write(f.dest + "/" + a.compress, src);
//
//                        // Print a success message.
//                        grunt.log.writeln('File "' + f.dest + "/" + a.compress + '" created.');
//                    }
//                }
//            }
        });
    });

};
