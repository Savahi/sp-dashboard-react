import React, { Component } from 'react';
import styles from './../css/app.css'; 
import DWindow from './DWindow';
import { getFakeData, convertSourceData, calcChartWindowsCoords, tileChartWindowsCoords, pctToWindowX, pctToWindowY, setCookie, getCookie } from './helpers'
import Settings from './Settings';

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
			z[i] = Settings.minChildWindowZIndex + i;
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
		
		fetch(Settings.htmlDirectory + Settings.dataFile).then(data=> data.json()).then( 
			(data) => { 
				//let sourceData = getFakeData();
				data = convertSourceData(data);
				this.setState({ lang: data.lang, title: data.title, projectVersion: data.projectVersion, 
					projectTime: data.projectTime, 
					userName: (typeof(_userName) !== 'undefined') ? _userName : '?' });
		
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
					z.push( Settings.minChildWindowZIndex + i );
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
				<div className={styles.headerUser}>
					{ this.state.userName } :: <a href={Settings.exitURL}>{ Settings.exitText[this.state.lang] }</a></div>
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
				//tileChartWindowsCoords( data.charts, coords );
				calcChartWindowsCoords( data.charts, coords );

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