import {  useState } from 'react';
import MapContainer from 'components/MapContainer';
import RightPanelContainer from 'components/RightPanelContainer';
import makeStyles from '@mui/styles/makeStyles';
import SplitPane from 'react-split-pane';
import {
	getDetailPaneSizeFromLS,
	saveDetailPaneSizeToLS
} from 'actions/localStorage';

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

	const detailPaneSize = getDetailPaneSizeFromLS();

	const onDragFinished = width => {
		saveDetailPaneSizeToLS(width);
		setPane2Width(width);
	};


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
							<MapContainer widthOffset={pane2Width} />
							<RightPanelContainer />
					</SplitPane>
				</>

		</div>
	);
};

export default MainContainer;
