require('dotenv').config();
const { DynamoDBClient, PutItemCommandInput, PutItemCommand  } = require("@aws-sdk/client-dynamodb");

const dynamodbClient = new DynamoDBClient({
  region: process.env.AWS_REGION, // 環境変数からリージョンを取得
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID, // 環境変数からアクセスキーを取得
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // 環境変数からシークレットキーを取得
    sessionToken:process.env.AWS_SESSION_TOKEN//トークンを取得？
  },
  endpoint: undefined
});
const testdo = async (event)=> {
  const params= {
      TableName: 'test222222',
      Item: {
          user_id: { S: '1' },
          name: { S: 'John' },
          age: { N: '20' },
      },
  };
  const command = new PutItemCommand(params);
  try {
      await dynamodbClient.send(command);
  } catch (err) {
    console.log(err)
  }
};

testdo();
module.exports=dynamodbClient