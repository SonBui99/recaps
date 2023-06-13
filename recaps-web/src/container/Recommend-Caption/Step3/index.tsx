import React, { useMemo, useCallback, useState, useEffect } from "react";
import classes from "./step3.module.scss";
import Card from "@/components/Cards";
import LineStepper from "../Stepper";
import Image from "next/image";
import bgImg from "@/assets/img/img.svg";
import Button from "@/components/Button/Button";
import { Grid } from "@mui/material";
import bg from "@/assets/img/test.svg";
import { useRouter } from "next/router";
import { checkExistLocalStorage } from "@/helper/ultilities";
import cx from "classnames";
import icUnStar from "@/assets/img/icUnStar.svg";
import icStar from "@/assets/img/icStar.svg";

interface Props {
  path: string;
  listDes: Array<any>;
  handleClickCompleted: () => void;
  seletedDes: any;
  handleChooseCaption: (item: any) => void;
  listCaptionFavourite: Array<any>;
}

export default function Step3({
  listDes,
  handleClickCompleted,
  handleChooseCaption,
  seletedDes,
  listCaptionFavourite,
}: Props) {
  const [urlImage, setUrlImage] = useState("");
  const [des, setDes] = useState(null);

  useEffect(() => {
    if (checkExistLocalStorage()) {
      setUrlImage(localStorage.getItem("urlImage") as string);
    }
  }, []);
  const sortData = useMemo(() => {
    return listDes.sort((a, b) => b.similarity - a.similarity);
  }, [listDes]);

  const idList = useMemo(() => {
    if (listCaptionFavourite) {
      return listCaptionFavourite?.map((item) => item?.id);
    }
    return [];
  }, [listCaptionFavourite]);
  console.log("s", seletedDes);

  return (
    <>
      <Card className={classes.card}>
        <LineStepper />
        <Grid container spacing={4} style={{ marginTop: 20, height: 500 }}>
          <Grid item xs={7}>
            <Card className={classes.emotionCard} style={{ height: 500 }}>
              <div className={classes.listTitle}>
                <div className={classes.captionTitle}>Captions</div>
                <div className={classes.captionTitle}>Similarity</div>
              </div>
              <div className={classes.dived} />
              <div className={classes.listCaps}>
                {sortData?.map((item, index) => (
                  <div
                    className={cx(classes.item, {
                      [classes.selected]: seletedDes === index,
                    })}
                    onClick={() => handleChooseCaption(index)}
                  >
                    <div style={{ display: "flex" }}>
                      <Image
                        src={idList.includes(item?.id) ? icStar : icUnStar}
                        alt=""
                        style={{ marginRight: 10 }}
                      />
                      <div style={{ maxWidth: 500 }}>
                        <div className={classes.itemCaps}>{item?.content}</div>
                        <div className={classes.itemList}>
                          <div style={{ display: "flex" }}>
                            {item?.tag?.map((i: string, index: number) => (
                              <div className={classes.itemTag} key={index}>
                                {i}
                              </div>
                            ))}
                          </div>
                          {/* <div className={classes.dayItem}>3 days ago</div> */}
                        </div>
                      </div>
                    </div>
                    <div className={classes.similarity}>
                      {item?.similarity}%
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </Grid>
          <Grid item xs={5}>
            <div style={{ position: "relative", height: 500 }}>
              {urlImage && (
                <Image
                  src={urlImage || ``}
                  alt=""
                  className={classes.img}
                  fill
                  priority
                />
              )}
              <Button
                buttonType="primary"
                className={classes.btnContinue}
                onClick={handleClickCompleted}
              >
                Continue
              </Button>
            </div>
          </Grid>
        </Grid>
      </Card>
    </>
  );
}
