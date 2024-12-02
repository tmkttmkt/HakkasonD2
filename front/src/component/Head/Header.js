import React, { useState } from 'react';
import Head_button from './Head_button/Head_button';
import Head_background from './Head_background/Head_background';
import './Header.css';

function Header(
{
  select_1, onClick1,
  select_2, onClick2,
  select_3, onClick3,
  select_4, onClick4,
  select_5, onClick5,
  select_6, onClick6,
  select_7, onClick7,
  open_name, close_name,
  Page, logout
}
) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // メニュー表示の切り替え
  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  return (
    <div className="header">
      {/* 現在のページを表示する背景 */}
      <Head_background Now_page={Page} />
      {/* メニュー切り替えボタン */}
      <button onClick={toggleMenu} className="menu-toggle-btn">
        {isMenuOpen ? open_name : close_name}
      </button>

      {/* ログアウトボタン */}
      <button onClick={logout} className="reset-btn">
        ログアウトボタン
      </button>

      {/* メニューセクション */}
      <div className={`menu ${isMenuOpen ? 'open' : ''}`}>
        <Head_button Button_text={select_1} onClick={onClick1} />
        <Head_button Button_text={select_2} onClick={onClick2} />
        <Head_button Button_text={select_3} onClick={onClick3} />
        <Head_button Button_text={select_4} onClick={onClick4} />
        <Head_button Button_text={select_5} onClick={onClick5} />
        <Head_button Button_text={select_6} onClick={onClick6} />
        <Head_button Button_text={select_7} onClick={onClick7} />
      </div>
    </div>
  );
}

export default Header;
