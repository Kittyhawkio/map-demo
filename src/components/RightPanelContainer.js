import {Divider, Switch, Typography, Accordion, AccordionSummary, AccordionDetails} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import {$primary, $white} from 'styles/colors';
import {aboutLink, termsLink} from 'constants/appConstants';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const styles = {
    detailPanelContainer: {
        width: '100%',
        height: '100%'
    },
    footer: {
        height: 50,
        position: 'absolute',
        width: '100%',
        bottom: 0,
        backgroundColor: $white,
        zIndex: 100
    },
    divider: {
        width: '100%'
    },
    footerLinks: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: '100%'
    },
    link: {
        cursor: 'pointer',
        color: $primary,
        fontSize: 16
    },
    toggleContainer: {
        display: 'flex',
        flexDirection: 'column',
        padding: '20px'
    }
};

const RightPanelContainer = ({map, allLayers, visibleLayers, setVisibleLayers}) => {
    const useStyles = makeStyles(styles);
    const classes = useStyles();
    const visibleLayerIds = visibleLayers.map(l => l.id);

    const handleClickAboutAloft = () => {
        window.open(aboutLink);
    };

    const handleClickTerms = () => {
        window.open(termsLink);
    };

    const handleToggleLayer = (layer) => {
        const layerIdIndex = visibleLayerIds.findIndex(id => id === layer.id);
        if (layerIdIndex > -1) {
            //Layer is on - turn off
            const updated = [...visibleLayers];
            updated.splice(layerIdIndex, 1)
            setVisibleLayers(updated)
        } else {
            //Layer is off - turn on
            const updated = [...visibleLayers, layer];
            setVisibleLayers(updated)
        }
    }

    return <div className={classes.detailPanelContainer}>

        <div className={classes.toggleContainer}>
            <Typography variant="h4">Layers</Typography>
            <Divider/>
            {allLayers.map(l => {
                console.log('l',l)
                return <Accordion id={l.id}

                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}>
                        {l.id} <Switch onChange={() => handleToggleLayer(l)}
                                       checked={visibleLayerIds.includes(l.id)}/>
                    </AccordionSummary>
                    <AccordionDetails>

                    </AccordionDetails>
                </Accordion>
            })}
        </div>

        <div className={classes.footer}>
            <Divider className={classes.divider}/>
            <div className={classes.footerLinks}>
                <div className={classes.link} onClick={handleClickAboutAloft}>
                    About Aloft
                </div>
                <div className={classes.link} onClick={handleClickTerms}>
                    Terms of Use
                </div>
            </div>
        </div>
    </div>
};

export default RightPanelContainer;