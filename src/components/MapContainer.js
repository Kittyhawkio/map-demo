import {useEffect} from 'react';
import makeStyles from '@mui/styles/makeStyles';
import {addMapControls} from "actions/mapbox";
import Map from 'components/Map'
import PropTypes from 'prop-types'
import {Layer, Source} from 'react-mapbox-gl';

const styles = {
	mapContainer: {
		height: '100%',
		width: '100%'
	}
};

const MapContainer = ({widthOffset, sources, layers, map, setMap, setMapStyle, setMapZoom, mapZoom, mapStyle, mapCenter, setMapCenter, addError}) => {

	const useStyles = makeStyles(styles);
	const classes = useStyles();

	const onStyleLoad = mapObject => {
		addMapControls(mapObject);
		setMap(mapObject);
		setMapStyle(mapObject.getStyle().sprite.split('mapbox/')[1])
		setMapZoom(mapObject.getZoom())
	};

	const handleMove = (mapObject) => {
		const {lng, lat} = mapObject.getCenter();
		setMapCenter([lng, lat])
	}

	const handleZoom = (mapObject) => {
		setMapZoom(mapObject.getZoom())
	}

	const handleError = (e, error) => {
		console.log('error', error)
		let errorMessage = '';
		if (error?.error?.message) {
			errorMessage = `Mapbox Error: ${error.error.message}`;
		} else if (error.error.status && error.error.url) {
			if (error.error.status === 401) {
				errorMessage = `Aloft API Error: Not Authorized: ${error.error.status} : ${error.error.url}`
			} else {
				errorMessage = `Aloft API Error: ${error.error.status} : ${error.error.url}`
			}

		}
		addError({type: 'error', message: errorMessage})
	}

	useEffect(() => {
		if (map) {
			map.resize();
		}
	}, [widthOffset, map]);

	return (
		<div className={classes.mapContainer}>
			{sources.length > 0 && <Map
				style={`mapbox://styles/mapbox/${mapStyle}`}
				containerStyle={{
					height: '100%',
					width: '100%'
				}}
				zoom={[mapZoom]}
				center={mapCenter}
				onStyleLoad={onStyleLoad}
				onMoveEnd={handleMove}
				onZoomEnd={handleZoom}
				onError={handleError}
			>
			{sources.map(s => {
				return <Source key={s.id} id={s.id} tileJsonSource={{
				type: s.type,
					url: s.url
				}} />
			})}
			{
				layers.map(l => {
					return <Layer key={l.id} sourceId={l.source} sourceLayer={l['source-layer']} type={l.type} paint={l.paint} maxZoom={l.maxzoom} minZoom={l.minzoom}  />
			})}
			</Map>}
		</div>
	);
};

MapContainer.propTypes = {
	widthOffset: PropTypes.number.isRequired,
	sources: PropTypes.array.isRequired,
	layers: PropTypes.array.isRequired,
	map: PropTypes.object,
	setMap: PropTypes.func.isRequired,
	setMapStyle: PropTypes.func.isRequired,
	mapZoom: PropTypes.func.isRequired,
	mapStyle: PropTypes.string.isRequired,
	mapCenter: PropTypes.array.isRequired,
	setMapCenter: PropTypes.func.isRequired,
	addError: PropTypes.func.isRequired
}

export default MapContainer;
