export async function getCurrency(acronym) {
    const url = `/api/finance/bank/currency?acronym=${acronym}`;
    return await fetch(url).then(r => r.json());
}

export async function getAllCurrency() {
    return await fetch("/api/finance/bank/currencies").then(r => r.json());
}

export async function getAllTransaction() {
    return await fetch("/api/finance/bank/transaction").then(r => r.json());
}

export async function bankAccountLoader() {
    const currencies = await getAllCurrency();
    if (!currencies) {
        throw new Response("", {
            status: 404,
            statusText: "Not Found",
        });
    }
    const transactions = await getAllTransaction();
    if (!transactions) {
        throw new Response("", {
            status: 404,
            statusText: "Not Found",
        });
    }
    return {currencies, transactions};
}