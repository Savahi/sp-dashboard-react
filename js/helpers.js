import Settings from './Settings';
/*
charts: [
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
*/

export function convertSourceData(sourceData) {
	if( !'DashPages' in sourceData )
		return null;

	let data = {};
	data.lang = sourceData.Lang;
	data.title = sourceData.Project.Name;
	data.projectVersion = sourceData.Project.Version;
	data.projectTime = sourceData.Project.CurTime;
	data.charts = [];
	for( let idashpage = 0 ; idashpage < sourceData.DashPages.length ; idashpage++ ) {
		let dashitems = sourceData.DashPages[idashpage].DashItems;	
		for( let idashitem = 0 ; idashitem < dashitems.length ; idashitem++ ) {		
			let chartsSettings = {};
			let chartsCharts = null;
			let chartsData = null;
			let d = dashitems[idashitem];
			if( d.Type == 'diagram') {
				if( d.SubType == 'graphs' && (d.Form == 'line') ) {
					chartsData = {};
					chartsCharts = {};
					chartsSettings = { id: idashpage*100+idashitem, page:idashpage, type: 'linePlot', title: d.Title, 
						startYAtZero: (d.FromZero == 'yes') ? true : false, 
						xPct: d.Position[0], yPct: d.Position[1], 
						widthPct: d.Position[2] - d.Position[0], heightPct: d.Position[3] - d.Position[1] };
					for( let igraph = 0 ; igraph < d.Graphs.length ; igraph++ ) {
						let graph = d.Graphs[igraph];
						chartsCharts[graph.Name] = { stroke: graph.Color };
						chartsData[graph.Name] = [];
						for( let i = 0 ; i < graph.Array.length ; i++ ) {
							chartsData[graph.Name].push( { x: graph.Array[i][0], value: graph.Array[i][1] } );
						}
					}
				} 
				/*
					settings: { id:30, type: 'lineChart', title: 'A Line Chart', 
						xPct:2, yPct:2, widthPct:40, heightPct:50 }, 
					charts: { 'Rate': { stroke:'#cf7fef' }, 'pv': { stroke:'#7fceef' }, 'amt': { stroke: '#cfef7f' } },
					data: [ 
						{name: 'Section A', 'Rate': 400, pv: 300, amt: 300}, {name: 'Section B', 'Rate': 500, pv: 400, amt: 300},
						{name: 'Section C', 'Rate': 400, pv: 500, amt: 500}, {name: 'Section D', 'Rate': 600, pv: 400, amt: 600},
					]
					{
						"Type": "diagram", "SubType": "graphs", "Form": "bar",
						"Position": [100, 100, 500, 200], "Title": "Pipes Quantity by Months",
						"Graphs": [
							{
								"Name": "Pipes", "Color": "#ff00ff",
								"Array": [ [1.5, 10.3], [3.1, 15.7], [4, 34], [5, 0] ]
            				}
          				]
        			},

				*/
				else if( d.SubType == 'graphs' && (d.Form == 'bar') ) {
					chartsData = {};
					chartsCharts = {};
					chartsSettings = { id: idashpage*100+idashitem, page:idashpage, type: 'areaChart', title: d.Title, 
						startYAtZero: (d.FromZero == 'yes') ? true : false, 
						xPct: d.Position[0], yPct: d.Position[1], 
						widthPct: d.Position[2] - d.Position[0], heightPct: d.Position[3] - d.Position[1] };
					for( let igraph = 0 ; igraph < d.Graphs.length ; igraph++ ) {
						let graph = d.Graphs[igraph];
						chartsCharts[graph.Name] = { stroke: graph.Color };
						chartsData = [];
						for( let i = 0 ; i < graph.Array.length ; i++ ) {
							let toPush = {};
							toPush.name = graph.Array[i][0];
							toPush[graph.Name] = graph.Array[i][1];
							chartsData.push( toPush );							
							//chartsData.push( { name: graph.Array[i][0], value: graph.Array[i][1] } );
						}
					}
				} 
				else if( d.SubType == 'pie' ) { 	// later it should be checked for being a graph plot
					chartsSettings = { id: idashpage*100+idashitem, page:idashpage, type: 'pieChart', title: d.Title, 
						xPct: d.Position[0], yPct: d.Position[1], 
						widthPct: d.Position[2] - d.Position[0], heightPct: d.Position[3] - d.Position[1],
						colors:[] };
					if( !('Graphs' in d) )
						continue;					
					chartsData = [];
					for( let i = 0 ; i < d.Graphs[0].Array.length ; i++ ) {
						let item = d.Graphs[0].Array[i];
						chartsData.push( { name:item[1], value: item[0] } );
						chartsSettings.colors.push( item[2] );
					}
				} 
				/*
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
					"Type": "diagram", "SubType": "tornado",
					"Position": [100, 300, 500, 400], "Title": "Resources Quantity",
					"Graphs": [
					  {
						"Array": [ [7, "res1", "#ff00ff"], [14, "res2", "#ffff00"], [19, "res3", "#00ffff"] ]
					  }
					]
				*/
				else if( d.SubType === 'tornado' ) {
					chartsSettings = { id: idashpage*100+idashitem, page:idashpage, type: 'barRLChart', title: d.Title, 
						xPct: d.Position[0], yPct: d.Position[1], 
						widthPct: d.Position[2] - d.Position[0], heightPct: d.Position[3] - d.Position[1],
						referenceLineColor: '#af8f8f',
						colors:[] };
					if( !('Graphs' in d) )
						continue;		
					let value = Settings.valueText[ data.lang ];			
					chartsCharts = {};
					chartsCharts = { value: { stroke:'#cf7fef', name:'Indicators' } };
					chartsData = [];
					for( let i = 0 ; i < d.Graphs[0].Array.length ; i++ ) {
						let item = d.Graphs[0].Array[i];
						chartsData.push( { name:item[1], value: item[0] } );
						chartsSettings.colors.push( item[2] );
					}
				} 
				if( chartsData === null )
					continue; 
				data.charts.push( { settings: chartsSettings, charts: chartsCharts, data: chartsData } );
			}
			else if( d.Type === 'text' ) {
				let settings = { id: idashpage*100+idashitem, page: idashpage, type: 'text',
					title: d.Title, fontSizeScale: true, fontFamily: d.FontFamily, fontSize: d.FontSize,
					xPct: d.Position[0], yPct: d.Position[1], 
					widthPct: d.Position[2] - d.Position[0], heightPct: d.Position[3] - d.Position[1], };				
				data.charts.push( { settings:settings, text: d.Body } );
			} 
			else if( d.Type === 'picture' ) {  
				let settings = { id: idashpage*100+idashitem, page: idashpage, type: 'image',
					title: d.Title, xPct: d.Position[0], yPct: d.Position[1], 
					widthPct: d.Position[2] - d.Position[0], heightPct: d.Position[3] - d.Position[1], };				
				data.charts.push( { settings:settings, fileName: d.File } );
			} 
		}
	}
	return data;
}

