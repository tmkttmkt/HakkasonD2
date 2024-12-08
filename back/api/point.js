const express = require('express');
const router = express.Router();
const {supabase,generateUnusedId} = require('./supabase_wrapper.js');
const { getwrapper, putwrapper,scanwrapper } = require('./aws_wrapper.js');

// テーブル名
const table = 'login';

// 今の米ポイントを取得 API
async function getOkome(req, res){
    const { userId } = req.query; //userId取得
    
    if (!userId) {
        return res.status(400).json({ error: 'userIdが必要ですよ'});
    }
    const {data,error} = await getwrapper(table,{user_id:userId});

    if (error) {
        console.error('Error fetching data:', error);
        return res.status(500).send();
    }

    res.status(200).json({ okome: data.okome });
}
router.get('/get-okome',getOkome);

// 米ポイントを増減 API
async function updateOkome(req, res){
    const { userId, value } = req.body;

    if (!userId || typeof value !== 'number') {
        return res.status(400).json({ error: 'userIdとvalueが必要ですよ' });
    }

    const { data, error } = await getwrapper(table,{user_id:userId});

    if (error) {
        console.error('Error fetching data:', error);
        return res.status(500).send();
    }

    const newOkome = data.okome + value; //指定された値を増減
    data.okome=newOkome;

    // 新しい米ポイントをデータベースに保存
    const { updateError } = await putwrapper(table,data);
    if (error) {
        console.error('Error updating data:', updateError);
        return res.status(500).send();
    }

    res.status(200).json({ okome: newOkome});
}
router.post('/update-okome',updateOkome);



module.exports = router;