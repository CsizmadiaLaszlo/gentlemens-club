import { authorizedFetch, getJwtToken } from "../../authentication/authenticationUtils";

export async function getStocks(page = 1) {
    const url = `/api/finance/stock?page=${page}`;
    return await authorizedFetch(url).then(r => r.json());
}

export async function getSelectedStock(symbol) {
    const url = `/api/finance/stock/selected-stock?symbol=${symbol}`;
    return await authorizedFetch(url).then(r => r.json());
}

export async function getYearlyStock(symbol) {
    const url = `/api/finance/stock/selected-stock/yearly-statistics?symbol=${symbol}`;
    return await authorizedFetch(url).then(r => r.json());
}

export async function getWeeklyStock(symbol) {
    const url = `/api/finance/stock/selected-stock/weekly-statistics?symbol=${symbol}`;
    return await authorizedFetch(url).then(r => r.json());
}

export async function getMaxPage() {
    return await authorizedFetch("/api/finance/stock/max-page").then(r => r.json());
}

export async function getStockValue() {
    return await authorizedFetch("/api/finance/stockData/value").then(r => r.json());
}

export async function getAllStock() {
    return await authorizedFetch("/api/finance/stockData/all").then(r => r.json());
}

export async function buyStock(stockData) {
    const url = "/api/finance/stockData/buy";
    const options = {
        method: "POST",
        headers: {
            'Authorization': "Bearer " + getJwtToken(),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(stockData),
    };

    await fetch(url, options).then();
}

export async function sellStock(stockData) {
    const url = "/api/finance/stockData/sell";
    const options = {
        method: "POST",
        headers: {
            'Authorization': "Bearer " + getJwtToken(),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(stockData),
    };

    await fetch(url, options).then();
}