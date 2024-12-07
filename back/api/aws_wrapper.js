require('dotenv').config();
const {
  BillingMode,
  CreateTableCommand,
  DeleteTableCommand,
  DynamoDBClient,
  waitUntilTableExists,
  PutItemCommand,
} =require("@aws-sdk/client-dynamodb");
const {
  BatchWriteCommand,
  DeleteCommand,
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  UpdateCommand,
  paginateQuery,
  paginateScan,
} = require("@aws-sdk/lib-dynamodb");

const dynamodbClient = new DynamoDBClient({
  region: process.env.AWS_REGION, // 環境変数からリージョンを取得
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID, // 環境変数からアクセスキーを取得
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // 環境変数からシークレットキーを取得
    sessionToken:process.env.AWS_SESSION_TOKEN//トークンを取得？
  },
  endpoint: undefined
});
const docClient = DynamoDBDocumentClient.from(dynamodbClient);
/*const testdo = async (event)=> {
  const params= {
      TableName: 'test222222',
      Item: {
          user_id: { S: '3' },
          name: { S: 'Jo2323dd' },
          age: { N: '203' },
      },
  };
  const command = new PutItemCommand(params);
  try {
      await dynamodbClient.send(command);
      console.log("\nrrr-put\n");
  } catch (err) {
    console.log(err)
  }
};

testdo();*/
/*
const testget = async (event)=> {
  const params = {
    TableName: "test222222",
    Key: { user_id: "2"  },
  };
  const command = new GetCommand(params);
  try {
      const a=await docClient.send(command);
      console.log(a.Item);
  } catch (err) {
    console.log(err)
  }
}
testget();//*/
/*
const testgets = async (event)=> {
  const paginator = paginateScan({ client: docClient }, { TableName: "test222222" });
  for await (const page of paginator) {
    console.log(page.Items);
    console.log("\nrrr-gets\n");
  }
}
testgets();//*/

const testdel = async (event)=> {
  const params = {
    TableName: "test222222",
    Key: {
      user_id: "2",  // テーブルのキーを指定
    }
  };

  const command = new DeleteCommand(params);

  try {
    const data = await docClient.send(command);
    console.log("Item deleted:", data);
  } catch (err) {
    console.error("Error deleting item:", err);
  }
}
testdel();//*/
module.exports=dynamodbClient