import {useEffect, useState} from 'react';
import {addMapControls} from "actions/mapbox";
import Map from 'components/Map'
import PropTypes from 'prop-types'
import {Layer, Popup, Source} from 'react-mapbox-gl';
import PopupContent from 'components/PopupContent'
import {Box} from '@mui/material'

const styles = {
	mapContainer: {
		height: '100%',
		width: '100%'
	}
};

const MapContainer = ({widthOffset, sources, layers, map, setMap, setMapStyle, setMapZoom, mapZoom, mapStyle, mapCenter, setMapCenter, addError}) => {

	const [selectedFeature, setSelectedFeature] = useState(null)
	const [popupLocation, setPopupLocation] = useState(null)
	const sourceIds = sources.map(s => s.id);

	const onStyleLoad = mapObject => {
		addMapControls(mapObject);
		setMap(mapObject);
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

	const handleMapClick = (mapObject, e) => {
		const intersectingFeatures = mapObject.queryRenderedFeatures(e.point);
		const aloftLayerFeatures = intersectingFeatures.filter(feature => sourceIds.includes(feature.source)); //Filter out features coming from the map style
		console.log('aloftLayerFeatures', aloftLayerFeatures)
		if (aloftLayerFeatures[0]) {
			setPopupLocation([e.lngLat.lng, e.lngLat.lat])
			setSelectedFeature(aloftLayerFeatures[0])
		}

	};

	const handleMouseEnter = (e) => {
		const mapObject = e.target;
		mapObject.getCanvas().style.cursor = "pointer";
	};

	const handleMouseLeave = e => {
		const mapObject = e.target;
		mapObject.getCanvas().style.cursor = "default";
	};

	const handleClosePopup = () => {
		setSelectedFeature(null)
	}

	useEffect(() => {
		if (map) {
			map.resize();
		}
	}, [widthOffset, map]);

	return (
		<Box sx={styles.mapContainer}>
			{sources.length > 0 && <Map
				style={mapStyle}
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
				onClick={handleMapClick}

			>
				{sources.map(s => {
					if (s.type === 'geojson') {
						return (
							<Source
								key={s.id}
								id={s.id}
								geoJsonSource={{
									type: s.type,
									data: s.data
								}}
							/>
						);
					} else {
						return (
							<Source
								key={s.id}
								id={s.id}
								tileJsonSource={{
									type: s.type,
									url: s.url
								}}
							/>
						);
					}
				})}
				{layers.map(l => {
					const layerSourceType = sources.find(s => s.id === l.source)?.type;
					if (layerSourceType === 'geojson') {
						return (
							<Layer
								onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
								key={l.id}
								sourceId={l.source}
								type={l.type}
								paint={l.paint}
								maxZoom={l.maxzoom}
								minZoom={l.minzoom}
								layout={l.layout}
							/>
						);
					} else {
						return (
							<Layer
								onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
								key={l.id}
								sourceId={l.source}
								sourceLayer={l['source-layer']}
								type={l.type}
								paint={l.paint}
								maxZoom={l.maxzoom}
								minZoom={l.minzoom}
								layout={l.layout}
							/>
						);
					}
				})}
				{selectedFeature &&
				<Popup coordinates={popupLocation}
					   offset={-15}
					   onMouseLeave={handleClosePopup}
				>
					<PopupContent feature={selectedFeature}/>
				</Popup>}
			</Map>}
		</Box>
	);
};

MapContainer.propTypes = {
	widthOffset: PropTypes.number.isRequired,
	sources: PropTypes.array.isRequired,
	layers: PropTypes.array.isRequired,
	map: PropTypes.object,
	setMap: PropTypes.func.isRequired,
	setMapStyle: PropTypes.func.isRequired,
	mapZoom: PropTypes.number.isRequired,
	mapStyle: PropTypes.string.isRequired,
	mapCenter: PropTypes.array.isRequired,
	setMapCenter: PropTypes.func.isRequired,
	addError: PropTypes.func.isRequired
}

export default MapContainer;
