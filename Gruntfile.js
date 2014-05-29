module.exports = function(grunt) {

   var jsPriority = [
         'scripts/vendors/moment.min.js',
         'scripts/vendors/ru.js',
         'scripts/vendors/angular.js',
         'scripts/vendors/angular-resource.js',
         'scripts/vendors/angular-touch.js',
         'scripts/vendors/angular-route.js',
         'scripts/vendors/mobile-nav.js',
         'scripts/vendors/angular-moment.js',
         'build/coffee-build.js',
         'build/templates.js'
      ],
      cssPriority = [
         "styles/helpers/style-"+grunt.option('style')+".less",
         "styles/helpers/mixins.less"
      ],
      coffeePriority = [
         'scripts/app.coffee',
         'scripts/routes.coffee',
         'scripts/const.coffee',
         'scripts/runs/*.coffee',
         'scripts/controllers/*.coffee',
         'scripts/directives/*.coffee',
         'scripts/filters/*.coffee',
         'scripts/services/*.coffee'
      ];

   grunt.initConfig({

      ngtemplates: {
         dev: {
            options: {
               base: '',
               module: 'App'
            },
            src: ['views/*.html', 'views/*/*.html'],
            dest: 'build/templates.js'
         }
      },

      coffee: {
         compile: {
            options: {
               join: true
            },
            files: {
               'build/coffee-build.js': coffeePriority
            }
         }
      },

      concat: {
         rel :{
            src: jsPriority,
            dest: 'build/build.js'
         }
      },


      watch: {
         js: {
            files: jsPriority,
            tasks: ['concat'] //, 'uglify'
         },

         coffee: {
            files: coffeePriority,
            tasks: ['coffee']
         },

         less: {
            files: ['styles/*.less'].concat(cssPriority),
            tasks: ['less']
         },
         html: {
            files: ['views/*.html', 'views/*/*.html'],
            tasks: ['ngtemplates:dev']
         }
      },

      uglify : {
         my_target: {
            files: {
               'build/build.js' : ['build/build.js']
            }
         }
      },

      copy: {
         main: {
            files: [
               {expand: true, src: ['fonts/**'], dest: 'phonegap/www/'},
               //{expand: true, src: ['images/**'], dest: 'phonegap/www/'},
               {expand: true, src: ['build/build.css'], dest: 'phonegap/www/'},
               {expand: true, src: ['build/build.js'], dest: 'phonegap/www/'},
               {expand: true, src: ['index.html'], dest: 'phonegap/www/'}
            ]
         }
      },

      less: {
         development: {
            options: {
               imports: {
                  less: cssPriority
               }
            },
            src:  ['styles/main.less', 'styles/*.less'],
            dest: 'build/build.css'
         }
      }
   });

   [
      'grunt-contrib-concat',
      'grunt-contrib-watch',
      'grunt-contrib-uglify',
      'grunt-angular-templates',
      'assemble-less',
      'grunt-contrib-copy',
      'grunt-contrib-coffee'
   ].forEach(function(task) {
      grunt.loadNpmTasks(task);
   });

   grunt.registerTask('default', ['ngtemplates:dev', 'coffee', 'concat', 'less', 'watch']); //, 'uglify'
   grunt.registerTask('build', ['ngtemplates:dev', 'coffee', 'concat', 'less', 'uglify', 'copy']);
};
