export async function getStocks(page = 1) {
    const url = `/api/finance/stock?page=${page}`;
    return await fetch(url).then(r => r.json());
}

export async function getSelectedStock(symbol) {
    const url = `/api/finance/stock/selected-stock?symbol=${symbol}`;
    return await fetch(url).then(r => r.json());
}

export async function getYearlyStock(symbol) {
    const url = `/api/finance/stock/selected-stock/yearly-statistics?symbol=${symbol}`;
    return await fetch(url).then(r => r.json());
}

export async function getWeeklyStock(symbol) {
    const url = `/api/finance/stock/selected-stock/weekly-statistics?symbol=${symbol}`;
    return await fetch(url).then(r => r.json());
}

export async function getMaxPage() {
    return await fetch("/api/finance/stock/max-page").then(r => r.json());
}