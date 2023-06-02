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

interface Props {
  path: any;
}

export default function Step1(props: Props) {
  const { path } = props;
  const router = useRouter();
  const [urlImage, setUrlImage] = useState("");
  useEffect(() => {
    if (checkExistLocalStorage()) {
      setUrlImage(localStorage.getItem("urlImage") as string);
    }
  }, []);

  const handleClick = useCallback(() => {
    router.replace({
      query: {
        step: "3",
      },
    });
  }, []);

  const renderUI = useMemo(() => {
    if (urlImage) {
      return (
        <>
          <Card className={classes.card}>
            <LineStepper />
            <Grid container spacing={4} style={{ marginTop: 20 }}>
              <Grid item xs={7}>
                <Card className={classes.emotionCard}>
                  <Image src={icSmile} alt="" />
                  <Image src={icSad} alt="" />
                </Card>
              </Grid>
              <Grid item xs={5}>
                <div style={{ position: "relative", height: "340px" }}>
                  <Image
                    src={path?.length > 0 ? path : urlImage}
                    alt=""
                    className={classes.img}
                    priority
                    fill
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
  }, [path, urlImage, router]);

  return <>{renderUI}</>;
}