export function getFakeData() {
	return {
		"Lang": "ru",
		"Project": {"Code": "cpc", "Version": 1, "Name": "Caspian Pipeline Construction", "CurTime": "10.10.99  08:00"},
		"DashPages": 
		[
			{
				"Name": "Page 0",
				"DashItems": [
					{
						"Type": "text",
						"Position": [100, 100, 500, 200],
						"Title": "Summary",
						"Body": "Это текст: прокладка трубопровода, строительство, кровля, возведение зданий и сооружений",
						"FontFamily": "Arial", "FontSize": 20
					},			  
				  	{
						"Type": "diagram",	"SubType": "graphs",
						"Position": [10, 10, 60, 60], "Title": "Pipes Quantity by Months",
						"Graphs": [
							{
								"Name": "Pipes", "Color": "#ff00ff",
								"Array": [ [1.5, 10], [3.1, 15], [4, 34], [5, 21], [6, 19], [7, 25] ]
					  		}
						]
				  	},
				  	{
					"Type": "diagram", "SubType": "pie",
					"Position": [30, 30, 90, 90], "Title": "Resources Quantity",
					"Graphs": [
					  {
						"Array": [ 
							[7, "Показатель 1", "#ff77ff"], [14, "Показатель 2", "#ff7777"], 
							[19, "Показатель 3", "#77ffff"], [ 9, "Показатель 4", "#7777ff"] 
						]
					  }
					]
				  	},
				  	{
						"Type": "diagram", "SubType": "tornado",
						"Position": [10, 30, 60, 90], "Title": "Resources Quantity",
						"Graphs": [
							{
								"Array": [ 
									[-7, "Парам. 1", "#ff7777"], 
									[14, "Парам. 2", "#77dd77"], 
									[19, "Парам. 3", "#ffee77"], 
									[21, "Парам. 4", "#ffff77"] 
								]
					  		}
						]
				  	}
				]
			},		  
			{
			"Name": "Page 1",
			"DashItems": [
				{
				"Type": "diagram", "SubType": "graphs", "Position": [10, 10, 80, 80], "Title": "Pipes Quantity by Months",
				"Graphs": [
					{
					"Name": "graph 1", "Color": "#ff00ff",
					"Array": [ [1.5, 10.3], [3.1, 15.7], [4, 34] ]
					},
					{
					"Name": "graph 2", "Color": "#0000ff",
					"Array": [ [2.5, 20.3], [4.1, 17.7], [5, 63] ]
					}
				]
				},
				{
				"Type": "diagram", "SubType": "graphs", "Position": [40, 40, 90, 90],
				"Title": "Resources Quantity by Months",
				"Graphs": [
					{
					"Name": "graph 3", "Color": "#ff00ff",
					"Array": [ [1.5, 10.3], [3.1, 15.7], [4, 34] ]
					},
					{
					"Name": "graph 4", "Color": "#0000ff",
					"Array": [ [2.5, 20.3], [4.1, 17.7], [5, 63] ]
					}
				]
				}
			]
			},
			{
				"Name": "Page 1",
				"DashItems": [
					{
					"Type": "diagram", "SubType": "graphs", "Position": [10, 10, 70, 70], "Title": "Pipes Quantity by Months",
					"Graphs": [
						{
						"Name": "graph 1", "Color": "#ff00ff",
						"Array": [ [1.5, 10.3], [3.1, 15.7], [4, 34] ]
						},
						{
						"Name": "graph 2", "Color": "#0000ff",
						"Array": [ [2.5, 20.3], [4.1, 17.7], [5, 63] ]
						}
					]
					},
					{
					"Type": "diagram", "SubType": "graphs", "Position": [40, 40, 90, 90],
					"Title": "Resources Quantity by Months",
					"Graphs": [
						{
						"Name": "graph 3", "Color": "#ff00ff",
						"Array": [ [1.5, 10.3], [3.1, 15.7], [4, 34] ]
						},
						{
						"Name": "graph 4", "Color": "#0000ff",
						"Array": [ [2.5, 20.3], [4.1, 17.7], [5, 63] ]
						}
					]
					}
				]
			},
		]
	};
}


