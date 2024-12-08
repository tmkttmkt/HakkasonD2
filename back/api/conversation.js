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
    const {data,error} = await putwrapper(table,[{user_id_send:body.sendId,user_id_received:body.receiveIdname,id:id,data: body.data}]);
    if (error) {
      console.error('Error inserting data:', error);
      res.status(500).send();
    }
    else{
      res.json({id:data.lenght!=0})
    }
}
router.post("/",postconver)


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
        res.json({id:data.lenght!=0})
        const otherUserIds = data.map(row => {
            // name が uesr_id_a に一致する場合は uesr_id_b を取得
            if (row.uesr_id_a === name) {
              return row.uesr_id_b;
            }
            // name が uesr_id_b に一致する場合は uesr_id_a を取得
            if (row.uesr_id_b === name) {
              return row.uesr_id_a;
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
