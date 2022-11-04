import { useState, useEffect } from 'react';
import { LoadingSpinner } from "../../../components/shared";
import { getAllStock, sellStock } from "../../../services/finance/stock/stockApiHandler";

const MyStock = () => {

    const [stocks, setStocks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [exchange, setExchange] = useState(false);

    const stocksLoader = async () => {
        const stocks = await getAllStock();
        if (!stocks) {
            throw new Response("",
                {
                    status: 404,
                    statusText: "Not Found",
                });
        }
        setStocks(stocks);
        setLoading(false);
    }

    useEffect(() => {
        setLoading(true);
        setExchange(false);
        stocksLoader();
    }, [exchange]);


    const createData = (symbol, value) => {
        return {
            Symbol: symbol,
            Value: value
        }
    }

    const handleExchange = async (symbol, value) => {
        await sellStock(createData(symbol, value));
        setExchange(true);
    }

    const renderStocks = () => {
        return (
            <div>
                <div className="text-white d-flex flex-wrap justify-content-center">
                    <h1>My Stocks</h1>
                </div>
                <div className="d-flex flex-wrap">
                    {stocks.map(stock => {
                        return (
                            <div key={stock.symbol} className="stock card bg-dark text-white border-light">
                                <div>Name:   {stock.name}</div>
                                <div>Symbol: {stock.symbol}</div>
                                <div>Volume: {stock.value}</div>
                                <button className="btn btn-outline-secondary"
                                    onClick={() => handleExchange(stock.symbol, 100)}>Sell 100</button>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }

    return (
        <div>
            {
                loading ?
                    <div className={"text-center"} style={{ paddingTop: "100px" }}>
                        <LoadingSpinner></LoadingSpinner>
                    </div>
                    :
                    <div>{renderStocks()}</div>
            }
        </div>
    );
}

export default MyStock;