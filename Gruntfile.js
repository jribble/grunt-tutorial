module.exports = function(grunt){

	grunt.initConfig({
		
		//Stylus Task
		stylus:{
			compile:{
				files:{
					'css/app.css' : 'css/app.styl'
				}
			}
		},

		clean:{	
			build: 'build',
			tempbuild : 'build/temp'
		},

		//concat our files
		concat:{
			js:{
				src:[
					'js/angular.js',
					'build/temp/app.js',
					'build/temp/**/*.js',
					'build/temp/templates.js'
				],
				dest:'build/app.js'
			},
			css:{
				src:['css/**/*.css'],
				dest:'build/app.css'
			}
		},

		//minify our files
		uglify:{
			app:{
				src:['build/app.js'],
				dest:'build/app.js'
			}
		},

		//remove the scripts from our index, and replace with the concat'd min'd file
		htmlrefs:{
			options: {
				file: { 
					buildNumber: 47878 //todo generate unique from contents of file for each file
				}
			},
      		build: {
				src: 'index.html',
				dest: 'build/'
			}
		},

		//compile our templates so that they can be inlined
		ngtemplates:{
			app:{
				src:['templates/**/*.html'],
				dest:'build/temp/templates.js'
			}
		},

		//make the angular dependences build safe
		ngmin: {
			app: {
				expand: true,
				cwd: 'js',
				src: ['**/*.js', '!angular.js'],
				dest: 'build/temp'
			}
		},

		//minify the HTML file (index.html)
		htmlmin: {
			index: {
				options: {
					removeComments: true, //doesn't remove IE comments
					collapseWhitespace: true
				},
				files: {
					'build/index.html': 'build/index.html'
				}
			}
		},
		cssmin: {
		  add_banner: {
		    options: {
		      banner: '/* RWX MINIFIED CSS */',
		      keepSpecialComments:0
		    },
		    files: {
		      'build/app.css': ['build/app.css']
		    }
		  }
		},
		imagemin: {                          // Task
			dynamic: {                         // Another target
			  files: [{
			    expand: true,                      // Enable dynamic expansion
			    src: ['img/**/*.{png,jpg,gif}'],   // Actual patterns to match
			    dest: 'build/'                     // Destination path prefix
			  }]
			}
		},

		//Regarde Task
		regarde:{
			js:{
				files:['js/**/*.js', '**/*.html'],
				tasks:['livereload']
			},
			css:{
				files:['css/**/*.css'],
				tasks:['livereload']
			},
			stylus:{
				files:['css/**/*.styl'],
				tasks:['stylus']
			}
		},

		//Tiny LR server for Livereload
		connect: {
	      livereload: {
	        options: {
	          port: 9001,
	          middleware: function(connect, options) {
	            return [require('grunt-contrib-livereload/lib/utils').livereloadSnippet, (function(c,p) {
	              return c.static(require('path').resolve(p));})(connect, '.')]
	          }
	        }
	      }
	    },

        karma: {
            unit: {
                configFile: 'karma.conf.js'
            }
        }
	});

	//Live reload tasks
	grunt.loadNpmTasks('grunt-regarde');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-livereload');
	//grunt plugins
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-stylus');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-angular-templates');
	grunt.loadNpmTasks('grunt-clear');
	grunt.loadNpmTasks('grunt-htmlrefs');
	grunt.loadNpmTasks('grunt-simple-mocha');
	grunt.loadNpmTasks('gruntacular');
	grunt.loadNpmTasks('grunt-release');
	grunt.loadNpmTasks('grunt-ngmin');
    grunt.loadNpmTasks('grunt-karma');


	//OUR TASKS
	/*
		Added imagemin
			- run 'grunt build'
			- checkout the build dir afterwards, see the index.html
			


		1 - clean:build - cleans out the build directory
		2 - stylus - compile our stylus stuff, incase we didn't have regarde running
		3 - ngtemplates - precompiled the templates
		4 -	ngmin - MAKE ALL ANGULAR DEPENDENCIES ALL BUILD SAFE 
		5 - concat - concat all our js/css files into one
		6 - uglify - minifiy and obfuscate our js
		7 - htmlrefs - remove/replace specified html pieces during the build
		8 - htmlmin - MINIFY OUR HTML, SO THAT IT IS AS COMPACT AS POSSIBLE
		8 - cssmin - MINIFY OUR CSS, SO THAT IT IS AS COMPACT AS POSSIBLE
		8 - imagemin - MINIFY OUR IMAGES, SO THAT IT IS AS COMPACT AS POSSIBLE
		9 - clean:tempbuild - remove temp build dir
	*/
	grunt.registerTask('build',['clean:build', 'stylus', 'ngtemplates', 'ngmin:app', 'concat', 'uglify', 'htmlrefs', 'htmlmin', 'cssmin', 'imagemin', 'clean:tempbuild']);
	grunt.registerTask('dev',['livereload-start', 'connect', 'regarde']);

}

