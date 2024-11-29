import React, { useState, useImperativeHandle, forwardRef, useEffect } from "react";
//「ref」で親コンポーネントから活用可能な関数コンポーネントの作成
const Data_login = forwardRef(({ fetchUrl }, ref) => 
{
  const [email, setEmail] = useState(""); // 初期値
  const [password, setPassword] = useState(""); // 初期値
  const [loading, setLoading] = useState(false); // ローディング状態
  // refで親コンポーネントから活用可能な関数作成
  useImperativeHandle(ref, () => (
  {
    getEmail: () => email,
    getPassword: () => password,
  }));

  // 初回レンダリング時にバックエンドからデータを取得
  useEffect(() => 
  {
    if (fetchUrl) 
    {
      setLoading(true);
      fetch(fetchUrl)
        .then((response) => 
        {
          if (!response.ok) {throw new Error("データ取得に失敗しました");}
          return response.json();
        })
        .then((data) => 
        {
          setEmail(data.email || ""); // 取得したメールアドレスを設定
          setPassword(data.password || ""); // 取得したパスワードを設定
        })
        .catch((error) => {console.error("エラー:", error);})
        .finally(() => {setLoading(false);});
    }
  }, [fetchUrl]);

  return (
    <div>
      <h2>ログイン情報</h2>
    {
      loading ? (<p>データをロード中...</p>) :
      (
        <div>
          <div>
            <label>メールアドレス: </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label>パスワード: </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
      )
    }
    </div>
  );
});
export default Data_login;