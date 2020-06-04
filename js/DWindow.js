import React, { Component } from 'react';
import { Rnd } from 'react-rnd';
import DLineChart from './DLineChart';
import DLinePlot from './DLinePlot';
import DBarChart from './DBarChart';
import DBarRLChart from './DBarRLChart';
import DAreaChart from './DAreaChart';
import DPieChart from './DPieChart';
import DDialGaugeChart from './DDialGaugeChart';
import DTable from './DTable';
import DText from './DText';
import DImage from './DImage';
import styles from './../css/dwindow.css'; 
import Settings from './Settings.js';

class DWindow extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			x: this.props.x, y: this.props.y, width: this.props.width, height: this.props.height, chart: this.props.chart,
			fontSizeScale: 0,
			mouseOver: false
		};

		this.setWindowCoords = this.setWindowCoords.bind(this);		
		this.mouseOver = this.mouseOver.bind(this);
		this.mouseOut = this.mouseOut.bind(this);
	} 

	setWindowCoords( x, y, width, height ) {
		this.setState( { x: x, y: y, width: width, height: height } );
	}
  
	mouseOver(e) {
		this.setState( { mouseOver: true} );
	}
	mouseOut(e) {
		this.setState( { mouseOver: false} );
	}

  
	render() {
				
		let chartJSX = null;
		if( this.props.chart.settings.type === 'lineChart' ) {
			chartJSX = <DLineChart width={this.state.width} height={this.state.height} chart={this.props.chart} />;
		}
		else if( this.props.chart.settings.type === 'linePlot' ) {
			chartJSX = <DLinePlot width={this.state.width} height={this.state.height} chart={this.props.chart} />;
		}
		else if( this.props.chart.settings.type === 'barChart' ) {
			chartJSX = <DBarChart width={this.state.width} height={this.state.height} chart={this.props.chart} />;
		}
		else if( this.props.chart.settings.type === 'barRLChart' ) {
			chartJSX = <DBarRLChart width={this.state.width} height={this.state.height} chart={this.props.chart} />;
		}
		else if( this.props.chart.settings.type === 'areaChart' ) {
			chartJSX = <DAreaChart width={this.state.width} height={this.state.height} chart={this.props.chart} />;
		}
		else if( this.props.chart.settings.type === 'pieChart' ) {
			chartJSX = <DPieChart width={this.state.width} height={this.state.height} chart={this.props.chart} />;
		}
		else if( this.props.chart.settings.type === 'dialGaugeChart' ) {
			chartJSX = <DDialGaugeChart width={this.state.width} height={this.state.height} chart={this.props.chart} />;
		}
		else if( this.props.chart.settings.type === 'table' ) {
			chartJSX = <DTable width={this.state.width} height={this.state.height} table={this.props.chart}
				fontSizeScale={this.state.fontSizeScale} />;
		}
		else if( this.props.chart.settings.type === 'text' ) {
			chartJSX = <DText width={this.state.width} height={this.state.height} text={this.props.chart}
				fontSizeScale={this.state.fontSizeScale} />;
		}
		else if( this.props.chart.settings.type === 'image' ) {
			chartJSX = <DImage width={this.state.width} height={this.state.height} image={this.props.chart} />;
		}
		else {
			return( <div>INVALID CHART TYPE</div> ); 
		}

		let controlsJSX=null;
		if( this.props.chart.settings.type === 'table' || this.props.chart.settings.type === 'text' ) {
			controlsJSX = 
				<div className={styles.titleControls} style={{display:(this.state.mouseOver?'block':'none')}}>
					<span className={styles.control} onClick={ (e) => 
						{ this.setState({ fontSizeScale: this.state.fontSizeScale+1 }); } }>{String.fromCharCode(43)}</span>
					<span className={styles.control} onClick={ (e) => 
						{ this.setState({ fontSizeScale: this.state.fontSizeScale-1 }); } }>{String.fromCharCode(8722)}</span>
				</div>;
		}

		// Setting hide title property
		let titleStyle = {};		
		if( 'hideTitle' in this.props.chart.settings && this.props.chart.settings.hideTitle ) {
			titleStyle = { display: this.state.mouseOver ? 'block' : 'none' };
		}
		titleStyle.height = Settings.windowTitleHeight;
		titleStyle.maxHeight = Settings.windowTitleHeight;
		titleStyle.overflow = 'hidden';

		return (
			<Rnd key={'win.'+this.props.chart.settings.id} className={styles.window} ref={c => { this.rnd = c; }} 
				size = {{ width: this.state.width, height: this.state.height }} 
			 	position = {{ x: this.state.x, y: this.state.y }} 
				enableResizing = {{ bottomRight: true }}
				style = {{ zIndex: this.props.zIndex }}
				onMouseOver={this.mouseOver}
				onMouseOut={this.mouseOut}
				onDragStart={ (e,d) => {
					this.props.bringFront(this.props.zIndex);
				}}
		        onDragStop={(e, d) => {
					this.setState({ x: d.x, y: d.y });
        		}}
				onResizeStop={(e, direction, ref, delta, position) => {
					this.setState({ width: parseInt(ref.style.width), height: parseInt(ref.style.height) });
				}} >
				<div className={styles.title} style={titleStyle}>
					{controlsJSX}
					<div className={styles.titleText}>{this.props.chart.settings.title}</div>
				</div>
				<div className={styles.content}
					style={{ top: Settings.windowTitleHeight, width: this.state.width, height: this.state.height - Settings.windowTitleHeight}} >				
					{chartJSX}
				</div>
			</Rnd>
		);
	} // end of render()
}

export default DWindow;
