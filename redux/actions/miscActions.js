import { TOGGLE_TOUR_COMPLETE } from "../constants/miscConstants";

export const toggleTourComplete = (toggleValue) => {
  return {
    type: TOGGLE_TOUR_COMPLETE,
    payload: toggleValue,
  };
};
