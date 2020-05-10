
export function calculateYDomain( data, marginFactor=0.1, excludeKey='name' ) {
	let lowest=null, highest=null;
	for( let i = 0 ; i < data.length ; i++ ) {
		for( let k in data[i] ) {
			if( k === excludeKey ) {
				continue;
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

	let margin = (highest - lowest) * marginFactor;
	return [ lowest - margin, highest + margin ];
};


const upperMargin = 42;
const bottomMargin = 8;
const leftMargin = 8;
const rightMargin = 8;

export function	pctToWindowX( xPct ) {
	return Math.floor( (window.innerWidth - leftMargin - rightMargin) * xPct / 100.0);
}

export function	pctToWindowY( yPct ) {
	return Math.floor( (window.innerHeight - upperMargin - bottomMargin) * yPct / 100.0);
}


export function	tileChartWindowsCoords( charts, coords ) {
	let l = charts.length;
	if( l === 0 ) {
		return;
	}

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
	for( let i = 0 ; i < l ; i++ ) {
		let x = Math.floor(ic * 100.0 / nCols);		
		let y = Math.floor(ir * 100.0 / nRows);		

		coords[i].x = pctToWindowX( x );
		coords[i].y = pctToWindowY( y );
		coords[i].width = pctToWindowX( x + width ) - coords[i].x;
		coords[i].height = pctToWindowY( y + height ) - coords[i].y;

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

		let x = pctToWindowX( stt.xPct ); 
		let y = pctToWindowY( stt.yPct );
		let width = pctToWindowX( stt.xPct + stt.widthPct ) - x; 
		let height = pctToWindowY( stt.yPct + stt.heightPct) - y; 

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
