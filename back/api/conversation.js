const express = require('express');
const router = express.Router();
const getmatuokaq=require("./matuoka.js")
const {supabase,generateUnusedId} =require("./supabase_wrapper.js")
const {dynamodbclient,dynamodblite,getwrapper,scanwrapper,putwrapper, delwrapper }=require("./aws_wrapper.js");
const table="conversation"



async function delconver(req, res){
    const { id} = req.body;
    const { data, error } = await delwrapper(table,{id:id})
    if (error) {
      console.error('Error inserting data:', error);
      res.status(500).send();
    }
    else{
        res.json({success:data.lenght!=0})
    }
}
router.delete(":id",delconver)


async function postconver(req, res){
    const body = req.body;
    const id=await generateUnusedId(table)
    console.lo
    const {data,error} = await putwrapper(table,{user_id_send:body.user_id_send,user_id_received:body.user_id_received,id:id,data: body.data});
    if (error) {
      console.error('Error inserting data:', error);
      //res.status(500).send();
    }
    else{
      //res.json({id:data.lenght!=0})
    }
}
/*
postconver({body:{user_id_send:"tmkt",user_id_received:"maxmam",data:"それでいいの？？？"}},null)
postconver({body:{user_id_send:"kroud",user_id_received:"maxmam",data:"そd"}},null)
postconver({body:{user_id_send:"tmkt",user_id_received:"taketake",data:"ｔｗ"}},null)
postconver({body:{user_id_send:"taketake",user_id_received:"maxmam",data:"テストテスト"}},null)
postconver({body:{user_id_send:"maxmam",user_id_received:"tmkt",data:"それだにｗ"}},null)
//*/
router.post("/",postconver)
async function name(params) {
  const data=await scanwrapper(table)
  console.log(data)
}
//name();
async function gettwo(req, res){
    const { id_a,id_b} = req.body;
    const {data,error}=await scanwrapper(table,{
      filter: `
      (user_id_send = :id_a AND user_id_received = :id_b) 
      OR (user_id_send = :id_b AND user_id_received = :id_a)
      `,
      ExpressionAttributeValues:{
        ":id_a": id_a,
        ":id_b": id_b,
      },
    });
    if (error) {
        console.error('Error inserting data:', error);
        res.status(500).send();
    }
    else{
        res.json({datas:data});
    }
}
router.get("/one-on-one",gettwo)


async function getcreator(req, res){
    const { id } = req.params;   
    const {data,error}=await scanwrapper(table,{
      filter:"user_id_send = :id OR user_id_received = :id",
      ExpressionAttributeValues:{
        ":id": id,
      },
      ProjectionExpression: "user_id_send, user_id_received", // 必要なカラムを指定
    });
    if (error) {
        console.error('Error inserting data:', error);
        res.status(500).send();
    }
    else{
        console.log(data);
        const otherUserIds = data.map(row => {
            // name が user_id_a に一致する場合は user_id_b を取得
            if (row.user_id_send === id) {
              return row.user_id_send;
            }
            // name が user_id_b に一致する場合は user_id_a を取得
            if (row.user_id_received === id) {
              return row.user_id_send;
            }
            return null; // 一致しない場合は null
        }).filter(id => id !== null); // 無効なエントリを除外
        const uniqueOtherUserIds = [...new Set(otherUserIds)];
        res.json({ids:uniqueOtherUserIds})
    }
}
router.get("/creator/:id",getcreator)

async function getmatuoka(req, res){
    const { num } = req.params; 
    const strings=getmatuokaq(num);
    if(strings.length!=0){
      res.json({quotes:strings});
    }
    else{
      console.error('多分数のオーバー', error);
      res.status(500).send();

    }
}
router.get("/matuoka/:num",getmatuoka)

async function get(req, res){
    const { id } = req.params; 
    const {data,error}=await getwrapper(table,{id:id})
    if (error) {
      console.error('Error inserting data:', error);
      res.status(500).send();
    }
    else{
      res.json({data:data.data,time:data.time})
    }
}
router.get("/:id",get)





module.exports = router;
