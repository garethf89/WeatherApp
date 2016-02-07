module.exports = {
    css: {
        files: ['src/css/*.css', 'src/css/*.scss'],
        tasks: ['sass','cssmin'],
        options: {
            spawn: false,
            livereload: true
        },
    }
};