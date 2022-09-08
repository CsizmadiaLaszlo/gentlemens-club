function CloseTransactionDetailedView() {
    let detailedView = document.querySelector('.account-grid-right');
    detailedView.hidden = true;
}

function InitTransactionDetailCloseButton() {
    let closeX = document.getElementById("transaction-detail-close");
    closeX.addEventListener('click', CloseTransactionDetailedView)
}

function InitEventListeners() {
    InitTransactionDetailCloseButton();
}

async function GetCurrency(acronym) {
    const url = `../api/finance/currency?acronym=${acronym}`;
    return await fetch(url).then(r => r.json());
}

async function GetAllCurrency() {
    const url = `../api/finance/currencies`;
    return await fetch(url).then(r => r.json());
}

async function LoadCurrency(acronym) {
    let currency = await GetCurrency(acronym);

    document.querySelector('.currency-value').innerHTML = currency["Value"];
    document.querySelector('.currency-symbol').innerHTML = currency["Symbol"];
    document.querySelector('.currency-name').innerHTML = currency["Name"];
    let flagElement = document.querySelector('.flag-icon');
    let currentCountry = flagElement.dataset.country;
    flagElement.classList.remove(`fi-${currentCountry}`);
    flagElement.classList.add(`fi-${currency["Country"]}`);
    flagElement.dataset.country = currency["Country"];

    SetDropDownElements(acronym);
}

async function SetDropDownElements(acronym) {
    let currencies = await GetAllCurrency();
    let dropDownMenu = document.getElementById("dropdown-menu");
    dropDownMenu.innerHTML = '';

    for (const currency of currencies) {
        if (currency["Acronym"] !== acronym) {
            let liElement = DropDownElementFactory(currency);
            dropDownMenu.appendChild(liElement);
        }
    }
}

function DropDownElementFactory(currency) {
    let liElement = document.createElement('li');
    let pElement = document.createElement('p');

    pElement.classList.add('dropdown-item');
    pElement.dataset.acronym = currency["Acronym"];
    pElement.innerHTML = `<span>${currency["Value"]}</span> ${currency["Acronym"]}`;
    liElement.appendChild(pElement);
    pElement.addEventListener('click', () => LoadCurrency(currency["Acronym"]));

    return liElement;
}

async function GetAllTransaction() {
    const url = `../api/finance/transaction`;
    return await fetch(url).then(r => r.json());
}

async function LoadAllTransaction() {
    let transactions = await GetAllTransaction();
    let transactionContainer = document.querySelector('.transaction-history-container');
    for (const transaction of transactions) {
        let transactionCard = TransactionCardFactory(transaction);
        transactionContainer.appendChild(transactionCard);
    }
}

function ShowDetailedView(e) {
    let address = e.target.dataset.address;
    let gMapCanvas = document.getElementById('google-map-canvas');
    gMapCanvas.src = `https://maps.google.com/maps?q=${address}&t=&z=17&ie=UTF8&iwloc=&output=embed`;

    let detailedView = document.querySelector('.account-grid-right');
    detailedView.hidden = false;
}

function TransactionCardFactory(transaction) {
    let mainDiv = document.createElement('div');
    mainDiv.classList.add("card", "transaction-card", "bg-secondary", "text-white");
    let bodyDiv = document.createElement('div');
    bodyDiv.classList.add("card-body");
    bodyDiv.dataset.address = transaction['Address'];
    bodyDiv.innerHTML = `${transaction["Company"]} ${transaction["Value"]} ${transaction["CurrencyAcronym"]} ${transaction["Date"]}`;
    mainDiv.appendChild(bodyDiv);

    bodyDiv.addEventListener('click', ShowDetailedView)
    return mainDiv;
}

(function () {
    InitEventListeners();
    LoadCurrency("USD").then();
    LoadAllTransaction().then();
})();