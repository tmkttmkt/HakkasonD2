import React, { useState, useEffect } from 'react';
import MainContainer from '../../component/Main_container/Main_container'; // MainContainerをインポート
import Data_communication from './Data_communication'; // データ取得コンポーネント
import IMAGE1 from './images/仮画像1.png'; // 仮画像のパス

const Communication = ({ setCurrentPage }) => 
{
  const [userMessages, setUserMessages] = useState([]); // ユーザー名とテキストのリスト

  // データ取得 (Data_communicationからデータを取得する関数を呼び出す)
  useEffect(() => {
    const fetchData = async () => 
    {
      // Data_communicationからデータを取得（仮のデータとして固定値を使用）
      const data = await Data_communication(); // 例: [{ username: 'Alice', text: 'こんにちは' }, { username: 'Bob', text: 'こんばんは' }]
      setUserMessages(data);
    };

    fetchData();
  }, []);

  // メインコンテナに渡すデータを生成
  const layoutData = userMessages.map((message, index) => (
  {
    sideButtonPosition: 'left',
    buttonText: `${message.username}さんとチャットをつなぐ`,
    onClick: () => setCurrentPage('chat'), // ページAへの遷移
    text: '貴方の募集に反応した人がいます！',
    textSize: 20,
    imageSrc: IMAGE1
  }));

  return (
    <div>
      <h1>コミュニケーション画面</h1>

      {/* MainContainerコンポーネントを使って、layoutDataを渡す */}
      <MainContainer layoutData={layoutData} />
    </div>
  );
};

export default Communication;
