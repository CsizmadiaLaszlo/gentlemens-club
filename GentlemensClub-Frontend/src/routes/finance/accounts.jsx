import React, {createContext, useContext, useEffect, useState} from 'react';
import {bankAccountLoader} from "../../services/finance/bank/bankApiHandler";
import {GoogleMap, LoadingSpinner} from "../../components/shared";

const CurrencyContext = createContext();
const TransactionContext = createContext();

const Accounts = () => {
    const [currenciesData, setCurrenciesData] = useState(null);
    const [activeAcronym, setActiveAcronym] = useState("USD");
    const [transactionData, setTransactionData] = useState(null);
    const [currentTransaction, setCurrentTransaction] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        bankAccountLoader()
            .then((data) => {
                setCurrenciesData(data.currencies);
                setTransactionData(data.transactions);
            })
            .finally(() => setLoading(false));
    },[]);

    const changeCurrentTransaction = (transactionId) => {
        if (transactionId === undefined) {
            setCurrentTransaction(null);
            return;
        }
        const active = transactionData.find(x => x["Id"] === transactionId);
        setCurrentTransaction(active);
    }
    
    return (
        <div className={"account-grid-parent"}>
            <div className={"account-grid-left"}>
                <div className="account-container">
                    {
                        loading ?
                            <div className={"text-center"} style={{paddingTop: "100px"}}>
                                <LoadingSpinner></LoadingSpinner>
                            </div>
                            :
                            <>
                                <div className="account-details">
                                    <CurrencyContext.Provider value={{activeAcronym, setActiveAcronym, currenciesData}}>
                                        <CurrencyContainer></CurrencyContainer>
                                    </CurrencyContext.Provider>
                                    <AccountActions></AccountActions>
                                </div>
                                <h4>Transaction history</h4>
                                <TransactionContext.Provider value={{transactionData, changeCurrentTransaction}}>
                                    <TransactionHistoryContainer></TransactionHistoryContainer>
                                </TransactionContext.Provider>
                            </>
                    }
                </div>
            </div>
            <TransactionDetails transaction={currentTransaction} handler={changeCurrentTransaction}></TransactionDetails>
        </div>
    )
}

export default Accounts;


const CurrencyContainer = () => {
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

const AccountActions = () => {
    return (
        <div className={"account-action-container"}>
            <div className={"account-action-container"}>
                <div className={"btn-group"} role={"group"} aria-label={"Basic example"}>
                    <button type={"button"} className={"btn btn-outline-secondary"}>
                        <i className={"fa-solid fa-plus"}></i> Add money
                    </button>
                    <button type={"button"} className={"btn btn-outline-secondary"}>
                        <i className={"fa-solid fa-arrow-right-arrow-left"}></i> Transfer
                    </button>
                    <button type={"button"} className={"btn btn-outline-secondary"}>
                        <i className={"fa-solid fa-arrows-rotate"}></i> Exchange
                    </button>
                </div>
            </div>
        </div>
    )
}

const TransactionCard = (props) => {

    const transaction = props.transaction;
    // const transactionDate = Date.parse(transaction["Date"].toString())
    const transactionDate = new Date(transaction["Date"])
    return (
        <div key={transaction['Id']}
             className={"transaction-card-body"}>
            <div className="transaction-card-body-icon"><i className="fa-solid fa-bag-shopping"></i></div>
            <div className="transaction-card-body-company">{transaction["Company"]}</div>
            <div className="transaction-card-body-date">{transactionDate.toDateString()}</div>
            <div className="transaction-card-body-value">{transaction["Value"]} {transaction["CurrencyAcronym"]}</div>
        </div>
    )
}

const TransactionHistoryContainer = () => {
    const {transactionData, changeCurrentTransaction} = useContext(TransactionContext);
    
    const transactions = transactionData.map((transaction) =>
        <div key={transaction['Id']}
             onClick={() => changeCurrentTransaction(transaction['Id'])}
             className={"card transaction-card btn-outline-secondary"}
             style={{backgroundColor: ""}}>
            <TransactionCard transaction={transaction}></TransactionCard>
        </div>
    )

    return (
        <div className={"transaction-history-container"}>
            {transactions}
        </div>
    )
}

const TransactionDetails = (props) => {
    return (
        props.transaction == null ?
            <></>
            :
            <div className={"account-grid-right"}>
                <i style={{cursor: "pointer"}} onClick={() => props.handler()} className={"fa-solid fa-x"}></i>
                <div style={{textAlign: "center"}}>
                    {GoogleMap(props.transaction["Address"])}
                    <p>Address: {props.transaction["Address"]}</p>
                    <p>Comapany: {props.transaction["Company"]}</p>
                    <p>Value: {props.transaction["Value"]} {props.transaction["CurrencyAcronym"]}</p>
                    <p>Status: {props.transaction["Type"]}</p>
                </div>
            </div>
    )
}