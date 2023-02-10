# Aloft Map Demo
An example of how to use Aloft's map layers in a React application

## Getting Started

1. Open this project in CodeSandbox here: [https://codesandbox.io/s/github/Kittyhawkio/map-demo/tree/production](https://codesandbox.io/s/github/Kittyhawkio/map-demo)
2. Fork the repository if you'd like to save your changes in your CodeSandbox account.
3. Enter your [Aloft API Token](https://www.aloft.ai/developer/) and your [Mapbox Token](https://docs.mapbox.com/help/glossary/access-token/) when prompted.
4. Toggle layers and change layer styles to see how the map is affected.
5. View the code to understand how to implement Aloft's map layers in your application:
   1. [MainContainer.js](https://github.com/Kittyhawkio/map-demo/blob/production/src/components/MainContainer.js) controls the display of the main components, as well as loading the map layers and sources from the Aloft API.
   2. [SetupDialog.js](https://github.com/Kittyhawkio/map-demo/blob/production/src/components/SetupDialog.js) configures the app with the required access tokens by setting them in `localStorage`
   3. [Map.js](https://github.com/Kittyhawkio/map-demo/blob/production/src/components/Map.js) initiates an instance of [react-mapbox-gl](https://github.com/alex3165/react-mapbox-gl)
      1. This includes the important `transformRequest` property used to pass the Aloft API token to load the map sources.
   4. [MapContainer.js](https://github.com/Kittyhawkio/map-demo/blob/production/src/components/MapContainer.js) renders [Map.js](https://github.com/Kittyhawkio/map-demo/blob/production/src/components/Map.js) along with components from [react-mapbox-gl](https://github.com/alex3165/react-mapbox-gl) to display a map with sources and layers. It also displays a Popup component when the user clicks a feature on the map.
   5. [RightPanelContainer.js](https://github.com/Kittyhawkio/map-demo/blob/production/src/components/RightPanelContainer.js) renders the controls that allow the user to change properties on the map and its layers.