import React, { PureComponent, Component } from 'react';
import { PieChart, Pie, Legend, Sector, Cell } from 'recharts';

class DPieChart extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			width:this.props.width, height: this.props.height
		};
	}

	render() {
		let stt = this.props.chart.settings;
		let radius = (this.props.width > this.props.height ) ? (this.props.height * 0.4) : (this.props.width * 0.4);

		let colorMapping = null;
		let colors = this.props.chart.settings.colors;
		if( colors !== undefined && colors !== null ) {
			colorMapping = this.props.chart.data.map((entry, index) => <Cell key={`cell.${stt.id}.${index}`} fill={colors[index % colors.length]} />);
		}
		let legend = <Legend key={'legend.'+stt.id} layout="vertical" align="right" />					
		let style= { fontSize:'12px', color: '#7f7f7f' };	
		return (
			<PieChart key={'piechart.'+stt.id} style={style} width={this.props.width} height={this.props.height} 
			 margin={{ top: 5, right: 15, left: 15, bottom: 40 }}>
				{legend}
				<Pie key={'pie.'+stt.id} data={this.props.chart.data} dataKey="value" nameKey="name" cx="50%" cy="50%" 
				 outerRadius={radius} fill={this.props.chart.settings.fill} label>
					{colorMapping}
				</Pie>
			</PieChart>
		);
	}
}

export default DPieChart;
