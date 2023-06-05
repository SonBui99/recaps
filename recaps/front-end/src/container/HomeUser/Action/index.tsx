import Card from "@/components/Cards";
import React, { useCallback, useEffect, useRef, useState } from "react";
import classes from "./action.module.scss";
import Button from "@/components/Button/Button";
import Image from "next/image";
import icEdit from "@/assets/img/icEdit.svg";
import icDelete from "@/assets/img/icDelete.svg";
import ModalEdit from "@/components/ModalEdit";
import ModalDelete from "@/components/ModalDelete";

interface Props {
  item: any;
  show: boolean;
  showEdit: boolean;
  showDelete: boolean;
  handleShowPopUpEdit: () => void;
  handleHidePopUpEdit: () => void;
  handleHidePopUpDelete: () => void;
  handleShowPopUpDelete: () => void;
}

export default function Action(props: Props) {
  const {
    item,
    show,
    showEdit,
    showDelete,
    handleShowPopUpEdit,
    handleHidePopUpEdit,
    handleHidePopUpDelete,
    handleShowPopUpDelete,
  } = props;
  const ref = useRef<any>(null);

  return (
    <>
      {show && (
        <div ref={ref}>
          <Card className={classes.card}>
            <Button
              buttonType="transparent"
              className={classes.btn}
              onClick={handleShowPopUpEdit}
            >
              <Image src={icEdit} alt="" />
              <span className={classes.text}>Edit</span>
            </Button>
            <Button
              buttonType="transparent"
              className={classes.btn}
              onClick={handleShowPopUpDelete}
            >
              <Image src={icDelete} alt="" />
              <span className={classes.text}>Delete</span>
            </Button>
          </Card>
          {showEdit && (
            <ModalEdit
              open={showEdit}
              handleClose={handleHidePopUpEdit}
              item={item}
            />
          )}
          {showDelete && (
            <ModalDelete
              open={showDelete}
              handleClose={handleHidePopUpDelete}
              item={item}
            />
          )}
        </div>
      )}
    </>
  );
}
