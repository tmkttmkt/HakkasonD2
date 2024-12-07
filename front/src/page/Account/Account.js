import React, { useState } from 'react';

function Account({ setCurrentPage }) {
  const [form, setForm] = useState({ name: "", mail: "", password: "" });
  const [errors, setErrors] = useState({ name: "", mail: "", password: "" });
  const [messages, setMessages] = useState([]); // 投稿されたメッセージを保存
  const [currentUser, setCurrentUser] = useState("User A"); // 現在の投稿者を切り替える

  // 入力変更時に状態を更新する関数
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // 入力のバリデーションを行う関数
  const validateForm = () => {
    let valid = true;
    let newErrors = { name: "", mail: "", password: "" };

    if (form.name.length < 6) {
      newErrors.name = "名前は6文字以上で入力してください";
      valid = false;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(form.mail)) {
      newErrors.mail = "有効なメールアドレスを入力してください";
      valid = false;
    }

    if (form.password.length < 6) {
      newErrors.password = "パスワードは6文字以上で入力してください";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // バックエンドとの通信
  const addpass = async () => {
    const postdata = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user: form.name, id: form.mail, pass: form.password }),
    };

    const url = process.env.REACT_APP_BACKEND_URL + "/account";

    try {
      const response = await fetch(url, postdata);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "アカウント作成に失敗しました");
      }
      const data = await response.json();
      return data.success;
    } catch (error) {
      alert(error.message.includes("NetworkError")
        ? "ネットワークエラーが発生しました。インターネット接続を確認してください。"
        : `アカウント作成に失敗しました: ${error.message}`);
      return false;
    }
  };

  // メッセージを追加する関数
  const addMessage = () => {
    if (!form.name.trim()) return;
    setMessages((prev) => [...prev, { user: currentUser, text: form.name }]);
    setCurrentUser(currentUser === "User A" ? "User B" : "User A"); // ユーザーを切り替え
    setForm((prev) => ({ ...prev, name: "" })); // 入力をクリア
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>アカウント設定</h1>

      {/* チャット枠 */}
      <div
        style={{
          margin: '20px 0',
          padding: '10px',
          width: '100%',
          maxWidth: '400px',
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
                background: currentUser === "User A" ? '#e0f7fa' : '#fff3e0',
              }}
            >
              <strong>{message.user}</strong>
              <p>{message.text}</p>
            </div>
          ))
        )}
      </div>

      {/* 名前の入力 */}
      <div>
        <label>セリフを入力してください: </label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
        <button onClick={addMessage} style={{ marginLeft: '10px' }}>
          投稿
        </button>
      </div>

      {/* バリデーションエラーの表示 */}
      {errors.name && <div style={{ color: "red" }}>{errors.name}</div>}

      {/* 登録ボタン */}
      <button onClick={validateForm}>登録</button>
    </div>
  );
}

export default Account;
