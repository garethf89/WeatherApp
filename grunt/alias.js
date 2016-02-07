module.exports = function (grunt) {

    grunt.registerTask('default', ["concurrent:dev"]);
    
    grunt.registerTask('build', ['sass','cssmin','newer:imagemin']);
        
};