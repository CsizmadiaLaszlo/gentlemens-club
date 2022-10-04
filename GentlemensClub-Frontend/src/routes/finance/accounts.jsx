import React, {createContext, useEffect, useState} from 'react';
import {bankAccountLoader} from "../../services/finance/bank/bankApiHandler";
import {LoadingSpinner} from "../../components/shared";
import {TransactionDetails, TransactionHistoryContainer} from "../../components/finance/bank/transactionComponents";
import {CurrencyContainer} from "../../components/finance/bank/currencyComponents";

export const CurrencyContext = createContext();
export const TransactionContext = createContext();

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