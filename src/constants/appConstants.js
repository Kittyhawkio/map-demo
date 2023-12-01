export const defaultDetailPaneSize = '30%';
export const aboutLink = `https://www.aloft.ai/who-we-are/`;
export const termsLink = 'https://www.aloft.ai/terms/';
export const DETAIL_PANE_SIZE = 'DETAIL_PANE_SIZE';
export const MAPBOX_TOKEN = 'mapboxToken';
export const ALOFT_TOKEN = 'aloftToken';
export const ALOFT_API_URL = 'aloftApiUrl'
export const defaultAloftApiUrl = 'https://api.aloft.ai/v1/airspace/layers?data_formats[]=geojson&data_formats[]=vector'

 //Using old version of some styles here to ensure they have the airport icons available
export const mapboxMapStyles = [
    {
        value: 'mapbox://styles/mapbox/streets-v11',
        name: 'Streets'
    },
    {
        value: 'mapbox://styles/mapbox/outdoors-v11',
        name: 'Outdoors'
    },
    {
        value: 'mapbox://styles/mapbox/light-v10',
        name: 'Light'
    },
    {
        value: 'mapbox://styles/mapbox/dark-v10',
        name: 'Dark'
    },
    {
        value: 'mapbox://styles/mapbox/satellite-v9',
        name: 'Satellite'
    },
    {
        value: 'mapbox://styles/mapbox/satellite-streets-v11',
        name: 'Satellite Streets'
    },
    {
        value: 'mapbox://styles/mapbox/navigation-day-v1',
        name: 'Navigation Day'
    },
    {
        value: 'mapbox://styles/mapbox/navigation-night-v1',
        name: 'Navigation Night'
    }
];

export const aloftMapStyles = [
    {
        value: 'mapbox://styles/kittyhawkio/clecwrlel000p01o1xer2cm34',
        name: 'B4UFLY'
    }
]