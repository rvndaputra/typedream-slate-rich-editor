import { Editor, Element } from "slate";
import type {
  CustomEditor,
  FormattedType,
  ParagraphElement,
} from "../model/types";

export const isMarkActive = (editor: CustomEditor, format: string): boolean => {
  const marks = Editor.marks(editor);

  if (marks) {
    const mark = marks[format as unknown as FormattedType] ?? "";

    return mark ? mark === true : false;
  }

  return false;
};

export const isBlockActive = (
  editor: CustomEditor,
  format: string,
  blockType: keyof ParagraphElement
): boolean => {
  const [match] = Array.from(
    Editor.nodes(editor, {
      match: (n) => Element.isElement(n) && n[blockType ?? "type"] === format,
    })
  );

  return Boolean(match);
};
