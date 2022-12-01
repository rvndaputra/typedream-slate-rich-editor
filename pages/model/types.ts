import type { BaseEditor } from "slate";
import type { HistoryEditor } from "slate-history";
import type { ReactEditor } from "slate-react";
import type { GeneralTransforms } from "slate/dist/transforms/general";
import type { NodeTransforms } from "slate/dist/transforms/node";
import type { SelectionTransforms } from "slate/dist/transforms/selection";
import type { TextTransforms } from "slate/dist/transforms/text";
import { TEXT_ALIGN_TYPES } from "./constants";

// ================================================================
//    Component Types
// ================================================================

export interface BaseProps {
  className: string;
  [key: string]: unknown;
}

// ================================================================
//    Slate Types
// ================================================================

export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor;
export type CustomElement = ParagraphElement;
export type CustomText = FormattedText;

export type TransformsInterface = GeneralTransforms &
  NodeTransforms &
  SelectionTransforms &
  TextTransforms;

export type ElementType =
  | "block-quote"
  | "bulleted-list"
  | "code"
  | "heading-one"
  | "heading-two"
  | "list-item"
  | "numbered-list"
  | "paragraph";

export type AlignType = typeof TEXT_ALIGN_TYPES[number];
export type FormattedType = keyof FormattedElement;

export interface FormattedElement {
  bold: boolean;
  code: boolean;
  italic: boolean;
  underline: boolean;
}

export interface ParagraphElement {
  type: ElementType;
  align: AlignType;
  children: CustomText[];
}

export type FormattedText = { text: string } & Partial<FormattedElement>;
