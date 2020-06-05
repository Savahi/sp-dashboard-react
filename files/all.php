		{
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
		}