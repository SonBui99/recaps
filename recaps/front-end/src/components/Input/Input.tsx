import React, {
  InputHTMLAttributes,
  ReactElement,
  useCallback,
  useRef,
  forwardRef,
  ElementRef,
  useImperativeHandle,
} from "react";
import cx from "classnames";

enum InputType {
  STANDARD = "standard",
  NORMAL = "normal",
}

enum InputSize {
  Large = "l",
  Medium = "m",
  Small = "s",
  ExtraLarge = "xl",
}

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  renderPrefix?: (() => ReactElement) | ReactElement | any;
  renderSuffix?: (() => ReactElement) | ReactElement | any;
  isError?: boolean;
  inputType?: "standard" | "normal";
  inputClassName?: string;
  inputSize?: "l" | "m" | "s" | "xl";
  classSuffix?: string;
  classPrefix?: string;
  formInputRef?: ElementRef<any>;
}

const Input = (props: Props, ref: any) => {
  const {
    isError = false,
    inputType = "standard",
    inputSize = "m",
    className,
    renderPrefix,
    renderSuffix,
    classSuffix,
    classPrefix,
    inputClassName,
    style,
    formInputRef,
    ...other
  } = props;
  let inputRef: any = useRef<HTMLInputElement>();
  if (formInputRef) {
    inputRef = formInputRef;
  }

  const onMouseUp = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useImperativeHandle(ref, () => inputRef.current);

  return (
    <div
      className={cx(
        "input",
        {
          normal: inputType === InputType.NORMAL,
          standard: inputType === InputType.STANDARD,
          error: isError,
          medium: inputSize === InputSize.Medium,
          large: inputSize === InputSize.Large,
          small: inputSize === InputSize.Small,
          "d-none": props.type === "hidden",
        },
        className
      )}
      style={style}
      onMouseUp={onMouseUp}
    >
      <span
        className={cx("renderPrefix", classPrefix)}
        onMouseUp={(e) => e.preventDefault()}
        onMouseDown={(e) => e.preventDefault()}
      >
        {renderPrefix}
      </span>
      <input className={inputClassName} {...other} ref={inputRef} />
      <span
        className={cx("renderSuffix", classSuffix)}
        onMouseUp={(e) => e.preventDefault()}
        onMouseDown={(e) => e.preventDefault()}
      >
        {renderSuffix}
      </span>
    </div>
  );
};


export default forwardRef(Input);
