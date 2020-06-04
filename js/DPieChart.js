import React, { PureComponent, Component } from 'react';
import { PieChart, Pie, Legend, Tooltip, Sector, Cell } from 'recharts';

class DPieChart extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			width:this.props.width, height: this.props.height
		};
	}

	render() {
		let stt = this.props.chart.settings;
		let radius = (this.props.width > this.props.height) ? 
			(this.props.height * 0.4 - 10) : (this.props.width * 0.4 - 10);
		let cx = Math.floor( this.props.width / 2 );
		let cy = Math.floor( this.props.height / 2 );
		let colorMapping = null;
		let colors = this.props.chart.settings.colors;
		if( colors !== undefined && colors !== null ) {
			colorMapping = this.props.chart.data.map((entry, index) => <Cell key={`cell.${stt.id}.${index}`} fill={colors[index % colors.length]} />);
		}
		let align = (this.props.width > this.props.height) ? "right" : "center";
		let verticalAlign = (this.props.width > this.props.height) ? "middle" : "top";
		let legend = <Legend key={'legend.'+stt.id} layout="vertical" align={align} verticalAlign={verticalAlign}
			chartWidth={this.props.width} chartHeight={this.props.height} />					
		let style= { fontSize:'12px', color: '#7f7f7f' };	
		return (
			<PieChart key={'piechart.'+stt.id} style={style} width={this.props.width} height={this.props.height} 
			 margin={{ top: 10, left: 5, right: 5, bottom: 5 }}>
				{legend}
				<Pie key={'pie.'+stt.id} data={this.props.chart.data} dataKey="value" 
				 nameKey="name" cx={cx+'px'} cy={cy+'px'} 
				 outerRadius={radius} fill={this.props.chart.settings.fill} label>
					{colorMapping}
				</Pie>
				<Tooltip/>
			</PieChart>
		);
	}
}

export default DPieChart;
