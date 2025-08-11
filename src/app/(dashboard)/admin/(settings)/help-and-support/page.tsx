"use client";
import React, { useRef, useMemo } from "react";
import JoditEditor from "jodit-react";
import "./jodit-custom.css";

const HeyKindEditor: React.FC = () => {
  const editor = useRef(null);

  const initialContent = `
    <div style="text-align: center; font-family: Arial, sans-serif; padding: 20px;">
      <img src="/assets/icons/logo.svg" alt="HeyKind Logo" style="width: 150px; height: 60px; margin:0 auto;" />
      <p style="margin: 6px 0; color: #555;">📞 +354 374747848</p>
      <p style="margin: 0; color: #555;">✉ admin@gmail.com</p>
    </div>

    <div style="margin-top: 20px; text-align: left;">
      <p><strong>Upload your image:</strong></p>
      <p><em>(Click the image button in toolbar to insert from your PC)</em></p>
    </div>
  `;

  const joditConfig = useMemo(
    () => ({
      readonly: false,
      spellcheck: false,
      toolbarAdaptive: false,
      toolbarSticky: false,
      buttons: [
        "fontsize",
        "bold",
        "italic",
        "underline",
        "align",
        "outdent",
        "indent",
        "|",
        "image"
      ],
      uploader: {
        insertImageAsBase64URI: true, // store images as Base64 directly
      },
      height: 500,
      width: "100%",
      defaultActionOnPaste: "insert_as_html",
      showCharsCounter: false,
      showWordsCounter: false,
      showXPathInStatusbar: false,
      showPoweredBy: false,
    }),
    []
  );

  return (
    <div className="border border-blue-400 rounded-lg p-4 bg-white">
      <JoditEditor
        ref={editor}
        config={joditConfig}
        value={initialContent}
      />
    </div>
  );
};

export default HeyKindEditor;
