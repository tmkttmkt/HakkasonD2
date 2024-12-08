process.noDeprecation = true;
const express = require("express");
const {supabase,generateUnusedId}=require("./supabase_wrapper.js");
const { getwrapper, putwrapper,scanwrapper } = require('./aws_wrapper.js');
// ルーターを作成
const router = express.Router();
const table="profiles";
// プロフィール取得
router.get("/:id", async (req, res) => 
{
  const { id } = req.params;
  try {
    const { data, error } = await getwrapper(table,{user_id:id});

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// プロフィール更新
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, bio } = req.body;
  const { data1, error } = await getwrapper(table,{user_id:id});
  if (error){
    res.status(500).json({ error: error.message });
  }
  try {
    data1.user_name=name;
    const { data, error } = await putwrapper(table,data1)

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// モジュールとしてエクスポート
module.exports = router;