import Lexical from "lexical";
import LexicalMarkdown from "@lexical/markdown";
import Link from "@lexical/link";
import List from "@lexical/list";
import RichText from "@lexical/rich-text";
// import LexicalHorizontalRuleNode from "@lexical/react/LexicalHorizontalRuleNode";
import Code from "@lexical/code";
import Table from "@lexical/table";

const { createEditor, $getRoot, $createParagraphNode, $createTextNode } =
  Lexical;

const { $convertFromMarkdownString, $convertToMarkdownString, TRANSFORMERS } =
  LexicalMarkdown;

const { AutoLinkNode, LinkNode } = Link;
const { ListItemNode, ListNode } = List;
const { HeadingNode, QuoteNode } = RichText;
// const { HorizontalRuleNode } = LexicalHorizontalRuleNode;
const { CodeHighlightNode, CodeNode } = Code;
const { TableCellNode, TableNode, TableRowNode } = Table;

const exampleTheme = {
  ltr: "ltr",
  rtl: "rtl",
  placeholder: "editor-placeholder",
  paragraph: "editor-paragraph",
};

const markdownString =
  "Made to be your go\\\\-to sidekick from office to trailhead, Hydro Flask stainless steel water bottles are vacuum\\\\-insulated and keep cold drinks cold and hot drinks hot for hours. Both the Standard Mouth and Wide Mouth options have plenty of room for loading in ice and come with the easy\\\\-carry Flex Cap. !\\[\\](https://a.mktgcdn.com/p/vASUfoCbnQJ0_PaLCCfGEnbcpxACxaV6\\\\-41Iu6plc4A/225x225.png)\n\n\n# AN H1\n\n**bold text**\n\n\n**++underlined and bold++**\n\n\n* bullet 1\n* bullet 2";

const config = {
  namespace: "MyEditor",
  theme: exampleTheme,
  nodes: [
    LinkNode,
    AutoLinkNode,
    ListItemNode,
    ListNode,
    HeadingNode,
    QuoteNode,
    CodeHighlightNode,
    CodeNode,
    TableCellNode,
    TableNode,
    TableRowNode,
  ],
  onError: console.error,
};

const editor = createEditor(config);

async function setEditorState() {
  editor.update(() => {
    // Get the RootNode from the EditorState
    const root = $getRoot();

    // Get the selection from the EditorState
    // const selection = $getSelection();

    // Create a new ParagraphNode
    const paragraphNode = $createParagraphNode();

    // Create a new TextNode
    const textNode = $createTextNode("Hello world - testing this out");

    // Append the text node to the paragraph
    paragraphNode.append(textNode);

    // Finally, append the paragraph to the root
    // console.log("Paragraph Node", paragraphNode);
    root.append(paragraphNode);
  });
}

async function setEditorStateWithMarkdownString(markdown) {
  editor.update(() => {
    $convertFromMarkdownString(markdown, TRANSFORMERS); // can use TRANSFORMERS because we initialized the editor with all the nodes covered in the TRANSFORMERS (https://lexical.dev/docs/packages/lexical-markdown)
  });
}

await setEditorState(); // for some reason we need to set the editor state initially. just trying to set it with the markdown string results in errors
await setEditorStateWithMarkdownString(markdownString);
const stringifiedEditorState = JSON.stringify(editor.getEditorState().toJSON());
console.log(stringifiedEditorState);
