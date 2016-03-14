/**
 * Created by fy on 15-9-13.
 */
'use strict';


var fs = require('fs');

module.exports = function (grunt) {


    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        babel: {
            options: {
                sourceMap: false,
                experimental: true
            },
            dist: {
                files: {
                    'test/es7-test.js': 'test/es7-test.es7.js'
                }
            }
        },
        watch: {
            /*scripts: {
             files: ['test/es7-test.es7.js'],
             tasks: ['babel'],
             options: {
             spawn: false
             }
             },*/
            scripts: {
                files: ["**/**/fragment/*.jade"],
                tasks: ['jade', 'includeTemplateScript'],
                options: {
                    spawn: false
                }
            }/*,
             live: {
             files: '**!/!*',
             options: {
             livereload: true /!*35729*!/
             }
             }*/
        },
        jade: {
            node: {
                src: ["**/**/fragment/*.jade"],
                dest: 'public/javascripts/fragment',
                options: {
                    client: true,
                    compileDebug: false
                }
            }
        },
        uglify: {
            my_client: {
                files: [{
                    expand: true,
                    cwd: 'public/',
                    src: ['**/*.js', '!**/*.min.js'],
                    dest: '../dest/lrs/public'
                }]
            },
            my_server: {
                files: {
                    '../dest/lrs/config/db.js': ['config/db.js'],
                    '../dest/lrs/lib/date/index.js': ['lib/date/index.js'],
                    '../dest/lrs/lib/pager/select-pager.js': ['lib/pager/select-pager.js'],
                    '../dest/lrs/lib/pdf/index.js': ['lib/pdf/index.js'],
                    '../dest/lrs/lib/pinyin/index.js': ['lib/pinyin/index.js'],
                    '../dest/lrs/lib/utils.js': ['lib/utils.js'],
                    //'../dest/lrs/lib/myfs/digui.js': ['lib/myfs/digui.js'],
                    '../dest/lrs/routes/book/category.js': ['routes/book/category.js'],
                    '../dest/lrs/routes/book/pdf.js': ['routes/book/pdf.js'],
                    '../dest/lrs/routes/user/index.js': ['routes/user/index.js'],
                    '../dest/lrs/routes/import/index.js': ['routes/import/index.js'],
                    '../dest/lrs/routes/about.js': ['routes/about.js'],
                    '../dest/lrs/routes/index.js': ['routes/index.js'],
                    '../dest/lrs/service/api/service.js': ['service/api/service.js'],
                    '../dest/lrs/service/book/category.js': ['service/book/category.js'],
                    '../dest/lrs/service/book/pdf.js': ['service/book/pdf.js'],
                    '../dest/lrs/service/user/index.js': ['service/user/index.js'],
                    //'../dest/lrs/service/import/index.js': ['service/import/index.js'],
                    '../dest/lrs/app.js': ['app.js']
                }
            }
        },
        cssmin: {
            files: {
                expand: true,
                cwd: 'public',
                src: ['**/*.css', '!**/*.min.css'],
                dest: '../dest/lrs/public'
                //ext: '.css'
            }
        },
        copy: {
            my_erweima: {
                flatten: true,
                src: 'public/erweima/shu.png',
                dest: '../dest/lrs/'
            },
            my_pdf_img: {
                flatten: true,
                src: 'public/files/**/*.txt',
                dest: '../dest/lrs/'
            },
            my_sql: {
                flatten: true,
                src: 'config/init-db.sql',
                dest: '../dest/lrs/'
            },
            my_img: {
                flatten: true,
                src: 'public/assets/images/*',
                dest: '../dest/lrs/'
            },
            my_package: {
                flatten: true,
                src: 'package.json',
                dest: '../dest/lrs/package.json'
            },
            my_rpc: {
                flatten: true,
                src: 'lib/rpc/**/*',
                dest: '../dest/lrs/'
            },
            my_views: {
                flatten: true,
                src: 'views/**/*',
                dest: '../dest/lrs/'
            },
            my_css: {
                flatten: true,
                src: 'public/**/*.min.css',
                dest: '../dest/lrs/'
            },
            my_js: {
                flatten: true,
                src: 'public/**/*.min.js',
                dest: '../dest/lrs/'
            },
            my_unzip: {
                flatten: true,
                src: 'lib/unzip/**/*',
                dest: '../dest/lrs/'
            },
            // fixme 这个地方可能有问题
            //my_node_modules: {
            //    flatten: true,
            //    src: 'node_modules/**/*',
            //    dest: '../dest/lrs/'
            //},
            my_font: {
                flatten: true,
                src: 'public/**/font/*',
                dest: '../dest/lrs/'
            },
            my_main: {
                flatten: true,
                src: 'index',
                dest: '../dest/lrs/index'
            },
            my_digui: {
                flatten: true,
                src: 'lib/myfs/digui.js',
                dest: '../dest/lrs/'
            },
            my_import: {
                flatten: true,
                src: 'service/import/index.js',
                dest: '../dest/lrs/'
            },
            my_excel: {
                flatten: true,
                src: 'public/excel/用户导入模板.xlsx',
                dest: '../dest/lrs/'
            },
            my_zip: {
                flatten: true,
                src: 'public/zip/zip-upload-template.zip',
                dest: '../dest/lrs/'
            }
        }
    });

    //require('load-grunt-tasks')(grunt);

    //grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-jade-runtime');

    //grunt.registerTask('my-babel-watch', 'watch');
    grunt.registerTask('default', ['cssmin', 'uglify', 'copy']);
    grunt.registerTask('watch', ['jade', 'watch']);

    grunt.registerTask('includeTemplateScript', '自动生成模板导入script', function () {
        var scriptFolder = '/javascripts/fragment';
        var path = [__dirname, '/public', scriptFolder].join('');
        var files = fs.readdirSync(path);
        fs.writeFileSync(__dirname + '/views/include/template.jade', files.filter(function (item) {
            return item.toString().indexOf('runtime.js') == -1; //排除jade模板运行时
        }).map(function (item) {
            return ['script(src="', scriptFolder, '/', item, '")\n'].join('');
        }).join(''));
    });

};