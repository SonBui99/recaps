import React, { useCallback, useMemo, useState } from "react";
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
import { getDescription } from "@/apis/captions.api";
import axios from "axios";

export default function RecommendCaption() {
  const router = useRouter();
  const [path, setPath] = useState(null);
  const [urlImage, setUrlImage] = useState("");
  const [test, setTest] = useState(null);

  const [image, setImage] = useState<any>(null);
  const [imagePath, setImagePath] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
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
      if (item) {
        setImagePath(URL?.createObjectURL(item[0]));
        setPath(item[0]?.name);
        setImage(item[0]);
      }
    },
    [path, image]
  );
  console.log(image);

  const handleUploaded = useCallback(async (item: any) => {
    const formData = new FormData();
    formData.append("file", item);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    const response = await axios
      .post("http://127.0.0.1:5000/caption/get_des", formData, config)
      .then((res) => console.log("res", res))
      .catch((err) => console.log("err", err));
    return response;
    // const formData = new FormData();
    // formData.append("file", item[0]);
    // await getDescription(formData)
    //   .then((res) => console.log("rs", res))
    //   .catch((err) => console.log('err',err));
    // const imgRef = ref(storage, `/items/${path}`);
    // uploadBytes(imgRef, item).then((snapshot) => {
    //   setLoading(true);
    //   getDownloadURL(snapshot.ref).then((url: string) => {
    //     localStorage.setItem("urlImage", url);
    //     setUrlImage(url);
    //     setLoading(false);
    //     router.replace({
    //       query: {
    //         step: "2",
    //       },
    //     });
    //   });
    // });
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
            loading={loading}
            path={path}
          />
        );

      case "2":
        return <Step1 path={urlImage} />;

      case "3":
        return <Step2 path={urlImage} />;

      case "4":
        return <Step3 path={urlImage} />;

      default:
        return (
          <Step0
            imagePath={imagePath}
            handleChange={handleChange}
            handleUploaded={handleUploaded}
            image={image}
            loading={loading}
            path={path}
          />
        );
    }
  }, [router, path, image, loading, handleChange, handleUploaded, urlImage]);

  return (
    <>
      {renderHeader}
      <div style={{ backgroundColor: "#FFFAFA", height: "100%" }}>
        {renderStep}
      </div>
    </>
  );
}
