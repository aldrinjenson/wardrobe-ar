import {
  SIGN_IN_BEGIN,
  SIGN_IN_SUCCESS,
  CREATE_NEWUSER_BEGIN,
  CREATE_NEWUSER_SUCCESS,
  SET_ERROR,
  SIGN_OUT_BEGIN,
  SIGN_OUT_SUCCESS,
  SET_USER_AUTH_DETAILS,
} from "../constants/authConstants";

const initialState = {
  user: null,
  isLoading: false,
  error: null,
  isNewUser: false,
};

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SIGN_IN_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: payload,
        isNewUser: false,
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
        isNewUser: true,
      };

    case SET_USER_AUTH_DETAILS:
      return {
        ...state,
        user: payload.user,
        isNewUser: payload.isNewUser,
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
