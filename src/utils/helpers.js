import {$success} from "styles/colors";

export const transformLayers = (layers) => {
    return layers.map(layer => {

        let defaultOpacity = 1;
        let defaultColor = ''
        const defaultMaxZoom = layer.maxzoom;
        const defaultMinZoom = layer.minzoom;

        if (layer.type === 'fill') {
            if (layer?.paint['fill-opacity']) {
                defaultOpacity = layer.paint['fill-opacity'];
            }
            if (layer?.paint['fill-color']) {
                defaultColor = layer.paint['fill-color'];
            }
        }
        if (layer.type === 'circle') {
            if (layer?.paint['circle-opacity']) {
                defaultOpacity = layer.paint['circle-opacity'];
            }
            if (layer?.paint['circle-color']) {
                defaultColor = layer.paint['circle-color'];
            }
        }

        return {
            ...layer,
            defaultColor,
            defaultOpacity,
            defaultMaxZoom,
            defaultMinZoom,
            editableColor: '',
            editableOpacity: 1,
            editableMaxZoom: defaultMaxZoom,
            editableMinZoom: defaultMinZoom
        }


    }).sort()
}

export const updateLayerStyles = ({allLayers, layerId, visibleLayers, properties}) => {
    const updatedAllLayers = allLayers.map(layer => {
        if (layerId === layer.id) {
            return {...layer, ...properties}
        } else {
            return layer;
        }
    });

    const updatedVisibleLayers = visibleLayers.map(layer => {
        if (layerId === layer.id) {
            return {...layer, ...properties}
        } else {
            return layer;
        }
    });

    return {updatedAllLayers, updatedVisibleLayers}
}