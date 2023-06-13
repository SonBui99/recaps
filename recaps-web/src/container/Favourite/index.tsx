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
  addCaptionFavorite,
  deleteCaption,
  getListCaptionFavourite,
  getListCaptions,
  removeCaptionFavorite,
  updateContentCaption,
  updateEmotionCaption,
  updateTagCaption,
} from "@/apis/captions.api";
import { checkExistLocalStorage } from "@/helper/ultilities";
import { useRouter } from "next/router";
import { getAllTag, getListTag } from "@/apis/listTag.api";
import ItemCaption from "@/components/CaptionItem";
import { toastError, toastSuccess } from "@/helper/toastMessage";
import jwtDecode from "jwt-decode";

export default function Favourite() {
  const [listData, setListData] = useState([]);
  const [listDataSearch, setListDataSearch] = useState([]);
  const [listTags, setListTags] = useState([]);
  const { query } = useRouter();
  const userInfo = useMemo(() => {
    const data: any = checkExistLocalStorage() && localStorage.getItem("user");
    if (!!data) {
      const decode: any = jwtDecode(data);
      return decode?.sub;
    }
  }, []);

  const handleDelete = useCallback(async (item: any) => {
    await deleteCaption({
      id: item?.id,
    })
      .then(() => toastSuccess("Deleted Successfully"))
      .catch((err) => toastError(err));

    await getListCaptionFavourite()
      .then((data: any) => {
        setListData(data.data?.reverse());
      })
      .catch((err: any) => console.log(err));
  }, []);

  const handleChangeFavourite = useCallback(async (item: any) => {
    const body = {
      id: item?.id,
    };
    await removeCaptionFavorite(body)
      .then(() => toastSuccess("Change favourite success"))
      .catch((err) => toastError(err));

    await getListCaptionFavourite()
      .then((data: any) => {
        setListData(data.data?.reverse());
      })
      .catch((err: any) => console.log(err));
  }, []);

  const handleUpdate = useCallback(async (item: any) => {
    await updateContentCaption({
      id: item.item.id,
      content: item?.content,
    })
      .then((res) => toastSuccess("Update Successfully"))
      .catch((err) => console.log(err));
    await updateEmotionCaption({
      id: item.item.id,
      emotion: item?.emotion,
    })
      .then((res) => toastSuccess("Update Successfully"))
      .catch((err) => console.log(err));
    if (item?.selectedTag) {
      await updateTagCaption({
        id: item.item.id,
        tag_id: item?.selectedTag[0].value,
      })
        .then((res) => toastSuccess("Update Successfully"))
        .catch((err) => console.log(err));
    }
    await getListCaptionFavourite()
      .then((data: any) => {
        setListData(data.data?.reverse());
      })
      .catch((err: any) => console.log(err));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await getListCaptionFavourite()
        .then((data: any) => {
          setListData(data.data?.reverse());
        })
        .catch((err: any) => console.log(err));

      const data = await getAllTag();
      setListTags(data.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!!query?.tag) {
      const data = listData?.filter((item: any) =>
        item.tag.includes(String(query.tag))
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
          <Tags listTags={listTags} />
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
