import React, { useCallback, useEffect, useMemo, useState } from "react";
import classes from "./recommend-caption.module.scss";
import Image from "next/image";
import bg from "@/assets/img/test.svg";
import Step1 from "./Step1";
import Step0 from "./Step0";
import Step2 from "./Step2";
import Step3 from "./Step3";
import { useRouter } from "next/router";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import storage from "@/config/firebase";
import {
  getDes,
  getEmotion,
  getListCaptionForLogin,
  getListCaptionForNoLogin,
} from "@/apis/recommend.api";
import { toastError } from "@/helper/toastMessage";
import CompleteStep from "./CompleteStep";
import { getListCaptionFavourite } from "@/apis/captions.api";

export default function RecommendCaption() {
  const router = useRouter();
  const [path, setPath] = useState(null);
  const [urlImage, setUrlImage] = useState("");
  const [image, setImage] = useState<any>(null);
  const [imagePath, setImagePath] = useState<any>(null);
  const [description, setDesription] = useState("");
  const [listDes, setListDes] = useState([]);
  const [emotion, setEmotion] = useState(null);
  const [seletedDes, setSelectedDes] = useState<any>(0);
  const [listCaptionFavourite, setListCaptionFavourite] = useState<any>([]);
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

  const handleChange = useCallback(
    (item: any) => {
      if (item.length) {
        setImagePath(URL?.createObjectURL(item[0]));
        setPath(item[0]?.name);
        setImage(item[0]);
        localStorage.setItem("urlImage", URL?.createObjectURL(item[0]));
      }
    },
    [path, image]
  );

  useEffect(() => {
    const fetchData = async () => {
      await getListCaptionFavourite().then((res) => {
        setListCaptionFavourite(res?.data);
      });
    };
    fetchData();
  }, []);

  const handleUploaded = useCallback(async (item: any) => {
    const formData = new FormData();
    formData.append("file", item);
    await getEmotion(formData)
      .then((res: any) => {
        setEmotion(res.data.emo);
        router.replace({
          query: {
            step: "2",
          },
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const handleClick = useCallback(async (item: any) => {
    const formData = new FormData();
    formData.append("file", item);
    await getDes(formData).then((res) => {
      setDesription(res?.data?.des);
      router.replace({
        query: {
          step: "3",
        },
      });
    });
  }, []);

  const handleClickInStep3 = useCallback(async (item: any) => {
    const formData = new FormData();
    formData.append("file", item);
    if (router.pathname.includes("account")) {
      await getListCaptionForLogin(formData)
        .then((res) => {
          setListDes(res?.data);
          router.replace({
            query: {
              step: "4",
            },
          });
        })
        .catch((err) => toastError(err));
      return;
    }
    await getListCaptionForNoLogin(formData)
      .then((res) => {
        setListDes(res.data);
        router.replace({
          query: {
            step: "4",
          },
        });
      })
      .catch((err) => toastError(err));
    return;
    // await getListCaptionForNoLogin(formData)
    //   .then((res) => console.log("res", res))
    //   .catch((err) => toastError(err));
    // router.replace({
    //   query: {
    //     step: "4",
    //   },
    // });
  }, []);

  const handleClickCompleted = useCallback(() => {
    router.replace({
      query: {
        step: "completed",
      },
    });
  }, []);

  const handleChooseCaption = useCallback(
    (item: any) => {
      console.log("🚀 ~ file: index.tsx:238 ~ RecommendCaption ~ item:", item);
      setSelectedDes(item);
    },
    [seletedDes]
  );
  const handleBack = useCallback(() => {
    if (router.pathname.includes("account")) {
      return router.push(`/account/`);
    }
    return router.push(`/`);
  }, []);

  const renderStep = useMemo(() => {
    switch (router?.query?.step) {
      case "1":
        return (
          <Step0
            imagePath={imagePath}
            handleChange={handleChange}
            handleUploaded={handleUploaded}
            image={image}
            path={path}
          />
        );

      case "2":
        return (
          <Step1
            path={imagePath}
            emotion={emotion}
            handleClick={handleClick}
            image={image}
          />
        );

      case "3":
        return (
          <Step2
            path={imagePath}
            description={description}
            handleClick={handleClickInStep3}
            image={image}
          />
        );

      case "4":
        return (
          <Step3
            path={imagePath}
            listDes={listDes}
            handleClickCompleted={handleClickCompleted}
            handleChooseCaption={handleChooseCaption}
            seletedDes={seletedDes}
            listCaptionFavourite={listCaptionFavourite}
          />
        );

      case "completed":
        return (
          <CompleteStep
            seletedDes={seletedDes}
            path={imagePath}
            handleBack={handleBack}
            listDes={listDes}
            emotion={emotion}
          />
        );

      default:
        return (
          <Step0
            imagePath={imagePath}
            handleChange={handleChange}
            handleUploaded={handleUploaded}
            image={image}
            path={path}
          />
        );
    }
  }, [
    router,
    path,
    image,
    handleChange,
    handleUploaded,
    urlImage,
    seletedDes,
    listDes,
  ]);

  return (
    <>
      {renderHeader}
      <div style={{ backgroundColor: "#FFFAFA", height: "100%" }}>
        {renderStep}
      </div>
    </>
  );
}
