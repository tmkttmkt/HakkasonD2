require('dotenv').config();
const {
  BillingMode,
  CreateTableCommand,
  DeleteTableCommand,
  DynamoDBClient,
  waitUntilTableExists,
  PutItemCommand,
  RestoreTableFromBackupCommand,
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

const dynamodbclient = new DynamoDBClient({
  region: process.env.AWS_REGION, // 環境変数からリージョンを取得
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID, // 環境変数からアクセスキーを取得
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // 環境変数からシークレットキーを取得
    sessionToken:process.env.AWS_SESSION_TOKEN//トークンを取得？
  },
  endpoint: undefined
});
const dynamodblite = DynamoDBDocumentClient.from(dynamodbclient);
async function getwrapper(table,item) {
  const params = {
    TableName: table,
    Key: item,
  };
  const command = new GetCommand(params);
  try {
    const result=await dynamodblite.send(command);
    console.log(result);
    return{ data:result.Item,error:null};
  } catch (err) {
    return{ data:null,error:err};
  }
}
async function putwrapper(table,item) {
  const params= {
      TableName: table,
      Item: item,
  };
  const command = new PutCommand(params);
  try {
      await dynamodblite.send(command);
      return{ data:null,error:null};
  } catch (err) {
      return{ data:null,error:err};
  }
}
async function delwrapper(table,item) {
  const params = {
    TableName: table,
    Key: item
  };
  const command = new DeleteCommand(params);
  try {
    const data = await dynamodblite.send(command);
    return{ data:data,error:null};
  } catch (err) {
    return{ data:null,error:err};
  }
}
async function scanwrapper(table,item={ExpressionAttributeValues:undefined,ExpressionAttributeValues:undefined,filter:undefined}) {
  try{
    let parms;
    if(item){
    parms={
       TableName: table, 
       FilterExpression:item.filter,
       ExpressionAttributeValues: item.ExpressionAttributeValues,
       ProjectionExpression:item.ExpressionAttributeValues,
      }
    }
    else{
      parms={
         TableName: table, 
        }
    }
    const paginator = paginateScan({ client: dynamodblite }, parms);
    const items = [];
    for await (const page of paginator) {
      if (page.Items) {
        items.push(...page.Items);
      }
    }
    return { data: items, error: null };
  } catch (error) {
    return { data: null, error };
  }
}
function generateRandomKey() {
  return crypto.randomBytes(16).toString("hex"); // 16バイトのランダムキーを生成
}
async function generateUnusedId(table) {
  const {data,error}=scanwrapper(table);
  if(error){
    res.status(500).send();
  }
  let line=data[0];
  while(data.incluse(line)){
      line=generateRandomKey();
  }
  
}
module.exports={
  dynamodbclient,
  dynamodblite,
  getwrapper,
  putwrapper,
  delwrapper,
  scanwrapper,
  generateUnusedId,
}
/*
const testdo = async (event)=> {
  const params= {
      TableName: 'test222222',
      Item: {
          user_id:'32222wdd22',
          name: 'Jo2323dd',
          age: 203,
      },
  };
  const command = new PutCommand(params);
  try {
      await dynamodblite.send(command);
      console.log("\nrrr-put\n");
  } catch (err) {
    console.log(err)
  }
};
testdo();// */
/*
const testget = async (event)=> {
  const params = {
    TableName: "test222222",
    Key: { user_id: "2"  },
  };
  const command = new GetCommand(params);
  try {
      const a=await dynamodblite.send(command);
      console.log(a.Item);
  } catch (err) {
    console.log(err)
  }
}
testget();//*/
/*
const testgets = async (event)=> {
  const paginator = paginateScan({ client: dynamodblite }, { TableName: "test222222" });
  for await (const page of paginator) {
    console.log(page.Items);
    console.log("\nrrr-gets\n");
  }
}
testgets();//*/
/*
const testdel = async (event)=> {
  const params = {
    TableName: "test222222",
    Key: {
      user_id: "2",  // テーブルのキーを指定
    }
  };

  const command = new DeleteCommand(params);

  try {
    const data = await dynamodblite.send(command);
    console.log("Item deleted:", data);
  } catch (err) {
    console.error("Error deleting item:", err);
  }
}
testdel();//*/