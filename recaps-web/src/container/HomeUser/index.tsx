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
  getListCaptionFavourite,
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
import { setTimeout } from "timers/promises";

export default function HomeUser() {
  const [listData, setListData] = useState([]);
  const [listDataSearch, setListDataSearch] = useState([]);
  const [listDataFavourite, setListDataFavourite] = useState([]);
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

    window.setTimeout(async () => {
      await getListCaptions()
        .then((data: any) => {
          setListData(data.data?.reverse());
        })
        .catch((err: any) => console.log(err));
    }, 300);
  }, []);

  const handleUpdate = useCallback(async (item: any) => {
    await updateContentCaption({
      id: item.item.id,
      content: item?.content,
    })
      .then(async (res) => {
        await updateEmotionCaption({
          id: item.item.id,
          emotion: item?.emotion,
        })
          .then(async (res) => {
            if (item?.selectedTag) {
              await updateTagCaption({
                id: item.item.id,
                tag_id: item?.selectedTag[0].value,
              })
                .then((res) => toastSuccess("Update Successfully"))
                .catch((err) => console.log(err));
            } else {
              toastSuccess("Update Successfully");
            }
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
    // window.setTimeout(async () => {
    // }, 200);

    window.setTimeout(async () => {
      await getListCaptions()
        .then((data: any) => {
          setListData(data.data?.reverse());
        })
        .catch((err: any) => console.log(err));
    }, 700);
  }, []);

  const handleChangeFavourite = useCallback(async (item: any) => {
    const body = {
      id: item?.id,
    };
    await addCaptionFavorite(body)
      .then(async () => {
        await getListCaptions()
          .then(async (res: any) => {
            await getListCaptionFavourite()
              .then((resFvr: any) => {
                if (!!query.tag) {
                  const filterData = res?.data.filter(
                    (item: any) =>
                      !resFvr?.data.some((it: any) => item.id === it.id)
                  );
                  const queryData = filterData?.filter((item: any) =>
                    item.tag.includes(String(query.tag))
                  );
                  setListDataSearch(queryData);
                } else {
                  const filterData = res?.data.filter(
                    (item: any) =>
                      !resFvr?.data.some((it: any) => item.id === it.id)
                  );

                  setListDataSearch(filterData);
                }
              })
              .catch((err: any) => console.log(err));
          })
          .catch((err: any) => console.log(err));
        toastSuccess("Change favourite success");
      })
      .catch((err) => toastError(err));

    // window.setTimeout(async () => {
    //   await getListCaptions()
    //     .then((data: any) => {
    //       setListData(data.data?.reverse());
    //     })
    //     .catch((err: any) => console.log(err));
    // }, 300);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await getListCaptions()
        .then(async (data: any) => {
          setListData(data.data?.reverse());
          // window.setTimeout(() => {
          //   const data: any = getAllTag();
          //   setListTags(data);
          // }, 300);
          await getAllTag()
            .then(async (res) => {
              setListTags(res.data);
              await getListCaptionFavourite()
                .then((data: any) => {
                  setListDataFavourite(data.data?.reverse());
                })
                .catch((err: any) => console.log(err));
            })
            .catch((err) => console.log(err));
        })
        .catch((err: any) => toastError(err));
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (listData && listDataFavourite) {
      const filterData = listData?.filter(
        (item: any) => !listDataFavourite?.some((it: any) => item.id === it.id)
      );
      setListDataSearch(filterData);
      return;
    }
  }, [listData && listDataFavourite]);

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
          <Tags listTags={listTags} />
          <Card className={classes.cardCaption}>
            {listDataSearch?.map((item: any, index: number) => {
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
