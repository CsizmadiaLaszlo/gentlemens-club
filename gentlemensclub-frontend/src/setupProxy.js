const { createProxyMiddleware } = require('http-proxy-middleware');

const context = [
    // "/weatherforecast",
    "/api/finance/bank/currencies",
    "/api/RestaurantApi/get-table-reservations",
];

module.exports = function (app) {
    const appProxy = createProxyMiddleware(context, {
        target: 'https://localhost:7023',
        secure: false
    });

    app.use(appProxy);
};
