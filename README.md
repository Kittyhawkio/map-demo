# Aloft Map Demo
An example of how to use Aloft's map layers in a React application

[Demo App](https://4dvxgv.csb.app/)


### Setup
1. Open this project in CodeSandbox [here](https://codesandbox.io/s/github/Kittyhawkio/map-demo/tree/main/?fontsize=14&theme=dark).
2. Fork the repository if you'd like to save your changes in your CodeSandbox account.
3. Enter your [Aloft API Token](https://www.aloft.ai/developer/) and your [Mapbox Token](https://docs.mapbox.com/help/glossary/access-token/) when prompted.

### App Features
1. Adjust map settings: 
  - [zoom](https://docs.mapbox.com/help/glossary/zoom-level/)
  - [style](https://docs.mapbox.com/api/maps/styles/#mapbox-styles) 
2. Adjust layer settings:
    - toggle visibility
    - adjust styles
      - [fill-color](https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/#paint-fill-fill-color)
      - [fill-opacity](https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/#paint-fill-fill-opacity)
      - [circle-color](https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/#paint-circle-circle-color)
      - [circle-opacity](https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/#paint-circle-circle-opacity)
      - [circle-radius](https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/#paint-circle-circle-radius)
      - [maxzoom](https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/#maxzoom)
      - [minzoom](https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/#minzoom)

### Code Explanation
   1. [MainContainer.js](https://github.com/Kittyhawkio/map-demo/blob/production/src/components/MainContainer.js) controls the display of the main components, as well as loading the map layers and sources from the Aloft API.
   2. [SetupDialog.js](https://github.com/Kittyhawkio/map-demo/blob/production/src/components/SetupDialog.js) configures the app with the required access tokens by setting them in `localStorage`
   3. [Map.js](https://github.com/Kittyhawkio/map-demo/blob/production/src/components/Map.js) initiates an instance of [react-mapbox-gl](https://github.com/alex3165/react-mapbox-gl)
      1. This includes the important `transformRequest` property used to pass the Aloft API token to load the map sources.
   4. [MapContainer.js](https://github.com/Kittyhawkio/map-demo/blob/production/src/components/MapContainer.js) renders [Map.js](https://github.com/Kittyhawkio/map-demo/blob/production/src/components/Map.js) along with components from [react-mapbox-gl](https://github.com/alex3165/react-mapbox-gl) to display a map with sources and layers. It also displays a Popup component when the user clicks a feature on the map.
   5. [RightPanelContainer.js](https://github.com/Kittyhawkio/map-demo/blob/production/src/components/RightPanelContainer.js) renders the controls that allow the user to change properties on the map and its layers.