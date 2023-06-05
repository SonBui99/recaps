import React, { useMemo, useCallback, useState, useEffect } from "react";
import classes from "./step2.module.scss";
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
  description: string;
  image: any;
  handleClick: (image: any) => void;
}

export default function Step2({
  path,
  description,
  image,
  handleClick,
}: Props) {
  const router = useRouter();
  const [urlImage, setUrlImage] = useState("");
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
              <div className={classes.title}>{description}</div>
            </Card>
          </Grid>
          <Grid item xs={5}>
            <div style={{ position: "relative", height: 340 }}>
              <Image
                src={
                  path?.length > 0
                    ? path
                    : urlImage ||
                      `https://vapa.vn/wp-content/uploads/2022/12/anh-mau-dep-001.jpg`
                }
                alt=""
                className={classes.img}
                fill
              />
              <Button
                buttonType="primary"
                className={classes.btnContinue}
                onClick={() => handleClick(image)}
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
