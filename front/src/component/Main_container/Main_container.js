// MainContainer.js
import React from 'react';
import Side_button from './Side_button/Side_button';
import Display_text from './Display_text/Display_text';

const MainContainer = ({ layoutData }) => {
  return (
    <div className="main-container">
      {layoutData.map((item, index) => (
        <div key={index} className="content-block">
          {/* コンテンツを横並びに配置するためのスタイルを追加 */}
          <div className="content-item" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            {/* サイドボタン */}
            {item.sideButtonPosition && (
              <Side_button
                Button_text={item.buttonText}
                Button_position={item.sideButtonPosition}
                onClick={item.onClick}
              />
            )}
            
            {/* 画像表示 */}
            {item.imageSrc && (
              <img src={item.imageSrc} alt="コンテンツ画像" className="content-image" />
            )}
            
            {/* テキスト表示 */}
            {item.text && (
              <Display_text
                size_of_text={item.textSize}
                draw_text={item.text}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MainContainer;
