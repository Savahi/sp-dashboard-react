import React, { Component } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { calculateYDomain } from './helpers'

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
  			charts.push( <XAxis key={'xaxis'+stt.id} dataKey="x" allowDuplicatedCategory={false} type="number" style={{fontSize:'12px'}} /> ); 
			let data = [];
			for( let i in keys )
				data.push( this.props.chart.data[ keys[i] ] );
			let ydomain = calculateYDomain( data, null, null, 'value' );
			if( typeof(stt.startYAtZero) !== 'undefined' && stt.startYAtZero ) 	// If refer min Y to zero... 
				ydomain[0] = 0; 
			charts.push( <YAxis key={'yaxis'+stt.id} domain={ydomain} style={{fontSize:'12px'}} /> );
  			charts.push( <Tooltip key={'tooltip'+stt.id}  /> );
			charts.push( <Legend key={'legend'+stt.id}  style={{fontSize:'11px'}} /> );
			for( let i in keys ) {
				let k = keys[i];
				charts.push( <Line type="monotone" key={'line.'+stt.id+'.'+i} dataKey="value" name={k} data={this.props.chart.data[k]}
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
