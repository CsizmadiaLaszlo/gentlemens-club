function InitEventListeners() {
}

async function GetCurrency(acronym){
    const url = `../api/finance/currency?acronym=${acronym}`;
    return await fetch(url).then(r => r.json());
}

async function GetAllCurrency(){
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
    console.log(currentCountry)
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
        if (currency["Acronym"] !== acronym){
            let liElement = document.createElement('li');
            let pElement = document.createElement('p');
            pElement.classList.add('dropdown-item');
            pElement.dataset.acronym = currency["Acronym"];
            pElement.innerHTML = `<span>${currency["Value"]}</span> ${currency["Acronym"]}`;
            liElement.appendChild(pElement);
            dropDownMenu.appendChild(liElement);
            pElement.addEventListener('click', () => LoadCurrency(currency["Acronym"]))
        }
    }
}

function LoadDefaultCurrency() {
    LoadCurrency("USD");
    
}

(function () {
    InitEventListeners();
    LoadCurrency("USD").then(r => r);
})();