export async function getCurrency(acronym) {
    const url = `api/finance/currency?acronym=${acronym}`;
    return await fetch(url).then(r => r.json());
}

export async function getAllCurrency() {
    console.log("getAllcurrency called")
    return await fetch("api/finance/currencies").then(r => r.json());
}

export async function getAllTransaction() {
    return await fetch("api/finance/transaction").then(r => r.json());
}