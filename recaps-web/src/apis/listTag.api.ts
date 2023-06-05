import authorizedRequest from "@/config/authorizedRequest";
import unauthorizedRequest from "@/config/unauthorizedRequest";

export function getListTag() {
  return authorizedRequest.get(`/caption/get_list_tag`);
}

export function getAllTag() {
  return authorizedRequest.get(`/caption/get_all_tag`);
}
