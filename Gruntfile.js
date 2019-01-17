//# Grunt
//
//* Task manager

module.exports = function (grunt) {
    'use strict';

    // require('time-grunt')(grunt);
    // require('jit-grunt')(grunt, {
    //     sprite: 'grunt-spritesmith'
    // });

    const sass = require('node-sass');

    require('jit-grunt')(grunt);

    grunt.initConfig({
        //## Vars

        //### Paths
        pApp:   '.',

        //#### Templates
        pTpl:       '<%= pApp %>/twig',
        pTplData:   '<%= pTpl %>/_data',

        //#### Source

        pScss:      '<%= pApp %>/scss',
        pCss:       '<%= pApp %>/css',


        //## Setting Tasks

        //### Browser Sync
        browserSync: {
            dev: {
                options: {
                    watchTask: true,
                    // ghostMode: false,

                    server: {
                        directory:  true,

                        baseDir:    '<%= pApp %>/'
                    }
                },

                bsFiles: {
                    src : [
                        '<%= pApp %>/*.html',

                        '<%= pCss %>/*.css',
                        // '<%= pApp %>/js/**/*.js', //**atomTODO: update this

                        // '<%= pCssPub %>/*.css'
                    ]
                },
            }
        },

        //### Twig Render
        twigRender: {

            //#### Twig Devel
            app: {
                files : [{
                    expand: true,

                    data:   '<%= pTplData %>/datafile.yml',
                    cwd:    '<%= pTpl %>/pages/',
                    src:    '*',
                    dest:   '<%= pApp %>/',
                    ext:    '.html',
                }]
            },
        },

        //### Prettify
        prettify: {
            options: {
                indent: 4
                // preserve_newlines: true,
                // max_preserve_newlines: 1
            },

            app: {
                expand: true,

                src:    '<%= pAppTpl %>/*',
                ext:    '.html'
            },
        },

        //### Sass
        sass: {
            //#### Sass Bootstrap
            bs: {
                options: {
                    implementation: sass,
                    sourceMap: true,
                    sourceMapFilename:  '<%= pCss %>/bs.map',
                    sourceMapBasepath:  '<%= pApp %>',
                    sourceMapRootpath:  '../',
                    sourceMapURL:       'bs.map',
                },

                files: {
                    '<%= pCss %>/bs.css': [
                        '<%= pScss %>/bs.scss',
                    ]
                }
            },

            //#### Sass App
            app: {
                options: {
                    implementation: sass,
                    sourceMap: true,
                    sourceMapFilename:  '<%= pCss %>/app.map',
                    sourceMapBasepath:  '<%= pApp %>',
                    sourceMapRootpath:  '../',
                    sourceMapURL:       'app.map',
                },

                files: {
                    '<%= pCss %>/app.css': [
                        '<%= pScss %>/app.scss'
                    ]
                }
            },
        },

        //### Autoprefixer
        autoprefixer: {
            options: {
                browsers: ['last 3 versions']
            },

            app: {
                options: {
                    map: {
                        prev: '<%= pCss %>'
                    }
                },

                files: [{
                    expand: true,
                    src:    '<%= pCss %>/*.css'
                }]
            },
        },

        // cssmin: {
        //     options: {
        //         level: 2,
        //         roundingPrecision: false
        //         // format: 'keep-breaks'
        //     },

        //     pubDev: {
        //         files: {
        //             '<%= pPub %>/_css/bs.min.css':    ['<%= pPub %>/_css/bs.min.css'],
        //             '<%= pPub %>/_css/app.min.css':   ['<%= pPub %>/_css/app.min.css']
        //         }
        //     },

        //     public: {
        //         files: {
        //             '<%= pCssPub %>/bs.min.css':    ['<%= pDumpPub %>/bs.uncss.css'],
        //             '<%= pCssPub %>/app.min.css':   ['<%= pDumpPub %>/app.uncss.css']
        //         }
        //     },
        // },

        //### Watch
        watch: {
            options: {
                livereload: true,
                spawn:      false,
            },

            //#### Watch Twig App
            appTpl: {
                files: [
                    '<%= pTpl %>/**/*',
                ],

                tasks: ['twigRender:app'] // 'prettify:app'
            },

            //#### Watch Sass App Scr
            bsSass: {
                files: [
                    '<%= pScss %>/set/*',

                    '<%= pScss %>/bs.scss',
                ],

                //**atomTODO: update autoprefixer
                tasks: [
                    'sass:bs',
                    'autoprefixer:app'
                ]
            },

            //#### Watch Sass App
            appScss: {
                files: [
                    '<%= pScss %>/set/*',

                    //** Tsn layouts
                    '<%= pScss %>/app.scss',
                    '<%= pScss %>/components/**/*'
                ],

                //**atomTODO: update autoprefixer
                tasks: [
                    'sass:app',
                    'autoprefixer:app'
                ]
            },

            //#### Watch Sass App
            // js: {
            //     files: [
            //         '<%= pApp %>/js/build/*',
            //     ]
            // },
        },
    });

    //* Register tasks
    grunt.registerTask('default', [
        'browserSync',
        'watch'
    ]);
};
