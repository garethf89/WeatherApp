module.exports = function (grunt) {

	var data = {
		pkg: grunt.file.readJSON('package.json'),
		paths: {
			src:{
				root:"",
				css:"src/css",
				scss:"src/css",
				js:"src/js",
				img:"src/images",
                bower: "bower_components"
			},
			dest:{
				root:"",
				css:"prod",
				js:"",
				img:"images",
			}
		},
        url: "index.html"
	};
    
    
    // measures the time each task takes
    require('time-grunt')(grunt);
    require('load-grunt-config')(grunt,{data: data});
};