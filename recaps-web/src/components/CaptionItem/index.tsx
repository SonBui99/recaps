import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import classes from "./caption-item.module.scss";
import Card from "../Cards";
import Image from "next/image";
import moment from "moment";
import Button from "../Button/Button";
import icSmile from "@/assets/img/icSmile.svg";
import icSad from "@/assets/img/icSad.svg";
import icStar from "@/assets/img/icStar.svg";
import icUnStar from "@/assets/img/icUnStar.svg";
import icAction from "@/assets/img/icAction.svg";
import Action from "@/container/HomeUser/Action";
import Router from "next/router";

interface Props {
  item: any;
  handleDelete: (item: any) => void;
  listTags: Array<any>;
  handleUpdate: (item: any) => void;
  handleChangeFavourite: () => void;
}
export default function ItemCaption(props: Props) {
  const { item, handleDelete, listTags, handleUpdate, handleChangeFavourite } =
    props;
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const ref = useRef<any>(null);

  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      if (
        show &&
        ref.current &&
        !ref.current?.contains(e.target) &&
        !showEdit &&
        !showDelete
      ) {
        setShow(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [show, showEdit, showDelete, ref]);

  const handleShowPopUpEdit = useCallback(() => {
    setShowEdit(true);
  }, [showEdit]);
  const handleHidePopUpEdit = useCallback(() => {
    setShowEdit(false);
    setShow(false);
  }, [showEdit]);
  const handleHidePopUpDelete = useCallback(() => {
    setShowDelete(false);
    setShow(false);
  }, [showDelete]);
  const handleShowPopUpDelete = useCallback(() => {
    setShowDelete(true);
  }, [showDelete]);

  // const findTag = useMemo(() => {
  //   if (item && listTags) {
  //     return listTags?.find((i: any) => i.idTag === item.id_tag);
  //   }
  // }, [item, listTags]);

  const renderCaptions = useMemo(() => {
    return (
      <div className={classes.container} ref={ref}>
        <div className={classes.itemCaption}>
          <div className={classes.itemWrapper}>
            <Image
              src={Router.pathname.includes("favourite") ? icStar : icUnStar}
              alt=""
              onClick={handleChangeFavourite}
            />
            <div className={classes.wrapperDes}>
              <div className={classes.descriptionItem}>{item?.content}</div>
              <div className={classes.listItem}>
                <div className={classes.listTagItem}>
                  {item?.tag?.map((it: any) => (
                    <div className={classes.itemTagInList}>{it || ""}</div>
                  ))}
                </div>
                <div className={classes.itemDescription}>
                  <div className={classes.itemDay}>
                    {moment(item?.created_at).startOf("day").fromNow()}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={classes.action}>
            <Image
              src={item?.emotion === "1" ? icSmile : icSad}
              alt=""
              width={24}
              height={24}
            />
            <Button
              buttonType="transparent"
              buttonSize="s"
              onClick={() => {
                setShow(!show);
              }}
            >
              <Image src={icAction} alt="" />
            </Button>
          </div>
        </div>
        {show && (
          <Action
            listTag={listTags}
            item={item}
            show={show}
            showDelete={showDelete}
            showEdit={showEdit}
            handleHidePopUpDelete={handleHidePopUpDelete}
            handleHidePopUpEdit={handleHidePopUpEdit}
            handleShowPopUpDelete={handleShowPopUpDelete}
            handleShowPopUpEdit={handleShowPopUpEdit}
            handleDelete={() => handleDelete(item)}
            handleUpdate={(e) => handleUpdate(e)}
          />
        )}
      </div>
    );
  }, [item, show, showDelete, showEdit]);
  return <>{renderCaptions}</>;
}
