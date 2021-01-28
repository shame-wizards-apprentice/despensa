// https://github.com/CodeChron/browsersync-gulp-4-express

var gulp = require('gulp'),
		config = require('./config/gulp'),
		nodemon = require('gulp-nodemon'),
		sass = require('gulp-sass'),
		postcss = require('gulp-postcss'),
		autoprefixer = require('autoprefixer'),
		sourcemaps = require('gulp-sourcemaps'),
		wait = require('gulp-wait'),
		jshint = require('gulp-jshint'),
		concat = require('gulp-concat'),
		rename = require('gulp-rename'),
		uglify = require('gulp-uglify'),
		image = require('gulp-image'),
		newer = require('gulp-newer'),
		log = require('fancy-log'),
		del = require('del'),
		path = require('path'),
		browserSync = require('browser-sync').create();

// CLEAN
gulp.task('clean', function() {
	return del(config.paths.dist_dir);
});

// STYLES
gulp.task('dev:styles', function() {
	return gulp.src(config.paths.styles.src)
					.pipe( wait(25) )
					.pipe( sass({
						outputStyle: 'nested',
						indentType: 'tab',
						indentWidth: '1'
					}).on('error', sass.logError) )
					.pipe( postcss([
						autoprefixer('last 2 versions', '> 1%')
					]) )
					.pipe( gulp.dest(config.paths.styles.dest) )
					.pipe( browserSync.reload({stream: true}) );
});

gulp.task('watch:styles', function(done) {
	gulp.watch(config.paths.styles.src, gulp.series('dev:styles'));
	done();
});

// SCRIPTS
gulp.task('dev:scripts', function() {
	return gulp.src(config.paths.scripts.src)
			.pipe(jshint())
			.pipe(jshint.reporter('default'))
			.pipe(concat('app.js'))
			.pipe(gulp.dest(config.paths.scripts.dest))
			.pipe(rename('app.min.js'))
    	.pipe(uglify())
    	.pipe(gulp.dest(config.paths.scripts.dest));
});

gulp.task('watch:scripts', function(done) {
	gulp.watch(config.paths.scripts.src, gulp.series('dev:scripts'));
	done();
});

// IMAGES
gulp.task('dev:images', function() {
	return gulp.src(config.paths.images.src)
			.pipe(newer(config.paths.images.dest))
			.pipe(image())
			.pipe(gulp.dest(config.paths.images.dest));
});

gulp.task('watch:images', function(done) {
	gulp.watch(config.paths.images.src, gulp.series('dev:images'));
	done();
});

// watch for changes in views folder
gulp.task('watch:views', function(done) {
	gulp.watch(config.paths.views, browserSync.reload());
});

// SERVER
gulp.task('server', function(cb) {
	var called = false;
	return nodemon(config.plugins.nodemon)
				.on('start', function() {
					if(!called) {
						called = true;
						cb();
					}
				});
});

// BROWSER-SYNC
function browserSyncInit(done) {
	browserSync.init(config.plugins.browserSync);
	done();
}
gulp.task('browser-sync', browserSyncInit);

// DEV
// dev:views not included; views files aren't compiled
gulp.task('dev', gulp.parallel('dev:styles', 'dev:scripts', 'dev:images'));

// WATCH
gulp.task('watch', gulp.parallel('watch:styles', 'watch:scripts', 'watch:images', 'watch:views'));

// DEFAULT
gulp.task('default', gulp.series('clean', 'dev', 'server', gulp.parallel('watch', 'browser-sync')));