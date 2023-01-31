import {
    DETAIL_PANE_SIZE,
    defaultDetailPaneSize,
    ALOFT_TOKEN,
    MAPBOX_TOKEN,
    ALOFT_API_URL, defaultAloftApiUrl
} from "constants/appConstants";

export const saveDetailPaneSizeToLS = size => {
    localStorage.setItem(DETAIL_PANE_SIZE, size);
};

export const getDetailPaneSizeFromLS = () => {
    const savedSize = localStorage.getItem(DETAIL_PANE_SIZE);
    if (savedSize && Number(savedSize)) {
        return Number(savedSize);
    } else {
        return defaultDetailPaneSize;
    }
};

export const setAloftTokenInLS = (token) => {
    localStorage.setItem(ALOFT_TOKEN, token)
};

export const getAloftTokenFromLS = () => {
  return localStorage.getItem(ALOFT_TOKEN);
};

export const setMapboxTokenInLS = (token) => {
    localStorage.setItem(MAPBOX_TOKEN, token)
};

export const getMapboxTokenFromLS = () => {
    return localStorage.getItem(MAPBOX_TOKEN);
};

export const setAloftApiURLInLS = (token) => {
    localStorage.setItem(ALOFT_API_URL, token)
};

export const getAloftApiURLFromLS = () => {
    return localStorage.getItem(ALOFT_API_URL) || defaultAloftApiUrl;
};


