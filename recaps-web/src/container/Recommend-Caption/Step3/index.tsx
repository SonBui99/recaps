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

interface Props {
  path: string;
}

export default function Step3({ path }: Props) {
  const router = useRouter();
  const [urlImage, setUrlImage] = useState("");
  useEffect(() => {
    if (checkExistLocalStorage()) {
      setUrlImage(localStorage.getItem("urlImage") as string);
    }
  }, []);
  const handleClick = useCallback(() => {
    if (router.pathname?.includes("account")) {
      router.push("/account/recommend-caption/completed");
    }
    router.push("/recommend/completed");
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
                <div className={classes.item}>
                  <div style={{ maxWidth: 500 }}>
                    <div className={classes.itemCaps}>
                      Người ta thường nói cười là phương thuốc tốt nhất để chữa
                      lành mọi vết thương. Nhưng khi bạn cười không có lý do,
                      lúc đó bạn cần thuốc.
                    </div>
                    <div className={classes.itemList}>
                      <div style={{ display: "flex" }}>
                        <div className={classes.itemTag}>Tình yêu</div>
                        <div className={classes.itemTag}>Thả thính</div>
                      </div>
                      <div className={classes.dayItem}>3 days ago</div>
                    </div>
                  </div>
                  <div className={classes.similarity}>83%</div>
                </div>
                <div className={classes.item}>
                  <div style={{ maxWidth: 500 }}>
                    <div className={classes.itemCaps}>
                      Người ta thường nói cười là phương thuốc tốt nhất để chữa
                      lành mọi vết thương. Nhưng khi bạn cười không có lý do,
                      lúc đó bạn cần thuốc.
                    </div>
                    <div className={classes.itemList}>
                      <div style={{ display: "flex" }}>
                        <div className={classes.itemTag}>Tình yêu</div>
                        <div className={classes.itemTag}>Thả thính</div>
                      </div>
                      <div className={classes.dayItem}>3 days ago</div>
                    </div>
                  </div>
                  <div className={classes.similarity}>83%</div>
                </div>
                <div className={classes.item}>
                  <div style={{ maxWidth: 500 }}>
                    <div className={classes.itemCaps}>
                      Người ta thường nói cười là phương thuốc tốt nhất để chữa
                      lành mọi vết thương. Nhưng khi bạn cười không có lý do,
                      lúc đó bạn cần thuốc.
                    </div>
                    <div className={classes.itemList}>
                      <div style={{ display: "flex" }}>
                        <div className={classes.itemTag}>Tình yêu</div>
                        <div className={classes.itemTag}>Thả thính</div>
                      </div>
                      <div className={classes.dayItem}>3 days ago</div>
                    </div>
                  </div>
                  <div className={classes.similarity}>83%</div>
                </div>
                <div className={classes.item}>
                  <div style={{ maxWidth: 500 }}>
                    <div className={classes.itemCaps}>
                      Người ta thường nói cười là phương thuốc tốt nhất để chữa
                      lành mọi vết thương. Nhưng khi bạn cười không có lý do,
                      lúc đó bạn cần thuốc.
                    </div>
                    <div className={classes.itemList}>
                      <div style={{ display: "flex" }}>
                        <div className={classes.itemTag}>Tình yêu</div>
                        <div className={classes.itemTag}>Thả thính</div>
                      </div>
                      <div className={classes.dayItem}>3 days ago</div>
                    </div>
                  </div>
                  <div className={classes.similarity}>83%</div>
                </div>
                <div className={classes.item}>
                  <div style={{ maxWidth: 500 }}>
                    <div className={classes.itemCaps}>
                      Người ta thường nói cười là phương thuốc tốt nhất để chữa
                      lành mọi vết thương. Nhưng khi bạn cười không có lý do,
                      lúc đó bạn cần thuốc.
                    </div>
                    <div className={classes.itemList}>
                      <div style={{ display: "flex" }}>
                        <div className={classes.itemTag}>Tình yêu</div>
                        <div className={classes.itemTag}>Thả thính</div>
                      </div>
                      <div className={classes.dayItem}>3 days ago</div>
                    </div>
                  </div>
                  <div className={classes.similarity}>83%</div>
                </div>
              </div>
            </Card>
          </Grid>
          <Grid item xs={5}>
            <div style={{ position: "relative", height: 340 }}>
              <Image
                src={urlImage}
                alt=""
                className={classes.img}
                fill
                priority
              />
              <Button
                buttonType="primary"
                className={classes.btnContinue}
                onClick={handleClick}
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
