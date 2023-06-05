import React, { useCallback, useEffect, useMemo, useState } from "react";
import Modal from "@mui/material/Modal";
import Card from "../Cards";
import classes from "./modal.module.scss";
import Select from "react-select";
import { FormControlLabel } from "@mui/material";
import { MaterialUISwitch } from "@/container/Recommendation";
import Button from "../Button/Button";
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
  const [emotion, setEmotion] = useState<string>("True");
  const [content, setContent] = useState<string>("");
  const [tag, setTag] = useState<any>(null);
  const [defaultTag, setDefaultTag] = useState(null);

  useEffect(() => {
    if (item) {
      setContent(item?.content);
      setEmotion(item?.emotion);
      setTag(item?.tag);
      const tagInCaptions = tagOptions.filter((i: any) =>
        item?.tag?.map((it: any) => it === i.name)
      );
      setDefaultTag(tagInCaptions);
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
    },
    [tag]
  );

  const tagOptions = useMemo(() => {
    if (listTag) {
      return listTag?.map((item: any) => {
        return {
          value: item?.id,
          label: item?.name,
        };
      });
    }
  }, [listTag]);

  const defaultValueTag = useMemo(() => {
    if (item && tagOptions) {
      return tagOptions.filter((item: any) =>
        tag?.map((it: any) => it === item.name)
      );
    }
  }, [tagOptions, item, tag]);

  const handleChangeEmotion = useCallback(
    (e: any) => {
      if (e) {
        return setEmotion("True");
      }
      return setEmotion("False");
    },
    [emotion]
  );

  return (
    <>
      return (
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
              defaultValue={defaultTag}
              styles={customStyle}
              onChange={(e) => handleChangeTags(e)}
              isClearable
            />
          </div>
          <div className={classes.emotion}>
            <div className={classes.titleItem}>Emotion</div>
            <FormControlLabel
              control={
                <MaterialUISwitch
                  sx={{ ml: 5 }}
                  defaultChecked={item?.emotion === "True" ? true : false}
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
              handleUpdate({ content, tag, emotion, item });
              // setTimeout(() => {
              //   handleClose();
              // }, 2000);
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
      );
    </>
  );
}
