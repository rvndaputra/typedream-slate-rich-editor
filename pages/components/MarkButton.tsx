import type { FC, MouseEvent } from "react";
import { Editor, Transforms } from "slate";
import { useSlate } from "slate-react";

import type { FormattedType } from "../model/types";

import Button from "../presentation/Button";
import Icon from "../presentation/Icon";

import useToggleEvent from "../usecase/use-toggle-event";

import { isMarkActive } from "../utils";

interface MarkButtonProps {
  format: FormattedType;
  icon: string;
}

const MarkButton: FC<MarkButtonProps> = (props) => {
  const { format, icon } = props;

  const editor = useSlate();

  const { toggleMark } = useToggleEvent({ Editor, Transforms });

  return (
    <Button
      active={isMarkActive(editor, format)}
      onMouseDown={(event: MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      <Icon>{icon}</Icon>
    </Button>
  );
};

export default MarkButton;
