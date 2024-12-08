import React, { useState, useEffect } from 'react';
import AWS from 'aws-sdk';

const Production = () => {
  const [s3Data, setS3Data] = useState([]); // S3から取得したデータを保存
  const [isLoading, setIsLoading] = useState(true); // ロード状態を管理
  const [error, setError] = useState(null); // エラー状態を管理

  // AWS S3クライアントの設定
  useEffect(() => {
    const s3 = new AWS.S3({
      accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID, // IAMユーザーのアクセスキー
      secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY, // IAMユーザーのシークレットキー
      region: 'us-west-2' // S3バケットのリージョン例: 'ap-northeast-1' (東京)
    });

    const params = {
      Bucket: 'my-bucket-20241207', // バケット名を入力
      Prefix: '' // フォルダのパスが必要なら記入（ない場合は空の文字列）
    };

    // S3からオブジェクトリストを取得
    s3.listObjectsV2(params, async (err, data) => {
      if (err) {
        setError('データの取得中にエラーが発生しました: ' + err.message);
        console.error(err);
        setIsLoading(false);
      } else {
        const fetchedData = await Promise.all(
          data.Contents.map(async (item) => {
            const fileUrl = s3.getSignedUrl('getObject', {
              Bucket: params.Bucket,
              Key: item.Key,
              Expires: 60 // URLの有効期限（秒）
            });

            const response = await fetch(fileUrl);
            const contentType = response.headers.get('Content-Type');

            if (contentType.startsWith('text/')) {
              const textContent = await response.text();
              return { type: 'text', content: textContent, key: item.Key };
            } else if (contentType.startsWith('image/')) {
              return { type: 'image', content: fileUrl, key: item.Key };
            } else {
              return { type: 'unknown', content: '', key: item.Key };
            }
          })
        );

        setS3Data(fetchedData);
        setIsLoading(false);
      }
    });
  }, []);

  return (
    <div style={styles.container}>
      <h1>制作物画面です(仮配置)</h1>
      {isLoading && <p>データをロード中...</p>} {/* ロード中の表示 */}
      {error && <p style={styles.errorMessage}>{error}</p>} {/* エラーの表示 */}
      {!isLoading && !error && (
        <div style={styles.dataContainer}>
          {s3Data.map((data, index) => (
            <div key={index} style={styles.dataItem}>
              <p>{index + 1}.</p> {/* 各制作物の番号を追加 */}
              {data.type === 'image' && (
                <img src={data.content} alt={`Image ${index + 1}`} style={styles.image} />
              )}
              {data.type === 'text' && (
                <pre style={styles.text}>{data.content}</pre>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// CSSをインラインで定義
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    minHeight: '100vh',
    margin: '0',
    padding: '0',
  },
  errorMessage: {
    color: 'red',
    fontWeight: 'bold',
  },
  dataContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '20px',
    width: '100%',
    maxWidth: '800px',
    margin: '0 auto',
  },
  dataItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    maxWidth: '100%',
  },
  image: {
    width: '300px', // 画像の幅を統一
    height: '300px', // 画像の高さを統一
    objectFit: 'cover', // アスペクト比を維持しつつ画像を埋める
    borderRadius: '8px',
  },
  text: {
    backgroundColor: '#f9f9f9',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    whiteSpace: 'pre-wrap', // 改行を保持
    textAlign: 'left',
    maxWidth: '100%',
  },
};

export default Production;