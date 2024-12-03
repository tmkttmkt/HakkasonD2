import React, { useState, useEffect } from 'react';

function Data_account({ formData }) 
{
  const [responseMessage, setResponseMessage] = useState('');
  // データ送信処理
  useEffect(() => 
  {
    if (formData.username && formData.email && formData.password) 
    {
      const sendData = async () => {
        try 
        {
          const response = await fetch('http://localhost:5000/create-account', 
          {
            method: 'POST',
            headers: 
            {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData), // フォームデータをJSON形式で送信
          });
          if (!response.ok)throw new Error('アカウント作成に失敗しました');
          const result = await response.json(); // レスポンスをJSONとして取得
          setResponseMessage(result.message); // 成功メッセージをセット
        } 
        catch (error) 
        {
          console.error('エラー:', error);
          setResponseMessage('エラーが発生しました');
        }
      };
      sendData();
    }
  }, [formData]); // formData が変更されるたびにバックエンドに送信
  return (
    <div>{responseMessage && <p>{responseMessage}</p>}</div>
  );
}
export default Data_account;