import React, { forwardRef, useImperativeHandle, useState } from 'react';

const Login_data = forwardRef((props, ref) => 
{
    const [loginAddress, setLoginAddress] = useState("");

    // 親コンポーネントからの関数呼び出しを可能にする
    useImperativeHandle(ref, () => ({
        setLoginAddress: (address) => {
            console.log("Login_data: setLoginAddress 実行", address); // デバッグ用
            setLoginAddress(address);
        },
    }));


});

export default Login_data;
