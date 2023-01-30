import {DETAIL_PANE_SIZE, defaultDetailPaneSize} from "constants/appConstants";

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