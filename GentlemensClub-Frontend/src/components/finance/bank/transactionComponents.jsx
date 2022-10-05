import {GoogleMap} from "../../shared";
import {useContext} from "react";
import {TransactionContext} from "../../../routes/finance/accounts";

export const TransactionDetails = (props) => {
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

export const TransactionHistoryContainer = () => {
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

const TransactionCard = (props) => {

    const transaction = props.transaction;
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