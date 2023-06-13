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
import icSad from "@/assets/img/icSad.svg";
import Button from "@/components/Button/Button";
import { useRouter } from "next/router";
import { checkExistLocalStorage } from "@/helper/ultilities";

interface Props {
  seletedDes: number;
  path: any;
  handleBack: () => void;
  listDes: any;
  emotion: any;
}

export default function CompleteStep(props: Props) {
  const { seletedDes, path, handleBack, listDes, emotion } = props;
  const router = useRouter();
  const userName = useMemo(() => {
    if (router.pathname.includes("account")) {
      const user = checkExistLocalStorage() && localStorage.getItem("userName");
      return user;
    }
    return null;
  }, [router]);

  const selectedDescription = useMemo(() => {
    return listDes[seletedDes];
  }, [listDes, seletedDes]);
  console.log("123", emotion);

  return (
    <div>
      <div className={classes.container}>
        <Card className={classes.card}>
          <div className={classes.infoUser}>
            <Image src={avatarDefault} alt="" />
            <div style={{ marginLeft: 10 }}>
              <div className={classes.name}>
                {!!userName ? userName : `Khách qua đường`}
              </div>
              <div className={classes.time}>
                less than a minute ago <Image src={icClock} alt="" />
              </div>
            </div>
          </div>
          <div className={classes.desCaption}>
            {selectedDescription?.content}
          </div>

          <Image
            src={path}
            alt=""
            className={classes.image}
            width={200}
            height={300}
          />
          <div style={{ display: "flex", alignItems: "center", marginTop: 20 }}>
            <Image
              src={emotion ? icSmile : icSad}
              alt=""
              width={32}
              height={32}
            />
            <div style={{ display: "flex", marginLeft: 20 }}>
              {selectedDescription?.tag?.map((i: string, index: number) => (
                <div className={classes.tag} key={index}>
                  {i}
                </div>
              ))}
              {/* <div className={classes.tag}>Tinh yeu</div> */}
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
