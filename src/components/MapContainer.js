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

const MapContainer = ({widthOffset, sources, layers, map, setMap, setMapStyle, setMapZoom, mapZoom, mapStyle}) => {
	const useStyles = makeStyles(styles);
	const classes = useStyles();

	const onStyleLoad = mapObject => {
		addMapControls(mapObject);
		setMap(mapObject);
		setMapStyle(mapObject.getStyle().sprite.split('mapbox/')[1])
		setMapZoom(mapObject.getZoom())
	};

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
				center={[-75.163526, 39.952724]}
				onStyleLoad={onStyleLoad}
			>
			{sources.map(s => {
				return <Source key={s.id} id={s.id} tileJsonSource={{
				type: s.type,
					url: s.url
				}} />
			})}
			{
				layers.map(l => {
					return <Layer key={l.id} {...l}  sourceId={l.source} sourceLayer={l['source-layer']} type={l.type} paint={l.paint}  />
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
	mapStyle: PropTypes.string.isRequired
}

export default MapContainer;
