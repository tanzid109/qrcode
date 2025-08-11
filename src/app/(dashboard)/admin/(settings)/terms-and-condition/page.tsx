"use client";
import React, { useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';
import './jodit-custom.css';

const PrivacyPolicy: React.FC = () => {
  const editor = useRef(null);

  const initialContent = `<p className="p-2">Lorem ipsum dolor sit amet consectetur. Bibendum turpis eget sodales ultrices morbi est libero molestie maecenas. Leo blandit ac porttitor rutrum aliquet porta penatibus mi est. Nisl velit vel lacus nulla eu netus pretium. Pellentesque scelerisque tellus nisl eu nisl sed senectus nunc. Porta sollicitudin vel elit varius nulla sit diam sed. Bibendum elit facilisi nulla viverra augue pellentesque gravida morbi. Diam pellentesque orci eget gravida cursus. Ut ut nulla sapien eget vitae at eget pretium. Tristique nibh ipsum iaculis quam. Vestibulum magna cursus facilisis adipiscing cras dui. Risus auctor faucibus orci tortor tristique elit. Sit tincidunt id felis malesuada placerat ultricies enim. Purus ut congue ornare id sed. Enim libero tincidunt facilisis non facilisis mattis praesent. Magna volutpat at cras urna adipiscing vitae velit enim volutpat. Ac tincidunt et sed dolor ipsum. Purus nunc turpis scelerisque pellentesque lectus mauris imperdiet. Turpis orci consectetur enim posuere faucibus praesent. Ut suscipit cursus id mauris. Accumsan egestas sit arcu sed. Feugiat tortor pharetra id ipsum elit diam viverra tortor. Mattis tincidunt eget ut nunc in. Mauris ipsum ut purus laoreet nisi eu viverra velit adipiscing. Diam sit cursus id semper sit. Urna morbi nisl est vel tincidunt. Egestas feugiat volutpat tincidunt et quis turpis porttitor pellentesque mi. Imperdiet erat pretium eget tristique interdum </p>`;

  const joditConfig = useMemo(
    () => ({
      readonly: false,
      spellcheck: false,
      toolbarAdaptive: false,
      toolbarSticky: false,
      buttons: [
        'fontsize',
        'bold',
        'italic',
        'underline',
        'align',
        'outdent',
        'indent',
      ],
      height: '500px',
      width: '100%',
      defaultActionOnPaste: 'insert_as_html',

      // Hide bottom status bar
      showCharsCounter: false,
      showWordsCounter: false,
      showXPathInStatusbar: false,
      showPoweredBy: false,
    }),
    []
  );


  return (
    <div className="container mx-auto p-6 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Terms and Conditions</h1>
      <div className="">
        <JoditEditor ref={editor} config={joditConfig} value={initialContent} />
      </div>
      <div className="relative mt-4">
        <button className="w-full bg-[#FF6F61] text-white py-2 rounded mt-5">
          Save
        </button>
      </div>
    </div>
  );
};

export default PrivacyPolicy;