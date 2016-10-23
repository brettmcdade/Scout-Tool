'use strict';

module.exports = function(grunt) {

    // 1. All configuration goes here 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            dist: {
                src: [
                    'site/src/js/plugins/*.js', 
                    'site/src/js/main.js' 
                ],
                dest: 'site/src/js/production.js',
            }
        },

        uglify: {
            web: {
                src: 'site/src/js/production.js',
                dest: 'site/web/js/production.min.js'
            }
        },

        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'site/web/css/stylesheet.css': 'site/src/scss/stylesheet.scss'
                }
            } 
        },

        autoprefixer: {   
            options: {
              browsers: [
                'last 2 versions',
                'Explorer >= 9',
                'Android >= 2.3'
              ]
            },
            dist: {
              src: 'site/web/css/stylesheet.css'
            }
        },

        delete_sync : {
            dist : {
                cwd : 'site/web/images',
                src : ['**'],
                syncWith : 'site/src/images'
            }
        }, // end of delete sync

        imagemin : {
            all : {
                files : [{
                    expand : true, // Enable dynamic expansion
                    cwd: 'site/src/images/', // source images (not compressed)
                    src : ['**/*.{png,jpg,gif,svg}'], // Actual patterns to match
                    dest: 'site/web/images/' // Destination of compressed files
                }]
            }
        }, //end imagemin

        // web the site using grunt-includes
        includes: {
          web: {
            cwd: 'site/src',
            src: ['*.html', 'site/src/_includes/*.html'],
            dest: 'site/web/',
            options: {
              flatten: true,
              includePath: 'site/src'
            }
          }
        }, 

        connect: {
            server: {
              options: {
                port: 8000,
                base: 'site/web'
              }
            }
        },

        browserSync: {
            dev: {
                bsFiles: {
                    src : [
                        'site/src/*.html',
                        'site/src/_includes/*.html',
                        'site/web/*.html',
                        'site/web/_includes/*.html',
                        'site/src/*.php',
                        'site/src/_includes/*.php',
                        'site/web/css/*.css'
                    ]
                },
                options: {
                    open: true,
                    notify: true,
                    watchTask: true,
                    server: 'site/web'
                }
            }
        },

        watch: {

            scripts: {
                files: ['site/src/js/*.js', 'site/src/js/plugins/*.js'],
                tasks: ['concat', 'uglify'],
                options: {
                  spawn: false,
                },
            },

            css: {
                files: ['site/src/scss/*.scss', 'site/src/scss/**/*.scss'],
                tasks: ['sass','autoprefixer'],
                options: {
                  spawn: false,
                }
            },

            images: {
                files: ['site/src/images/*.{png,jpg,gif,svg}'],
                tasks: ['newer:imagemin']
            }, /* watch images added to src */

            deleting: {
                files: ['site/src/images/*.{png,jpg,gif,svg}'],
                tasks: ['delete_sync']
            }, /* end of delete sync*/

            includes: {
                files: ['site/src/*.html', 'site/web/*.html', 'site/src/_includes/*.html'],
                tasks: ['includes'],
                options: {
                    spawn: false,
                }
            }
        },


    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-connect');   
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-delete-sync');
    grunt.loadNpmTasks('grunt-includes');

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['browserSync', 'includes', 'connect', 'concat', 'watch']);

};