import React from 'react';
import MainContainer from '../../component/Main_container/Main_container'; // MainContainerをインポート
import IMAGE1 from './images/仮画像1.png'; // 画像のパス

// ーーーー登録情報データベースから読み込むーーーー
export const Registration_Data = () => {
  return [
    { ユーザーネーム: "AA", パスワード: "", メールアドレス: "", 応募相手: "いない", 募集相手: "", 米ポイント: 100 },
    { ユーザーネーム: "BB", パスワード: "B", メールアドレス: "B", 応募相手: "いない", 募集相手: "", 米ポイント: 50 },
    { ユーザーネーム: "CC", パスワード: "C", メールアドレス: "C", 応募相手: "いない", 募集相手: "", 米ポイント: 80 },
    { ユーザーネーム: "DD", パスワード: "D", メールアドレス: "D", 応募相手: "いない", 募集相手: "", 米ポイント: 200 }
  ];
};

// ーーーーランキングコンポーネントーーーー
const Ranking = () => {
  // 登録情報データを取得
  const usersData = Registration_Data();

  // 米ポイントを基準に降順にソート
  const sortedUsers = usersData.sort((a, b) => b.米ポイント - a.米ポイント);

  // メインコンテナに渡すデータを定義
  const layoutData = sortedUsers.map((user, index) => (
  {
    text: `${user.ユーザーネーム}さん!  米ポイント: ${user.米ポイント}`, // ボタンテキストにユーザー名と米ポイント
    onClick: () => console.log(`${user.ユーザーネーム}の詳細を見る`),
    text: `ランキング順位: ${index + 1}の${user.ユーザーネーム}さん!  米ポイント: ${user.米ポイント}です!!`,
    textSize: 5,
    imageSrc: IMAGE1
  }));

  return (
    <div>
      <h1>ランキング画面</h1>
      <h2>米ポイントランキング</h2>

      {/* MainContainerコンポーネントを使って、layoutDataを渡す */}
      <MainContainer layoutData={layoutData} />
    </div>
  );
};

export default Ranking;
