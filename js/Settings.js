
function getScrollBarWidth() {
	// Creating invisible container
	const outer = document.createElement('div');
	outer.style.visibility = 'hidden';
	outer.style.overflow = 'scroll'; // forcing scrollbar to appear
	outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps
	document.body.appendChild(outer);
  
	// Creating inner element and placing it in the container
	const inner = document.createElement('div');
	outer.appendChild(inner);
  
	// Calculating difference between container's full width and the child width
	const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);
  
	// Removing temporary elements from the DOM
	outer.parentNode.removeChild(outer);
  
	return scrollbarWidth;
  }

var Settings = {
	langs: ['en', 'ru' ],
	lang: { en: 'EN', ru: 'РУ' },
	exitText: { en: 'exit', ru:'выход' },
	exitURL: 'logout.php',
	versionText: { en: 'Version', ru:'Версия' },
	valueText: { en: 'Value', ru:'Значение' },
	windowTitleHeight: 34,
	windowScrollBarWidth: getScrollBarWidth(), 
	domainMarginFactor: 0.1,
	chartFontSize: 12,
	axisFontSize: 12,
	legendFontSize: 11,
	lowResolutionWindowWidth: 740,
	dataFile: 'dashboard.php',
	htmlDirectory: "",
	filesDirectory: "files/",
	notAuthorizedText: { 'en': 'Not authorized', 'ru': 'Нет авторизации' },
	waitLoadingText: { en: 'Please wait while loading data...', ru:'Пожалуйста, подождите, пока загружаются данные' },
	failedToLoadText: { en: 'Failed to load data...', ru:'Ошибка при загрузке данных' },
	failedToParseText: { en: 'Error while handling data. The data are incorrect?', ru:'Ошибка при обработке данных. Данные искажены?' },
	noDataText: { en: 'No data available', ru:'Нет данных' },
	minChildWindowZIndex: 1000
}

export default Settings;