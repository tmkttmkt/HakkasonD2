process.noDeprecation = true;
const express = require('express');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config(); 
const router = express.Router();
const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_PASS
const supabase = createClient(supabaseUrl, supabaseKey)
const table="login"

async function postlogin(req, res){
    const { id, pass } = req.body;
    
    const {data,error} = await supabase.from(table).select("*").eq("uesr_id",id);
    if (error) {
      console.error('Error inserting data:', error);
      res.status(500).send();
    }
    else{
        res.json({ success: data.password==pass });
    }
           
}
router.post('/',postlogin);

async function postlogin(req, res){
    const {data,error} = await supabase.from(table).select("*");
    if (error) {
      console.error('Error inserting data:', error);
      res.status(500).send();
    }
    else{
        res.json(data);
    }
           
}
router.get('/',postlogin);

async function postsignup(req, res){
    const { id, pass,name } = req.body; 

    const {data,error} = await supabase.from(table).insert([{uesr_id: id,uesr_name:name,password: pass}]);
    if (error) {
      console.error('Error inserting data:', error);
      res.status(500).send();
    }
    else{
        res.json({ success:data });
    }
}
router.post('/signup',postsignup);

async function postloginmail(req, res){
}
router.post('/mail',postloginmail);



module.exports = router;