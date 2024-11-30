const express = require('express');
const serverless = require('serverless-http');

const app = express();

// ルートエンドポイントにアクセスしたときに「Hello World」を表示
app.get('/', (req, res) => {
    res.send('Hello World');
});

// サーバーレス関数としてExpressをエクスポート
module.exports = serverless(app);
