import React, { useState } from 'react';
async function send_message(login_address,user) 
{
  const postdata = 
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  };
  const url = `${process.env.REACT_APP_BACKEND_URL}/conversation`;

  try 
  {
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
export default send_message;