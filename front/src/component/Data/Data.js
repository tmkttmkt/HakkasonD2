// Data_Recruitment.js


export const fetchRecruitmentData = async () => //募集状況を管理するデータベースの内容をすべて取得する関数
{
    return [
      { username: "○○", text: "こんにちは！あたしのサイト作ってよ！ばか！", person_looking_for: "受託者", mail_address: "aaaaa" },
      { username: "××", text: "こんばんは！サイト作ればか！", person_looking_for: "開発者", mail_address: "ddddd" },
      { username: "△△", text: "おはようございます！誰か私にオリジナルサイトを作ってくれないでしょうか？", person_looking_for: "受託者", mail_address: "bbbb" },
      { username: "□□", text: "昼過ぎに連絡します！貴方がほしいアプリを完璧に作って見せます", person_looking_for: "開発者", mail_address: "cccc" }
    ];
};
  
export const Registration_Data = async () => //登録情報が入ったデータベースのデータすべて取得する関数
{
    return [
      { ユーザーネーム: "AA", パスワード: "", メールアドレス: "", 応募相手: "いない", 募集相手: "" },
      { ユーザーネーム: "BB", パスワード: "B", メールアドレス: "B", 応募相手: "いない", 募集相手: "" },
      { ユーザーネーム: "CC", パスワード: "C", メールアドレス: "C", 応募相手: "いない", 募集相手: "" },
      { ユーザーネーム: "DD", パスワード: "D", メールアドレス: "username123456789012345678901234567890123456789012345678901234567890@example.comaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa@bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb.com", 応募相手: "いない", 募集相手: "" }
    ];
};

export const my_Registration_Data= async () => //メールアドレス情報を基に登録情報保存されたデータベース内の一部テーブルを取得する関数
{
    return [];
}

