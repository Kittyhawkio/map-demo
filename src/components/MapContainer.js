import {useEffect, useState} from 'react';
import makeStyles from '@mui/styles/makeStyles';
import {addMapControls} from "actions/mapbox";
import Map from 'components/Map'
import PropTypes from 'prop-types'
import {Layer, Source} from 'react-mapbox-gl';
import {$success} from "styles/colors";

const styles = {
	mapContainer: {
		height: '100%',
		width: '100%'
	}
};

const MapContainer = ({widthOffset, sources, layers, map, setMap}) => {
	console.log('map: ', map)
	const useStyles = makeStyles(styles);
	const classes = useStyles();
	const [styleLoaded, setStyleLoaded] = useState(false);

	const onStyleLoad = mapObject => {
		console.log('HERE')
		addMapControls(mapObject);
		setMap(mapObject);
		setStyleLoaded(true);
	};

	useEffect(() => {
		if (map) {
			map.resize();
		}
		if (map) {
			console.log('airspace layer', map.getLayer('faa_class_airspace'))
		}
	}, [widthOffset, map]);

	console.log('style loaded: ', styleLoaded)


	// useEffect(() => {
	// 	if (styleLoaded && sources.length > 0) {
	// 		sources.forEach(s => {
	// 			console.log('adding source: ', s)
	// 			map.addSource(s.id, s)
	// 		})
	// 	}
	// }, [styleLoaded, sources])





	return (
		<div className={classes.mapContainer}>
			<Map
				style="mapbox://styles/mapbox/streets-v12"
				containerStyle={{
					height: '100%',
					width: '100%'
				}}
				zoom={[9]}
				center={[-75.163526, 39.952724]}
				onStyleLoad={onStyleLoad}
			>
			{sources.map(s => {
				console.log('adding source: ', s)
				return <Source key={s.id} {...s}/>
			})}
				{sources && <Layer {...layers[0]} paint={{
					'fill-color': $success,
					'fill-opacity': 0.5
				}}/>}
			{/*{*/}
			{/*	layers.map(l => {*/}
			{/*		console.log('adding layer: ', l)*/}
			{/*		return <Layer key={l.id} {...l} paint={l.type === 'fill' ? {*/}
			{/*			'fill-color': $success,*/}
			{/*			'fill-opacity': 0.5*/}
			{/*		} : l.paint*/}
			{/*	} />*/}
			{/*})}*/}
			</Map>
		</div>
	);
};

MapContainer.propTypes = {
	widthOffset: PropTypes.number.isRequired,
	sources: PropTypes.array.isRequired,
	layers: PropTypes.array.isRequired,
	map: PropTypes.object,
	setMap: PropTypes.func.isRequired
}

export default MapContainer;
