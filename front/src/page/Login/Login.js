import React, { useState } from 'react';
import Side_button from '../../component/Main_container/Side_button/Side_button';
import Login_data from '../../component/Data/Login_data'; // Address_Data コンポーネントをインポート
import './Login.css';

function Login({ setCurrentPage }) {
    const [inputText, setInputText] = useState({ password: "", mail_address: "" });
    const [OK_or_NO_text, OK_or_NO_draw] = useState("");
    const [loginAddress, setLoginAddress] = useState(""); // ログイン後のアドレスを state として保持

    const Login_email = "", Login_password = ""; // ログインする際のアドレスとパスワード

    // 入力変更ハンドラー
    const handleInputChange = (event) => {
        const { name, value } = event.target; // 入力要素の name と value を取得
        setInputText((prevState) => ({
            ...prevState, // 既存の state を保持
            [name]: value // 対応するプロパティを更新
        }));
    };

    // ログイン認証処理
    const access = (email, password) => {
        if (Login_email === email && Login_password === password) {
            OK_or_NO_draw("");
            setCurrentPage("profile"); // ログイン成功後、profileページに遷移
            // Address_Data コンポーネントでアドレス情報を管理
            setLoginAddress(email);  // ログイン時にemailを親コンポーネントに渡す
        } else 
        {
            OK_or_NO_draw("パスワード、またはメールアドレスが間違っています");
        }
    };

    const handleClick = () => {
        setCurrentPage("account"); // アカウント作成画面へ遷移
    };

    return (
        <div className="login-container">
            <h1>開発者により具体的に我々の作って欲しいホームページを届けよう</h1>
            <h2>メールアドレスを入力してください</h2>
            <input
                type="email" // メールアドレス入力フィールド
                name="mail_address" // フィールド名を指定
                value={inputText.mail_address}
                onChange={handleInputChange}
                placeholder="ここにメールアドレスを入力"
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

            <Side_button
                Button_text="ログイン開始！"
                button_position="center"
                onClick={() => { access(inputText.mail_address, inputText.password); }}
            />

            <a href="#" onClick={handleClick}>アカウントを持っていない方はここをクリック</a>

            <p>入力されたメールアドレス(テストプレイ用で表示): {inputText.mail_address}</p>
            <p>入力されたパスワード(テストプレイ用で表示): {inputText.password}</p>


            {/* ログイン後のアドレスを表示 */}
            <p>現在のログインアドレス: {loginAddress}</p>
        </div>
    );
}

export default Login;
