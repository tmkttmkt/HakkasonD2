import React, { useState } from 'react';
import Side_button from '../../component/Main_container/Side_button/Side_button';
import './Login.css';
function func(){
  let url=process.env.REACT_APP_BACKEND_URL+"/login";
  console.log(url);
  fetch(url)
  .then((response) => {
    if (!response.ok) {
      throw new Error("データ取得に失敗しました");
    }
    return response;  // ここで Promise を返す
  })
  .then((data) => {
    console.log(data.json());  // JSONデータがここに来る
  })
  .catch((error) => {
    console.error("エラー:", error);
  });
}
function Login({ setCurrentPage,set_login_address}) 
{
  const [inputText, setInputText] = useState({ password: "", mail_address: "" });
  const [OK_or_NO_text, OK_or_NO_draw] = useState("");
  const Login_email = "", Login_password = ""; // ログインする際のアドレスとパスワード
    // 入力変更ハンドラー
  const handleInputChange = (event) => {
    const { name, value } = event.target; // 入力要素の name と value を取得
    setInputText((prevState) => ({
      ...prevState, // 既存の state を保持
      [name]: value // 対応するプロパティを更新
    }));
  };
  async function getpass(mail, password)
  {
    //ーーーーURLのデーターーー
    let ret=false;
    let postdata=
    {
      method: 'POST', // リクエストの種類を指定()
      headers:
      {
        'Content-Type': 'application/json' // データ形式を指定
      },
      // body:の所では、データーべ―スにデータ送信しようとしているデータをデータベースに送信が可能なJSON文字列という形式に変更している。
      body: JSON.stringify({id:mail,pass:password})// 送信するデータをJSON文字列に変換
    }//postdataでHTTPリクエストを送るためのデータを管理している。
    let url=process.env.REACT_APP_BACKEND_URL+"/login";//
    console.log(url,postdata);
    //ーーーーーーーーーーーーー
    await fetch(url,postdata)//データベース送信、ボール投げる
    .then((response) => //ボールcatch時に起動　fetchの返り値が入る(response)
    {
      if (!response.ok) {throw new Error("データ取得に失敗しました");}
      return response.json();//
    })
    .then((data) => //response.json();の関数起動時の返り値が(data)に入る
    {
      console.log(data)
      ret=data.success
    })
    .catch((error) => {console.error("エラー:", error);})//エラー対処処理
    return ret
  }
  // ログイン認証処理
  const access = async(email, password) => {
    let flg=await getpass(email, password);
    console.log(flg)
    if (flg)
    {
      OK_or_NO_draw("");
      set_login_address(email);
      setCurrentPage("profile"); // ログイン成功後、profileページに遷移
    } else {
      OK_or_NO_draw("パスワード、またはユーザーIDが間違っています");
    }
  };

  const handleClick = () => 
  {
    setCurrentPage("account"); // ログイン成功後、profileページに遷移
    // ここに実際に行いたい処理を追加
  };

  return (
    <div className="login-container">
      <h1>開発者により具体的に我々の作って欲しいホームページを届けよう</h1>
      <h2>ユーザーIDを入力してください</h2>
      <input
        type="email" // ユーザーID入力フィールド
        name="mail_address" // フィールド名を指定
        value={inputText.mail_address}
        onChange={handleInputChange}
        placeholder="ここにユーザーIDを入力"
      />

      <h2>パスワードを入力してください</h2>
      <input
        type="password" // パスワード入力フィールド
        name="password" // フィールド名を指定
        value={inputText.password}
        onChange={handleInputChange}
        placeholder="ここにパスワードを入力"
      />
      <p className='error'>{OK_or_NO_text}</p>
      {/* クリック時に、入力されたメールアドレスとパスワードを引数として渡す */}
      <Side_button
        Button_text="ログイン開始！"
        button_position="center"
        onClick={() => { access(inputText.mail_address, inputText.password); }}
      />
      {/* アカウント作成画面へのリンク */}
      <a href="#" onClick={handleClick}>アカウントを持っていない方はここをクリック</a>
    </div>
  );
}

export default Login;
