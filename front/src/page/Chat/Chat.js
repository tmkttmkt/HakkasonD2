import React from 'react';

const Chat = ({ setCurrentPage }) => 
{
  return (
    <div>
      <h1>Chat画面</h1>
      <button onClick={() => setCurrentPage("communication")}>
        プロフィール画面へ戻る
      </button>
    </div>
  );
};

export default Chat;
