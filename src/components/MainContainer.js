import {  useState, useEffect, useCallback } from 'react';
import MapContainer from 'components/MapContainer';
import RightPanelContainer from 'components/RightPanelContainer';
import {Box} from '@mui/material';
import SplitPane from 'react-split-pane';
import {
	getDetailPaneSizeFromLS,
	saveDetailPaneSizeToLS
} from 'actions/localStorage';
import {fetchMapLayersAndSources} from "apis/airspace.api";
import {transformLayers} from "utils/helpers";
import {ALOFT_API_URL, ALOFT_TOKEN, MAPBOX_TOKEN} from "constants/appConstants";
import SetupDialog from "components/SetupDialog";

const styles = {
	mainContainer: {
		width: '100%',
		height: '100%'
	}
};

const MainContainer = () => {

	const [pane2Width, setPane2Width] = useState(1); //The actual value of this does not matter. A change in this value is used to trigger a resize in the map component.
	const [map, setMap] = useState(null);
	const [allLayers, setAllLayers] = useState([]);
	const [sources, setSources] = useState([]);
	const [visibleLayers, setVisibleLayers] = useState([])
	const [mapStyle, setMapStyle] = useState('mapbox://styles/kittyhawkio/clecwrlel000p01o1xer2cm34')
	const [mapZoom, setMapZoom] = useState(9)
	const [mapCenter, setMapCenter] = useState([-75.163526, 39.952724])
	const detailPaneSize = getDetailPaneSizeFromLS();
	const aloftApiUrl = localStorage.getItem(ALOFT_API_URL);
	const aloftToken = localStorage.getItem(ALOFT_TOKEN);
	const mapboxToken = localStorage.getItem(MAPBOX_TOKEN);
	const setupVariablesDefined = Boolean(aloftApiUrl && aloftToken && mapboxToken)
	const [errors, setErrors] = useState([])
	const [setupDialogOpen, setSetupDialogOpen]= useState(!setupVariablesDefined || errors.length > 0);

	const addError = useCallback((error) => {
		const updatedErrors = [...errors];
		updatedErrors.push(error);
		setErrors(updatedErrors)
	}, [errors])

	const onDragFinished = width => {
		saveDetailPaneSizeToLS(width);
		setPane2Width(width);
	};

	const onCloseSetup = () => {
		setSetupDialogOpen(false)
		window.location.reload();
	}
	const handleOpenSetup = () => {
		setSetupDialogOpen(true)
	}

	useEffect(() => {

		const getMapLayersAndSources = async () => {
			const res = await fetchMapLayersAndSources(addError);
			if (res) {
				const {sources, layers} = res;
				const layersWithAddedData = transformLayers(layers);
				setAllLayers(layersWithAddedData);
				setVisibleLayers(layersWithAddedData)
				setSources(sources)
			}
		}

		if (setupVariablesDefined && errors.length === 0) {
			getMapLayersAndSources();
		}


	}, [setupVariablesDefined, addError, errors])

	useEffect(() => {
		setSetupDialogOpen(!setupVariablesDefined || errors.length > 0)
	}, [errors, setSetupDialogOpen, setupVariablesDefined])

	return (
		<Box sx={styles.mainContainer}>

			<SetupDialog open={setupDialogOpen} onClose={onCloseSetup} errors={errors} setErrors={setErrors} />
			{!setupDialogOpen &&
				<>
					<SplitPane
						split='vertical'
						onDragFinished={onDragFinished}
						size={detailPaneSize}
						primary={'second'}
						minSize={550}
					>
							<MapContainer
								widthOffset={pane2Width}
								sources={sources}
								layers={visibleLayers}
								map={map}
								setMap={setMap}
								mapZoom={mapZoom}
								setMapZoom={setMapZoom}
								mapStyle={mapStyle}
								setMapStyle={setMapStyle}
								mapCenter={mapCenter}
								setMapCenter={setMapCenter}
								addError={addError}
							/>
							<RightPanelContainer
								map={map}
								allLayers={allLayers}
								visibleLayers={visibleLayers}
								setVisibleLayers={setVisibleLayers}
								setAllLayers={setAllLayers}
								mapStyle={mapStyle}
								mapZoom={mapZoom}
								setMapStyle={setMapStyle}
								setMapZoom={setMapZoom}
								openSetup={handleOpenSetup}
							/>
					</SplitPane>
				</>}

		</Box>
	);
};

export default MainContainer;
