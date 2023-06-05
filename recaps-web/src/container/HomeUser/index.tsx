import Image from "next/image";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import classes from "./home-user.module.scss";
import bg from "@/assets/img/test.svg";
import Link from "next/link";
import Card from "@/components/Cards";
import Tags from "./Tag";
import {
  addCaptionFavorite,
  deleteCaption,
  getListCaptions,
  updateContentCaption,
  updateEmotionCaption,
  updateTagCaption,
} from "@/apis/captions.api";
import ItemCaption from "@/components/CaptionItem";
import { getAllTag } from "@/apis/listTag.api";
import { useRouter } from "next/router";
import { checkExistLocalStorage } from "@/helper/ultilities";
import { toastError, toastSuccess } from "@/helper/toastMessage";
import jwtDecode from "jwt-decode";

export default function HomeUser() {
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

    await getListCaptions()
      .then((data: any) => {
        const captionByIdUser = data.filter(
          (item: any) => item.author_id === userInfo.userid
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
      favourite: item?.favourite,
    };
    console.log(item);

    // await updateContentCaption({
    //   id: item.item.id,
    //   content: item?.content,
    // })
    //   .then((res) => toastSuccess("Update Successfully"))
    //   .catch((err) => console.log(err));
    // await updateEmotionCaption({
    //   id: item.item.id,
    //   emotion: item?.emotion,
    // })
    //   .then((res) => toastSuccess("Update Successfully"))
    //   .catch((err) => console.log(err));
    // await updateTagCaption({
    //   id: item.item.id,
    //   content: item?.content,
    // })
    //   .then((res) => toastSuccess("Update Successfully"))
    //   .catch((err) => console.log(err));
    // await getListCaptions()
    //   .then((data: any) => {
    //     const captionByIdUser = data.filter(
    //       (item: any) => item.author_id === userInfo.userid
    //     );
    //     setListData(captionByIdUser.reverse());
    //   })
    //   .catch((err: any) => console.log(err));
  }, []);

  const handleChangeFavourite = useCallback(async (item: any) => {
    const body = {
      id: item?.id,
    };
    await addCaptionFavorite(body)
      .then(() => toastSuccess("Change favourite success"))
      .catch((err) => toastError(err));

    await getListCaptions()
      .then((data: any) => {
        const captionByIdUser = data.table.filter(
          (item: any) => item.id_user === userInfo?.userid
        );
        setListData(captionByIdUser.reverse());
      })
      .catch((err: any) => console.log(err));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await getListCaptions()
        .then((data: any) => {
          const captionByIdUser = data.filter(
            (item: any) => item.author_id === userInfo.userid
          );
          setListData(captionByIdUser?.reverse());
        })
        .catch((err: any) => toastError(err));

      const data = await getAllTag();
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
              <Link href="/account" className={classes.captions}>
                Collection
              </Link>
              <Link href="/account/favourite" className={classes.favourite}>
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
