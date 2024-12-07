const express = require('express');
const router = express.Router();
const {supabase,generateUnusedId} = require('./supabase_wrapper.js');

// テーブル名
const table = 'recritment';

// 募集開始 API
async function startRecruitment(req, res) {
    const { creator, produc, order, explanation } = req.body;

    if (!creator || !produc || !order || !explanation) {
        return res.status(400).json(false);
    }

    // 新しい募集を作成
    const { data, error } = await supabase
        .from(table)
        .insert([{ creator, produc, order, explanation }]);

    if (error) {
        console.error('Error starting recruitment:', error);
        return res.status(500).json(false);
    }

    res.status(200).json(true);
}
router.post('/start', startRecruitment);

// 募集取得 API
async function getRecruitments(req, res) {
    const { creator } = req.query;

    // 募集を取得
    const query = supabase.from(table).select('*');
    if (creator) {
        query.eq('creator',creator);
    }

    const { data, error } = await query;

    if (error) {
        console.error('Error fetching recruitments:', error);
        return res.status(500).json(false);
    }

    res.status(200).json(true);
}
router.get('/get', getRecruitments);

// 募集停止 API
async function stopRecruitment(req, res) {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json(false);
    }

    // 指定されたidの募集を停止
    const { error } = await supabase
        .from(table)
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error stopping recruitment:', error);
        return res.status(500).json(false);
    }

    res.status(200).json(true);
}
router.post('/stop', stopRecruitment);


module.exports = router;