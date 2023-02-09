import {
    Box,
    Button,
    Collapse,
    Divider,
    IconButton,
    Link,
    List,
    ListItem,
    ListItemText,
    MenuItem,
    Popover,
    Select,
    Slider,
    Switch,
    TextField,
    Typography
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import {$primary, $white} from 'styles/colors';
import {aboutLink, termsLink} from 'constants/appConstants';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandLess from '@mui/icons-material/ExpandLess';
import {SketchPicker} from 'react-color';
import {useState} from 'react'
import {updateLayerStyles} from "utils/helpers";
import PropTypes from 'prop-types'
import {startCase} from 'lodash-es'

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
    listContainer: {
        display: 'flex',
        flexDirection: 'column',
        padding: '20px',
        height: 'calc(100% - 209px - 150px - 135.5px)',
        overflowY: 'auto'
    },
    listDetails: {
        display: 'grid',
        gridTemplateColumns: '100px auto',
        gridGap: '20px',
        padding: '20px'
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
        paddingTop: '0px',
        padding: '40px',
        display: 'grid',
        overflow: 'auto',
        gridTemplateColumns: '100px auto',
        gridGap: '20px'
    },
    buttonsContainer: {
        padding: '20px',
        display: 'flex',
        gridGap: '20px'
    },
    card: {
        marginBottom: '20px',
        overflow: 'visible'
    },
    button: {
        textTransform: 'none',
        fontSize: 16
    }
};

const RightPanelContainer = ({
                                 allLayers,
                                 visibleLayers,
                                 setVisibleLayers,
                                 setAllLayers,
                                 mapStyle,
                                 mapZoom,
                                 setMapStyle,
                                 setMapZoom,
                                 openSetup
                             }) => {
    const useStyles = makeStyles(styles);
    const classes = useStyles();
    const visibleLayerIds = visibleLayers.map(l => l.id);
    const [colorPickerAnchorEl, setColorPickerAnchorEl] = useState(null);
    const [editingLayer, setEditingLayer] = useState(null)
    const colorPickerOpen = Boolean(colorPickerAnchorEl);
    const [openLayers, setOpenLayers] = useState([])


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

    const handleToggleCollapse = (l) => {
        let updatedOpenLayers = [...openLayers]
        if (openLayers.includes(l.id)) {
            const toRemove = updatedOpenLayers.findIndex(layer => layer.id === l.id);
            updatedOpenLayers.splice(toRemove, 1);
        } else {
            updatedOpenLayers.push(l.id);
        }
        setOpenLayers(updatedOpenLayers)
    };

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
        setVisibleLayers(updatedVisibleLayers)
        setAllLayers(updatedAllLayers)
    };

    const handleMinZoomChange = (e, layer) => {
        const zoom = Number(e.target.value);
        const {updatedVisibleLayers, updatedAllLayers} = updateLayerStyles({
            allLayers: allLayers,
            visibleLayers: visibleLayers,
            layerId: layer.id,
            properties: {
                editableMinZoom: zoom,
                minzoom: zoom
            }
        })
        setVisibleLayers(updatedVisibleLayers)
        setAllLayers(updatedAllLayers)
    };

    const handleCircleRadiusChange = (e, layer) => {
        const radius = Number(e.target.value);
        let paint = {
            ...layer.paint,
        };
        paint['circle-radius'] = radius;
        const {updatedVisibleLayers, updatedAllLayers} = updateLayerStyles({
            allLayers: allLayers,
            visibleLayers: visibleLayers,
            layerId: layer.id,
            properties: {
                paint,
                editableCircleRadius: radius,

            }
        })
        setVisibleLayers(updatedVisibleLayers)
        setAllLayers(updatedAllLayers)
    }

    const handleStyleChange = (e) => {
        setMapStyle( e.target.value)
    };

    const handleZoomChange = (e) => {
        setMapZoom(Number(e.target.value))
    };

    const handleTurnAllLayersOff = () => {
      setVisibleLayers([]);
    };
    const handleTurnAllLayersOn = () => {
        setVisibleLayers(allLayers)
    }

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
            <Typography variant="overline" component={Link} href="https://docs.mapbox.com/api/maps/styles/#mapbox-styles" target="_blank">Style</Typography>
            <Select variant="standard" onChange={handleStyleChange} value={mapStyle}>
                <MenuItem value="light-v11">Light</MenuItem>
                <MenuItem value="dark-v11">Dark</MenuItem>
                <MenuItem value="streets-v12">Streets</MenuItem>
                <MenuItem value="satellite-streets-v12">Satellite Streets</MenuItem>
                <MenuItem value="outdoors-v12">Outdoors</MenuItem>
            </Select>
        </div>
        <Divider/>
        <div className={classes.sectionTitleContainer}>
            <Typography variant="h4" gutterBottom>Layers</Typography>
            <Typography variant="subtitle1">Use the toggles to control a layer's visibility. Expand each layer to
                customize its styling.</Typography>
        </div>
        <div className={classes.buttonsContainer}>
            <Button variant="contained" onClick={handleTurnAllLayersOff}>All Layers Off</Button>
            <Button variant="contained" onClick={handleTurnAllLayersOn}>All Layers On</Button>
        </div>
        <Divider/>
        <div className={classes.listContainer}>
            <List>
                {allLayers.map((l, idx) => {
                    const open = openLayers.includes(l.id);
                    return <Box key={l.id}>
                        <ListItem disableGutters>
                            <Switch onChange={() => handleToggleLayer(l)}
                                    checked={visibleLayerIds.includes(l.id)}/>
                            <ListItemText primary={l.id}/>
                            <IconButton onClick={() => handleToggleCollapse(l)}>
                                {open ? <ExpandLess/> : <ExpandMore/>}
                            </IconButton>

                        </ListItem>
                        <Collapse in={open}>
                            <Box sx={styles.listDetails}>
                                <Typography variant="overline" component={Link} href="https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/" target="_blank">Type</Typography>
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
                                    <Typography variant="overline" component={Link}
                                                href="https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/#minzoom"
                                                target="_blank">Min Zoom</Typography>
                                    <TextField variant="standard" type="number" value={l.editableMinZoom}
                                               className={classes.textField}
                                               inputProps={{
                                                   max: 24,
                                                   min: 0
                                               }}
                                               onChange={(e) => handleMinZoomChange(e, l)}/>
                                </>
                                }
                                {l.type === 'circle' && <>
                                    <Typography variant="overline" component={Link}
                                                href="https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/#paint-circle-circle-radius"
                                                target="_blank">Circle Radius</Typography>
                                    <TextField variant="standard" type="number" value={l.editableCircleRadius}
                                               className={classes.textField}
                                               inputProps={{
                                                   min: 0
                                               }}
                                               onChange={(e) => handleCircleRadiusChange(e, l)}/>
                                </>}
                            </Box>
                        </Collapse>
                        {idx !== allLayers.length - 1 && <Divider/>}
                    </Box>
                })}
            </List>
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
                <Button className={classes.button} onClick={openSetup}>Open Setup</Button>
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

RightPanelContainer.propTypes = {
    allLayers: PropTypes.array.isRequired,
    visibleLayers: PropTypes.array.isRequired,
    setVisibleLayers: PropTypes.func.isRequired,
    setAllLayers: PropTypes.func.isRequired,
    mapZoom: PropTypes.number.isRequired,
    setMapZoom: PropTypes.func.isRequired,
    mapStyle: PropTypes.string.isRequired,
    setMapStyle: PropTypes.func.isRequired,
    openSetup: PropTypes.func.isRequired
}

export default RightPanelContainer;