import { FullscreenControl, GeolocateControl, NavigationControl } from 'mapbox-gl';

export const addMapControls = map => {
    map.addControl(
        new FullscreenControl({
            container: document.querySelector('body')
        }),
        'bottom-right'
    );
    map.addControl(new NavigationControl(), 'bottom-right');
    map.addControl(
        new GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            },
            trackUserLocation: true
        }),
        'bottom-right'
    );
};