import React, { useState } from "react";
const Data_communication = async () => 
{
    // 仮データ（APIから取得する場合はfetchを利用）
    return [
      { username: 'communicationボタン1', text: 'こんにちは！' },
      { username: 'Bob', text: 'こんばんは！' },
      { username: 'Charlie', text: 'おはようございます！' }
    ];//このreturnで返しているリスト内に応募した人のユーザーネームと、その人が書いたメッセージデータが来ればOK
};  
export default Data_communication;
/*
const Data_communication = async () => 
    {
        
      try 
      {
        // バックエンドAPIのエンドポイントURL（例: http://localhost:5000/messages）
        const response = await fetch("http://localhost:5000/messages");
        if (!response.ok)throw new Error("データの取得に失敗しました");
        // JSON形式でデータを取得
        let data = await response.json();
        // 取得したデータをそのまま返す
        return data; // 例: [{ username: 'Alice', text: 'こんにちは！' }, ...]
      } 
      catch (error)// 
      {
        console.error("エラー:", error);
        return []; // エラー時は空配列を返す
      }
    };
  */