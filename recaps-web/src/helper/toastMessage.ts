/* eslint-disable react/react-in-jsx-scope */
import { toast, ToastOptions } from "react-toastify";
import { get as _get, get } from "lodash";

const optionsError = {
  type: toast.TYPE.ERROR,
  closeButton: null,
  autoClose: 3000,
  className: "custom-toast",
  position: toast.POSITION.TOP_RIGHT,
} as any as ToastOptions;

const optionsSuccess = {
  type: toast.TYPE.SUCCESS,
  closeButton: null,
  autoClose: 3000,
  className: "custom-toast",
  position: toast.POSITION.TOP_RIGHT,
} as any as ToastOptions;

export const toastSuccess = (message: string) => {
  return toast(message, optionsSuccess);
};

export const toastError = (message: string) => {
  return toast(message, optionsError);
};
