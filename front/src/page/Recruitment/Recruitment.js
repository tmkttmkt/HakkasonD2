import React, { useState, useEffect } from 'react';
import MainContainer from '../../component/Main_container/Main_container';
import IMAGE1 from './images/Shuzo_Matsuoka.jpg';
import {my_Application,my_Recruitment} from './Data_Recruitment';//募集処理関数と応募処理関数import
import { fetchRecruitmentData, Registration_Data } from '../../component/Data/Data';//登録データと募集状況データ取得関数

const Recruitment = () => 
{
  const [recruitmentInput, setRecruitmentInput] = useState({
    recruitment_message: '',
    Developer_or_trustee: '開発者探す',
  });

  const [recruitmentData, setRecruitmentData] = useState([]);
  const [myRecruitmentData, setMyRecruitmentData] = useState([]); // 修正: My_recruitmentData -> myRecruitmentData

  // 初期データの取得
  useEffect(() => {
    const loadData = async () => 
    {
      const data = await fetchRecruitmentData(); // 募集状況データの読み込み
      setRecruitmentData(data); // 全体の募集状況データを読み込み
      const data2 = await Registration_Data(); // 自分の登録データの読み込み
      setMyRecruitmentData(data2); // 自分の登録データを設定
    };
    loadData();
  }, []);

  // 入力内容の変更
  const handleTextChange = (newValue) => 
  {
    setRecruitmentInput((prev) => ({ ...prev, recruitment_message: newValue }));
  };

  const handleDeveloperOrTrusteeChange = (newValue) => 
  {
    setRecruitmentInput((prev) => ({ ...prev, Developer_or_trustee: newValue }));
  };

  const selectOptions = [
    { text: '開発者を探しています!', onSelect: () => handleDeveloperOrTrusteeChange('開発者探す') },
    { text: '受託者を探しています!', onSelect: () => handleDeveloperOrTrusteeChange('受託者探す') },
  ];

  const developerData = recruitmentData.filter((recruit) => recruit.person_looking_for === '開発者');
  const trusteeData = recruitmentData.filter((recruit) => recruit.person_looking_for === '受託者');

  // メインコンテナ内の設計の設定
  const layoutData = [
    { text: '募集メッセージ入力欄', textSize: 8 },
    { line_color: 'gray', line_thickness: '3px', line_width: '100%' },
    { selectOptions, select_input_text: '応募の種類を選択してください→' },
    { onTextChange: handleTextChange },
    {
      sideButtonPosition: 'left',
      buttonText: '上記の内容で募集を投稿する！',
      onClick: () => {
        my_Recruitment(recruitmentInput); // 募集の投稿処理
      },
    },
    { line_color: 'gray', line_thickness: '5px', line_width: '100%' },
    { text: '受託者募集一覧', textSize: 8 },
    ...developerData.flatMap((recruit, index) => [
      {
        sideButtonPosition: index % 3 === 0 ? 'left' : index % 3 === 1 ? 'right' : 'center',
        buttonText: `この人の募集に応募する！`,
        onClick: () => my_Application(recruit, myRecruitmentData), // 修正: My_recruitmentData -> myRecruitmentData
        text: `${recruit.person_looking_for}の${recruit.username} さん:「${recruit.text}」`,
        imageSrc: IMAGE1,
      },
      {
        line_color: 'green', // 緑色の線を追加
        line_thickness: '1px',
        line_width: '100%',
      },
    ]),
    { line_color: 'gray', line_thickness: '5px', line_width: '100%' },
    { text: '開発者募集一覧', textSize: 8 },
    ...trusteeData.flatMap((recruit, index) => [
      {
        sideButtonPosition: index % 3 === 0 ? 'left' : index % 3 === 1 ? 'right' : 'center',
        buttonText: `この人の募集に応募する！`,
        onClick: () => my_Application(recruit, myRecruitmentData), // 修正: My_recruitmentData -> myRecruitmentData
        text: `${recruit.person_looking_for}の${recruit.username} さん:「${recruit.text}」`,
        imageSrc: IMAGE1,
      },
      {
        line_color: 'green', // 緑色の線を追加
        line_thickness: '1px',
        line_width: '100%',
      },
    ]),
    
  ];
  return (
    <div>
      <h1>募集画面</h1>
      <MainContainer layoutData={layoutData} recruitmentMessage={recruitmentInput.recruitment_message} handleTextChange={handleTextChange} />
      <div style={{ marginTop: '20px' }}>
      </div>
    </div>
  );
};
export default Recruitment;