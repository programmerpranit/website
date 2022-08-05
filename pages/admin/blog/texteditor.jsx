import dynamic from "next/dynamic";


import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

// const QuillNoSSRWrapper = dynamic(import('react-quill'), {
// 	ssr: false,
// 	loading: () => <p>Loading ...</p>,
// 	})

const TextEditor = () => {
  const array = [
    {
      block: "h1",
      value: "hi tag",
    },
    {
      block: "h2",
      value: "h2 tag",
    },
    {
      block: "h3",
      value: "h3 tag",
    },
    {
      block: "h4",
      value: "h4 tag",
    },
  ];

  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  return (
    <>

      <Editor
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue="<p>This is the initial content of the editor.</p>"
        init={{
          height: 500,
          menubar: false,
          plugins: [
            "a11ychecker",
            "advlist",
            "advcode",
            "advtable",
            "autolink",
            "checklist",
            "export",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "powerpaste",
            "fullscreen",
            "formatpainter",
            "insertdatetime",
            "media",
            "table",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | casechange blocks | bold italic backcolor | " +
            "alignleft aligncenter alignright alignjustify | " +
            "bullist numlist checklist outdent indent | removeformat | a11ycheck code table help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />
      <button onClick={log}>Log editor content</button>
    </>
  );
};

export default TextEditor;