export function calculateYDomain( dataSource, marginFactor=0.1, excludeKey='name', includeKey=null ) {
	let r = [0,0];
	let lowest=null, highest=null;

	if( marginFactor === null ) {
		marginFactor=0.1;
	}

	let data=[];
	if( !Array.isArray(dataSource) ) { 	// Ensuring the type is valid
		return r;
	}
	if( dataSource.length == 0 ) { 		// Checking non-empty
		return r;
	}
	if( Array.isArray(dataSource[0]) ) { 	// Is array of arrays?
		data = [];
		for( let d = 0 ; d < dataSource.length ; d++ ) {
			for( let i = 0 ; i < dataSource[d].length ; i++ ) {
				data.push( dataSource[d][i] );		
			}
		}		                 	
	} else {
		data = dataSource;
	}
	for( let i = 0 ; i < data.length ; i++ ) {
		for( let k in data[i] ) {
			if( excludeKey !== null ) {
				if( k === excludeKey ) {
					continue;
				}
			}
			if( includeKey !== null ) {
				if( k !== includeKey ) {
					continue;
				}
			}
			let v = data[i][k];
			if( lowest === null ) {
				lowest = v;
				highest = v;
				continue;
			}
			if( v < lowest ) {
				lowest = v;
			}
			if( v > highest ) {
				highest = v;
			}
		}
	}	
	if( lowest !== null && highest !== null ) {
		let margin = (highest - lowest) * marginFactor;
		r[0] = lowest - margin;
		r[1] = highest + margin;
	}
	return r;
};


const _pctToWindowTopMargin = 0;
const _pctToWindowBottomMargin = 62;
const _pctToWindowLeftMargin = 0;
const _pctToWindowRightMargin = 28;

export function	pctToWindowX( xPct ) {
	return _pctToWindowLeftMargin + 
		Math.floor( (window.innerWidth - _pctToWindowLeftMargin - _pctToWindowRightMargin) * xPct / 100.0);
}

export function	pctToWindowY( yPct ) {
	return _pctToWindowTopMargin + 
		Math.floor( (window.innerHeight - _pctToWindowTopMargin - _pctToWindowBottomMargin) * yPct / 100.0);
}


function calcMaxPageNumberHelper(charts) {
	let maxPageNumber = 0;
	for( let i = 0 ; i < charts.length ; i++ ) {
		if( !('settings' in charts[i]) )
			continue;
		if( !('page' in charts[i].settings) )	// Pagination is not used
			continue;
		if( charts[i].settings.page > maxPageNumber ) {
			maxPageNumber = charts[i].settings.page;
		}
	}
	return maxPageNumber;
}

