import type { PropsWithChildren, Ref } from "react";
import { forwardRef } from "react";
import { css, cx } from "@emotion/css";

import type { BaseProps } from "../model/types";

interface ButtonProps extends BaseProps {
  active: boolean;
  reserved: boolean;
}

const Button = forwardRef(
  (props: PropsWithChildren<ButtonProps>, ref: Ref<HTMLSpanElement>) => {
    const { className, active, reversed, ...rest } = props;

    const classNames = cx(
      className,
      css`
        cursor: pointer;
        color: ${reversed
          ? active
            ? "white"
            : "#aaa"
          : active
          ? "black"
          : "#ccc"};
      `
    );

    return <span {...rest} ref={ref} className={classNames} />;
  }
);

Button.displayName = "Button";

export default Button;
