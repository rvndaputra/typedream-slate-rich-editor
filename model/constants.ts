import type { Descendant } from "slate";
import type { AlignType, FormattedType } from "./types";

export const FORMATTED_HOTKEYS: Record<string, FormattedType> = {
  "`": "code",
  b: "bold",
  i: "italic",
  u: "underline",
};

export const LIST_TYPES = ["numbered-list", "bulleted-list"];
export const TEXT_ALIGN_TYPES = ["left", "center", "right", "justify"] as const;

export const ALIGN_HOTKEYS: Record<string, AlignType> = {
  l: "left",
  e: "center",
  r: "right",
  j: "justify",
};

export const INITIAL_SLATE_VALUE: Descendant[] = [
  {
    type: "paragraph",
    align: "left",
    children: [
      { text: "This is editable " },
      { text: "rich", bold: true },
      { text: " text, " },
      { text: "much", italic: true },
      { text: " better than a " },
      { text: "<textarea>", code: true },
      { text: "!" },
    ],
  },
  {
    type: "paragraph",
    align: "left",
    children: [
      {
        text: "Since it's rich text, you can do things like turn a selection of text ",
      },
      { text: "bold", bold: true },
      {
        text: ", or add a semantically rendered block quote in the middle of the page, like this:",
      },
    ],
  },
  {
    type: "block-quote",
    align: "left",
    children: [{ text: "A wise quote." }],
  },
  {
    type: "paragraph",
    align: "center",
    children: [{ text: "Try it out for yourself!" }],
  },
];
