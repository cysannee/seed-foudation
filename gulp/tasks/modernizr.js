var gulp = require('gulp');
    modernizr = require('gulp-modernizr');

gulp.task('modernizr', function() { /* check if user's browsers supports svg's and adds a corresponding class to the html tag*/
    return gulp.src(['./src/scss/**/*.scss','./src/js/**/*.js'])
        .pipe(modernizr({
            'options': [
                'setClasses'
            ]
        }))
        .pipe(gulp.dest('./src/temp/js/'));
});