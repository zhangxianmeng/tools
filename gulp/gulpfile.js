var gulp = require('gulp');
var pngquant = require('imagemin-pngquant'); //png图片压缩插件
var pngcrush = require('imagemin-pngcrush'); //png图片压缩插件
var autoprefixer = require('autoprefixer');
var plugins = require('gulp-load-plugins')();
//默认
gulp.task('default', function() {
	gulp.run('watch','minify-css', 'minify-js','minify-html','minify-img');
});

//js文件压缩-重命名
gulp.task('minify-js', function() {
	gulp.src('./src/**/*.js')
//		.pipe(plugins.rename(function(path) {
//			path.basename += '.min';
//		}))
//		.pipe(plugins.babel({
//			presets:['es2015']
//		}))
//		.pipe(plugins.uglify())
		.pipe(gulp.dest('./build'))
		.pipe(plugins.livereload());
});

//css
gulp.task('minify-css', function() {
	gulp.src(['./src/css/*']) // 要压缩的css文件
//		.pipe(plugins.rename(function(path) {
//			path.basename += '.min';
//		}))
		.pipe(plugins.less())
//		.pipe(plugins.sass())
		.pipe(plugins.postcss([
			autoprefixer({ browsers: ['last 100 version'] }),
		]))
		.pipe(plugins.concat('index.min.css'))
		.pipe(plugins.minifyCss())
		.pipe(gulp.dest('./build/css'))
		.pipe(plugins.livereload()); //实时刷新;
});

//html
gulp.task('minify-html', function() {
	gulp.src(['./src/**/*.html','./src/*.html']) // 要压缩的html文件
//		.pipe(plugins.minifyHtml()) //压缩
		.pipe(gulp.dest('./build'))
		.pipe(plugins.livereload()); //实时刷新;
});

//images
gulp.task('minify-img', function() {
	gulp.src(['src/**/*.png', 'src/**/*.gif', 'src/**/*.jpg'])
		.pipe(plugins.imagemin({
			progressive: true,
			svgoPlugins: [{ removeViewBox: false }],
			use: [pngcrush()]
		}))
		.pipe(gulp.dest('./build'));
});

//watch
gulp.task('watch', function() {
	plugins.livereload.listen();
	gulp.watch(['src/**/*.css', 'src/**/*.scss', 'src/**/*.less'],['minify-css']);
	gulp.watch('src/**/*.js', ['minify-js'])
	gulp.watch('src/**/*.html', ['minify-html'])
	gulp.watch(['src/**/*.png', 'src/**/*.gif', 'src/**/*.jpg'],['minify-img'])
});