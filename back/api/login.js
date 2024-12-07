const express = require('express');
const router = express.Router();
const {supabase,generateUnusedId} =require("./supabase_wrapper.js");
const {dynamodbclient,dynamodblite,getwrapper,scanwrapper,putwrapper }=require("./aws_wrapper.js");
const table="login"

async function postlogin(req, res){
    const { id, pass } = req.body;
    
    const {data,error} = await getwrapper(table,{user_id:id});
    if (error) {
      console.error('Error inserting data:', error);
      res.status(500).send();
    }
    else{
      res.json({ success: data[0].password==pass });
    }
}
router.post('/',postlogin);

async function getlogin(req, res){
    const {data,error} = await scanwrapper(table);
    if (error) {
      console.error('Error inserting data:', error);
      res.status(500).send();
    }
    else{
        res.json(data);
    }
           
}
router.get('/',getlogin);

async function postsignup(req, res){
    const { id, pass,name } = req.body; 
    const {data1,error1} = await scanwrapper(table);
    if(data1.map((item)=>{item.user_id}).includes(data)){
      return res.status(409).json({ error: 'そのuser_idは既に使用されています'});
    }
    const {data,error} = await putwrapper(table,{user_id: id,user_name:name,password: pass,okome:0,exposition:"",billing:""});
    if (error) {
      console.error('Error inserting data:', error);
      //res.status(500).send();
    }
    else{
        //res.json({ success:data.lenght!=0 });
    }
}
router.post('/signup',postsignup);
postsignup({body:{id:"tmkt",pass:"password",name:"俺だよ俺"}},null)
postsignup({body:{id:"kroud",pass:"01234",name:"道未知の道"}},null)
postsignup({body:{id:"maxmam",pass:"maxisnotmin",name:"猿田彦"}},null)
postsignup({body:{id:"taketake",pass:"taketake",name:"たけたけ"}},null)
async function postloginmail(req, res){
}
router.post('/email',postloginmail);



module.exports = router;