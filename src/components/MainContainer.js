import {  useState, useEffect } from 'react';
import MapContainer from 'components/MapContainer';
import RightPanelContainer from 'components/RightPanelContainer';
import makeStyles from '@mui/styles/makeStyles';
import SplitPane from 'react-split-pane';
import {
	getDetailPaneSizeFromLS,
	saveDetailPaneSizeToLS
} from 'actions/localStorage';
import {fetchMapLayersAndSources} from "apis/airspace.api";

const styles = {
	mainContainer: {
		width: '100%',
		height: '100%'
	}
};

const MainContainer = () => {
	const useStyles = makeStyles(styles);
	const classes = useStyles();
	const [pane2Width, setPane2Width] = useState(1); //The actual value of this does not matter. A change in this value is used to trigger a resize in the map component.
	const [map, setMap] = useState(null);
	const [mapLayers, setMapLayers] = useState([]);
	const [mapSources, setMapSources] = useState([]);
	// console.log('layers: ', mapLayers)
	// console.log('sources: ', mapSources)
	// console.log('map: ', map)

	const detailPaneSize = getDetailPaneSizeFromLS();

	const onDragFinished = width => {
		saveDetailPaneSizeToLS(width);
		setPane2Width(width);
	};

	useEffect(() => {

		const getMapLayersAndSources = async () => {
			const {sources, layers} = await fetchMapLayersAndSources();
			console.log('map layers and sources: ', layers, sources)
			setMapLayers(layers);
			setMapSources(sources)
		}

		getMapLayersAndSources();

	}, [])

	return (
		<div className={classes.mainContainer}>
				<>
					<SplitPane
						className={classes.mainContainer}
						split='vertical'
						onDragFinished={onDragFinished}
						size={detailPaneSize}
						primary={'second'}
					>
							<MapContainer widthOffset={pane2Width} sources={mapSources} layers={mapLayers} map={map} setMap={setMap} />
							<RightPanelContainer />
					</SplitPane>
				</>

		</div>
	);
};

export default MainContainer;
