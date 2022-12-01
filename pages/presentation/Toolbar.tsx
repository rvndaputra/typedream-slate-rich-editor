import type { PropsWithChildren, Ref } from "react";
import { forwardRef } from "react";
import { css, cx } from "@emotion/css";

import type { BaseProps } from "../model/types";

const Toolbar = forwardRef(
  (props: PropsWithChildren<BaseProps>, ref: Ref<HTMLDivElement>) => {
    const { className, ...rest } = props;

    const classNames = cx(
      className,
      css`
        position: relative;
        padding: 1px 18px 17px;
        margin: 0 -20px;
        border-bottom: 2px solid #eee;
        margin-bottom: 20px;

        & > * {
          display: inline-block;
        }

        & > * + * {
          margin-left: 15px;
        }
      `
    );

    return <div {...rest} ref={ref} className={classNames} />;
  }
);

Toolbar.displayName = "Toolbar";

export default Toolbar;
