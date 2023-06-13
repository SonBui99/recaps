import Button from "@/components/Button/Button";
import Card from "@/components/Cards";
import Image from "next/image";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import classes from "./tag.module.scss";
import icX from "@/assets/img/icX.svg";
import icSearch from "@/assets/img/icSearch.svg";
import { getAllTag, getListTag } from "@/apis/listTag.api";
import { useRouter } from "next/router";
import cx from "classnames";

interface Props {
  listTags: Array<any>;
}

export default function Tags(props: Props) {
  const { listTags } = props;
  const router = useRouter();
  // const [listTags, setListTags] = useState<any>([]);
  const [search, setSearch] = useState("");
  const [tagSelected, setTagSelected] = useState(null);
  // useEffect(() => {
  //   const getAllTags = async () => {
  //     const data = await getAllTag();
  //     return data;
  //   };
  //   window.setTimeout(() => {
  //     getAllTags()
  //       .then((res) => setListTags(res.data))
  //       .catch((err) => console.log(err));
  //   }, 500);
  //   // getAllTag().then()
  // }, [router]);

  const handleSelectTag = useCallback(
    (item: any) => {
      if (tagSelected === item?.tag_name) {
        setTagSelected(null);
        router.replace({ query: {} });
      } else {
        setTagSelected(item?.tag_name);
        router.replace(
          {
            query: {
              tag: item?.tag_name,
            },
          },
          undefined,
          {
            shallow: true,
            scroll: false,
          }
        );
      }
    },
    [tagSelected, router]
  );

  const listTagsSearch = useMemo(() => {
    if (listTags?.length) {
      return listTags?.filter((item: any) =>
        item?.tag_name?.toLowerCase().includes(search.toLowerCase())
      );
    }
  }, [listTags, search]);

  const renderTags = useMemo(() => {
    return (
      <Card className={classes.cardTags}>
        <div className={classes.title}>Tags</div>
        <div className={classes.listItemTags}>
          {listTagsSearch?.map((item: any) => {
            return (
              <div className={classes.itemTags} key={item?.tag_id}>
                <Button
                  buttonType="outline"
                  className={cx(classes.btnTags, {
                    [classes.active]: tagSelected === item?.tag_name,
                  })}
                  onClick={() => handleSelectTag(item)}
                >
                  {item?.tag_name}
                </Button>
                {/* <Image src={icX} alt="" style={{ margin: "0 10px" }} />
                <div className={classes.numberTags}>{item?.data}</div> */}
              </div>
            );
          })}
        </div>
        <div>
          <Image src={icSearch} alt="" className={classes.icSearch} />
          <input
            type="text"
            className={classes.searchBox}
            placeholder="Type your search tags..."
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </Card>
    );
  }, [listTagsSearch, tagSelected]);
  return <>{renderTags}</>;
}
