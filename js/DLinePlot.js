import React, { Component } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { calculateXDomain, calculateYDomain, secondsToDate } from './helpers'
import Settings from './Settings'

class DLinePlot extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			width:this.props.width, height: this.props.height
		};
	}

	render() {
		let stt = this.props.chart.settings;
		let keys = Object.keys(this.props.chart.charts);
		if( keys.length > 0 ) {
			let charts = [];
			charts.push( <CartesianGrid key={'cgrid'+stt.id} strokeDasharray="3 3" /> );
			let data = [];
			for( let i in keys )
				data.push( this.props.chart.data[ keys[i] ] );

			let xdomain = calculateXDomain( data, null, 'x' );
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

			let ydomain = calculateYDomain( data, null, null, 'value' );
			if( typeof(stt.startYAtZero) !== 'undefined' && stt.startYAtZero && ydomain !== null ) 	// If refer min Y to zero... 
				ydomain[0] = 0;				
			let yFormatter = undefined;
			if( typeof(stt.decimalPlacesAfterDotAtAxis) !== 'undefined' ) {
				yFormatter = function(e) { return e.toFixed(stt.decimalPlacesAfterDotAtAxis); };
			}
			charts.push( <YAxis key={'yaxis'+stt.id} style={{fontSize:Settings.axisFontSize}} 
				domain={(ydomain!==null) ? ydomain : undefined } 
				tickFormatter={yFormatter} /> );

			charts.push( <Tooltip key={'tooltip'+stt.id}  labelFormatter={ xFormatter } /> );

			charts.push( <Legend key={'legend'+stt.id}  style={{fontSize:Settings.legendFontSize}} /> );
			for( let i in keys ) {
				let k = keys[i];
				charts.push( <Line key={'line.'+stt.id+'.'+i} 
					dataKey={(typeof(stt.yAxisKey)!=='undefined') ? stt.yAxisKey : 'value'}
					type={(typeof(stt.lineType) !== 'undefined') ? stt.lineType : "monotone"} 
					name={k} data={this.props.chart.data[k]}
					stroke={this.props.chart.charts[k].stroke} /> );
			}
			let margin = { top:10, left:0, right:20, bottom:30 };
			let style= { fontSize:'12px', color: '#7f7f7f' };	
			return (
				<LineChart key={'linechart.'+stt.id} width={this.props.width} height={this.props.height} style={style} margin={margin}>
					{charts}
				</LineChart>
			);
		} else {
			return( <div>NO DATA</div> );
		}
	}
}

export default DLinePlot;
