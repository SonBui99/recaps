import React, { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import classes from "./recommend.module.scss";
import bg from "@/assets/img/test.svg";
import Card from "@/components/Cards";
import Button from "@/components/Button/Button";
import Select from "react-select";
import cx from "classnames";
import logo from "@/assets/img/logo.png";
import icClock from "@/assets/img/icClock.svg";
import icSmile from "@/assets/img/icSmile.svg";
import icSad from "@/assets/img/icSad.svg";
import FormControlLabel from "@mui/material/FormControlLabel";
import { styled } from "@mui/material/styles";
import { Switch, createTheme } from "@mui/material";
import Link from "next/link";
import { getListTag } from "@/apis/listTag.api";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { checkExistLocalStorage } from "@/helper/ultilities";
import { addNewCaption } from "@/apis/captions.api";
import { useRouter } from "next/router";

const Smile = () => {
  return <Image src={icSmile} alt="" width={20} height={20} />;
};
const Sad = () => {
  return <Image src={icSad} alt="" width={20} height={20} />;
};

export default function Recommendation() {
  const [listTags, setListTags] = useState([]);
  const [listTagsSelected, setListTagsSelected] = useState([]);
  const [emotion, setEmotion] = useState<boolean>(true);
  const schema = yup.object().shape({
    content: yup.string().required("Vui lòng nhập username"),
  });
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const customStyle: any = useMemo(
    () => ({
      dropdownIndicator: () => ({
        color: "#000",
        padding: "10px 20px",
      }),
    }),
    []
  );
  useEffect(() => {
    const getAllTags = async () => {
      const data = await getListTag();
      setListTags(data);
    };
    getAllTags().catch((err) => console.log());
  }, []);

  const tagOptions = useMemo(() => {
    if (listTags) {
      return listTags?.map((item: any) => {
        return {
          value: item?.name,
          label: item?.name,
        };
      });
    }
  }, [listTags]);

  const renderListCaption = useMemo(() => {
    return (
      <>
        <div>
          <div className={classes.itemInfo}>
            <Image src={logo} alt="" className={classes.avatar} />
            <div>
              <div className={classes.nameUser}>YunFeng</div>
              <div className={classes.timeItem}>
                Last 1 day ago <Image src={icClock} alt="" />
              </div>
            </div>
          </div>
          <div className={classes.descriptionItem}>
            Hãy gọi anh khi em thấy nhớ, anh sẽ ngồi nghe không quan trọng là
            mấy giờ
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div className={classes.listTag}>
              <div className={classes.tagItem}>Madness</div>
              <div className={classes.tagItem}>Madness</div>
            </div>

            <div className={classes.emoItem}>
              <Image
                src={icSmile}
                alt=""
                width={32}
                height={32}
                style={{ marginRight: 10, marginTop: 10 }}
              />
            </div>
          </div>
          <div className={classes.divided} />
        </div>
      </>
    );
  }, []);

  const renderHeader = useMemo(() => {
    return (
      <div style={{ backgroundColor: "#FFFAFA", position: "relative" }}>
        <div className={classes.headerWrapper}>
          <Image src={bg} alt="" className={classes.imgBg} />
          <div className={classes.itemMenu}>
            <div style={{ marginBottom: 10, display: "flex" }}>
              <Link
                href="/account"
                className={cx(classes.favourite, classes.marginLeft)}
              >
                Collection
              </Link>
              <Link href="/account/favourite" className={classes.favourite}>
                Favourite
              </Link>
              <Link href="/account/captions" className={classes.captions}>
                Captions
              </Link>
            </div>
            <div className={classes.divied} />
          </div>
        </div>
      </div>
    );
  }, []);

  const idUser = useMemo(() => {
    const getUser: any =
      checkExistLocalStorage() && localStorage.getItem("user");
    const user: any = JSON.parse(getUser);
    return user?.user?.id;
  }, []);

  const onSubmit = useCallback(
    async (values: any) => {
      const body = {
        content: values?.content?.trim(),
        idUser: idUser,
        trangThai: emotion,
      };
      await addNewCaption(body)
        .then(() => {
          alert("Add Caption Success");
          setEmotion(true);
          setListTagsSelected([]);
        })
        .catch((err) => alert({ err }));
    },
    [idUser]
  );

  const handleChangeTags = useCallback((values: any) => {
    setListTagsSelected(values);
  }, []);
  return (
    <>
      {renderHeader}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.containerContent}>
          <Card className={cx(classes.cardItem, classes.tagContainer)}>
            <div className={classes.heading}>Content</div>
            <div className={classes.divided} />
            <textarea
              placeholder="What you thinking?"
              className={classes.description}
              {...register("content")}
            />
            <div className={classes.tagSelect}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <div className={classes.tagTitle}>Tags</div>
                  <div className={classes.desTag}>
                    Add tags to describe what your caption is about
                  </div>
                </div>
                <div>
                  <div className={classes.emotionTitle}>Emotion</div>
                  {/* <FormControlLabel
                    control={<MaterialUISwitch sx={{ m: 1 }} defaultChecked />}
                    label=""
                    onChange={(e: any) => setEmotion(e.target?.checked)}
                  /> */}
                  {/* <ThemeProvider theme={theme}> */}
                  <Switch
                    checked={emotion}
                    onChange={(e: any) => setEmotion(e.target?.checked)}
                    name="checkedA"
                    inputProps={{
                      "aria-label": "secondary checkbox",
                      className: classes.switch,
                    }}
                    icon={<Sad />}
                    checkedIcon={<Smile />}
                    className={classes.switch}
                  />
                  {/* </ThemeProvider> */}
                </div>
              </div>
              <Select
                isMulti
                name="colors"
                options={tagOptions}
                className={classes.selectInput}
                styles={customStyle}
                onChange={handleChangeTags}
              />
              <Button
                type="submit"
                buttonType="primary"
                className={classes.btnSubmit}
              >
                Submit
              </Button>
            </div>
          </Card>
          <Card className={cx(classes.cardItem, classes.recommendContainer)}>
            {renderListCaption}
          </Card>
        </div>
      </form>
    </>
  );
}

export const MaterialUISwitch = styled(Switch)(() => ({
  height: 34,
  padding: 1,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url(${icSad})`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: "#FFEDED",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    width: 32,
    height: 32,
    "&:before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url(${icSmile})`,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: "#7F56D9",
    border: "3px solid #FF8A8A",
    borderRadius: 28.5,
  },
}));

const theme = createTheme({
  components: {
    MuiSwitch: {
      styleOverrides: {
        switchBase: {
          "&$checked": {
            color: "#fff",
            transform: "translateX(22px)",
          },
          "&$checked + $track": {
            opacity: 1,
            backgroundColor: "#FFEDED",
          },
        },
        thumb: {
          width: 32,
          height: 32,
          "&:before": {
            content: "''",
            position: "absolute",
            width: "100%",
            height: "100%",
            left: 0,
            top: 0,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundImage: `url(${icSmile})`,
          },
        },
        track: {
          opacity: 1,
          backgroundColor: "#7F56D9",
          border: "3px solid #FF8A8A",
          borderRadius: 28.5,
        },
      },
    },
  },
});
