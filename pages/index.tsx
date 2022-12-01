import { useCallback, useState } from "react";
import { createEditor, Editor, Transforms } from "slate";
import { withHistory } from "slate-history";
import {
  Editable,
  RenderElementProps,
  RenderLeafProps,
  Slate,
  withReact,
} from "slate-react";

import {
  ALIGN_HOTKEYS,
  FORMATTED_HOTKEYS,
  INITIAL_SLATE_VALUE,
} from "./model/constants";
import type { CustomEditor, CustomElement, CustomText } from "./model/types";

import Leaf from "./components/Leaf";
import SwitchElement from "./components/SwitchElement";

import BlockButton from "./components/BlockButton";
import MarkButton from "./components/MarkButton";
import Toolbar from "./presentation/Toolbar";

import useToggleEvent from "./usecase/use-toggle-event";

declare module "slate" {
  interface CustomTypes {
    Editor: CustomEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

const Home = () => {
  const [editor] = useState(() => withHistory(withReact(createEditor())));

  const renderElement = useCallback(
    (props: RenderElementProps) => <SwitchElement {...props} />,
    []
  );
  const renderLeaf = useCallback(
    (props: RenderLeafProps) => <Leaf {...props} />,
    []
  );

  const { toggleAlign, toggleMark } = useToggleEvent({
    Editor: Editor,
    Transforms: Transforms,
  });

  return (
    <div
      style={{
        background: "white",
        maxWidth: 500,
        margin: "16px auto",
        padding: "16px",
      }}
    >
      <Slate editor={editor} value={INITIAL_SLATE_VALUE}>
        <Toolbar>
          <MarkButton format="bold" icon="format_bold" />
          <MarkButton format="italic" icon="format_italic" />
          <MarkButton format="underline" icon="format_underlined" />
          <MarkButton format="code" icon="code" />
          <BlockButton format="heading-one" icon="looks_one" />
          <BlockButton format="heading-two" icon="looks_two" />
          <BlockButton format="block-quote" icon="format_quote" />
          <BlockButton format="numbered-list" icon="format_list_numbered" />
          <BlockButton format="bulleted-list" icon="format_list_bulleted" />
          <BlockButton format="left" icon="format_align_left" />
          <BlockButton format="center" icon="format_align_center" />
          <BlockButton format="right" icon="format_align_right" />
          <BlockButton format="justify" icon="format_align_justify" />
        </Toolbar>
        <Editable
          placeholder="Enter some rich text..."
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          onKeyDown={(event) => {
            if (event.ctrlKey && FORMATTED_HOTKEYS[event.key]) {
              event.preventDefault();
              toggleMark(editor, FORMATTED_HOTKEYS[event.key]);
            }
            if (event.metaKey && event.shiftKey && ALIGN_HOTKEYS[event.key]) {
              event.preventDefault();
              toggleAlign(editor, ALIGN_HOTKEYS[event.key]);
            }
          }}
        />
      </Slate>
    </div>
  );
};

export default Home;
