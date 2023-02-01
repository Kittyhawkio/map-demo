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
import {transformLayers} from "utils/helpers";

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
	const [allLayers, setAllLayers] = useState([]);
	const [sources, setSources] = useState([]);
	const [visibleLayers, setVisibleLayers] = useState([])

	const detailPaneSize = getDetailPaneSizeFromLS();

	const onDragFinished = width => {
		saveDetailPaneSizeToLS(width);
		setPane2Width(width);
	};

	useEffect(() => {

		const getMapLayersAndSources = async () => {
			const {sources, layers} = await fetchMapLayersAndSources();
			const layersWithAddedData = transformLayers(layers);
			setAllLayers(layersWithAddedData);
			setVisibleLayers(layersWithAddedData)
			setSources(sources)
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
							<MapContainer widthOffset={pane2Width} sources={sources} layers={visibleLayers} map={map} setMap={setMap} />
							<RightPanelContainer map={map} allLayers={allLayers} visibleLayers={visibleLayers} setVisibleLayers={setVisibleLayers} setAllLayers={setAllLayers} />
					</SplitPane>
				</>

		</div>
	);
};

export default MainContainer;
