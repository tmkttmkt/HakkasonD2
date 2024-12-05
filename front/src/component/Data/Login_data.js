import React, { useState, useEffect } from 'react';

function Login_data({ take_address }) {
    const [mail, setMail] = useState('');
    const [recruitmentData, setRecruitmentData] = useState(null); // データの保存用
    const [error, setError] = useState(null); // エラーメッセージを保存するための状態

    // mailが変更されるたびに非同期データを取得
    useEffect(() => {
        const loadData = async () => {
            if (mail) { // mailが空でない場合のみデータを取得
                try {
                    const data = await fetchRecruitmentData(mail);
                    setRecruitmentData(data); // データを状態にセット
                    console.log(data); // 取得したデータを表示
                } catch (error) {
                    setError(error.message); // エラーメッセージを状態にセット
                }
            }
        };

        loadData(); // mailが更新される度にデータを取得
    }, [mail]); // mailが変更されるたびに実行

    // fetchRecruitmentData関数をコンポーネント内部に定義
    const fetchRecruitmentData = async (email) => {
        try {
            const response = await fetch(`/api/recruitment?email=${email}`);
            if (!response.ok) {
                throw new Error('データの取得に失敗しました');
            }
            const data = await response.json();
            return data; // 取得したデータを返す
        } catch (error) {
            console.error("データ取得に失敗しました:", error);
            throw error; // エラーを再度スローしてエラーハンドリングを行う
        }
    };

    return (
        <div>
            <h3>現在のメールアドレス: {mail}</h3>
            {error && <p style={{ color: 'red' }}>エラー: {error}</p>} {/* エラーがあれば表示 */}
            {recruitmentData && (
                <div>
                    <h4>取得した募集データ:</h4>
                    <pre>{JSON.stringify(recruitmentData, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}

export default Login_data;
