import Image from "next/image";
import React from "react";
import logo from "@/assets/img/logo.png";
import classes from "./header-login.module.scss";
import { useRouter } from "next/router";
import Button from "@/components/Button/Button";

export default function HeaderLogin() {
  const router = useRouter();
  return (
    <div className={classes.headerWrapper}>
      <Button buttonType="transparent" onClick={() => router.push("/")}>
        <Image
          src={logo}
          alt=""
          width={160}
          height={70}
          className={classes.logoIcon}
        />
      </Button>
    </div>
  );
}
