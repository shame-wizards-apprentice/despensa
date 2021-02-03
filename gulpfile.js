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

/**
 * STYLES
 */
// metro
gulp.task('dev:styles:global', function() {
	let src_path = `${config.paths.styles.src}/styles/**.scss`;
	let dest_path = `${config.paths.styles.dest}`;

	return gulp.src(src_path)
					.pipe( wait(25) )
					.pipe( sass({
						outputStyle: 'nested',
						indentType: 'tab',
						indentWidth: '1'
					}).on('error', sass.logError) )
					.pipe( postcss([
						autoprefixer('last 2 versions', '> 1%')
					]) )
					.pipe( gulp.dest(dest_path) )
					.pipe( browserSync.reload({stream: true}) );
});
// metro
gulp.task('dev:styles:metro', function() {
	let src_path = `${config.paths.styles.src}/themes/metro/styles/**.scss`;
	let dest_path = `${config.paths.styles.dest}/themes/metro/css`;

	return gulp.src(src_path)
					.pipe( wait(25) )
					.pipe( sass({
						outputStyle: 'nested',
						indentType: 'tab',
						indentWidth: '1'
					}).on('error', sass.logError) )
					.pipe( postcss([
						autoprefixer('last 2 versions', '> 1%')
					]) )
					.pipe( gulp.dest(dest_path) )
					.pipe( browserSync.reload({stream: true}) );
});
// goth
gulp.task('dev:styles:goth', function() {
	let src_path = `${config.paths.styles.src}/themes/goth/styles/**.scss`;
	let dest_path = `${config.paths.styles.dest}/themes/goth/css`;
	
	return gulp.src(src_path)
					.pipe( wait(25) )
					.pipe( sass({
						outputStyle: 'nested',
						indentType: 'tab',
						indentWidth: '1'
					}).on('error', sass.logError) )
					.pipe( postcss([
						autoprefixer('last 2 versions', '> 1%')
					]) )
					.pipe( gulp.dest(dest_path) )
					.pipe( browserSync.reload({stream: true}) );
});
// space (sci-fi)
gulp.task('dev:styles:space', function() {
	let src_path = `${config.paths.styles.src}/themes/space/styles/**.scss`;
	let dest_path = `${config.paths.styles.dest}/themes/space/css`;
	
	return gulp.src(src_path)
					.pipe( wait(25) )
					.pipe( sass({
						outputStyle: 'nested',
						indentType: 'tab',
						indentWidth: '1'
					}).on('error', sass.logError) )
					.pipe( postcss([
						autoprefixer('last 2 versions', '> 1%')
					]) )
					.pipe( gulp.dest(dest_path) )
					.pipe( browserSync.reload({stream: true}) );
});
// kawaii ("cute")
gulp.task('dev:styles:cute', function() {
	let src_path = `${config.paths.styles.src}/themes/cute/styles/**.scss`;
	let dest_path = `${config.paths.styles.dest}/themes/cute/css`;
	
	return gulp.src(src_path)
					.pipe( wait(25) )
					.pipe( sass({
						outputStyle: 'nested',
						indentType: 'tab',
						indentWidth: '1'
					}).on('error', sass.logError) )
					.pipe( postcss([
						autoprefixer('last 2 versions', '> 1%')
					]) )
					.pipe( gulp.dest(dest_path) )
					.pipe( browserSync.reload({stream: true}) );
});

gulp.task('watch:styles', function(done) {
	gulp.watch(`${config.paths.styles.src}/**/*.scss`, gulp.series('dev:styles:global', 'dev:styles:metro', 'dev:styles:goth','dev:styles:space', 'dev:styles:cute'));
	done();
});

/**
 * IMAGES
 */
// METRO
gulp.task('dev:images:metro', function() {
	let src_path = `${config.paths.images.src}/metro/images/!(_)*.{JPG,JPEG,GIF,PNG}`;
	let dest_path = `${config.paths.images.dest}/metro/images`;
	return gulp.src(src_path)
			.pipe(newer(src_path))
			.pipe(image(dest_path))
			.pipe(gulp.dest(dest_path));
});
// GOTH
gulp.task('dev:images:goth', function() {
	let src_path = `${config.paths.images.src}/goth/images/!(_)*.{JPG,JPEG,GIF,PNG}`;
	let dest_path = `${config.paths.images.dest}/goth/images`;
	return gulp.src(src_path)
			.pipe(newer(src_path))
			.pipe(image(dest_path))
			.pipe(gulp.dest(dest_path));
});

// SPACE
gulp.task('dev:images:space', function() {
	let src_path = `${config.paths.images.src}/space/images/!(_)*.{JPG,JPEG,GIF,PNG}`;
	let dest_path = `${config.paths.images.dest}/space/images`;
	return gulp.src(src_path)
			.pipe(newer(src_path))
			.pipe(image(dest_path))
			.pipe(gulp.dest(dest_path));
});
// KAWAII ("cute")
gulp.task('dev:images:cute', function() {
	let src_path = `${config.paths.images.src}/cute/images/!(_)*.{JPG,JPEG,GIF,PNG}`;
	let dest_path = `${config.paths.images.dest}/cute/images`;
	return gulp.src(src_path)
			.pipe(newer(src_path))
			.pipe(image(dest_path))
			.pipe(gulp.dest(dest_path));
});
gulp.task('watch:images', function(done) {
	gulp.watch(`${config.paths.images.src}/**/!(_)*.{JPG,JPEG,GIF,PNG}`, gulp.series('dev:images:metro','dev:images:goth','dev:images:space','dev:images:cute'));
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

// combine all the dev:styles tasks
gulp.task('dev:styles', gulp.parallel('dev:styles:global', 'dev:styles:metro', 'dev:styles:goth', 'dev:styles:space', 'dev:styles:cute'));
// combine all the dev:images tasks
gulp.task('dev:images', gulp.parallel('dev:images:metro', 'dev:images:goth', 'dev:images:space', 'dev:images:cute'));

// DEV
// dev:views not included; views files aren't compiled
gulp.task('dev', gulp.parallel('dev:styles', 'dev:images', 'dev:scripts'));

// WATCH
gulp.task('watch', gulp.parallel('watch:styles', 'watch:scripts', 'watch:images', 'watch:views'));

// DEFAULT
// 'clean' @ beginning to delete public folder
gulp.task('default', gulp.series('dev', 'server', gulp.parallel('watch', 'browser-sync')));