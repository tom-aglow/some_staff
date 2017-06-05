var gulp        = require('gulp');
var connect     = require('gulp-connect-php');
var browserSync = require('browser-sync');
var sass        = require('gulp-sass');
var prefix      = require('gulp-autoprefixer');
var jade        = require('gulp-jade');
var bourbon     = require('bourbon');

// var clean = require('gulp-clean-css');
// var gcmq = require('gulp-group-css-media-queries');

var mode = "css";


/**
 * Reload the page after SASS
 */
gulp.task('browser-sync', ['sass'], function() {
    if (mode == "php") {
        connect.server({
            port: 80,
            open: false
        }, function (){
            browserSync({
                proxy: "http://francesco.local/"
            });
        });
    } else if (mode == "css") {
        browserSync.init({
            server: {
                baseDir: '_site'
            },
            notify: false,
            open: false
        });
    }


});

/**
 * Compile .css file from main.scss
 */
gulp.task('sass', function () {
    return gulp.src(['_sass/main.scss'])
        .pipe(sass({
            includePaths: ['css', bourbon],
            onError: browserSync.notify
        }))
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(gulp.dest('_site/css'))
        .pipe(browserSync.reload({stream:true}))
});

/**
 * Jade task
 */

gulp.task('jade', function(){
    return gulp.src('_jade/*.jade')
        .pipe(jade())
        .pipe(gulp.dest('_site'));
});

/**
 * Watch task
 */

gulp.task('watch', function() {
    gulp.watch('_sass/**', ['sass']);
    gulp.watch('_jade/**', ['jade']);
    gulp.watch(['_site/js/**']).on('change', function () {
        browserSync.reload();
    });
    gulp.watch(['index.html', '_site/*.html']).on('change', function () {
        browserSync.reload();
    });

    if (mode == "php") {
        gulp.watch(['*.php']).on('change', function () {
            browserSync.reload();
        });
    }
});

/**
 * Redefine default gulp task
 */
gulp.task('default', ['browser-sync', 'watch']);


/**
 * Clean css task
 */
// gulp.task('clean', function () {
//     gulp.src('_site/css/main.css')
//         // .pipe(clean())
//         // .pipe(gcmq())
//         .pipe(gulp.dest('_site/css/min'));
// });