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

interface Props {
  path: string;
  listDes: Array<any>;
  handleClickCompleted: () => void;
  seletedDes: any;
  handleChooseCaption: (item: any) => void;
}

export default function Step3({
  listDes,
  handleClickCompleted,
  handleChooseCaption,
  seletedDes,
}: Props) {
  const [urlImage, setUrlImage] = useState("");
  const [des, setDes] = useState(null);

  useEffect(() => {
    if (checkExistLocalStorage()) {
      setUrlImage(localStorage.getItem("urlImage") as string);
    }
  }, []);

  return (
    <>
      <Card className={classes.card}>
        <LineStepper />
        <Grid container spacing={4} style={{ marginTop: 20 }}>
          <Grid item xs={7}>
            <Card className={classes.emotionCard}>
              <div className={classes.listTitle}>
                <div className={classes.captionTitle}>Captions</div>
                <div className={classes.captionTitle}>Similarity</div>
              </div>
              <div className={classes.dived} />
              <div className={classes.listCaps}>
                {listDes?.map((item, index) => (
                  <div
                    className={cx(classes.item, {
                      [classes.selected]: seletedDes === index,
                    })}
                    onClick={() => handleChooseCaption(index)}
                  >
                    <div style={{ maxWidth: 500 }}>
                      <div className={classes.itemCaps}>{item?.content[0]}</div>
                      <div className={classes.itemList}>
                        <div style={{ display: "flex" }}>
                          <div className={classes.itemTag}>Tình yêu</div>
                          <div className={classes.itemTag}>Thả thính</div>
                        </div>
                        {/* <div className={classes.dayItem}>3 days ago</div> */}
                      </div>
                    </div>
                    <div className={classes.similarity}>
                      {item?.similarity[0]}%
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </Grid>
          <Grid item xs={5}>
            <div style={{ position: "relative", height: 340 }}>
              {urlImage && (
                <Image
                  src={
                    urlImage ||
                    `https://vapa.vn/wp-content/uploads/2022/12/anh-mau-dep-001.jpg`
                  }
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
