import React, { useState, useEffect } from 'react';

// 会話したことがある人を取得する関数
async function connect_people(login_address,p) {
  const postdata = {
    method: 'GET',
  };
  const url = `${process.env.REACT_APP_BACKEND_URL}/conversation/creator/${login_address}`;

  try {
    const response = await fetch(url, postdata);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'ユーザーリストの取得に失敗しました');
    }
    return await response.json();
  } catch (error) {
    console.error('APIエラー:', error.message);
    throw error;
  }
}

// 松岡修造の言葉を取得する関数
async function matuokafunc() {
  const postdata = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };
  const url = `${process.env.REACT_APP_BACKEND_URL}/conversation/matuoka/5`;

  try {
    const response = await fetch(url, postdata);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'データの取得に失敗しました');
    }
    const data = await response.json();
    return data.quotes || [];
  } catch (error) {
    console.error('APIエラー:', error.message);
    throw error;
  }
}

async function data_message(login) 
{
  const postdata = 
  {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    body:{login,}
  };
  const url = `${process.env.REACT_APP_BACKEND_URL}/conversation/one-on-one`;
  try {
    const response = await fetch(url, postdata);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'ユーザーリストの取得に失敗しました');
    }
    return await response.json();
  } catch (error) {
    console.error('APIエラー:', error.message);
    throw error;
  }
}

const Communication= ({login_address}) => {
  const [selectedUser, setSelectedUser] = useState(null); // 選択中のユーザー
  const [selectedColor, setSelectedColor] = useState('blue'); // 吹き出しの色
  const [messages, setMessages] = useState({}); // ユーザーごとのメッセージ履歴を管理
  const [selectedOption, setSelectedOption] = useState(''); // 選択肢データ
  const [words, setWords] = useState([]); // 松岡修造の言葉
  const [error, setError] = useState(null); // エラーメッセージ
  const [userTalk, setUserTalk] = useState([]); // 会話したことがある人のリスト
  const [message,set_message]=useState([]);

  // 会話したことがある人のリストをロード
  useEffect(() => 
  {
    const loadPeople = async () => {
      try {
        const response = await connect_people(login_address);
        console.log('レスポンス:', response);
        
        if (!response.ids || !Array.isArray(response.ids)) {
          throw new Error('レスポンスフォーマットが不正です');
        }
   
        const uniqueUsers = response.ids.map((id) => ({
          id: id,
          name: `User: ${id}`,
        }));
   
        setUserTalk(uniqueUsers);
      } catch (err) {
        console.error('ユーザーリスト取得エラー:', err);
        setError(err.message);
      }
   };
  
    loadPeople();
  }, [login_address]);
  
  useEffect(() => {
    const load_message = async () => {
      try {
        const message_take = await data_message(login_address,selectedUser); // 選択肢の言葉を取得
        set_message(message_take);
      } catch (err) 
      {
        setError(err.message);
      }
    };
    load_message ();
  }, []);

  // 松岡修造の言葉をロード
  useEffect(() => {
    const loadWords = async () => {
      try {
        const quotes = await matuokafunc(); // 選択肢の言葉を取得
        setWords(quotes);
      } catch (err) {
        setError(err.message);
      }
    };
    loadWords();
  }, [messages]);

  // ユーザー選択時の処理
  const handleUserClick = (userTalk) => {
    setSelectedUser(userTalk);
  };

  // 選択肢クリック時の処理
  const handleOptionClick = (optionText) => {
    setSelectedOption(optionText);
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
        {userTalk.length > 0 ? (
          userTalk.map((user) => (
            <div
              key={user.id}
              onClick={() => handleUserClick(user)}
              style={{
                padding: '10px',
                margin: '5px 0',
                cursor: 'pointer',
                backgroundColor: selectedUser?.id === user.id ? '#d1c4e9' : '#fff',
                borderRadius: '4px',
                transition: 'background 0.3s',
              }}
            >
              {user.name}
            </div>
          ))
        ) : (
          <div style={{ textAlign: 'center', color: '#888' }}>ユーザーがいません</div>
        )}
      </div>

      {/* 右側のチャットエリア */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* エラー表示 */}
        {error && (
          <div style={{ color: 'red', textAlign: 'center', marginBottom: '10px' }}>
            {error}
          </div>
        )}

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
  {selectedUser && messages[selectedUser.id] ? (
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
          {words.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(option)}
              style={{
                padding: '8px',
                cursor: 'pointer',
                background: selectedOption === option ? '#d1c4e9' : '#f9f9f9',
                border: '1px solid #ccc',
                borderRadius: '5px',
              }}
            >
              {option}
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
      </div>
    </div>
  );
};
export default Communication;