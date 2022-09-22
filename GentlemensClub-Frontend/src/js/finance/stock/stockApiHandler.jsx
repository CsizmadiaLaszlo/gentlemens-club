export async function getStocks(page = 1) {
    const url = `/api/finance/stock?page=${page}`;
    return await fetch(url).then(r => r.json());
}

