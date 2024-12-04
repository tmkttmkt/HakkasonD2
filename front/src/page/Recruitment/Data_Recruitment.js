import { fetchRecruitmentData,my_Registration_Data } from '../../component/Data/Data';

// 自分の登録データを管理する関数
export const my_Recruitment = async () => 
{
  // 登録情報管理しているデータベースを開き、データを追加する処理を実装
  const userData = await my_Registration_Data(); // 自分の登録情報取得👈これまだ作り途中の関数だから！！！！！！！！！！！！！
  const newRecruitment = 
  {
    username: "○○",
    text: "こんにちは！あたしのサイト作ってよ！ばか！",
    person_looking_for: "受託者",
    mail_address: "aaaaa"
  };

  // 新しいデータを募集状況データベースに追加
  console.log(`新しい募集データを追加: ${JSON.stringify(newRecruitment)}`);

  // 自分の登録情報の応募相手欄を「いない」に変更
  await updateMyData(userData[0].メールアドレス, "いない");

  // 追加したデータを返す
  return newRecruitment;
};

// my_Application 内で my_RecruitmentData の呼び出しを修正
export const my_Application = async (recruit, myRecruitmentData) => 
{
  const recruitmentData = await fetchRecruitmentData(); // データを取得
  const appliedUserEmail = recruit.mail_address;
  const userData = await my_Recruitment(); // 修正: my_RecruitmentData -> my_Recruitment
  const userEmail = userData[0].メールアドレス;
  await updateMyData(userEmail, appliedUserEmail); // 自分のデータを更新
  await updateRecruitmentData(appliedUserEmail, userEmail); // 応募先のデータを更新
};
// 募集状況データ更新関数
const updateRecruitmentData = async (applicantEmail, userEmail) => {
  // データベースにアクセスして応募先のデータを更新
  console.log(`募集データ更新: 応募相手の欄を ${userEmail} に変更`);
  // 実際のDB操作コード（例: FirebaseやSQLなど）を記述
};

// 自分のデータ更新関数
const updateMyData = async (userEmail, applicantEmail) => {
  // ユーザーのデータベースを開き、募集相手欄を更新
  console.log(`自分のデータ更新: 募集相手の欄を ${applicantEmail} に変更`);
  // 実際のDB操作コード（例: FirebaseやSQLなど）を記述
};

/*
export const my_Application=async()=>//応募した際に相手の登録データを開いて相手の応募相手の欄を「自分のメールアドレス」に変更し、自分の募集相手の欄を「相手のメールアドレス」に変更
{
//この関数で必要な処理5つ
//募集状況管理しているデータベース開くーー処理1
//開いたデータベースから自分が応募した人のメールアドレスを取得ーー処理2
//全userの登録情報が入ったデータベースから、取得したメールアドレスと同じメールアドレスを保持するユーザーテーブル取得ーー処理3
//取得したテーブル内の、応募相手の欄を「自分のメールアドレス」に変更する。ーー処理4
//自分のメールアドレスから、自分の登録情報の記録が載っているテーブルの募集相手の欄を「相手のメールアドレス」に変更ーー処理5
}

export const my_Recruitment=async()=>
{
  //この関数で必要な処理4つ
  //登録情報管理しているデータベース開くーー処理1
  //開いたデータベースの中から取得した自分のテーブルの内容取得ーー処理2
  //募集を開始した瞬間募集欄に募集状況管理しているデータベースに新しくデータを追加ーー処理3
  // ┗--→追加テーブルの例{ username: "○○", text: "こんにちは！あたしのサイト作ってよ！ばか！", person_looking_for: "受託者" ,mail_address:"aaaaa"},
  //自分の登録データの応募相手の欄を「いない」に変更する処理ーー処理4
}
//登録されているデータからマッチング相手がいるかを探す
*/

//ーーー捕捉ーーー
  //募集相手の欄:
  //応募をそもそもしていないばあい「""」が入る
  //応募をした場合「"募集者のメールアドレス"」が入る
  
  //応募相手の欄:
  //募集をそもそもしていないばあい「""」が入る
  //募集したさい「"いない"」が入る
  //募集して誰かが応募した際「"応募した人のメールアドレス"」が入る


  //それぞれの人
  //chat後、米ポイントが足りなかったら募集欄、応募欄ともに「""」になる。
 
  //