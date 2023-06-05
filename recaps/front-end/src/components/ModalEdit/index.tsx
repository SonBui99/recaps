import React, { useMemo, useState } from "react";
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
}

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];
export default function ModalEdit({ open, handleClose, item }: Props) {
  const [emotion, setEmotion] = useState<boolean>(true);

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
          <textarea className={classes.description}>{item?.content}</textarea>
        </div>
        <div className={classes.item}>
          <div className={classes.titleItem}>Tags</div>
          <Select
            isMulti
            name="colors"
            options={options}
            className={classes.selectInput}
            // defaultValue={}
            styles={customStyle}
            // onChange={handleChangeTags}
          />
        </div>
        <div className={classes.emotion}>
          <div className={classes.titleItem}>Emotion</div>
          <FormControlLabel
            control={
              <MaterialUISwitch
                sx={{ ml: 5 }}
                defaultChecked={item?.trangThai}
              />
            }
            label=""
            onChange={(e: any) => setEmotion(e.target?.checked)}
          />
        </div>
        <Button buttonType="primary" className={classes.btnSave}>
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
}
