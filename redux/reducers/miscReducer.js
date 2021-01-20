import { TOGGLE_TOUR_COMPLETE } from "../constants/miscConstants";

const initialState = {
  isTourComplete: true,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case TOGGLE_TOUR_COMPLETE:
      return { ...state, isTourComplete: payload };

    default:
      return state;
  }
};
