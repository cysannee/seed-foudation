
// var gulp = require('gulp');
// var $    = require('gulp-load-plugins')();

// gulp.task('default', ['sass'], function() {
//     gulp.watch(['scss/**/*.scss'], ['sass']);
// });
var gulp = require('gulp'), /* require method is provided by Node */
    watch = require('gulp-watch'),
    browserSync = require('browser-sync').create();

gulp.task('watch', function() {

    browserSync.init({ /* configurations for browserSync */
        notify: false, /* removes notifications in upper right corner */
        server: {
            baseDir: 'src' /* what folder to show in browser */
        }
    });

    watch('./src/index.html', function() { /* watches file specified for changes */
        // gulp.start('html');
        // return gulp.src('./src/index.html')
        //     .pipe(browserSync.stream());
        browserSync.reload();
    });

    watch('./src/scss/**/*.scss', function() { /* watches file specified for changes */
        // gulp.start('styles');
        gulp.start('cssInject');
    });

    watch('./src/js/**/*.js', function() { /* watches file specified for changes */
        gulp.start('scriptsRefresh');
    });

});

gulp.task('cssInject', ['sass'], function() { /* update browserSync after css files finished compiling */
    return gulp.src('./src/temp/css/app.css') 
        .pipe(browserSync.stream());
});

gulp.task('scriptsRefresh', ['scripts'], function() { /* update browserSync after js files finished compiling */
    browserSync.reload();
});

gulp.task('default', ['watch']);