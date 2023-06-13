import React, { useCallback, useEffect, useMemo, useState } from "react";
import classes from "./step-1.module.scss";
import Card from "@/components/Cards";
import LineStepper from "../Stepper";
import Image from "next/image";
import icSad from "@/assets/img/icSad.svg";
import icSmile from "@/assets/img/icSmile.svg";
import Button from "@/components/Button/Button";
import { Grid } from "@mui/material";
import { useRouter } from "next/router";
import { checkExistLocalStorage } from "@/helper/ultilities";
import { getDes } from "@/apis/recommend.api";

interface Props {
  path: any;
  emotion: any;
  handleClick: (image: any) => void;
  image: any;
}

export default function Step1(props: Props) {
  const { path, emotion, handleClick, image } = props;
  const router = useRouter();
  const [urlImage, setUrlImage] = useState("");
  useEffect(() => {
    if (checkExistLocalStorage()) {
      setUrlImage(localStorage.getItem("urlImage") as string);
    }
  }, []);

  const renderEmotion = useMemo(() => {
    if (emotion) {
      return <Image src={icSmile} alt="" />;
    }
    return <Image src={icSad} alt="" />;
  }, [emotion]);

  const renderUI = useMemo(() => {
    return (
      <>
        <Card className={classes.card}>
          <LineStepper />
          <Grid container spacing={4} style={{ marginTop: 20 }}>
            <Grid item xs={7}>
              <Card className={classes.emotionCard}>{renderEmotion}</Card>
            </Grid>
            <Grid item xs={5}>
              <div style={{ position: "relative", height: "500px" }}>
                <Image
                  src={path?.length > 0 ? path : urlImage || ``}
                  alt=""
                  className={classes.img}
                  priority
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
  }, [path, urlImage, router, emotion]);

  return <>{renderUI}</>;
}
