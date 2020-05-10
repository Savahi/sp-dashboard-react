import React, { Component } from 'react';
import styles from './../css/dtext.css'; 

class DText extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			width: this.props.width, 
			height: this.props.height,
			fontSizeScale: this.props.fontSizeScale
		};
	}

	render() {
		let style = { minWidth: this.props.width, maxWidth: this.props.width };
		if( this.props.fontSizeScale != 0 ) {
			style.fontSize = 100 + this.props.fontSizeScale*5 + '%';
		}
		return (
			<div style={style} className={styles.container}>
				{this.props.text.text}
			</div>
		);
	}
}

export default DText;
