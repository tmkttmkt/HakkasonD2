const express = require('express');
const router = express.Router();
const getmatuokaq=require("./matuoka.js")
const {supabase,generateUnusedId} =require("./supabase_wrapper.js")
const table="conversation"



async function delconver(req, res){
    const { data, error } = await supabase.from(table).delete().eq('id', id); 
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
    const {data,error} = await supabase.from(table).insert([{user_id_send:body.sendId,user_id_received:body.receiveIdname,id:id,data: body.data}]);
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
    const { data, error } = await supabase.from(table)
    .select('*') // 必要なカラムを選択（'*' は全カラム）
    .or(`and(user_id_send.eq.${id_a},user_id_received.eq.${id_b}),and(user_id_send.eq.${id_a},user_id_received.eq.${id_b})`);
    if (error) {
        console.error('Error inserting data:', error);
        res.status(500).send();
    }
    else{
        res.json({sendId:data.user_id_send,receiveId:data.user_id_received,dtat:dtat.data,time:data.time});
    }
}
router.get("/one-on-one",gettwo)


async function getcreator(req, res){
    const { id } = req.params; 
    const { data, error } = await supabase
    .from(table)  // テーブル名を指定
    .select('user_id_send, user_id_received') // 必要なカラムを指定
    .or(`user_id_send.eq.${id},user_id_received.eq.${id}`); // 条件を設定
    if (error) {
        console.error('Error inserting data:', error);
        res.status(500).send();
    }
    else{
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
    const {data,error}=await supabase.from(table).select("*").eq("id",id).single();
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
