var paths = {
	dist_dir: `dist`,
	dist_files: 'dist/**/*.*',
	styles: { 
		src:  `src/styles/**/!(#)*.scss`,
		dest: `dist/public/css`
	},
	scripts: {
		src: `src/scripts/**/!(_)*.js`,
		dest: `dist/public/js`
	},
	images: {
		src: `src/images/**/!(_)*.{jpg,JPG,jpeg,JPEG,png,PNG}`,
		dest: `dist/public/images`
	},
	views: 'views/**/*.handlebars'
}

module.exports = {
	paths: paths,
	plugins: {
		browserSync: {
			proxy: "localhost:8080",
			port: 5000,
			files: [
				paths.dist_files,
				paths.views
			],
			injectChanges: true,
			notify: true
		}
	},
	nodemon: {
		script: 'server.js',
		ignore: [
			'gulpfile.js',
			'config/',
			'node_modules/'
		]
	}
};