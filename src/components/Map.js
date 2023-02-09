import ReactMapboxGl from "react-mapbox-gl";
import mapboxgl from 'mapbox-gl';
import {ALOFT_TOKEN, MAPBOX_TOKEN} from "constants/appConstants";
// Workaround for mapbox v2 transpilation in create-react-app
// See: https://github.com/mapbox/mapbox-gl-js/issues/10173
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

const mapboxToken = localStorage.getItem(MAPBOX_TOKEN);
const aloftToken = localStorage.getItem(ALOFT_TOKEN)

const Map = ReactMapboxGl({
    accessToken: mapboxToken,
    doubleClickZoom: false,
    dragRotate: true,
    attributionControl: false,
    transformRequest: (url, resourceType) => {
        if ((resourceType === 'Source' || resourceType === 'Tile' ) && url.startsWith('https://maps.')) {
            return {
                url: url,
                headers: {
                    'Authorization': 'Bearer ' + aloftToken,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            };
        }
    }
});

export default Map;