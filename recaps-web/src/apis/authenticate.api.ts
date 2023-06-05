import authorizedRequest from "@/config/authorizedRequest";
import unauthorizedRequest from "@/config/unauthorizedRequest";
import axios from "axios";

export interface UserRequestBody {
  email: string;
  password: string;
}
export function doLogin(body: UserRequestBody) {
  // return unauthorizedRequest.post(`/user/login_user`, body);
  return axios.post(
    `http://127.0.0.1:5000/user/login_user`,
    body
    // {headers: {'content-type': 'application/json'}}
    // headers: {
    //   'Access-Control-Allow-Origin': '*',
    //   'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
    //   'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    // }
  );
}

export function signUp(body: any) {
  return axios.post(`http://127.0.0.1:5000/user/register`, body, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
      "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept",
    },
  });
}

export function doLogout() {
  return authorizedRequest.get(`http://127.0.0.1:5000/user/logout`, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
      "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept",
    },
  });
}
