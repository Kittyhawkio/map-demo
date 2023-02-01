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

const MapContainer = ({widthOffset, sources, layers, map, setMap}) => {
	const useStyles = makeStyles(styles);
	const classes = useStyles();

	const onStyleLoad = mapObject => {
		addMapControls(mapObject);
		setMap(mapObject);
	};

	useEffect(() => {
		if (map) {
			map.resize();
		}
	}, [widthOffset, map]);

	return (
		<div className={classes.mapContainer}>
			{sources.length > 0 && <Map
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
				return <Source key={s.id} id={s.id} tileJsonSource={{
				type: s.type,
					url: s.url
				}} />
			})}
			{
				layers.map(l => {
					return <Layer key={l.id} sourceId={l.source} sourceLayer={l['source-layer']} type={l.type} paint={l.paint}  />
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
	setMap: PropTypes.func.isRequired
}

export default MapContainer;
