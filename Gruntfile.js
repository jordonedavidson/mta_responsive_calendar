module.exports = function(grunt) {
 
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        meta: {
			banner: '/*!\n' +
				' * <%= pkg.title %> v<%= pkg.version %>\n' +
				' * Copyright <%= grunt.template.today("yyyy") %>, <%= pkg.author.name %>\n' +
				' * <%= pkg.homepage %>\n' +
				' * This content is released under the <%= pkg.license %> license\n' +
				' * <%= grunt.template.today("dd-mm-yyyy") %>\n' +
				' */\n\n',
			microbanner: '/*! <%= pkg.name %> v<%= pkg.version %> | Copyright <%= grunt.template.today("yyyy") %>, <%= pkg.author.name %> | <%= pkg.homepage %> | <%= _.pluck(pkg.licenses, "url").join(", ") %> */\n'
		},
        sass: {
            dist: {
                options: { style: 'expanded' },
                files: {
                    'src/theme_bootstrap.css' : 'src/scss/theme.scss'
                }
            }
        },
        concat: {
            options: {
                banner: '<%= meta.banner %>'
            },
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
              banner: '<%= meta.microbanner %>',
              sourceMap: true
            },
            build: {
              src: 'assets/js/<%= pkg.name %>.js',
              dest: 'assets/js/<%= pkg.name %>.min.js'
            }
          },
        cssmin: {
            options: {
                banner: '<%= meta.microbanner %>' ,
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