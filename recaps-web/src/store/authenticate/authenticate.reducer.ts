import { AuthenticateModel, UserDetail } from "@/model/authenticate.model";
import { ActionMeta, handleActions } from "redux-actions";
import { AuthenticatePayload } from "./authenticate.action";

const INIT_STATE: AuthenticateModel = {
  user: null,
  token: "",
  loading: false,
};

const authenticateReducer = handleActions<
  AuthenticateModel,
  AuthenticatePayload
>(
  {
    LOGIN: (state) => {
      return {
        ...state,
        redirect: false,
        loggingIn: true,
        twitterInfo: null,
        loading: true,
      };
    },
    LOGIN_SUCCEEDED: (state: any, action: any) => {
      return {
        ...state,
        token: action.payload.token,
        user: action.payload,
        loading: false,
      };
    },
    LOGIN_FAILED: (state: AuthenticateModel) => {
      return {
        ...state,
        loggingIn: false,
        loading: false,
      };
    },
  },
  INIT_STATE,
  {
    prefix: "authenticate",
  }
);
