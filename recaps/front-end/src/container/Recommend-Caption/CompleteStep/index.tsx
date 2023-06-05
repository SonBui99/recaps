import React, { useMemo } from "react";
import bgLogin from "@/assets/img/bg-login.png";
import classes from "./complete-step.module.scss";
import Image from "next/image";
import bg from "@/assets/img/test.svg";
import Card from "@/components/Cards";
import avatarDefault from "@/assets/img/avatarDefault.svg";
import icClock from "@/assets/img/icClock.svg";
import bgImg from "@/assets/img/img.svg";
import icSmile from "@/assets/img/icSmile.svg";
import Button from "@/components/Button/Button";

export default function CompleteStep() {
  const renderHeader = useMemo(() => {
    return (
      <div style={{ backgroundColor: "#d5b6ff" }}>
        <div className={classes.headerWrapper}>
          <Image src={bg} alt="" className={classes.imgBg} />
          <div className={classes.bgDescription}>Caption recommendation</div>
        </div>
      </div>
    );
  }, []);
  return (
    <div>
      {renderHeader}
      <div className={classes.container}>
        <Card className={classes.card}>
          <div className={classes.infoUser}>
            <Image src={avatarDefault} alt="" />
            <div style={{ marginLeft: 10 }}>
              <div className={classes.name}>Khách qua đường</div>
              <div className={classes.time}>
                less than a minute ago <Image src={icClock} alt="" />
              </div>
            </div>
          </div>
          <div className={classes.desCaption}>
            Người ta thường nói cười là phương thuốc tốt nhất để chữa lành mọi
            vết thương. Nhưng khi bạn cười không có lý do, lúc đó bạn cần thuốc.
          </div>
          <Image src={bgImg} alt="" className={classes.image} />
          <div style={{ display: "flex", alignItems: "center", marginTop: 20 }}>
            <Image src={icSmile} alt="" width={32} height={32} />
            <div style={{ display: "flex", marginLeft: 20 }}>
              <div className={classes.tag}>Tinh yeu</div>
              <div className={classes.tag}>Tinh yeu</div>
            </div>
          </div>
          <Button buttonType="primary" className={classes.btnDone}>
            Done
          </Button>
        </Card>
      </div>
    </div>
  );
}
