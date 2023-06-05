import Image from "next/image";
import React, { useMemo } from "react";
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

export default function Favourite() {
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

  const renderCaptions = useMemo(() => {
    return (
      <Card className={classes.cardCaption}>
        <div className={classes.itemCaption}>
          <Image src={icStar} alt="" />
          <div style={{ marginLeft: 15 }}>
            <div className={classes.descriptionItem}>
              Tình yêu đâu phải con đò. Bến nào cũng đỗ, người nào cũng yêu
            </div>
            <div className={classes.itemDescription}>
              <div className={classes.listTagsCap}>
                <div className={classes.listTagItem}>
                  <div className={classes.itemTagInList}>Tình yêu</div>
                  <div className={classes.itemTagInList}>Ái Thương</div>
                  <div className={classes.itemTagInList}>Ái Thương</div>
                  <div className={classes.itemTagInList}>Ái Thương</div>
                  <div className={classes.itemTagInList}>Ái Thương</div>
                  <div className={classes.itemTagInList}>Ái Thương</div>
                  <div className={classes.itemTagInList}>Ái Thương</div>
                </div>
              </div>
              <div className={classes.itemDay}>3 days ago</div>
            </div>
          </div>
        </div>
      </Card>
    );
  }, []);

  return (
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
        {renderCaptions}
      </div>
    </div>
  );
}
