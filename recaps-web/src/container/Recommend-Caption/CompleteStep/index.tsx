import React, { useCallback, useMemo } from "react";
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
import { useRouter } from "next/router";

interface Props {
  seletedDes: any;
  path: any;
  handleBack: () => void;
  listDes: any;
}

export default function CompleteStep(props: Props) {
  const { seletedDes, path, handleBack, listDes } = props;
  const router = useRouter();
  const selectedDescription = useMemo(() => {
    if (listDes && seletedDes) {
      return listDes[seletedDes];
    }
  }, [listDes, seletedDes]);
  console.log("listDes", listDes);

  return (
    <div>
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
            {selectedDescription?.content[0]}
          </div>

          <Image
            src={path}
            alt=""
            className={classes.image}
            width={200}
            height={300}
          />
          <div style={{ display: "flex", alignItems: "center", marginTop: 20 }}>
            <Image src={icSmile} alt="" width={32} height={32} />
            <div style={{ display: "flex", marginLeft: 20 }}>
              <div className={classes.tag}>Tinh yeu</div>
              <div className={classes.tag}>Tinh yeu</div>
            </div>
          </div>
          <Button
            buttonType="primary"
            className={classes.btnDone}
            onClick={handleBack}
          >
            Done
          </Button>
        </Card>
      </div>
    </div>
  );
}
