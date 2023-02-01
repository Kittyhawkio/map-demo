import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    Divider,
    FormControlLabel,
    Link,
    Popover,
    Select,
    Slider,
    Switch,
    TextField,
    Typography,
    MenuItem
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import {$primary, $white} from 'styles/colors';
import {aboutLink, termsLink} from 'constants/appConstants';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {SketchPicker} from 'react-color';
import {useState} from 'react'
import {updateLayerStyles} from "utils/helpers";
import {startCase} from 'lodash-es';

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
    sectionTitleContainer: {
        display: 'flex',
        flexDirection: 'column',
        padding: '20px'
    },
    accordionContainer: {
        display: 'flex',
        flexDirection: 'column',
        padding: '20px',
        height: 'calc(100% - 151px - 50px)',
        overflow: 'auto'
    },
    accordionTitle: {
        width: '33%',
        flexShrink: 0
    },
    accordionSubtitle: {
        color: 'text.secondary'
    },
    accordionDetails: {
        display: 'grid',
        gridTemplateColumns: '100px auto',
        gridGap: '20px'
    },
    colorButton: {
        width: 'fit-content'
    },
    slider: {
        width: '90%'
    },
    textField: {
        width: '100px'
    },
    mapSettingsContainer: {
        padding: '40px',
        display: 'grid',
        overflow: 'auto',
        gridTemplateColumns: '100px auto',
        gridGap: '20px'
    },
};