export function	tileChartWindowsCoords( charts, coords ) {
	let maxPageNumber = calcMaxPageNumberHelper(charts);
	for( let i = 0 ; i <= maxPageNumber ; i++ ) {
		tileChartWindowsCoordsHelper( charts, coords, i );
	}
}


function tileChartWindowsCoordsHelper( charts, coords, pageNumber=null ) {
	if( pageNumber === null )
		pageNumber = 0;
	let l=0;
	for( let i = 0 ; i < charts.length ; i++ ) {
		if( 'page' in charts[i].settings ) {
			if( charts[i].settings.page !== pageNumber )
				continue;
		}
		l++;
	}
	if( l === 0 ) 
		return;
	let nRows=1, nCols=1;
	if( l === 2 ) {
		nCols=2;
	} else if( l === 3 ) {
		nCols=3;
	} else if( l === 4 ) {
		nRows=2;
		nCols=2;
	} else {
		if( l%3 == 0 || l%2 == 1 ) {
			nRows = Math.ceil(l / 3);
			nCols = 3;
		} else { 
			nRows = Math.ceil(l / 4);
			nCols = 4;
		}
	}
	let width = Math.floor(100.0 / nCols) - 0.05;
	let height = Math.floor(100.0 / nRows) - 0.05;
	let ir=0, ic=0;
	for( let i = 0 ; i < charts.length ; i++ ) {
		if( 'page' in charts[i].settings ) {
			if( charts[i].settings.page !== pageNumber )
				continue;
		}
		let x = Math.floor(ic * 100.0 / nCols);		
		let y = Math.floor(ir * 100.0 / nRows);		

		coords[i].x = pctToWindowX( x );
		coords[i].y = pctToWindowY( y + 105 * pageNumber);
		coords[i].width = pctToWindowX( x + width ) - coords[i].x;
		coords[i].height = pctToWindowY( y + height + 105 * pageNumber ) - coords[i].y;
		if( ic === nCols-1 ) {
			ic=0;		
			ir+=1;
		} else {
			ic += 1;
		}			
	}
}

export function	calcChartWindowsCoords( charts, coords ) {
	let l = charts.length;
	if( l === 0 ) {
		return;
	}
	for( let i = 0 ; i < l ; i++ ) {
		if( !('settings' in charts[i]) ) {
			coords.error = 'Error!';
			continue;
		}
		let stt = charts[i].settings;
		if( !('xPct' in stt && 'yPct' in stt && 'widthPct' in stt && 'heightPct' in stt) ) {
			coords.error = 'Error!';
			continue;
		}

		let pageNumber = 0;
		if( 'page' in charts[i].settings ) { 	// If pagination is used
			pageNumber = charts[i].settings.page;
		}

		let x = pctToWindowX( stt.xPct ); 
		let y = pctToWindowY( stt.yPct + 105 * pageNumber);
		let width = pctToWindowX( stt.xPct + stt.widthPct ) - x; 
		let height = pctToWindowY( stt.yPct + stt.heightPct + 105 * pageNumber) - y; 

		coords[i].x = x;
		coords[i].y = y;
		coords[i].width = width;
		coords[i].height = height;
	}
}


export function setCookie( cname, cvalue ) {
	if( !document || !window ) { 	// Not a browser?
		return;
	}
	document.cookie = `${cname}=${cvalue}; path=/`; // ''
}


export function deleteCookie( cname ) {
	if( !document || !window ) { 	// Not a browser?
		return;
	}
	document.cookie = 'cname=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
}


export function getCookie( cname, type='string' ) {
	if( !document || !window ) { 	// Not a browser?
		return null;
	}
	let name = cname + "=";
	let decodedCookie = decodeURIComponent(document.cookie);
	let ca = decodedCookie.split(';');
	for( let i = 0 ; i < ca.length ; i++ ) {
		let c = ca[i];
		while( c.charAt(0) == ' ' ) {
			c = c.substring(1);
		}
		if( c.indexOf(name) == 0 ) {
			let value = c.substring(name.length, c.length);
			if( type == 'string' ) {
				return value;
			}
			if( type == 'int' ) {
				let intValue = parseInt(value);
				if( !isNaN(intValue) ) {
					return intValue;
				}
			}
			if( type == 'float' ) {
				let floatValue = parseFloat(value);
				if( !isNaN(floatValue) ) {
					return floatValue;
				}
			}
			return null;
		}
	}
	return null;
}
