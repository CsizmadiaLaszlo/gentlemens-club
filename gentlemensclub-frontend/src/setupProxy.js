﻿const { createProxyMiddleware } = require('http-proxy-middleware');

const context = [
    "/api/finance/bank/transaction",
    "/api/finance/bank/currencies",
];

module.exports = function (app) {
    const appProxy = createProxyMiddleware(context, {
        target: 'https://localhost:7023',
        secure: false
    });

    app.use(appProxy);
};
