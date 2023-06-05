import Image from "next/image";
import React from "react";
import bgExplore from "@/assets/img/bg-explore.png";
import icExplorePer from "@/assets/img/icExplorePer.svg";
import classes from "./explore.module.scss";
import Card from "@/components/Cards";
import icSolve from "@/assets/img/icSolve.svg";
import icFlashLight from "@/assets/img/icFlashLight.svg";
import icSave from "@/assets/img/icSave.svg";
import icSearchExplore from "@/assets/img/icSearchExplore.svg";
import icFooter from "@/assets/img/icFooter.svg";

export default function Explore() {
  return (
    <div>
      <Image src={bgExplore} alt="" className={classes.imgBg} />
      <Image src={icExplorePer} alt="" className={classes.icBg} />
      <div className={classes.container}>
        <div style={{ paddingTop: 200 }}>
          <div className={classes.title}>Recap - Captions recommendation</div>
          <div className={classes.description}>
            Do you have a headache when you have to think of captions for your
            posts?
          </div>
          <div className={classes.description}>
            We have super cute Facebook captions, attracting many likes and
            interactions with 1000+ good captions and the meaning below is for
            you.
          </div>
        </div>
      </div>
      <div className={classes.dived} />
      <Card className={classes.card}>
        <div className={classes.item}>
          <Image src={icSolve} alt="" />
          <span className={classes.text}>Solve your problem quickly</span>
        </div>
        <div className={classes.item}>
          <Image src={icFlashLight} alt="" />
          <span className={classes.text}>
            With a rich captions and status store with many topics for you to
            choose from
          </span>
        </div>
        <div className={classes.item}>
          <Image src={icSave} alt="" />
          <span className={classes.text}>Save your time</span>
        </div>
        <div className={classes.item}>
          <Image src={icSearchExplore} alt="" />
          <span className={classes.text}>
            Easily search captions via keywords and tags
          </span>
        </div>
      </Card>
      <div className={classes.footer}>
        <Image src={icFooter} alt="" />
        <div>
          <span className={classes.titleFooter}>That’s all about me</span>
          <span className={classes.descriptionFooter}>
            we hope you like this product
          </span>
        </div>
      </div>
    </div>
  );
}
