import React, {useContext, useEffect, useState} from 'react';
import {getExchangeRate, sendExchange} from "../../../services/finance/bank/bankApiHandler";
import {LoadingSpinner} from "../../shared";
import {Modal} from "../../shared/modal";
import {CurrencyContext} from "../../../routes/finance/accounts";

export const AccountActions = () => {
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


const ExchangeModal = ({show, onClose}) => {
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
        const newValue = Math.min(event.target.value, topCurrencyData["Value"].toFixed(2))
        setTopValue(newValue);
        setBottomValue((newValue * exchangeRate));
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
                <div className="modal-content exchange-modal-content bg-dark text-light">
                    {loading ?
                        <div className={"exchange-spinner"}>
                            <LoadingSpinner></LoadingSpinner>
                            <i onClick={onClose}
                               className={"fa-solid fa-x exchange-close-icon"}></i>
                        </div>
                        :
                        <>
                            <div className="modal-header">
                                <div>
                                    <h4 className="modal-title">{exchangeType} {activeAcronym}</h4>
                                    <span className={"exchange-rate-container"}><i
                                        className={"fa-solid fa-arrow-trend-up"}></i> 1 {activeAcronym} = {exchangeRate} {toAcronym}</span>
                                </div>
                                <i onClick={closeModal} className={"fa-solid fa-x"}></i>
                            </div>

                            <div className={"exchange-modal-body"}>
                                <div className="top-currency-container">
                                    <div className="exchange-container">
                                        <div className="exchange-acronym">
                                            {topCurrencyData["Acronym"]}
                                        </div>
                                        <div className="exchange-amount">
                                            <div className="input-group input-group-sm mb-3">
                                                <span className="input-group-text">{topCurrencyData["Symbol"]}</span>
                                                <input type="number" min={0} max={topCurrencyData["Value"]} value={topValue}
                                                       onInput={handleTopChange}
                                                       className="form-control shadow-none"></input>
                                            </div>
                                        </div>
                                        <div className="exchange-balance">
                                            Balance: {topCurrencyData["Value"].toFixed(2)} {topCurrencyData["Acronym"]}
                                        </div>
                                        <div className="exchange-info"></div>
                                    </div>
                                </div>
                                <div className="bottom-currency-container">
                                    <div className="exchange-container">
                                        <div className="exchange-acronym">
                                            <p>{bottomCurrencyData["Acronym"]}</p>
                                            <div className="dropdown">
                                                <p className="dropdown-arrow dropdown-toggle exchange-dropdown-arrow"
                                                   data-bs-toggle="dropdown"
                                                   aria-expanded="false"></p>
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
                                <div className={"exchange-button-container"}>
                                    <button className="btn btn-outline-secondary exchange-button"
                                            onClick={handleExchange}>
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
                        <span
                            className={flagIcon() + " exchange-dropdown-flag"}></span>
                    {" " + props.currency["Acronym"]} {props.currency["Name"]} </span>
                </p>
            </li>
        </ul>
    )
}

const TransferModal = ({show, onClose}) => {
    const modalBody = (
        <h3>Transfer coming soon</h3>
    );

    return (
        <Modal show={show} onClose={onClose} title="Transfer" body={modalBody}/>
    );
};

const AddMoneyModal = ({show, onClose}) => {
    const modalBody = (
        <h3>Add money coming soon</h3>
    );

    return (
        <Modal show={show} onClose={onClose} title="Add money" body={modalBody}/>
    );
};