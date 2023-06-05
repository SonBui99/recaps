import { UserDetail } from "@/model/authenticate.model";
import { createActions } from "redux-actions";

export type AuthenticatePayload = UserDetail;

export const { login, logout, doLogout } = createActions<AuthenticatePayload>(
  {
    LOGIN: (payload) => payload,
  },
  {
    prefix: "authenticate",
  }
);
