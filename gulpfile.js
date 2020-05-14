var gulpversion    = '4'; // Gulp version: 3 or 4

// Подключаем Gulp и все необходимые библиотеки
    var gulp           = require('gulp'),
		gutil          = require('gulp-util' ),
		sass           = require('gulp-sass'),
		browserSync    = require('browser-sync'),
		cleanCSS       = require('gulp-clean-css'),
		autoprefixer   = require('gulp-autoprefixer'),
		bourbon        = require('node-bourbon'),
		ftp            = require('vinyl-ftp');

// Обновление страниц сайта на локальном сервере
gulp.task('browser-sync', function() {
	browserSync({
		proxy: "opencart.loc",
		notify: false
	});
});

// Компиляция stylesheet.css
gulp.task('sass', function() {
	return gulp.src('catalog/view/theme/straw/stylesheet/stylesheet.sass')
		.pipe(sass({
			includePaths: bourbon.includePaths
		}).on('error', sass.logError))
		.pipe(autoprefixer(['last 15 versions']))
		.pipe(cleanCSS())
		.pipe(gulp.dest('catalog/view/theme/straw/stylesheet/'))
		.pipe(browserSync.reload({stream: true}))
});

gulp.task('code', function() {
	return gulp.src(['catalog/view/theme/straw/template/**/*.twig'])
	.pipe(browserSync.reload({ stream: true }))
});

// Выгрузка изменений на хостинг
gulp.task('deploy', function() {
	var conn = ftp.create({
		host:      'hostname.com',
		user:      'username',
		password:  'userpassword',
		parallel:  10,
		log: gutil.log
	});
	var globs = [
	'catalog/view/theme/straw/**'
	];
	return gulp.src(globs, {buffer: false})
	.pipe(conn.dest('/path/to/folder/on/server'));
});

// Наблюдение за файлами

if (gulpversion == 3) {
	gulp.task('watch', ['sass', 'browser-sync'], function() {
		gulp.watch('catalog/view/theme/straw/stylesheet/stylesheet.sass', ['sass']);
		gulp.watch('catalog/view/theme/straw/template/**/*.twig', browserSync.reload);
		gulp.watch('catalog/view/theme/straw/js/**/*.js', browserSync.reload);
		gulp.watch('catalog/view/theme/straw/libs/**/*', browserSync.reload);
	});
	gulp.task('default', ['watch']);
}

if (gulpversion == 4) {
	gulp.task('watch', function() {
		gulp.watch('catalog/view/theme/straw/stylesheet/stylesheet.sass', gulp.parallel('sass'));
		gulp.watch('catalog/view/theme/straw/template/**/*.twig', gulp.parallel('code'));
		gulp.watch('catalog/view/theme/straw/js/**/*.js', browserSync.reload);
		gulp.watch('catalog/view/theme/straw/libs/**/*', browserSync.reload);
	});
	gulp.task('default', gulp.parallel('sass', 'browser-sync', 'watch'));
}
