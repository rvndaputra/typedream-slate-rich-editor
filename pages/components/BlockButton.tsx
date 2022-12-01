import type { FC, MouseEvent } from "react";
import { Editor, Transforms } from "slate";
import { useSlate } from "slate-react";
import { TEXT_ALIGN_TYPES } from "../model/constants";

import type { AlignType, ElementType } from "../model/types";

import Button from "../presentation/Button";
import Icon from "../presentation/Icon";

import useToggleEvent from "../usecase/use-toggle-event";

import { isBlockActive } from "../utils";

interface BlockButtonProps {
  format: AlignType | ElementType;
  icon: string;
}

const BlockButton: FC<BlockButtonProps> = (props) => {
  const { format, icon } = props;

  const editor = useSlate();

  const { toggleBlock } = useToggleEvent({ Editor, Transforms });

  const blockType = TEXT_ALIGN_TYPES.includes(format as any) ? "align" : "type";

  return (
    <Button
      active={isBlockActive(editor, format, blockType)}
      onMouseDown={(event: MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        toggleBlock(editor, format, blockType);
      }}
    >
      <Icon>{icon}</Icon>
    </Button>
  );
};

export default BlockButton;
