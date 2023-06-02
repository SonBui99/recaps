import React from "react";
import classes from "./modal-loading.module.scss";

export default function ModalLoading() {
  return (
    <div className={classes.loaderContainer}>
      <div className={classes.spinner}>123</div>
    </div>
  );
}
