import {getJwtToken} from "../../authentication/authenticationUtils";

export async function getAllCurrency() {
    const options = {
        headers: {
            'Authorization': "Bearer " + getJwtToken()
        },
    };
    return await fetch("/api/finance/bank/currencies", options).then(r => r.json());
}

export async function getAllTransaction() {
    const options = {
        headers: {
            'Authorization': "Bearer " + getJwtToken()
        },
    };
    return await fetch("/api/finance/bank/transaction", options).then(r => r.json());
}

export async function getExchangeRate(from, to) {
    const url = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from.toLowerCase()}/${to.toLowerCase()}.json`
    const result = await fetch(url).then(r => r.json());
    return result[to.toLowerCase()];
}

export async function sendExchange(exchange){
    const url = "/api/finance/bank/exchange";

    const options = {
        method: "POST",
        headers: {
            'Authorization': "Bearer " + getJwtToken(),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(exchange),
    };

    fetch(url, options).then();
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