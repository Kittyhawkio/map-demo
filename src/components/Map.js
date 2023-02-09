import ReactMapboxGl from "react-mapbox-gl";
import {ALOFT_TOKEN, MAPBOX_TOKEN} from "constants/appConstants";

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