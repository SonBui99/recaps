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

interface Props {
  item: any;
}
export default function ItemCaption(props: Props) {
  const { item } = props;
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

  const renderCaptions = useMemo(() => {
    return (
      <div className={classes.container} ref={ref}>
        <div className={classes.itemCaption}>
          <div className={classes.itemWrapper}>
            <Image src={icStar} alt="" />
            <div className={classes.wrapperDes}>
              <div className={classes.descriptionItem}>{item?.content}</div>
              <div className={classes.listItem}>
                <div className={classes.listTagItem}>
                  <div className={classes.itemTagInList}>Tình yêu</div>
                  <div className={classes.itemTagInList}>Ái Thương</div>
                  <div className={classes.itemTagInList}>Ái Thương</div>
                </div>
                <div className={classes.itemDescription}>
                  <div className={classes.itemDay}>
                    {moment(item?.createDate).startOf("day").fromNow()}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={classes.action}>
            <Image
              src={item?.trangThai ? icSmile : icSad}
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
            item={item}
            show={show}
            showDelete={showDelete}
            showEdit={showEdit}
            handleHidePopUpDelete={handleHidePopUpDelete}
            handleHidePopUpEdit={handleHidePopUpEdit}
            handleShowPopUpDelete={handleShowPopUpDelete}
            handleShowPopUpEdit={handleShowPopUpEdit}
          />
        )}
      </div>
    );
  }, [item, show, showDelete, showEdit]);
  return <>{renderCaptions}</>;
}
