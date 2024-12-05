// EmailContext.js
//このプログラムは親コンポーネント同士でデータのやり取りを行うための仲介プログラム
import React, { createContext, useState, useContext } from 'react';

// Contextを作成
const EmailContext = createContext();

// Contextプロバイダーを作成
export const EmailProvider = ({ children }) => {
    const [email, setEmail] = useState('');

    return (
        <EmailContext.Provider value={{ email, setEmail }}>
            {children}
        </EmailContext.Provider>
    );
};

// EmailContextのカスタムフックを作成
export const useEmail = () => {
    return useContext(EmailContext);
};
