import { checkExistLocalStorage } from "@/helper/ultilities";
import axios from "axios";

export function getDes(body: any) {
  return axios.post(`http://127.0.0.1:5000/caption/get_des`, body, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export function getEmotion(body: any) {
  return axios.post(`http://127.0.0.1:5000/caption/get_emotion`, body, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export function getListCaptionForLogin(body: any) {
  const token = checkExistLocalStorage() && localStorage.getItem("user");
  return axios.post(
    `http://127.0.0.1:5000/caption/get_list_caption_login`,
    body,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export function getListCaptionForNoLogin(body: any) {
  return axios.post(
    `http://127.0.0.1:5000/caption/get_list_caption_no_login`,
    body,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
}
