import {
  AUTHENTICATION_BEGIN,
  AUTHENTICATION_SUCCESS,
  CREATE_NEWUSER_BEGIN,
  CREATE_NEWUSER_SUCCESS,
  SET_ERROR,
  SIGN_OUT_BEGIN,
  SIGN_OUT_SUCCESS,
} from "../constants/authConstants";

const initialState = {
  user: null,
  isLoading: false,
  error: null,
};

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case AUTHENTICATION_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case AUTHENTICATION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: payload,
      };

    case SIGN_OUT_BEGIN:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case SIGN_OUT_SUCCESS:
      return {
        ...state,
        user: null,
        error: null,
        isLoading: false,
      };

    case CREATE_NEWUSER_BEGIN:
      return {
        ...state,
        error: null,
        isLoading: true,
      };
    case CREATE_NEWUSER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: payload,
      };

    case SET_ERROR:
      return {
        ...state,
        error: payload,
        isLoading: false,
      };
    default:
      return state;
  }
};
export default authReducer;
