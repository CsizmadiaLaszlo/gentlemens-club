import {useContext} from "react";
import {CurrencyContext} from "../../../routes/finance/accounts";

export const CurrencyContainer = () => {
    const {activeAcronym, currenciesData} = useContext(CurrencyContext)

    const active = currenciesData.find(x => x["Acronym"] === activeAcronym)
    let currencies = []
    for (const currency of currenciesData) {
        if (currency["Acronym"] !== active["Acronym"]) {
            currencies.push(currency)
        }
    }
    return (
        <>
            <div className="currency-container">
                <div style={{display: "flex"}}>
                    <p className="currency-value">{active["Value"]}</p>
                    <p className="currency-symbol">{active["Symbol"]}</p>
                    <div className="dropdown">
                        <p className="dropdown-arrow dropdown-toggle" data-bs-toggle="dropdown"
                           aria-expanded="false" style={{textAlign: "center"}}></p>
                        <CurrenciesDropdown currencies={currencies}></CurrenciesDropdown>
                    </div>
                </div>
                <p className="currency-name">{active["Name"]}</p>
            </div>
            <div className="flag-container">
                <span className={"fi flag-icon fi-" + active["Country"]}></span>
            </div>
        </>
    )
}

const CurrenciesDropdown = (props) => {
    const {setActiveAcronym} = useContext(CurrencyContext)

    const currencies = props.currencies.map((currency) =>

        <li key={currency["Acronym"]}>
            <p className="dropdown-item">
                <span
                    onClick={() => setActiveAcronym(currency["Acronym"])}>{currency["Acronym"]} {currency["Value"]} </span>
            </p>
        </li>
    )
    return (
        <ul className="dropdown-menu" id="dropdown-menu">
            {currencies}
        </ul>
    )
}