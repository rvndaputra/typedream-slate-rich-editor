import { EditorInterface, Element } from "slate";
import { LIST_TYPES } from "../model/constants";
import type {
  AlignType,
  CustomEditor,
  ElementType,
  ParagraphElement,
  TransformsInterface,
} from "../model/types";
import { isBlockActive, isMarkActive } from "../utils";

interface Dependencies {
  Editor: EditorInterface;
  Transforms: TransformsInterface;
}

const useToggleEvent = (deps: Dependencies) => {
  const { Editor, Transforms } = deps;

  const _onToggleBlock = (
    editor: CustomEditor,
    format: AlignType | ElementType,
    blockType: "align" | "type"
  ) => {
    const isActive = isBlockActive(editor, format, blockType);
    const isList = LIST_TYPES.includes(format);

    Transforms.unwrapNodes(editor, {
      match: (n) =>
        Element.isElement(n) &&
        LIST_TYPES.includes(n.type) &&
        blockType === "type",
      split: true,
    });

    if (blockType === "align") {
      Transforms.setNodes<Element>(editor, {
        align: isActive ? "left" : (format as AlignType),
      });
    } else if (blockType === "type") {
      Transforms.setNodes<Element>(editor, {
        type: isActive
          ? "paragraph"
          : isList
          ? "list-item"
          : (format as ElementType),
      });
    }

    if (!isActive && isList) {
      Transforms.wrapNodes(editor, { type: format } as ParagraphElement);
    }
  };

  const _onToggleMark = (editor: CustomEditor, format: string) => {
    const isActive = isMarkActive(editor, format);

    if (isActive) {
      Editor.removeMark(editor, format);
    } else {
      Editor.addMark(editor, format, true);
    }
  };

  const _onToggleAlign = (editor: CustomEditor, format: AlignType) => {
    Transforms.setNodes(editor, { align: format });
  };

  return {
    toggleBlock: _onToggleBlock,
    toggleMark: _onToggleMark,
    toggleAlign: _onToggleAlign,
  };
};

export default useToggleEvent;
