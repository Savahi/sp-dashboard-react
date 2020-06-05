
var Settings = {
	langs: ['en', 'ru' ],
	lang: { en: 'EN', ru: 'РУ' },
	exitText: { en: 'exit', ru:'выход' },
	exitURL: 'logout.php',
	versionText: { en: 'Version', ru:'Версия' },
	valueText: { en: 'Value', ru:'Значение' },
	windowTitleHeight: 22, 
	domainMarginFactor: 0.1,
	axisFontSize: '12px',
	legendFontSize: '11px',
	dataFile: 'dashboard.php',
	htmlDirectory: "",
	filesDirectory: "files/",
	notAuthorizedText: { 'en': 'Not authorized', 'ru': 'Нет авторизации' },
	waitLoadingText: { en: 'Please wait while loading data...', ru:'Пожалуйста, подождите, пока загружаются данные' },
	failedToLoadText: { en: 'Failed to load data...', ru:'Ошибка при загрузке данных' },
	failedToParseText: { en: 'Error while handling data. The data are incorrect?', ru:'Ошибка при обработке данных. Данные искажены?' },
	minChildWindowZIndex: 1000
}

export default Settings;