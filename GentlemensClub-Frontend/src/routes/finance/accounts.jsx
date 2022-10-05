import React, {createContext, useContext, useEffect, useState} from 'react';
import {bankAccountLoader, getExchangeRate, sendExchange} from "../../services/finance/bank/bankApiHandler";
import {LoadingSpinner} from "../../components/shared";
import {TransactionDetails, TransactionHistoryContainer} from "../../components/finance/bank/transactionComponents";
import {CurrencyContainer} from "../../components/finance/bank/currencyComponents";
import {Modal} from "../../components/shared/modal";

export const CurrencyContext = createContext();
export const TransactionContext = createContext();

const Accounts = () => {
    const [currenciesData, setCurrenciesData] = useState(null);
    const [activeAcronym, setActiveAcronym] = useState("USD");
    const [transactionData, setTransactionData] = useState(null);
    const [currentTransaction, setCurrentTransaction] = useState(null);
    const [loading, setLoading] = useState(true);
    const [shouldUpdate, setShouldUpdate] = useState(false);

    useEffect(() => {
        setLoading(true);
        bankAccountLoader()
            .then((data) => {
                setCurrenciesData(data.currencies);
                setTransactionData(data.transactions);
            })
            .finally(() => setLoading(false));
    }, [shouldUpdate]);

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
                                    <CurrencyContext.Provider value={{
                                        activeAcronym,
                                        setActiveAcronym,
                                        currenciesData,
                                        shouldUpdate,
                                        setShouldUpdate
                                    }}>
                                        <CurrencyContainer></CurrencyContainer>
                                        <AccountActions></AccountActions>
                                    </CurrencyContext.Provider>
                                </div>
                                <h4>Transaction history</h4>
                                <TransactionContext.Provider value={{transactionData, changeCurrentTransaction}}>
                                    <TransactionHistoryContainer></TransactionHistoryContainer>
                                </TransactionContext.Provider>
                            </>
                    }
                </div>
            </div>
            <TransactionDetails transaction={currentTransaction}
                                handler={changeCurrentTransaction}></TransactionDetails>
        </div>
    )
}

export default Accounts;

const AccountActions = () => {
    const [showExchange, setShowExchange] = useState(false);
    const [showTransfer, setShowTransfer] = useState(false);
    const [showAddMoney, setShowAddMoney] = useState(false);

    return (
        <div className={"account-action-container"}>
            <div className={"account-action-container"}>
                <div className={"btn-group"} role={"group"} aria-label={"Basic example"}>

                    <button type={"button"} className={"btn btn-outline-secondary"}
                            onClick={() => setShowAddMoney(!showAddMoney)}>
                        <i className={"fa-solid fa-plus"}></i> Add money
                    </button>
                    <AddMoneyModal show={showAddMoney} onClose={() => setShowAddMoney(false)}/>

                    <button type={"button"} className={"btn btn-outline-secondary"}
                            onClick={() => setShowTransfer(!showTransfer)}>
                        <i className={"fa-solid fa-arrow-right-arrow-left"}></i> Transfer
                    </button>
                    <TransferModal show={showTransfer} onClose={() => setShowTransfer(false)}/>

                    <button type={"button"} className={"btn btn-outline-secondary"}
                            onClick={() => setShowExchange(!showExchange)}>
                        <i className={"fa-solid fa-arrows-rotate"}></i> Exchange
                    </button>
                    <ExchangeModal show={showExchange} onClose={() => setShowExchange(false)}/>
                </div>
            </div>
        </div>
    )
}


