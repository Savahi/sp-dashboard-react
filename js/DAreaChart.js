import React, { Component } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { calculateXDomain, calculateYDomain, secondsToDate } from './helpers'
import Settings from './Settings';

class DAreaChart extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			width:this.props.width, height: this.props.height
		};
	}

	render() {
		let stt = this.props.chart.settings;
		let data = this.props.chart.data;
		let keys = Object.keys(this.props.chart.charts);
		if( keys.length > 0 ) {
			let charts = [];
			charts.push( <CartesianGrid key={'cgrid'+stt.id} strokeDasharray="3 3" /> );

			let xdomain = calculateXDomain( data, null, (typeof(stt.xAxisKey)!=='undefined') ? stt.xAxisKey : 'name' );
			if( typeof(stt.startXAtZero) !== 'undefined' && stt.startXAtZero && xdomain !== null ) 	// If refer min Y to zero... 
				xdomain[0] = 0; 
			let xFormatter = undefined;
			if( typeof(stt.xAxisType) !== 'undefined' && stt.xAxisType === 'date' ) 	// If refer min Y to zero... 
				xFormatter = function(e) { return secondsToDate(e); }; 			
			charts.push( <XAxis key={'xaxis'+stt.id} allowDuplicatedCategory={false} 
				dataKey={(typeof(stt.xAxisKey)!=='undefined') ? stt.xAxisKey : 'name'} 
				type="number" style={{fontSize: Settings.axisFontSize}} 
				domain={xdomain!==null ? xdomain: undefined} 
				tickFormatter={xFormatter} /> );

			let ydomain = calculateYDomain( data, null, (typeof(stt.xAxisKey) !== undefined) ? stt.xAxisKey : null );
			if( typeof(stt.startYAtZero) !== 'undefined' && stt.startYAtZero && ydomain !== null ) 	// If refer min Y to zero... 
				ydomain[0] = 0;				
			let yFormatter = undefined;
			if( stt.decimalPlacesAfterDotAtAxis !== undefined ) {
				yFormatter = function(e) { return e.toFixed(stt.decimalPlacesAfterDotAtAxis); };
			}
			charts.push( <YAxis key={'yaxis'+stt.id} style={{fontSize:Settings.axisFontSize}} 
				domain={(ydomain!==null) ? ydomain : undefined } 
				tickFormatter={yFormatter} /> );

			charts.push( <Tooltip key={'tooltip'+stt.id}  labelFormatter={ xFormatter } /> );
			/*
			charts.push( <XAxis key={'xaxis'+stt.id} dataKey="name" style={{fontSize:'12px'}} /> ); 
			let ydomain = calculateYDomain( this.props.chart.data );
			ydomain[0] = 0;
			charts.push( <YAxis key={'yaxis'+stt.id} domain={ydomain} style={{fontSize:'12px'}} /> );
			charts.push( <Tooltip key={'tooltip'+stt.id}  /> );
			*/
			charts.push( <Legend key={'legend'+stt.id}  style={{fontSize:Settings.legendFontSize}} /> );
			for( let i in keys ) {
				let k = keys[i];
				charts.push( <Area type={(typeof(stt.areaType) !== 'undefined') ? stt.areaType : "monotone"} 
					key={'line.'+stt.id+'.'+i} dataKey={k} 
					stroke={this.props.chart.charts[k].stroke} /> );
			}
			let margin = { top:10, left:0, right:20, bottom:30 };
			let style= { fontSize:'12px', color: '#7f7f7f' };	
			return (
				<AreaChart key={'linechart.'+stt.id} width={this.props.width} height={this.props.height} data={this.props.chart.data} style={style} margin={margin}>
					{charts}
				</AreaChart>
			);
		} else {
			return( <div>NO DATA</div> );
		}
	}
}

export default DAreaChart;
