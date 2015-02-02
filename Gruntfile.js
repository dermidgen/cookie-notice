module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    copy: {
      js: {
        files: [{
          expand: true,
          cwd: 'src/www',
          src: ['*.html'],
          dest: 'www/'
        }]
      }
    },
    concat: {
      options: {
        separator: "\n"
      },
      js: {
        src: [
          'bower_components/bloxui/dist/js/bloxui.js',
          'src/www/js/**.js'
        ],
        dest: 'www/js/<%= pkg.name %>.js'
      },
      css: {
        src: [
          'bower_components/bloxui/dist/css/bloxui.css',
          'src/www/css/**.css'
        ],
        dest: 'www/css/<%= pkg.name %>.css'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        beautify: false
      },
      build: {
        files: {
          'www/js/payment-min.js': ['www/js/payment.js']
        }
      }
    },
    cssmin: {
      combine: {
        files: {
          'www/css/payment-min.css':['www/css/payment.css']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('default', ['copy','concat','uglify','cssmin']);
  grunt.registerTask('test', ['default']);
};