const RightPanelContainer = ({map, allLayers, visibleLayers, setVisibleLayers, setAllLayers}) => {
    const useStyles = makeStyles(styles);
    const classes = useStyles();
    const visibleLayerIds = visibleLayers.map(l => l.id);
    const [colorPickerAnchorEl, setColorPickerAnchorEl] = useState(null);
    const [editingLayer, setEditingLayer] = useState(null)
    const colorPickerOpen = Boolean(colorPickerAnchorEl);
    const [mapStyle, setMapStyle] = useState(map.getStyle().sprite.split('mapbox/')[1])
    const [mapZoom, setMapZoom] = useState(map.getZoom())

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

    const handleOpenColors = (e, l) => {
        setColorPickerAnchorEl(e.currentTarget);
        setEditingLayer(l)
    };

    const handleCloseColors = () => {
        setColorPickerAnchorEl(null);
        setEditingLayer(null)
    };

    const handleChangeColor = (color) => {
        const {hex} = color;
        let paint = {
            ...editingLayer.paint,
        };

        if (editingLayer.type === 'fill') {
            paint['fill-color'] = hex;
        }

        if (editingLayer.type === 'circle') {
            paint['circle-color'] = hex
        }
        const {updatedVisibleLayers, updatedAllLayers} = updateLayerStyles({
            allLayers: allLayers,
            visibleLayers: visibleLayers,
            layerId: editingLayer.id,
            properties: {
                paint,
                editableColor: hex,
            }
        })
        setVisibleLayers(updatedVisibleLayers)
        setAllLayers(updatedAllLayers)
    }

    const handleOpacityChange = (opacity, layer) => {
        let paint = {
            ...layer.paint,
        };

        if (layer.type === 'fill') {
            paint['fill-opacity'] = opacity;
        }

        if (layer.type === 'circle') {
            paint['circle-opacity'] = opacity
        }
        const {updatedVisibleLayers, updatedAllLayers} = updateLayerStyles({
            allLayers: allLayers,
            visibleLayers: visibleLayers,
            layerId: layer.id,
            properties: {
                paint,
                editableOpacity: opacity,
            }
        })
        setVisibleLayers(updatedVisibleLayers)
        setAllLayers(updatedAllLayers)
    };

    const handleMaxZoomChange = (e, layer) => {
        const zoom = Number(e.target.value);
        const {updatedVisibleLayers, updatedAllLayers} = updateLayerStyles({
            allLayers: allLayers,
            visibleLayers: visibleLayers,
            layerId: layer.id,
            properties: {
                editableMaxZoom: zoom,
                maxzoom: zoom
            }
        })
        console.log('updated visible: ', updatedVisibleLayers)
        setVisibleLayers(updatedVisibleLayers)
        setAllLayers(updatedAllLayers)
    };

    const handleStyleChange = (e) => {
        setMapStyle( e.target.value)
        map.setStyle('mapbox://styles/mapbox/' + e.target.value)
    };

    const handleZoomChange = (e) => {
        setMapZoom(Number(e.target.value))
      map.setZoom(Number(e.target.value))
    };

    return <div className={classes.detailPanelContainer}>
        <div className={classes.sectionTitleContainer}>
            <Typography variant="h4" gutterBottom>Map Settings</Typography>
        </div>
        <div className={classes.mapSettingsContainer}>
            <Typography variant="overline" component={Link} href="https://docs.mapbox.com/help/glossary/zoom-level/" target="_blank">Zoom</Typography>
            <TextField variant="standard" type="number" value={mapZoom}
                       className={classes.textField}
                       inputProps={{
                           max: 22,
                           min: 0
                       }}
                       onChange={handleZoomChange}/>
            <Typography variant="overline">Style</Typography>
            <Select variant="standard" onChange={handleStyleChange} value={mapStyle}>
                <MenuItem value="light-v11">Light</MenuItem>
                <MenuItem value="dark-v11">Dark</MenuItem>
                <MenuItem value="streets-v12">Streets</MenuItem>
                <MenuItem value="satellite-streets-v12">Satellite Streets</MenuItem>
                <MenuItem value="outdoors-v12">Outdoors</MenuItem>
            </Select>
            <Typography variant="subtitle1">{map?.getZoom()}</Typography>
        </div>
        <Divider/>
        <div className={classes.sectionTitleContainer}>
            <Typography variant="h4" gutterBottom>Layers</Typography>
            <Typography variant="subtitle1">Use the toggles to control a layer's visibility. Expand each layer to
                customize its styling.</Typography>
        </div>
        <Divider/>
        <div className={classes.accordionContainer}>
            {allLayers.map(l => {
                return <Accordion key={l.id} id={l.id} expanded>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}>
                        <FormControlLabel control={
                            <Switch
                                onChange={() => handleToggleLayer(l)}
                                checked={visibleLayerIds.includes(l.id)}/>}
                                          label={l.id}
                        />
                    </AccordionSummary>
                    <Divider/>
                    <AccordionDetails className={classes.accordionDetails}>
                        <Typography variant="overline" component={Link}
                                    href="https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/"
                                    target="_blank">Type</Typography>
                        <Typography variant="subtitle1">{startCase(l.type)}</Typography>
                        {(l.type === 'fill' || l.type === 'circle') &&
                        <>
                            <Typography variant="overline" component={Link}
                                        href={`https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/#${l.type === 'fill' ? 'paint-fill-fill-color' : 'paint-circle-circle-color'}`}
                                        target="_blank">{l.type === 'fill' ? 'Fill' : 'Circle'} Color</Typography>
                            <Button
                                className={classes.colorButton}
                                variant='outlined'
                                onClick={(e) => handleOpenColors(e, l)}
                                startIcon={l.editableColor &&
                                <div style={{backgroundColor: l.editableColor, height: 20, width: 20}}/>}
                            >
                                {!l.editableColor ? 'Select Color' : l.editableColor}
                            </Button>
                            <Typography variant="overline" component={Link}
                                        href={`https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/#${l.type === 'fill' ? 'paint-fill-fill-opacity' : 'paint-circle-circle-opacity'}`}
                                        target="_blank">{l.type === 'fill' ? 'Fill' : 'Circle'} Opacity</Typography>
                            <Slider
                                className={classes.slider}
                                defaultValue={l.editableOpacity}
                                step={.05}
                                marks
                                min={0}
                                max={1}
                                onChange={(e, opacity) => handleOpacityChange(opacity, l)}
                                valueLabelDisplay="auto"
                            />
                            <Typography variant="overline" component={Link}
                                        href="https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/#maxzoom"
                                        target="_blank">Max Zoom</Typography>
                            <TextField variant="standard" type="number" value={l.editableMaxZoom}
                                       className={classes.textField}
                                       inputProps={{
                                           max: 24,
                                           min: 0
                                       }}
                                       onChange={(e) => handleMaxZoomChange(e, l)}/>
                        </>
                        }
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
        <Popover
            open={colorPickerOpen}
            anchorEl={colorPickerAnchorEl}
            onClose={handleCloseColors}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center'
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center'
            }}
        >
            <SketchPicker disableAlpha color={editingLayer?.editableColor} onChange={handleChangeColor}/>
        </Popover>
    </div>
};

export default RightPanelContainer;