import React, { Component } from 'react';
import styles from './../css/app.css'; 
import DWindow from './DWindow';
import { getFakeData, convertSourceData, calcChartWindowsCoords, tileChartWindowsCoords, pctToWindowX, pctToWindowY, setCookie, getCookie } from './helpers'
import Settings from './Settings';

const _minChildWindowZIndex = 1000;

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = { 
			data: null,
			childZIndexes: [],
			childRefs: [],
			lang: 'en',
			userName: String.fromCharCode(8230),
			title: String.fromCharCode(8230),
			projectVersion: String.fromCharCode(8230),
			projectTime: String.fromCharCode(8230)
		};

		this.changeLang = this.changeLang.bind(this);
		this.positionWindows = this.positionWindows.bind(this);
		this.bringFront = this.bringFront.bind(this);
	}

	positionWindows( mode ) {
		if( this.state.data === null || !('charts' in this.state.data) || this.state.data.charts.length === 0 ) {
			return;
		}
		let l = this.state.data.charts.length;
		let coords = new Array(l);
		for( let i = 0 ; i < l ; i++ ) {
			coords[i] = {};
		} 
		if( mode == 1 ) {
			calcChartWindowsCoords( this.state.data.charts, coords );
		} else {
			tileChartWindowsCoords( this.state.data.charts, coords );
		}
		let z = new Array(l);
		for( let i = 0 ; i < l ; i++ ) {
			z[i] = _minChildWindowZIndex + i;
			if( 'error' in coords ) {
				continue;
			}
			this.state.childRefs[i].current.setWindowCoords( coords[i].x, coords[i].y, coords[i].width, coords[i].height );
		}
		if( mode == 1 ) {
			this.setState( { childZIndexes:z } );
		}
	}

	changeLang( e ) {
		for( let i = 0 ; i < Settings.langs.length ; i++ ) {
			if( Settings.langs[i] === this.state.lang ) {
				let lang = ( i < Settings.langs.length-1 ) ? Settings.langs[i+1] : Settings.langs[0];  		
				this.setState( { lang: lang } );
				setCookie( 'lang', lang );
				break;
			}
		}
	}

	bringFront(zIndex) {
		let l = this.state.childZIndexes.length;
		let z = new Array(l);
		let indexOfClicked = -1;
		let indexOfMax = 0;
		for( let i = 0 ; i < l ; i++ ) {
			z[i] = this.state.childZIndexes[i];
			if( i > 0 && z[i] > z[indexOfMax] ) {	
				indexOfMax = i;
			}
			if( z[i] == zIndex ) {
				indexOfClicked = i;
			}
		}
		if( indexOfClicked == -1 || indexOfClicked == indexOfMax ) {
			return;
		}
		let zIndexMax = z[indexOfMax];
		z[indexOfMax] = zIndex;
		z[indexOfClicked] = zIndexMax;
						
		for( let i = 0 ; i < l ; i++ ) {
			if( i != indexOfClicked && z[i] > zIndex ) {
				z[i]--;
			}
		}
		this.setState( { childZIndexes:z } );
	}


	componentDidMount() {
		let lang = getCookie('lang');
		if( lang !== null ) {
			this.setState( { lang:lang } );
		}

		let data = {
			title: 'Project Title',
			lang: 'ru',
			charts: [
				{ 
					settings: { id:10, type: 'text', title: '...', hideTitle:true, 
						fontSizeScale: true, xPct:10, yPct:85, widthPct:25, heightPct:10 }, 
					text: 'This is a sample text! This is a sample text! This is a sample text! This is a sample text! This is a sample text!'
				},
				{ 
					settings: { id:20, type: 'table', title: 'A Table', 
						fontSizeScale: true, xPct:70, yPct:5, widthPct:25, heightPct:50 }, 
					head: [ { name:'Rate', key:1 },  { name:'pv', key:2}, { name:'amt', key:3 } ],
					body: [ 
						{1: 'Section A', 2: 400, 3: 300 }, {1: 'Section B', 2:'Rate', 3: 300},
						{1: 'Section C', 2:'Rate', 3: 500}, {1: 'Section D', 2: 'Rate', 3: 400},
					]
				},
				{ 
					settings: { id:30, type: 'lineChart', title: 'A Line Chart', 
						xPct:2, yPct:2, widthPct:40, heightPct:50 }, 
					charts: { 'Rate': { stroke:'#cf7fef' }, 'pv': { stroke:'#7fceef' }, 'amt': { stroke: '#cfef7f' } },
					data: [ 
						{name: 'Section A', 'Rate': 400, pv: 300, amt: 300}, {name: 'Section B', 'Rate': 500, pv: 400, amt: 300},
						{name: 'Section C', 'Rate': 400, pv: 500, amt: 500}, {name: 'Section D', 'Rate': 600, pv: 400, amt: 600},
					]
				},
				{ 
					settings: { id:35, type: 'linePlot', title: 'A Line Plot', 
						xPct:42, yPct:22, widthPct:40, heightPct:50 }, 
					charts: { 'Rate': { stroke:'#cf7fef' }, 'pv': { stroke:'#7fceef' }, 'amt': { stroke: '#cfef7f' } },
					data: { 
						'Rate': [ {x: 100, value: 400}, {x: 200, value: 500}, {x: 220, value: 390}, {x: 300, value: 402} ],
						'pv': [ {x: 110, value: 300}, {x: 220, value: 350}, {x: 280, value: 390}, {x: 300, value: 420} ],
						'amt': [ {x: 90, value: 330}, {x: 180, value: 340}, {x: 250, value: 320}, {x: 310, value: 350} ],
					}
				},
				{ 
					settings: { id:40, type: 'barChart', title: 'A Bar Chart', 
						xPct:50, yPct:20, widthPct:40, heightPct:50 }, 
					charts: {  'Rate': { fill:'#cf7fef' }, 'pv': { fill:'#7fceef' }, 'amt': { fill: '#cfef7f' } },
					data: [ 
						{name: 'Section A', 'Rate': 400, pv: 300, amt: 300}, {name: 'Page B', 'Rate': 500, pv: 400, amt: 300},
						{name: 'Page C', 'Rate': 400, pv: 500, amt: 500}, {name: 'Page D', 'Rate': 600, pv: 400, amt: 600},
					]
				},
				{ 
					settings: { id:50, type: 'pieChart', title: 'A Pie Chart', 
						xPct:20, yPct:40, widthPct:40, heightPct:50, 
						colors: ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'], fill: '#8884d8' }, 
					data: [ 
						{ name: 'Section A', value: 400 }, { name: 'Section B', value: 500 },
						{ name: 'Section C', value: 400 }, { name: 'Section D', value: 400 },
					]
				},
				{ 
					settings: { id:55, type: 'dialGaugeChart', title: 'A Dial Gauge Chart, km', 
						xPct:25, yPct:45, widthPct:30, heightPct:25, 
						titles: { scheduled: 'Scheduled', actual: 'Actual', lag: 'Lag', outrun: 'Outrun', unfinished: 'Unfinished' },
						colors: { scheduled:'#8fff8f', lag: '#ff8f8f', actual:'#8fff8f', outrun: '#4fff4f', unfinished: '#8f8f8f' }, fill: '#8884d8' }, 
					data: { 
						scheduled: { name:'Scheduled', value:300 }, actual: { name:'Actual', value:200 }, target: { name:'Target', value:500 }
					}
				},
				{ 
					settings: { id:60, type: 'barRLChart', title: 'A Tornado Chart (Reference Line BC)', 
						xPct:10, yPct:10, widthPct:40, heightPct:50,
						referenceLineColor: '#af8f8f',
						colors: ['#8fff8f', '#8fff8f', '#8fff8f', '#ff8f8f', '#ff8f8f'] }, 
					charts: { 'values': { stroke:'#cf7fef', name:'Indicators' } },
					data: [ 
						{name: 'Indicators 1', 'values': 200}, {name: 'Indicators 2', 'values': 100},
						{name: 'Indicators 3', 'values': 10}, {name: 'Indicators 4', 'values': -100},
						{name: 'Indicators 4', 'values': -200}
					]
				}
			]
		};
		
		fetch(Settings.htmlDirectory + '/data.php').then(data=> data.json()).then( 
			(data) => { 
				//let sourceData = getFakeData();
				data = convertSourceData(data);
				this.setState({ lang: data.lang, title: data.title, projectVersion: data.projectVersion, 
					projectTime: data.projectTime, userName: getCookie('userName') });
		
				if( data === null ) {
					this.setState( { data: { 'error': Settings.failedToLoadText[this.state.lang] } } );
					return;
				}
				if( !('charts' in data) || data.charts.length === 0 ) {
					this.setState( { data: { 'error': Settings.failedToParseText[this.state.lang] } } );
					return;
				}
		
				let z = [];
				let r = [];
				for( let i = 0 ; i < data.charts.length ; i++ ) {
					z.push( _minChildWindowZIndex + i );
					r.push( React.createRef() );
				}
				this.setState( { data: data, childZIndexes: z, childRefs: r } );
		
			} 
		).catch( function(e) { alert(e); } );
	}

	render() {		
		var header = (		
			<div className={styles.headerContainer}>
				<div className={styles.headerControls}>
					<span onClick={this.changeLang}>{ Settings.lang[ this.state.lang ] }</span>
					<span onClick={ (e) => this.positionWindows(1) }>{ String.fromCharCode(8634) }</span>
					<span onClick={ (e) => this.positionWindows(2) }>{ String.fromCharCode(9783) }</span>
				</div>
				<div className={styles.headerTitle}>
					{ this.state.title }
					<div className={styles.headerDetails}>
						{Settings.versionText[this.state.lang]} {this.state.projectVersion} :: {this.state.projectTime} 
					</div>
				</div>
				<div className={styles.headerUser}>{ this.state.userName } :: { Settings.exitText[this.state.lang] }</div>
			</div>
		);

		let data = this.state.data;
		if( data === null || 'error' in data ) {
			let errorMessage = (data===null) ? Settings.waitLoadingText[this.state.lang] : data.error;
			return( 
				<div className={styles.appContainer}>
					{header}
					<div className={styles.waitContainer}>{errorMessage}</div>
				</div> );
		}

		let charts = [];
		let nCharts = data.charts.length;
		if( nCharts > 0 ) {
			try {
				let coords = new Array( nCharts );
				for( let i = 0 ; i < nCharts ; i++ ) {
					coords[i] = {};
				}
				tileChartWindowsCoords( data.charts, coords );

				for( let i = 0 ; i < nCharts ; i++ ) {
					if( 'error' in coords[i] ) {
						continue;
					}
					charts.push( <DWindow key={'chart.window.'+i} ref={this.state.childRefs[i]} 
						zIndex={this.state.childZIndexes[i]} bringFront={this.bringFront}  
						x={coords[i].x} y={coords[i].y} width={coords[i].width} height={coords[i].height} chart={data.charts[i]} /> );		
				}
				return (
					<div className = {styles.appContainer}>
						{header}
						<div className = {styles.contentContainer}> 
							{charts}
						</div>
					</div>
				);
			} catch(e) {
				;
			}
		}
		return( 
			<div className={styles.appContainer}>
				{header}
				<div className={styles.waitContainer}>{Settings.failedToParseText[this.state.lang]}</div>
			</div> 
		);
	}
}

export default App;