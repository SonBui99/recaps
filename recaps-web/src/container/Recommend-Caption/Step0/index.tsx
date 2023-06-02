import Card from "@/components/Cards";
import { Grid } from "@mui/material";
import React, { useCallback, useRef } from "react";
import LineStepper from "../Stepper";
import classes from "./step0.module.scss";
import Button from "@/components/Button/Button";
import icDrop from "@/assets/img/icDrop.svg";
import Image from "next/image";

interface Props {
  image: any;
  loading: boolean;
  path: any;
  imagePath: string;
  handleChange: (e: any) => void;
  handleUploaded: (e: any) => void;
}

export default function Step0(props: Props) {
  const { handleChange, handleUploaded, image, loading, path, imagePath } =
    props;
  const ref = useRef<any>(null);
  return (
    <>
      <div style={{ backgroundColor: "#FFFAFA", height: "100%" }}>
        <Card className={classes.card}>
          <LineStepper />
          <Grid
            container
            style={{ marginBottom: 20, marginTop: 20 }}
            spacing={4}
          >
            <Grid item xs={7}>
              <Card className={classes.findCard}>
                <div className={classes.findCaption}>Find any caption</div>
                <div className={classes.desCaption}>
                  To search for more captions you have to login
                </div>
              </Card>
            </Grid>
            <Grid item xs={5}>
              <Card className={classes.emotionCard}>
                <label htmlFor="upload">
                  <div className={classes.dragCard}>
                    <span className={classes.dragDropTitle}>
                      Drag & Drop your image here
                    </span>
                    <div
                      style={{
                        position: "relative",
                        height: 300,
                        width: "100%",
                        marginTop: 20,
                      }}
                    >
                      {imagePath ? (
                        <Image src={imagePath} alt="" fill />
                      ) : (
                        <>
                          <Image src={icDrop} alt="" fill />
                        </>
                      )}
                    </div>
                    <input
                      style={{ marginTop: 20 }}
                      ref={ref}
                      type="file"
                      id="upload"
                      onChange={(e) => handleChange(e?.target?.files as any)}
                      // hidden
                    />
                  </div>
                </label>
                <Button
                  buttonType="primary"
                  onClick={() => handleUploaded(image)}
                  disabled={path === null || loading}
                  style={{ marginTop: 20 }}
                >
                  Continue
                </Button>
              </Card>
            </Grid>
          </Grid>
        </Card>
      </div>
    </>
  );
}
