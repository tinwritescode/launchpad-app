import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './text-quill.css';

type TextQuillProps = {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string | 'write something...';
};

const TextQuill = ({ value, onChange, placeholder }: TextQuillProps) => {
  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

export default TextQuill;
