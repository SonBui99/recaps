import React, { useCallback, useEffect, useMemo, useState } from "react";
import Modal from "@mui/material/Modal";
import Card from "../Cards";
import classes from "./modal.module.scss";
import Select from "react-select";
import { FormControlLabel } from "@mui/material";
import { MaterialUISwitch } from "@/container/Recommendation";
import Button from "../Button/Button";
import { getAllTag } from "@/apis/listTag.api";
interface Props {
  open: boolean;
  handleClose: () => void;
  item: any;
  handleUpdate: (item: any) => void;
  listTag: any;
}

export default function ModalEdit({
  open,
  handleClose,
  item,
  handleUpdate,
  listTag,
}: Props) {
  const [emotion, setEmotion] = useState<boolean>(true);
  const [content, setContent] = useState<string>("");
  const [tag, setTag] = useState<any>(null);
  const [dataTag, setDataTag] = useState<any>(null);
  const [selectedTag, setSelectedTag] = useState<any>(null);

  useEffect(() => {
    const getAllTags = async () => {
      const data = await getAllTag();
      return data;
    };
    window.setTimeout(() => {
      getAllTags()
        .then((res) => setDataTag(res.data))
        .catch((err) => console.log(err));
    }, 300);
  }, []);

  useEffect(() => {
    if (item) {
      setContent(item?.content);
      setEmotion(item?.emotion);
      setTag(item?.tag);
    }
  }, [item]);

  const customStyle: any = useMemo(
    () => ({
      dropdownIndicator: () => ({
        color: "#000",
        padding: "10px 20px",
      }),
      multiValueContainer: () => ({
        backgroundColor: "#D5B6FF",
        color: "#D5B6FF",
      }),
    }),
    []
  );
  const handleChangeTags = useCallback(
    (e: any) => {
      const seletecdTagName = e?.map((item: any) => item?.label);
      setTag(seletecdTagName);
      setSelectedTag(e);
    },
    [tag]
  );

  const tagOptions = useMemo(() => {
    if (dataTag) {
      return dataTag?.map((item: any) => {
        return {
          value: item?.tag_id,
          label: item?.tag_name,
        };
      });
    }
  }, [dataTag]);

  const defaultValueTag = useMemo(() => {
    if (tagOptions) {
      // return tagOptions
      //   .filter((item: any) => tag?.includes(item?.label))
      //   ?.map((i) => i.value);
      return tagOptions.filter((item: any) => tag?.includes(item?.label));
    }
  }, [tagOptions, tag]);

  const handleChangeEmotion = useCallback(
    (e: any) => {
      if (e) {
        return setEmotion(true);
      }
      return setEmotion(false);
    },
    [emotion]
  );

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card className={classes.card}>
          <div className={classes.title}>Editting</div>
          <div className={classes.item}>
            <div className={classes.titleItem}>Caption</div>
            <textarea
              className={classes.description}
              onChange={(e) => setContent(e.target.value)}
            >
              {item?.content}
            </textarea>
          </div>
          <div className={classes.item}>
            <div className={classes.titleItem}>Tags</div>
            <Select
              isMulti
              options={tagOptions}
              className={classes.selectInput}
              value={selectedTag || defaultValueTag}
              styles={customStyle}
              onChange={(e) => handleChangeTags(e)}
            />
          </div>
          <div className={classes.emotion}>
            <div className={classes.titleItem}>Emotion</div>
            <FormControlLabel
              control={
                <MaterialUISwitch
                  sx={{ ml: 5 }}
                  defaultChecked={item?.emotion === "1" ? true : false}
                  onChange={(e) => handleChangeEmotion(e.target.checked)}
                />
              }
              label=""
              onChange={(e: any) => setEmotion(e.target?.checked)}
            />
          </div>
          <Button
            buttonType="primary"
            className={classes.btnSave}
            onClick={() => {
              handleUpdate({ content, selectedTag, emotion, item });
              setTimeout(() => {
                handleClose();
              }, 1500);
            }}
          >
            Save
          </Button>
          <Button
            buttonType="outline"
            className={classes.btnSave}
            onClick={handleClose}
          >
            Cancel
          </Button>
        </Card>
      </Modal>
    </>
  );
}
