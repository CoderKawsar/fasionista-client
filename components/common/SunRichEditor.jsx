"use client";
import "suneditor/dist/css/suneditor.min.css";
import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
const SunEditor = dynamic(() => import("suneditor-react"), { ssr: false });

const SunRichEditor = ({
  label,
  name,
  placeholder,
  handleChange,
  value,
  error,
  touched,
  handleBlur,
  isRequired = true,
  isReadOnly = false,
  height,
}) => {
  const editorRef = useRef(null);

  // Update the editor content when the value prop changes
  useEffect(() => {
    if (editorRef.current && editorRef.current.editor) {
      editorRef.current.editor.setContents(value || "");
    }
  }, [value]);
  return (
    <div className="w-full">
      <label
        htmlFor={name}
        className="pb-1 text-softBlack font-semibold inline-block capitalize"
      >
        {label} {isRequired && <span className="text-red-600">*</span>}
      </label>
      <div>
        <SunEditor
          name={name}
          onBlur={handleBlur}
          onChange={(content) => handleChange(content)}
          setContents={value || ""}
          placeholder={placeholder}
          setDefaultStyle="font-size: 16px; font-family: Poppins"
          setOptions={{
            height: "auto",
            stickyToolbar: 0,
            font: ["Poppins", "Inter", "Roboto", "Nato Sans"],
            buttonList: [
              ["undo", "redo"],
              ["font", "fontSize", "formatBlock"],
              ["fontColor", "hiliteColor"],
              [
                "bold",
                "underline",
                "italic",
                "strike",
                "subscript",
                "superscript",
              ],
              ["list", "align", "horizontalRule", "lineHeight"],
              ["link", "table"],
              ["fullScreen", "preview"],
            ],
          }}
          height={height ? height : "200px"}
        />
        {error && <p style={{ color: "red", fontSize: "14px" }}>{error} </p>}
      </div>
    </div>
  );
};

export default SunRichEditor;
