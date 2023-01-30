import { useEffect, useState } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import ReactMapboxGl from 'react-mapbox-gl'
import {MAPBOX_ACCESS_TOKEN} from "constants/appConstants";

const styles = {
	mapContainer: {
		height: '100%',
		width: '100%'
	}
};

const MapContainer = ({ widthOffset }) => {
	const useStyles = makeStyles(styles);
	const classes = useStyles();
	const [map, setMap] = useState();

	const Mapbox = ReactMapboxGl({
		accessToken: MAPBOX_ACCESS_TOKEN,
		doubleClickZoom: false,
		dragRotate: true,
		attributionControl: false
	});

	const onStyleLoad = map => {
		setMap(map);
	};


	useEffect(() => {
		if (map) {
			map.resize();
		}
	}, [widthOffset, map]);

	return (
		<div className={classes.mapContainer}>
			<Mapbox
				style="mapbox://styles/mapbox/streets-v12"
				containerStyle={{
					height: '100%',
					width: '100%'
				}}
				zoom={9}
				center={[-75.4418444, 39.9229625]}
				onStyleLoad={onStyleLoad}
			/>
		</div>
	);
};

export default MapContainer;
