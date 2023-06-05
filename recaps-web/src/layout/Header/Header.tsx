import Image from "next/image";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import logo from "@/assets/img/logo.png";
import classes from "./header.module.scss";
import Button from "@/components/Button/Button";
import cx from "classnames";
import { useRouter } from "next/router";
import Link from "next/link";
import icNetwork from "@/assets/img/icNetwork.svg";
import icNoti from "@/assets/img/icNoti.svg";
import { UserDetail } from "@/model/authenticate.model";
import { checkExistLocalStorage } from "@/helper/ultilities";
import { doLogout } from "@/apis/authenticate.api";
import jwtDecode from "jwt-decode";

export default function Header() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<any>();
  useEffect(() => {
    if (router.pathname.includes("account")) {
      const getItem: any =
        checkExistLocalStorage() && localStorage.getItem("user");
      const decodeToken = jwtDecode(getItem);
      setUserInfo(decodeToken);
    }
  }, [router]);
  const handleLogout = useCallback(async () => {
    await doLogout()
      .then(() => {
        localStorage.removeItem("user");
        router.push("/login");
      })
      .catch(() => console.log());
  }, []);

  const renderFeature = useMemo(() => {
    if (router.pathname.includes("account")) {
      return (
        <>
          <div className={classes.groupBtn}>
            <Link href={"/account"}>
              <Button
                buttonType="transparent"
                buttonSize="m"
                className={classes.btnFeature}
              >
                Home
              </Button>
            </Link>
            <Link href={"/account/recommend-caption"}>
              <Button
                buttonType="transparent"
                buttonSize="m"
                className={classes.btnFeature}
              >
                Captions recommendation
              </Button>
            </Link>
          </div>
          <div className={classes.notifications}>
            <div className={classes.itemNoti}>
              <Image src={icNetwork} alt="" width={25} height={25} />
            </div>
            <div className={classes.itemNoti}>
              <Image src={icNoti} alt="" width={40} height={40} />
            </div>
            <div className={classes.itemNoti}>
              <Image
                src={logo}
                alt=""
                width={30}
                height={30}
                className={classes.avatar}
              />
            </div>
            <div className={cx(classes.itemNoti, classes.name)}>
              {userInfo?.sub?.email || "User Name"}
            </div>
            <div className={cx(classes.groupBtn, "ml-3")}>
              <Link href={"/login"}>
                <Button
                  buttonType="outline"
                  buttonSize="m"
                  className={cx(classes.btn, classes.btnLogout)}
                  onClick={handleLogout}
                >
                  Log out
                </Button>
              </Link>
            </div>
          </div>
        </>
      );
    }
    return (
      <div className={classes.groupBtn}>
        <Link href={"/login"}>
          <Button
            buttonType="outline"
            buttonSize="m"
            className={cx(classes.btn, classes.btnLogin)}
          >
            Login
          </Button>
        </Link>
        <Button
          buttonType="primary"
          buttonSize="m"
          className={classes.btn}
          onClick={() => router.push("/register")}
        >
          Sign up
        </Button>
      </div>
    );
  }, [router, userInfo]);
  const handleClickIcon = useCallback(() => {
    if (router.pathname.includes("account")) {
      return router.push("/account");
    }
    return router.push("/");
  }, []);
  return (
    <div className={classes.headerWrapper}>
      <div onClick={handleClickIcon}>
        <Image
          src={logo}
          alt=""
          width={160}
          height={70}
          className={classes.logoIcon}
        />
      </div>
      {renderFeature}
      {/* {router.pathname === "/account" ? (
        <div className={classes.groupBtn}>
        <Link href={"/login"}>
          <Button
            buttonType="outline"
            buttonSize="m"
            className={cx(classes.btn, classes.btnLogin)}
          >
            Log out
          </Button>
        </Link>   
      </div>
      ) : (
        <div className={classes.groupBtn}>
          <Link href={"/login"}>
            <Button
              buttonType="outline"
              buttonSize="m"
              className={cx(classes.btn, classes.btnLogin)}
            >
              Login
            </Button>
          </Link>
          <Button
            buttonType="primary"
            buttonSize="m"
            className={classes.btn}
            onClick={() => router.push("/register")}
          >
            Sign up
          </Button>
        </div>
      )} */}
    </div>
  );
}
