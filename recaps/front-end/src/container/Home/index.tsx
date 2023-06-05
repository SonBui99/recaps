import Button from "@/components/Button/Button";
import React from "react";
import classes from "./home.module.scss";
import cx from "classnames";
import Image from "next/image";
import icExplore from "@/assets/img/icExplore.svg";
import icLego from "@/assets/img/icLego.svg";
import icWriteCaps from "@/assets/img/icWriteCaps.svg";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  return (
    <div className={classes.container}>
      <div className={classes.textWrapper}>
        <h1 className={classes.title}>Recap - Captions recommendation</h1>
        <div className={classes.description}>Do you love social networks?</div>
        <div className={classes.description}>
          You take beautiful photos but don't know what to write captions?
        </div>
        <div className={classes.description}>
          Or you simply like good and funny sayings. Recap will help you..
        </div>
      </div>
      <div className={classes.groupBtn}>
        <Button
          buttonType="primary"
          buttonSize="m"
          className={cx(classes.btn, classes.btnExplore)}
          onClick={() => router.push("/explore")}
        >
          Explore now
        </Button>
        <Button
          buttonType="outline"
          buttonSize="m"
          className={classes.btn}
          onClick={() => router.push("/recommend")}
        >
          Caption recommendation
        </Button>
      </div>
      <div className={classes.groupAction}>
        <div className={classes.itemAction}>
          <Image src={icExplore} alt="" width={104} height={107} />
          <div className={classes.contentAction}>
            <div className={classes.titleAction}>Explore captions</div>
            <div className={classes.descriptionAction}>
              Explore our wonderful captions
            </div>
          </div>
        </div>
        <div className={classes.itemAction}>
          <Image src={icWriteCaps} alt="" width={104} height={107} />
          <div className={classes.contentAction}>
            <div className={classes.titleAction}>Post captions</div>
            <div className={classes.descriptionAction}>
              Contribute caption with your creativity.
            </div>
          </div>
        </div>
        <div className={classes.itemAction}>
          <Image src={icLego} alt="" width={104} height={107} />
          <div className={classes.contentAction}>
            <div className={classes.titleAction}>Try our system now</div>
            <div className={classes.descriptionAction}>
              Pat yourself on the back. You deserve it.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
