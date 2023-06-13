import authorizedRequest from "@/config/authorizedRequest";
import unauthorizedRequest from "@/config/unauthorizedRequest";
import axios from "axios";
import { checkExistLocalStorage } from "@/helper/ultilities";

export function getListTag() {
  const token = checkExistLocalStorage() && localStorage.getItem("user");
  // return authorizedRequest.get(`/caption/get_list_tag`);
  return axios.get(`http://127.0.0.1:5000/caption/get_list_tag`, {
    headers: {
      Authorization: `${token}`,
    },
  });
}

export function getAllTag() {
  const token = checkExistLocalStorage() && localStorage.getItem("user");

  // return authorizedRequest.get(`/caption/get_all_tag`);
  return axios.get(`http://127.0.0.1:5000/caption/get_all_tag`, {
    headers: {
      Authorization: `${token}`,
    },
  });
}