const ExchangeModal = ({show, onSuccess, onClose}) => {
    const {activeAcronym, currenciesData, shouldUpdate, setShouldUpdate} = useContext(CurrencyContext);
    const exchangeType = "Sell";
    const [exchangeRate, setExchangeRate] = useState();
    const firstAcronym = () => currenciesData.find(x => x["Acronym"] !== activeAcronym)["Acronym"];
    const [toAcronym, setToAcronym] = useState(firstAcronym);
    const [loading, setLoading] = useState(true);
    const [topValue, setTopValue] = useState(0);
    const [bottomValue, setBottomValue] = useState(0);

    useEffect(() => {
        setToAcronym(firstAcronym());
    }, [activeAcronym]);

    useEffect(() => {
        setLoading(true);
        getExchangeRate(activeAcronym, toAcronym)
            .then((data) => {
                setExchangeRate(data);
            })
            .finally(() => {
                setLoading(false)
            });
    }, [activeAcronym, toAcronym]);

    const handleTopChange = (event) => {
        setTopValue(Math.min(event.target.value, topCurrencyData["Value"].toFixed(2)));
        setBottomValue((topValue * exchangeRate).toFixed(2));
    }
    const closeModal = () => {
        onClose();
        setTopValue(0);
        setBottomValue(0);
    }

    const handleExchange = (event) => {
        event.preventDefault();
        closeModal();
        if (topValue === 0) return;
        sendExchange(exchangeObject()).then(r => {
            setShouldUpdate(!shouldUpdate)
        })
    }

    const exchangeObject = () => {
        return {
            FromAcronym: activeAcronym,
            FromValue: topValue,
            ToAcronym: toAcronym,
            ToValue: bottomValue,
        };
    }

    const dropDownCurrency = currenciesData.find(x => x["Acronym"] !== activeAcronym && x["Acronym"] !== toAcronym);
    const topCurrencyData = currenciesData.find(x => x["Acronym"] === activeAcronym);
    const bottomCurrencyData = currenciesData.find(x => x["Acronym"] === toAcronym);

    return (
        !show ?
            <></>
            :
            <div className="modal">
                <div className="modal-content bg-dark text-light" style={{width: "24rem"}}>
                    {loading ?
                        <div style={{justifyContent: "center", display: "flex"}}>
                            <LoadingSpinner></LoadingSpinner>
                            <i style={{cursor: "pointer", justifySelf: "right"}} onClick={onClose}
                               className={"fa-solid fa-x"}></i>
                        </div>
                        :
                        <>
                            <div className="modal-header">
                                <div>
                                    <h4 className="modal-title">{exchangeType} {activeAcronym}</h4>
                                    <span style={{color: "#6c757d"}}><i
                                        className={"fa-solid fa-arrow-trend-up"}></i> 1 {activeAcronym} = {exchangeRate} {toAcronym}</span>
                                </div>
                                <i style={{cursor: "pointer"}} onClick={closeModal} className={"fa-solid fa-x"}></i>
                            </div>

                            <div style={{padding: "5px"}}>
                                <div style={{border: "1px solid #eee", borderRadius: "4px", margin: "10px"}}
                                     className="top-currency-container">
                                    <div className="exchange-container">
                                        <div className="exchange-acronym">
                                            {topCurrencyData["Acronym"]}
                                        </div>
                                        <div className="exchange-amount">
                                            <div className="input-group input-group-sm mb-3">
                                                <span className="input-group-text">{topCurrencyData["Symbol"]}</span>
                                                <input type="number" max={topCurrencyData["Value"]} value={topValue}
                                                       onChange={handleTopChange}
                                                       className="form-control shadow-none"></input>
                                            </div>
                                        </div>
                                        <div className="exchange-balance">
                                            Balance: {topCurrencyData["Value"].toFixed(2)} {topCurrencyData["Acronym"]}
                                        </div>
                                        <div className="exchange-info"></div>
                                    </div>
                                </div>
                                <div style={{border: "1px solid #eee", borderRadius: "4px", margin: "10px"}}
                                     className="bottom-currency-container">
                                    <div className="exchange-container">
                                        <div className="exchange-acronym" style={{display: "flex", maxHeight: "10px"}}>
                                            <p>{bottomCurrencyData["Acronym"]}</p>
                                            <div className="dropdown">
                                                <p className="dropdown-arrow dropdown-toggle"
                                                   data-bs-toggle="dropdown"
                                                   aria-expanded="false" style={{padding: "3px"}}></p>
                                                <ExchangeDropdown currency={dropDownCurrency}
                                                                  handler={setToAcronym}></ExchangeDropdown>
                                            </div>
                                        </div>
                                        <div className="exchange-amount">
                                            <div className="input-group input-group-sm mb-3">
                                                <span className="input-group-text">{bottomCurrencyData["Symbol"]}</span>
                                                <input type="number" disabled={true} value={bottomValue}
                                                       className="form-control shadow-none"></input>
                                            </div>
                                        </div>
                                        <div className="exchange-balance">
                                            Balance: {bottomCurrencyData["Value"].toFixed(2)} {bottomCurrencyData["Acronym"]}
                                        </div>
                                        <div className="exchange-info">
                                        </div>
                                    </div>
                                </div>
                                <div style={{margin: "10px"}}>
                                    <button style={{width: "100%"}}
                                            className="btn btn-outline-secondary" onClick={handleExchange}>
                                        Sell {activeAcronym} for {toAcronym}
                                    </button>
                                </div>
                            </div>
                        </>}
                </div>
            </div>
    );
};

const ExchangeDropdown = (props) => {
    const flagIcon = () => {
        return `fi flag-icon fi-${props.currency["Country"]}`
    }
    return (
        <ul className="dropdown-menu" id="dropdown-menu">
            <li key={props.currency["Acronym"]}>
                <p className="dropdown-item">
                <span
                    onClick={() => props.handler(props.currency["Acronym"])}>
                        <span style={{fontSize: "15px"}}
                              className={flagIcon()}></span>{" " + props.currency["Acronym"]} {props.currency["Name"]} </span>
                </p>
            </li>
        </ul>
    )
}

const TransferModal = ({show, onSuccess, onClose}) => {
    const modalBody = (
        <h3>Transfer coming soon</h3>
    );

    return (
        <Modal show={show} onClose={onClose} title="Transfer" body={modalBody}/>
    );
};

const AddMoneyModal = ({show, onSuccess, onClose}) => {
    const modalBody = (
        <h3>Add money coming soon</h3>
    );

    return (
        <Modal show={show} onClose={onClose} title="Add money" body={modalBody}/>
    );
};