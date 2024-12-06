import React, { useState } from 'react';
import Side_button from '../../component/Main_container/Side_button/Side_button';

function Account({ setCurrentPage }) {
  const [form, setForm] = useState({ name: "", mail: "", password: "" });
  const [errors, setErrors] = useState({ name: "", mail: "", password: "" });

  // 入力変更時に状態を更新する関数
  const handleChange = (e) => 
  {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // 入力のバリデーションを行う関数
  const validateForm = () => 
  {
    let valid = true;
    let newErrors = { name: "", mail: "", password: "" };

    // 名前のバリデーション
    if (form.name.length < 6) 
    {
      newErrors.name = "名前は6文字以上で入力してください";
      valid = false;
    }

    // メールアドレスのバリデーション
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(form.mail)) 
    {
      newErrors.mail = "有効なメールアドレスを入力してください";
      valid = false;
    }

    // パスワードのバリデーション
    if (form.password.length < 6) 
    {
      newErrors.password = "パスワードは6文字以上で入力してください";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // バックエンドとの通信
  const addpass = async () => 
  {
    const postdata = 
    {
      method: 'POST',
      headers: 
      {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: form.name, id: form.mail, pass: form.password }),
    };

    const url = process.env.REACT_APP_BACKEND_URL + "/account";
    console.log(url, postdata);

    try 
    {
      const response = await fetch(url, postdata);
      if (!response.ok) 
      {
        const errorData = await response.json();
        throw new Error(errorData.message || "アカウント作成に失敗しました");
      }
      const data = await response.json();
      console.log(data);
      return data.success;
    } 
    catch (error) 
    {
      console.error("エラー:", error);
      alert(
        error.message.includes("NetworkError")
          ? "ネットワークエラーが発生しました。インターネット接続を確認してください。"
          : `アカウント作成に失敗しました: ${error.message}`
      );
      return false;
    }
  };

  // アカウント作成処理
  const Make_Account_end = async () => 
  {
    if (validateForm()) 
    {
      try 
      {
        const success = await addpass();//
        if (success) 
        {
          alert("アカウント作成に成功しました！");
          setForm({ name: "", mail: "", password: "" });
          setCurrentPage('profile');
        } 
        else 
        {
          alert("アカウント作成に失敗しました");
        }
      } 
      catch (error) 
      {
        console.error("アカウント作成中にエラー:", error);
        alert("予期しないエラーが発生しました。もう一度お試しください。");
      }
    }
  };//ーーーーーーーーーーーーーーーーーーーーーーー

  // ログイン画面に戻る
  const Return_to_login_screen = () => 
  {
    setCurrentPage('login');
  };

  return (
    <div>
      <h1>アカウント設定</h1>
      
      {/* 名前の入力 */}
      <div>
        <label>名前: </label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
        {errors.name && <div style={{ color: "red" }}>{errors.name}</div>}
      </div>

      {/* メールアドレスの入力 */}
      <div>
        <label>メールアドレス: </label>
        <input
          type="email"
          name="mail"
          value={form.mail}
          onChange={handleChange}
        />
        {errors.mail && <div style={{ color: "red" }}>{errors.mail}</div>}
      </div>

      {/* パスワードの入力 */}
      <div>
        <label>パスワード: </label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
        />
        {errors.password && <div style={{ color: "red" }}>{errors.password}</div>}
      </div>

      {/* 登録ボタン */}
      <Side_button
        Button_text="上記の内容でアカウント登録"
        button_position="center"
        onClick={Make_Account_end}
      />

      {/* ログイン画面に戻るリンク */}
      <a
        href="#"
        onClick={Return_to_login_screen}
        style={{
          display: 'block',
          textAlign: 'center',
          margin: '0 auto',
          width: 'fit-content',
        }}
      >
        ログイン画面に戻りたい場合はここをクリック
      </a>
    </div>
  );
}

export default Account;
