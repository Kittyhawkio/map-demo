import ReactMapboxGl from "react-mapbox-gl";
import mapboxgl from 'mapbox-gl';
// Workaround for mapbox v2 transpilation in create-react-app
// See: https://github.com/mapbox/mapbox-gl-js/issues/10173
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

const Map = ReactMapboxGl({
    accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN, //TODO replace with LS
    doubleClickZoom: false,
    dragRotate: true,
    attributionControl: false,
    transformRequest: (url, resourceType) => {
        if ((resourceType === 'Source' || resourceType === 'Tile' ) && url.startsWith('https://maps.')) {
            return {
                url: url,
                headers: {
                    'Authorization': 'Bearer ' + process.env.REACT_APP_ALOFT_TOKEN, //TODO replace with LS
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            };
        }
    }
});

export default Map;