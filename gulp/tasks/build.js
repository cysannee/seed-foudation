var gulp = require('gulp'),
    imagemin = require('gulp-imagemin'),
    del = require('del'),
    usemin = require('gulp-usemin'),
    rev = require('gulp-rev'),
    cssnano = require('gulp-cssnano'),
    babel = require('gulp-babel'),
    uglify = require('gulp-uglify'),
    browserSync = require('browser-sync').create();   

gulp.task('watchBuild', function() {
    browserSync.init({ /* configurations for browserSync */
        notify: false, /* removes notifications in upper right corner */
        server: {
            baseDir: 'docs' /* what folder to show in browser */
        }
    });
});

gulp.task('deleteDistFolder', ['icons'], function() {
    return del('./docs');
});

gulp.task('copyGeneralFiles', ['deleteDistFolder'], function() {
    var pathsToCopy = [
        './src/**/*',
        '!./src/index.html',
        '!./src/assets/images/**',
        '!./src/assets/icons',
        '!./src/assets/icons/**',
        '!./src/assets/sprite/**',
        '!./src/scss',
        '!./src/scss/**',
        '!./src/js',
        '!./src/js/**',
        '!./src/temp',
        '!./src/temp/**'
    ]
    return gulp.src(pathsToCopy)
        .pipe(gulp.dest('./docs'));
});

gulp.task('optimizeImages', ['deleteDistFolder'], function() {
    // return gulp.src(['./src/assets/images/**/*', '!./src/assets/icons', '!./src/assets/icons/**/*'])
    return gulp.src('./src/assets/images/**/*')
        .pipe(imagemin({
            progressive: true, /* opt jpg */
            interlaced: true, /* opt gif */
            multipass: true /* opt svg */
        }))
        .pipe(gulp.dest('./docs/assets/images'))
});

gulp.task('optimizeSprites', ['deleteDistFolder'], function() {
    // return gulp.src(['./src/assets/images/**/*', '!./src/assets/icons', '!./src/assets/icons/**/*'])
    return gulp.src('./src/assets/sprite/**/*')
        .pipe(imagemin({
            progressive: true, /* opt jpg */
            interlaced: true, /* opt gif */
            multipass: true /* opt svg */
        }))
        .pipe(gulp.dest('./docs/assets/sprite'))
});

gulp.task('useminTrigger', ['deleteDistFolder'], function() {
    gulp.start('useminTask');
});

gulp.task('useminTask', ['sass', 'scripts'], function() {
    return gulp.src('./src/index.html')
        .pipe(usemin({
            css: [function() {return rev()}, function() {return cssnano()}],
            js: [
                    function() {return rev()}, 
                    function() {return babel({
                        presets: ['es2015']
                    })}, 
                    function() {
                        return uglify()
                            .on('error', function(uglify) {
                                console.error(uglify.message);
                                console.error(uglify);
                                this.emit('end');
                            })
                    }
                ]
        }))
        .pipe(gulp.dest('./docs'));
});

gulp.task('build', ['deleteDistFolder', 'copyGeneralFiles', 'optimizeImages', 'optimizeSprites', 'useminTrigger']);