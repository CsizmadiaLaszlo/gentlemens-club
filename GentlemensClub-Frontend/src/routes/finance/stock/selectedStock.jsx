import { Link, useParams } from "react-router-dom";
import { useState, useEffect, createContext, useContext } from 'react';
import { LoadingSpinner } from "../../../components/shared";
import { getSelectedStock } from "../../../services/finance/stock/stockApiHandler";
import placeholder from "../../../assets/img/stock/placeholder_chart.jpg"

const SelectedStock = () => {

    const [stock, setStock] = useState([]);
    const [loading, setLoading] = useState(true);
    const { symbol } = useParams();

    const stocksLoader = async () => {
        const stock = await getSelectedStock(symbol);
        if (!stock) {
            throw new Response("",
                {
                    status: 404,
                    statusText: "Not Found",
                });
        }
        setStock(stock);
        setLoading(false);
    }

    useEffect(() => {
        stocksLoader();
    }, []);

    const renderStock = () => {
        return (
            <div>
                <div>
                    {Object.keys(stock).length === 0
                        ? 
                            <div className="text-white d-flex flex-wrap justify-content-center">
                                <h2>No available data!</h2></div>
                        : <></>
                    }
                </div>
                <div className="d-flex flex-wrap">
                    {stock.map(st => {
                        return (
                            <div>
                                <div className="selected-stock card bg-dark text-white border-light">
                                    <div>
                                        <h2>Price: {st.price}</h2></div>
                                    <div>
                                        <h2>Currency: {st.currency}</h2></div>
                                    <div>
                                        <h2>Exchange: {st.exchange_Long} / {st.exchange_Short}</h2></div>
                                    <div>
                                        <h2>Mic code: {st.mic_Code}</h2></div>
                                    <div>Previous close price time: {st.previous_Close_Price_Time}</div>
                                    <div>Previous close price: {st.previous_Close_Price}</div>
                                    <div>Last trade time: {st.last_trade_time}</div>
                                    <div>Day high: {st.day_High}</div>
                                    <div>Day low: {st.day_Low}</div>
                                    <div>Day open: {st.day_Open}</div>
                                    <div>Day change: {st.day_Change}</div>
                                    <div>Volume: {st.volume}</div>
                                    <div>Market cap: {st.market_Cap}</div>
                                </div>
                                <div className="graph-box">
                                    <div className="text-white d-flex flex-wrap justify-content-center">
                                        <h1>{st.name} statistics chart</h1>
                                    </div>
                                    <div className="d-flex flex-wrap justify-content-center">
                                        <AdvancedRealTimeChart theme="dark" symbol={"NASDAQ:" + symbol}></AdvancedRealTimeChart>
                                    </div>
                                    <div className="text-white d-flex flex-wrap justify-content-center">
                                        <Link to={`/finance/selected-stock/weekly-statistics/${symbol}`}>
                                            {st.name} weekly statistics in data</Link>
                                    </div>
                                    <div className="text-white d-flex flex-wrap justify-content-center">
                                        <Link to={`/finance/selected-stock/yearly-statistics/${symbol}`}>
                                            {st.name} yearly statistics in data</Link>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>);
    }

    return (
    <div>
        {
            loading
                ?
                <div className={"text-center"} style={{ paddingTop: "100px" }}>
                    <LoadingSpinner></LoadingSpinner>
                </div>
                :
                <div>{renderStock()}</div>
        }
    </div>
    );
}

export default SelectedStock;