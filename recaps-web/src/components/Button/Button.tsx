import React, { ForwardRefRenderFunction } from "react";
import cx from "classnames";

export enum ButtonType {
  Primary = "primary",
  Outline = 'outline',
  Transparent = "transparent",
}

export enum ButtonSize {
  Large = "l",
  Medium = "m",
  Small = "s",
  ExtraLarge = "xl",
}

interface Props extends React.ButtonHTMLAttributes<any> {
  buttonType: ButtonType | "primary"| "transparent" | "outline";
  buttonSize?: "l" | "m" | "s" | "xl";
}

const Button: ForwardRefRenderFunction<HTMLButtonElement, Props> = (props) => {
  const {
    buttonType = "primary",
    className,
    children,
    buttonSize = "s",
    ...other
  } = props;
  return (
    <button
      type={"button"}
      className={cx(
        "button",
        {
          primary: buttonType === ButtonType.Primary,
					outline: buttonType === ButtonType.Outline,
          transparent: buttonType === ButtonType.Transparent,
        },
        className
      )}
      {...other}
    >
      <div
        className={cx({
          large: buttonSize === ButtonSize.Large,
          medium: buttonSize === ButtonSize.Medium,
          small: buttonSize === ButtonSize.Small,
          extraLarge: buttonSize === ButtonSize.ExtraLarge,
        })}
      >
        {children}
      </div>
    </button>
  );
};

export default Button;
