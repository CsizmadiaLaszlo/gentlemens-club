const { createProxyMiddleware } = require('http-proxy-middleware');

const context = [
    "/api/finance/bank/transaction",
    "/api/finance/bank/currencies",
    "/api/finance/bank/exchange",
    "/api/authentication/authenticate",
    "/api/authentication/register",
    "/api/finance/stock",
    "/api/finance/selected-stock",
    "/api/restaurant/get-table-reservations",
    "/api/restaurant/get-table-data",
    "/api/restaurant/get-filters",
    "/api/restaurant/get-all-categories"
];

module.exports = function (app) {
    const appProxy = createProxyMiddleware(context, {
        target: 'https://localhost:7023',
        secure: false
    });

    app.use(appProxy);
};
