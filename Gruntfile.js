module.exports = function(grunt) {
 
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            dist: {
                options: { style: 'expanded' },
                files: {
                    'src/theme_bootstrap.css' : 'src/scss/theme.scss'
                }
            }
        },
        concat: {
            css : { 
                src : [
                    'src/jquery-ui.css',
                    'src/theme_bootstrap.css',
                    'src/theme.css'
                    ],
                dest : 'assets/css/<%= pkg.name %>.css'
            },
            js : {  
                src : [
                    'node_modules/jquery/dist/jquery.js',
                    'src/jquery-ui.js',
                    'node_modules/jquery-touchswipe/jquery.touchSwipe.js',
                    'node_modules/bootstrap/dist/js/bootstrap.bundle.js',
                    'src/theme.js'
                    ],
                dest : 'assets/js/<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
              banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
              sourceMap: true
            },
            build: {
              src: 'assets/js/<%= pkg.name %>.js',
              dest: 'assets/js/<%= pkg.name %>.min.js'
            }
          },
        cssmin: {
            options: {
                sourceMap: true
            },
            target: {
                files: [{
                    expand: true,
                    cwd: 'assets/css',
                    src: ['<%= pkg.name %>.css'],
                    dest: 'assets/css',
                    ext: '.min.css'
                }]
            }
        },
        watch: {
            sass: {
                files: 'src/scss/*.scss',
                tasks: ['sass']
            },
            css: {
                files: 'src/*.css',
                tasks: ['concat:css']
            },
            js: {
                files: 'src/*.js',
                tasks: ['jshint', 'concat:js']
            }
        },
        jshint: {
            files: ['src/theme.js']
        }
    });

    // load the task handlers
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask(
        'default',
        ['sass', 'concat']
    );

    grunt.registerTask(
        'production',
        ['uglify', 'cssmin']
    )

};