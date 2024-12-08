const AWS = require('aws-sdk');
require('dotenv').config();
// AWSの設定
AWS.config.update({
  region: process.env.AWS_REGION, // 環境変数からリージョンを取得
  accessKeyId: process.env.AWS_ACCESS_KEY_ID, // 環境変数からアクセスキーを取得
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY // 環境変数からシークレットキーを取得
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();
module.exports={
    dynamoDB
}