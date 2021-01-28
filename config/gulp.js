var paths = {
	dist_dir: `public`,
	dist_files: 'public/**/*.*',
	styles: { 
		src:  `src`,
		dest: `public`
	},
	scripts: {
		src: `src/scripts/**/!(_)*.js`,
		dest: `public/js`
	},
	images: {
		src: `src/themes`,
		dest: `public/themes`
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