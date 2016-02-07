module.exports = {
    dist: {
        files: [
            {
                expand: true,
                cwd: "<%= paths.src.css %>",
                src: "*.scss",
                dest: "<%= paths.src.css %>",
                ext: ".css"
                }
            ]
    }
};