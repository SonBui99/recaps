import React, { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import classes from "./recommend.module.scss";
import bg from "@/assets/img/test.svg";
import Card from "@/components/Cards";
import Button from "@/components/Button/Button";
import Select from "react-select";
import cx from "classnames";
import logo from "@/assets/img/logo.jpg";
import icClock from "@/assets/img/icClock.svg";
import icSmile from "@/assets/img/icSmile.svg";
import icSad from "@/assets/img/icSad.svg";
import FormControlLabel from "@mui/material/FormControlLabel";
import { styled } from "@mui/material/styles";
import { Switch, createTheme } from "@mui/material";
import Link from "next/link";
import { getAllTag, getListTag } from "@/apis/listTag.api";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { checkExistLocalStorage } from "@/helper/ultilities";
import { addNewCaption, getListCaptions } from "@/apis/captions.api";
import { useRouter } from "next/router";
import { toastError, toastSuccess } from "@/helper/toastMessage";
import jwtDecode from "jwt-decode";
import moment from "moment";

interface InitStateTagSelected {
  value: number;
  label: string;
}

const options: any = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

export default function Recommendation() {
  const [listTags, setListTags] = useState([]);
  const [listCaption, setListCaption] = useState([]);
  const [selectedOption, setSelectedOption] = useState([]);
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
      await getListCaptions()
        .then(async (res) => {
          setListCaption(res.data?.reverse());
          await getAllTag()
            .then((data) => {
              setListTags(data.data);
            })
            .catch(() => {
              //nothing
            });
        })
        .catch(() => {
          //do nothing
        });
    };
    getAllTags();
  }, []);

  const tagOptions: any = useMemo(() => {
    if (listTags) {
      return listTags?.map((item: any) => {
        return {
          value: item?.tag_id,
          label: item?.tag_name,
        };
      });
    }
  }, [listTags]);

  const listDataSlice = useMemo(() => {
    if (listCaption) {
      return listCaption.slice(0, 10);
    }
  }, [listCaption]);

  const renderListCaption = useMemo(() => {
    if (listDataSlice) {
      const userName =
        checkExistLocalStorage() && localStorage.getItem("userName");
      return (
        <>
          {listDataSlice?.map((item: any) => (
            <>
              <div className={classes.itemInfo} key={item.id}>
                <Image src={logo} alt="" className={classes.avatar} />
                <div>
                  <div className={classes.nameUser}>{userName}</div>
                  <div className={classes.timeItem}>
                    {moment(item?.created_at).startOf("day").fromNow()}{" "}
                    <Image src={icClock} alt="" />
                  </div>
                </div>
              </div>
              <div className={classes.descriptionItem}>{item?.content}</div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div className={classes.listTag}>
                  {item?.tag?.map((it: any, index: number) => (
                    <div className={classes.tagItem} key={index}>
                      {it}
                    </div>
                  ))}
                </div>
                <div className={classes.emoItem}>
                  <Image
                    src={item?.emotion === "1" ? icSmile : icSad}
                    alt=""
                    width={32}
                    height={32}
                    style={{ marginRight: 10, marginTop: 10 }}
                  />
                </div>
              </div>
              <div className={classes.divided} />
            </>
          ))}
        </>
      );
    }
  }, [listDataSlice]);

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
    if (!!getUser) {
      const userInfo: any = jwtDecode(getUser);
      return userInfo.sub.userid;
    }
  }, []);

  const onSubmit = useCallback(
    async (values: any) => {
      const tagSelected = selectedOption?.map((item: any) => item.label);
      const body: any = {
        content: values?.content?.trim(),
        // idUser: idUser,
        emotion: emotion,
        tag: tagSelected,
      };
      await addNewCaption(body)
        .then(() => {
          toastSuccess("Create Caption Successfully");
          setEmotion(true);
          setSelectedOption([]);
        })
        .catch((err) => toastError(err));
    },
    [idUser, selectedOption, emotion]
  );

  const handleChangeTags = useCallback(
    (values: any) => {
      setSelectedOption(values);
    },
    [selectedOption]
  );

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
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <div className={classes.emotionTitle}>Emotion</div>
                  {/* <FormControlLabel
                    control={<MaterialUISwitch sx={{ m: 1 }} defaultChecked />}
                    label=""
                    onChange={(e: any) => setEmotion(e.target?.checked)}
                  /> */}
                  <FormControlLabel
                    control={
                      <MaterialUISwitch
                        sx={{ ml: 5 }}
                        defaultChecked={true}
                        onChange={(e: any) => setEmotion(e.target?.checked)}
                      />
                    }
                    label=""
                    onChange={(e: any) => setEmotion(e.target?.checked)}
                  />
                </div>
              </div>
              <Select
                value={selectedOption}
                options={tagOptions}
                className={classes.selectInput}
                styles={customStyle}
                onChange={handleChangeTags}
                isSearchable
                isMulti
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

export const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  margin: 0,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg width="25" height="25" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1"><path fill="${encodeURIComponent(
          "#FF8A8A"
        )}" d="M14.36,14.23a3.76,3.76,0,0,1-4.72,0,1,1,0,0,0-1.28,1.54,5.68,5.68,0,0,0,7.28,0,1,1,0,1,0-1.28-1.54ZM9,11a1,1,0,1,0-1-1A1,1,0,0,0,9,11Zm6-2a1,1,0,1,0,1,1A1,1,0,0,0,15,9ZM12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"/></svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: "#FFD9D8",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    // backgroundColor: '#FFD9D8',
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
      // backgroundImage: `url('data:image/svg+xml;utf8,<svg fill="#000000" width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1"><path d="M8.36,15.33a1,1,0,0,0-.13,1.4,1,1,0,0,0,1.41.13,3.76,3.76,0,0,1,4.72,0,1,1,0,0,0,.64.23,1,1,0,0,0,.64-1.76A5.81,5.81,0,0,0,8.36,15.33Zm.85-4.79a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41,3.08,3.08,0,0,0-4.24,0,1,1,0,1,0,1.41,1.41A1,1,0,0,1,9.21,10.54ZM12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8,8,0,0,1,12,20ZM17.62,9.13a3.08,3.08,0,0,0-4.24,0,1,1,0,0,0,1.41,1.41,1,1,0,0,1,1.42,0,1,1,0,0,0,1.41,0A1,1,0,0,0,17.62,9.13Z"/></svg>')`
      backgroundImage: `url('data:image/svg+xml;utf8,<svg width="25" height="25" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1"><path fill="${encodeURIComponent(
        "#6941C6"
      )}" d="M8.36 15.33a1 1 0 0 0-.13 1.4 1 1 0 0 0 1.41.13 3.76 3.76 0 0 1 4.72 0 1 1 0 0 0 .64.23 1 1 0 0 0 .64-1.76 5.81 5.81 0 0 0-7.28 0Zm.85-4.79a1 1 0 0 0 1.41 0 1 1 0 0 0 0-1.41 3.08 3.08 0 0 0-4.24 0 1 1 0 1 0 1.41 1.41 1 1 0 0 1 1.42 0ZM12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8Zm5.62-10.87a3.08 3.08 0 0 0-4.24 0 1 1 0 0 0 1.41 1.41 1 1 0 0 1 1.42 0 1 1 0 0 0 1.41 0 1 1 0 0 0 0-1.41Z"/></svg>')`,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: "#6941C6",
    borderRadius: 20 / 2,
  },
}));
