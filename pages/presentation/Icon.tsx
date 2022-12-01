import type { PropsWithChildren, Ref } from "react";
import { forwardRef } from "react";
import { css, cx } from "@emotion/css";

import type { BaseProps } from "../model/types";

const Icon = forwardRef(
  (props: PropsWithChildren<BaseProps>, ref: Ref<HTMLSpanElement>) => {
    const { className, ...rest } = props;

    const classNames = cx(
      "material-icons",
      className,
      css`
        font-size: 18px;
        vertical-align: text-bottom;
      `
    );

    return <span {...rest} ref={ref} className={classNames} />;
  }
);

Icon.displayName = "Icon";

export default Icon;
