import { useState, useEffect, createContext, useContext } from 'react';
import { useParams } from "react-router-dom";
import { LoadingSpinner } from "../../../components/shared";
import { getYearlyStock } from "../../../js/finance/stock/stockApiHandler";

const YearlyStatistics = () => {

    const [yearlyStatistic, setYearlyStatistic] = useState([]);
    const [loading, setLoading] = useState(true);
    const { symbol } = useParams();

    const yearlyStatisticLoader = async () => {
        const statistic = await getYearlyStock(symbol);
        if (!statistic) {
            throw new Response("",
                {
                    status: 404,
                    statusText: "Not Found",
                });
        }
        setYearlyStatistic(statistic);
        setLoading(false);
    }

    useEffect(() => {
        yearlyStatisticLoader();
    }, []);


    const renderStatistics = () => {
        return (
            <div>
                <div>
                    {Object.keys(yearlyStatistic).length === 0
                        ? <div className="text-white d-flex flex-wrap justify-content-center">
                            <h2>No available data!</h2></div>
                        : <div className="text-white d-flex flex-wrap justify-content-center">
                            <h1>Past week statistics</h1></div>
                    }
                </div>
                <div className="d-flex flex-wrap">
                    {yearlyStatistic.map(st => {
                        return (
                            <div className="stock card bg-dark text-white border-light">
                                <div>{st.date}</div>
                                <div>High: {st.high}</div>
                                <div>Low: {st.low}</div>
                                <div>Open: {st.open}</div>
                                <div>Close: {st.close}</div>
                                <div>Volume: {st.volume}</div>
                            </div>);
                    })}
                </div>
            </div>
        );
    }



    return (
        <div>
            {
                loading
                    ?
                    <div className={"text-center"} style={{ paddingTop: "100px" }}>
                        <LoadingSpinner></LoadingSpinner></div>
                    :
                    <div>{renderStatistics()}</div>
            }
        </div>
    );
}

export default YearlyStatistics;