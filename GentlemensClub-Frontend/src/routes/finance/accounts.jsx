import React from 'react';

import {getAllCurrency, getAllTransaction} from "../../js/finance/bank/bankApiHandler";
import {GoogleMap, LoadingSpinner} from "../../components/shared";


export default class Accounts extends React.Component {
    state = {
        currenciesData: null,
        currentCurrency: "USD",
        transactionData: null,
        currentTransaction: null,
    }

    constructor(props) {
        super(props);

        this.handleDropDownClick = this.handleDropDownClick.bind(this);
        this.loading = this.loading.bind(this);
        this.setCurrentTransaction = this.setCurrentTransaction.bind(this);
    }


    componentDidMount() {
        getAllCurrency()
            .then((currenciesData) =>
                this.setState({currenciesData}));
        getAllTransaction()
            .then((transactionData) =>
                this.setState({transactionData}))
    }

    loading() {
        return (
            this.state.currenciesData == null ||
            this.state.transactionData == null
        )
    }

    handleDropDownClick(newCurrency) {
        this.setState({currentCurrency: newCurrency})
    }

    setCurrentTransaction(transactionId) {
        if (transactionId === undefined) {
            this.setState({currentTransaction: null})
            return;
        }
        const active = this.state.transactionData.find(x => x["Id"] === transactionId)
        this.setState({currentTransaction: active})
    }

    render() {
        const {currenciesData, currentCurrency, transactionData, currentTransaction} = this.state;

        return (
            <div className={"account-grid-parent"}>
                <div className={"account-grid-left"}>
                    <div className="account-container">
                        {
                            this.loading() ?
                                <div className={"text-center"} style={{paddingTop: "100px"}}>
                                    <LoadingSpinner></LoadingSpinner>
                                </div>
                                :
                                <>
                                    <div className="account-details">
                                        <CurrencyContainer activeAcronym={currentCurrency}
                                                           currencies={currenciesData}
                                                           handler={this.handleDropDownClick}>
                                        </CurrencyContainer>
                                        <AccountActions></AccountActions>
                                    </div>
                                    <h4>Transaction history</h4>
                                    <TransactionHistoryContainer transactions={transactionData}
                                                                 handler={this.setCurrentTransaction}>
                                    </TransactionHistoryContainer>
                                </>
                        }
                    </div>
                </div>
                <TransactionDetails handler={this.setCurrentTransaction}
                                    transaction={currentTransaction}></TransactionDetails>
            </div>
        )
    }
}

function CurrencyContainer(props) {
    const active = props.currencies.find(x => x["Acronym"] === props.activeAcronym)
    let currencies = []
    for (const currency of props.currencies) {
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
                        <CurrenciesDropdown currencies={currencies} handler={props.handler}></CurrenciesDropdown>
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

function CurrenciesDropdown(props) {
    const currencies = props.currencies.map((currency) =>

        <li key={currency["Acronym"]}>
            <p className="dropdown-item">
                <span
                    onClick={() => props.handler(currency["Acronym"])}>{currency["Acronym"]} {currency["Value"]} </span>
            </p>
        </li>
    )
    return (
        <ul className="dropdown-menu" id="dropdown-menu">
            {currencies}
        </ul>
    )
}

function AccountActions() {
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

function TransactionCard(props) {
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

function TransactionHistoryContainer(props) {
    const transactions = props.transactions.map((transaction) =>
        <div key={transaction['Id']}
             onClick={() => props.handler(transaction['Id'])}
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

function TransactionDetails(props) {
    return (
        props.transaction == null ?
            <></>
            :
            <div className={"account-grid-right"}>
                <i style={{cursor: "pointer"}} onClick={() => props.handler()} className={"fa-solid fa-x"}></i>
                <div style={{textAlign: "center"}}>
                    <GoogleMap address={props.transaction["Address"]}></GoogleMap>
                    <p>Address: {props.transaction["Address"]}</p>
                    <p>Comapany: {props.transaction["Company"]}</p>
                    <p>Value: {props.transaction["Value"]} {props.transaction["CurrencyAcronym"]}</p>
                    <p>Status: {props.transaction["Type"]}</p>
                </div>
            </div>
    )
}