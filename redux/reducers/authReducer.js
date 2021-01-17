const initialState = {};

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "typeName":
      return { ...state, ...payload };

    default:
      return state;
  }
};
export default authReducer;
