import authorizedRequest from "@/config/authorizedRequest";
import unauthorizedRequest from "@/config/unauthorizedRequest";
import { checkExistLocalStorage } from "@/helper/ultilities";
import axios from "axios";

interface NewCaptionBody {
  content: string;
  idUser: number;
  trangThai: boolean;
  tags?: string[];
  favourite?: boolean;
  userId?: string;
}

interface NewCaptionBody {
  Content: string;
  IDCaption: number;
  TrangThai: boolean;
  IDTag: string;
  IDUser: string;
}

export function getListCaptions() {
  const token = checkExistLocalStorage() && localStorage.getItem("user");
  return axios.get(`http://127.0.0.1:5000/caption/get_all_caption`, {
    headers: {
      Authorization: `${token}`,
    },
  });
}

export function addNewCaption(body: NewCaptionBody) {
  // return authorizedRequest.post(`/caption/add_caption`, body);
  const token = checkExistLocalStorage() && localStorage.getItem("user");

  return axios.post(`http://127.0.0.1:5000/caption/add_caption`, body, {
    headers: {
      Authorization: `${token}`,
    },
  });
}

export function updateContentCaption(body: any) {
  const token = checkExistLocalStorage() && localStorage.getItem("user");

  // return authorizedRequest.post(`/UpdateCaption`, body);
  return axios.put(`http://127.0.0.1:5000/caption/edit_content`, body, {
    headers: {
      Authorization: `${token}`,
    },
  });
}

export function updateEmotionCaption(body: any) {
  const token = checkExistLocalStorage() && localStorage.getItem("user");

  return axios.put(`http://127.0.0.1:5000/caption/edit_emotion`, body, {
    headers: {
      Authorization: `${token}`,
    },
  });
}

export function updateTagCaption(body: any) {
  const token = checkExistLocalStorage() && localStorage.getItem("user");

  return axios.put(`http://127.0.0.1:5000/caption/edit_tag_id`, body, {
    headers: {
      Authorization: `${token}`,
    },
  });
}

export function deleteCaption(body: any) {
  const token = checkExistLocalStorage() && localStorage.getItem("user");

  return axios.post(`http://127.0.0.1:5000/caption/delete_caption`, body, {
    headers: {
      Authorization: `${token}`,
    },
  });
}

export function getListCaptionFavourite() {
  const token = checkExistLocalStorage() && localStorage.getItem("user");

  return axios
    .get(`http://127.0.0.1:5000/caption/get_caption_favorite`, {
      headers: {
        Authorization: `${token}`,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "*",
      },
    })
    .catch((error) => console.log(error));
}

export function addCaptionFavorite(body: any) {
  const token = checkExistLocalStorage() && localStorage.getItem("user");

  return axios.post(`http://127.0.0.1:5000/caption/add_favorite`, body, {
    headers: {
      Authorization: `${token}`,
    },
  });
}

export function removeCaptionFavorite(body: any) {
  const token = checkExistLocalStorage() && localStorage.getItem("user");

  return axios.post(`http://127.0.0.1:5000/caption/remove_favorite`, body, {
    headers: {
      Authorization: `${token}`,
    },
  });
}
