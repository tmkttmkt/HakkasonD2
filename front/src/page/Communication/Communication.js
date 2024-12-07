import React, { useState } from 'react';

// ユーザーリストデータ
//https://hycrcwksixagdnummgax.supabase.co
const users = 
[
  { id: 1, name: "ユーザーA" },
  { id: 2, name: "ユーザーB" },
  { id: 3, name: "ユーザーC" },
  { id: 4, name: "ユーザーD" },
  { id: 5, name: "ユーザーE" },
];

// 選択肢データ
const options = 
[
  { id: 1, text: '開発者を探しています!' },
  { id: 2, text: '受託者を探しています!' },
  { id: 3, text: '新しいプロジェクトに参加したい!' },
  { id: 4, text: '経験豊富なメンバーを募集しています!' },
  { id: 5, text: 'その他の目的があります。' },
];
async function matuokafunc()
{
  const postdata = 
  {
    method: 'GET',
    headers: {'Content-Type': 'application/json',},
  };
  const url = process.env.REACT_APP_BACKEND_URL + "/conversation"+"/matuoka"+"/5";
  const response = await fetch(url, postdata);//const response=await fetch(データベースのURL,ポストデータ(送信するまでの設定定めるやつ)
  if (!response.ok)//.okの結果として戻ってきたのがtrueだったら起動
  {
    const errorData = await response.json();//fetch関数に送られて帰ってきたデータ
    throw new Error(errorData.message || "アカウント作成に失敗しました");
  }
  const data = await response.json();//fetch関数に送られて帰ってきたデータ
  console.log(data);
  return data.quotes//
}

//ーーーーーバックとの通信プログラムの作り方ーーーーー
//手順1-  postdataというバックに送る信号の設定をオブジェクトを作成
//手順2-  const url = process.env.REACT_APP_BACKEND_URL + "/conversation"+"/matuoka"+"/5";などでデータベースのパス入った変数作成(送信先のURL)
//手順3- 「帰ってきたデータの参照ができる変数=fetch(データベースのパス入った変数, データベースに送る信号の設定を入れた変数名);」
//手順4- 「帰ってきたデータの参照ができる変数.○○」という感じにすることで帰ってきた信号を確かめることが可能。
//※ ○○の部分はバックエンドプログラムをコマンドプロンプトでnpm startで起動させて、その時出てきた{○○:情報}でカッコの中にある○○のことを言っている。○○と入力すると{○○:A}のAがわかる。
//バックエンドプログラムの内容を辞書型のように読み込むということ？

//a=await response.json();　帰ってくるデータが複数個あって 「.ok」や「.quotes」のデータとして帰ってきたデータを確認することが出来る。
const ChatProgram = () => {
  const [selectedUser, setSelectedUser] = useState(users[0]); // 選択中のユーザー
  const [selectedColor, setSelectedColor] = useState('blue'); // 吹き出しの色
  const [messages, setMessages] = useState({}); // ユーザーごとのメッセージ履歴を管理
  const [selectedOption, setSelectedOption] = useState(''); // 選択肢データ

  // ユーザー選択時の処理
  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  // 選択肢クリック時の処理
  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };
  // メッセージ送信処理
  const handleSendMessage = () => {
    if (!selectedOption) {
      alert('メッセージを選択してください');
      return;
    }

    const newMessage = {
      color: selectedColor,
      text: selectedOption,
    };

    setMessages((prevMessages) => ({
      ...prevMessages,
      [selectedUser.id]: [...(prevMessages[selectedUser.id] || []), newMessage],
    }));

    setSelectedOption(''); // 選択肢をリセット
  };

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'Arial, sans-serif' }}>
      {/* 左側ユーザーリスト */}
      <div
        style={{
          width: '250px',
          borderRight: '1px solid #ccc',
          padding: '10px',
          overflowY: 'auto',
          background: '#f4f4f4',
        }}
      >
        <h3 style={{ textAlign: 'center' }}>ユーザーリスト</h3>
        {users.map((user) => (
          <div
            key={user.id}
            onClick={() => handleUserClick(user)}
            style={{
              padding: '10px',
              margin: '5px 0',
              cursor: 'pointer',
              backgroundColor: selectedUser.id === user.id ? '#d1c4e9' : '#fff',
              borderRadius: '4px',
              transition: 'background 0.3s',
            }}
          >
            {user.name}
          </div>
        ))}
      </div>

      {/* 右側のチャットエリア */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* チャット表示領域 */}
        <div
          style={{
            flex: 1,
            margin: '10px',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            overflowY: 'auto',
            background: '#f9f9f9',
          }}
        >
          {messages[selectedUser.id] ? (
            messages[selectedUser.id].map((msg, index) => (
              <div
                key={index}
                style={{
                  padding: '8px',
                  margin: '5px 0',
                  borderRadius: '5px',
                  background: msg.color === 'blue' ? '#e0f7fa' : '#fff3e0',
                }}
              >
                {msg.text}
              </div>
            ))
          ) : (
            <div style={{ color: '#888' }}>メッセージがありません。</div>
          )}
        </div>

        {/* 選択肢エリア */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleOptionClick(option.text)}
              style={{
                padding: '8px',
                cursor: 'pointer',
                background: selectedOption === option.text ? '#d1c4e9' : '#f9f9f9',
                border: '1px solid #ccc',
                borderRadius: '5px',
              }}
            >
              {option.text}
            </button>
          ))}
        </div>

        {/* 吹き出し色選択と送信ボタン */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
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
              cursor: 'pointer',
              border: '1px solid #ccc',
              borderRadius: '5px',
              background: '#4caf50',
              color: 'white',
            }}
          >
            送信
          </button>
        </div>
        <h1>　　</h1>
      </div>
    </div>
  );
};

export default ChatProgram;



//自分が会話したことのあるユーザーのIDを全て取ってくるフェチ
//会話したことのあるユーザーとの会話履歴をとって切る時のフェチ
//松岡修造の言葉を持ってくるフェチ
//送信フェチ
