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

const token = checkExistLocalStorage() && localStorage.getItem("user");

export function getListCaptions() {
  return unauthorizedRequest.get(`/caption/get_all_caption`);
}

export function addNewCaption(body: NewCaptionBody) {
  // return authorizedRequest.post(`/caption/add_caption`, body);
  return axios.post(`http://127.0.0.1:5000/caption/add_favorite`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function updateContentCaption(body: any) {
  // return authorizedRequest.post(`/UpdateCaption`, body);
  return axios.post(`http://127.0.0.1:5000/caption/edit_content`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function updateEmotionCaption(body: any) {
  return axios.post(`http://127.0.0.1:5000/caption/edit_emotion`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function updateTagCaption(body: any) {
  return axios.post(`http://127.0.0.1:5000/caption/edit_tag_id`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function deleteCaption(body: any) {
  return axios.post(`http://127.0.0.1:5000/caption/delete_caption`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function getListCaptionFavourite() {
  return axios.get(`http://127.0.0.1:5000/caption/get_caption_favorite`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function addCaptionFavorite(body: any) {
  return axios.post(`http://127.0.0.1:5000/caption/add_favorite`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
