import React, { useState } from 'react';

const Text_input = ({ onTextChange, value = '', width, height }) => {
  const [inputValue, setInputValue] = useState(value);

  // 画面サイズに基づいてデフォルト値を設定
  const defaultWidth = width || '90vw';  // デバイス幅の90%
  const defaultHeight = height || '20vh'; // デバイス高さの20%

  const handleChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onTextChange(newValue); // 入力値を親に通知
  };

  return (
    <div>
      <textarea
        value={inputValue}
        onChange={handleChange}
        placeholder="ここにテキストを入力"
        style={{ width: defaultWidth, height: defaultHeight }}
      />
    </div>
  );
};

export default Text_input;
