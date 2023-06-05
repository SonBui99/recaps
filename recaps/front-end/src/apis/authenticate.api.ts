import authorizedRequest from "@/config/authorizedRequest";
import unauthorizedRequest from "@/config/unauthorizedRequest";

export interface UserRequestBody {
  userName: string;
  password: string;
}
export function doLogin(body: UserRequestBody) {
  return unauthorizedRequest.post(`/user/login`, body);
}

export function signUp(body: any){
  return unauthorizedRequest.post(`/user/register`, body);

}

export function doLogout() {
  return authorizedRequest.get(`/user/logout`);
}