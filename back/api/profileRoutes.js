process.noDeprecation = true;
const express = require("express");
const { createClient } = require("@supabase/supabase-js");

// Supabase設定
const SUPABASE_URL = "https://hycrcwksixagdnummgax.supabase.co"; // あなたのSupabase URL
const SUPABASE_KEY = "SUPABASE_PASS=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh5Y3Jjd2tzaXhhZ2RudW1tZ2F4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI5MzAwMjUsImV4cCI6MjA0ODUwNjAyNX0.LkAxnGKldCFnBvvb3vlKbehGBjkpfn1dG_ehqnNgS-k"; // あなたのAPIキー
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// ルーターを作成
const router = express.Router();

// プロフィール取得
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", id)
      .single();

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

  try {
    const { data, error } = await supabase
      .from("profiles")
      .update({ name, email, bio })
      .eq("id", id);

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// モジュールとしてエクスポート
module.exports = router;