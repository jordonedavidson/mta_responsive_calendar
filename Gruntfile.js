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
                    'src/theme_bootstrap.css',
                    'src/theme.css'
                    ],
                dest : 'assets/css/<%= pkg.name %>.css'
            },
            js : {  
                src : [
                    'node_modules/jquery/dist/jquery.js',
                    'node_modules/bootstrap/dist/js/bootstrap.bundle.js',
                    '/src/theme.js'
                    ],
                dest : 'assets/js/<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
              banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
              src: 'assets/js/<%= pkg.name %>.js',
              dest: 'assets/js/<%= pkg.name %>.min.js'
            }
          }

    });

    // load the task handlers
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask(
        'default',
        ['sass', 'concat']
    );

    grunt.registerTask(
        'production',
        ['uglify']
    )

};