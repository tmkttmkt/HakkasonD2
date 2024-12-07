import React, { useState } from 'react';

const ChatProgram = () => {
  const [selectedOption, setSelectedOption] = useState(''); // 現在選択された内容を保存
  const [selectedColor, setSelectedColor] = useState('blue'); // 吹き出しの色を選択
  const [messages, setMessages] = useState([]); // 投稿されたメッセージを保存する状態
//ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー

  function func()
  {
    let url=process.env.REACT_APP_BACKEND_URL+"/login";
    console.log(url);
    fetch(url)
    .then((response) => 
    {
      if (!response.ok)throw new Error("データ取得に失敗しました");
      return response;  // ここで Promise を返す
    })
    .then((data) => 
    {
      console.log(data.json());  // JSONデータがここに来る
    })
    .catch((error) => 
    {
      console.error("エラー:", error);
    });
  }
//ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
  // 選択肢データ
  const options = [
    { id: 1, text: '開発者を探しています!' },
    { id: 2, text: '受託者を探しています!' },
    { id: 3, text: '新しいプロジェクトに参加したい!' },
    { id: 4, text: '経験豊富なメンバーを募集しています!' },
    { id: 5, text: 'その他の目的があります。' },
  ];

  // 選択肢をクリックしたときの動作
  const handleOptionClick = (text) => {
    setSelectedOption(text); // メッセージ内容を保存
  };

  // メッセージ送信処理
  const handleSendMessage = () => {
    if (!selectedOption) {
      alert('メッセージを選択してください。');
      return;
    }
    setMessages((prevMessages) => [
      ...prevMessages,
      { color: selectedColor, text: selectedOption },
    ]);
    setSelectedOption(''); // 選択内容をリセット
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>チャット画面</h1>

      {/* チャット枠 */}
      <div
        style={{
          margin: '20px 0',
          padding: '10px',
          width: 'auto',
          height: '300px',
          border: '1px solid #ccc',
          borderRadius: '5px',
          overflowY: 'scroll',
          background: '#f9f9f9',
        }}
      >
        {messages.length === 0 ? (
          <p style={{ color: '#888' }}>まだメッセージがありません。</p>
        ) : (
          messages.map((message, index) => (
            <div
              key={index}
              style={{
                padding: '10px',
                margin: '10px 0',
                borderRadius: '5px',
                background: message.color === 'blue' ? '#e0f7fa' : '#fff3e0',
              }}
            >
              <p>{message.text}</p>
            </div>
          ))
        )}
      </div>

      {/* 吹き出し色選択と送信ボタンを横並び */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <input
            type="radio"
            name="color"
            value="blue"
            checked={selectedColor === 'blue'}
            onChange={(e) => setSelectedColor(e.target.value)}
          />
          青色
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <input
            type="radio"
            name="color"
            value="yellow"
            checked={selectedColor === 'yellow'}
            onChange={(e) => setSelectedColor(e.target.value)}
          />
          黄色
        </label>
        <button
          onClick={handleSendMessage}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
            border: '1px solid #ccc',
            borderRadius: '5px',
            background: '#4caf50',
            color: 'white',
            flexShrink: 0,
          }}
        >
          メッセージを送信
        </button>
      </div>

      {/* 選択肢のリストを横並びで表示 */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => handleOptionClick(option.text)}
            style={{
              padding: '10px',
              fontSize: '16px',
              cursor: 'pointer',
              border: '1px solid #ccc',
              borderRadius: '5px',
              background: selectedOption === option.text ? '#d1c4e9' : '#f9f9f9',
              transition: 'background 0.3s',
              flex: '1 1 calc(20% - 10px)', // ボタンを均等に配置
              textAlign: 'center',
            }}
          >
            {option.text}
          </button>
        ))}
      </div>
      <h1>　</h1>

    </div>
  );
};

export default ChatProgram;

/*

//自分が会話したことのあるユーザーのIDを全て取ってくるフェチ
//会話したことのあるユーザーとの会話履歴をとって切る時のフェチ
//松岡修造の言葉を持ってくるフェチ
//送信フェチ

*/