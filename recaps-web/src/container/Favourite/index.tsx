import Image from "next/image";
import React, { useMemo, useEffect, useState, useCallback } from "react";
import classes from "./favourite.module.scss";
import bg from "@/assets/img/test.svg";
import Link from "next/link";
import Card from "@/components/Cards";
import Button from "@/components/Button/Button";
import icX from "@/assets/img/icX.svg";
import icSearch from "@/assets/img/icSearch.svg";
import icStar from "@/assets/img/icStar.svg";
import icUnStar from "@/assets/img/icUnStar.svg";
import cx from "classnames";
import Tags from "../HomeUser/Tag";
import {
  deleteCaption,
  getListCaptions,
  updateCaption,
} from "@/apis/captions.api";
import { checkExistLocalStorage } from "@/helper/ultilities";
import { useRouter } from "next/router";
import { getListTag } from "@/apis/listTag.api";
import ItemCaption from "@/components/CaptionItem";
import { toastError, toastSuccess } from "@/helper/toastMessage";

export default function Favourite() {
  const [listData, setListData] = useState([]);
  const [listDataSearch, setListDataSearch] = useState([]);
  const [listTags, setListTags] = useState([]);
  const { query } = useRouter();
  const userInfo = useMemo(() => {
    const data: any = checkExistLocalStorage() && localStorage.getItem("user");
    return JSON.parse(data)?.user;
  }, []);

  const handleDelete = useCallback(async (item: any) => {
    await deleteCaption(item?.id_caption)
      .then((res) => toastSuccess("Deleted Successfully"))
      .catch((err) => toastError(err));

    await getListCaptions()
      .then((data: any) => {
        const captionByIdUser = data.table.filter(
          (item: any) => item.id_user === userInfo.id
        );
        setListData(captionByIdUser.reverse());
      })
      .catch((err: any) => console.log(err));
  }, []);

  const handleUpdate = useCallback(async (item: any) => {
    const payload = {
      content: item?.content,
      idCaption: item?.item.id_caption,
      idUser: item?.item.id_user,
      trangThai: item?.emotion,
      idTag: item?.tag,
      favourite: item?.item.favourite,
    };

    await updateCaption(payload)
      .then((res) => toastSuccess("Update Successfully"))
      .catch((err) => console.log(err));
    await getListCaptions()
      .then((data: any) => {
        const captionByIdUser = data.table.filter(
          (item: any) => item.id_user === userInfo.id
        );
        setListData(captionByIdUser.reverse());
      })
      .catch((err: any) => console.log(err));
  }, []);
  console.log("itemn", listDataSearch);

  const handleChangeFavourite = useCallback(async (item: any) => {
    const payload = {
      content: item?.content,
      idCaption: item?.id_caption,
      idUser: item?.id_user,
      trangThai: item?.trang_thai,
      idTag: item?.id_tag,
      favourite: !item?.favourite,
    };
    await updateCaption(payload)
      .then(() => toastSuccess("Change favourite success"))
      .catch((err) => toastError(err));

    await getListCaptions()
      .then((data: any) => {
        const captionByIdUser = data.table.filter(
          (item: any) => item.id_user === userInfo.id && item.favourite
        );
        setListData(captionByIdUser.reverse());
      })
      .catch((err: any) => console.log(err));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await getListCaptions()
        .then((data: any) => {
          const captionByIdUser = data.table.filter(
            (item: any) => item.id_user === userInfo.id && item.favourite
          );
          setListData(captionByIdUser?.reverse());
        })
        .catch((err: any) => console.log(err));

      const data = await getListTag();
      setListTags(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!!query?.tag) {
      const data = listData?.filter(
        (item: any) => Number(item?.id_tag) === Number(query?.tag)
      );
      setListDataSearch(data);
      return;
    }
    setListDataSearch(listData);
  }, [query, listData]);

  const renderHeader = useMemo(() => {
    return (
      <div style={{ backgroundColor: "#FFFAFA", position: "relative" }}>
        <div className={classes.headerWrapper}>
          <Image src={bg} alt="" className={classes.imgBg} />
          <div className={classes.itemMenu}>
            <div style={{ marginBottom: 10, display: "flex" }}>
              <Link
                href="/account"
                className={cx(classes.favourite, classes.margin)}
              >
                Collection
              </Link>
              <Link href="/account/favourite" className={classes.captions}>
                Favourite
              </Link>
              <Link href="/account/captions" className={classes.favourite}>
                Captions
              </Link>
            </div>
            <div className={classes.divied} />
          </div>
        </div>
      </div>
    );
  }, []);

  return (
    <>
      <div style={{ backgroundColor: "#FFFAFA" }}>
        {renderHeader}
        <div
          style={{
            backgroundColor: "#FFFAFA",
            display: "flex",
            justifyContent: "center",
            padding: "0 160px 30px 160px",
          }}
        >
          <Tags />
          <Card className={classes.cardCaption}>
            {listDataSearch?.map((item: any, index) => {
              return (
                <ItemCaption
                  item={item}
                  key={index}
                  handleDelete={() => handleDelete(item)}
                  listTags={listTags}
                  handleUpdate={(e) => handleUpdate(e)}
                  handleChangeFavourite={() => handleChangeFavourite(item)}
                />
              );
            })}
          </Card>
        </div>
      </div>
    </>
  );
}
