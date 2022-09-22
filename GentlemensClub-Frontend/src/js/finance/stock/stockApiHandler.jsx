export async function getStocks(page = 1) {
    const url = `/api/finance/stock?page=${page}`;
    return await fetch(url).then(r => r.json());
}

export async function getSelectedStock(symbol) {
    const url = `/api/finance/selected-stock?symbol=${symbol}`;
    return await fetch(url).then(r => r.json());
}

export async function getYearlyStock(symbol) {
    const url = `/api/finance/selected-stock/yearly-statistics?symbol=${symbol}`;
    return await fetch(url).then(r => r.json());
}

export async function getWeeklyStock(symbol) {
    const url = `/api/finance/selected-stock/weekly-statistics?symbol=${symbol}`;
    return await fetch(url).then(r => r.json());
}

