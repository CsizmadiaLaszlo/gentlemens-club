import { useState, useEffect, createContext, useContext } from 'react';
import { useParams } from "react-router-dom";
import { LoadingSpinner } from "../../../components/shared";
import { getWeeklyStock } from "../../../services/finance/stock/stockApiHandler";

const WeeklyStatistics = () => {

    const [weeklyStatistic, setWeeklyStatistic] = useState([]);
    const [loading, setLoading] = useState(true);
    const { symbol } = useParams();

    const weeklyStatisticLoader = async () => {
        const statistic = await getWeeklyStock(symbol);
        if (!statistic) {
            throw new Response("",
                {
                    status: 404,
                    statusText: "Not Found",
                });
        }
        setWeeklyStatistic(statistic);
        setLoading(false);
    }

    useEffect(() => {
        weeklyStatisticLoader();
    }, []);

    const renderStatistics = () => {
        return (
            <div>
                <div>
                    {Object.keys(weeklyStatistic).length === 0
                        ? <div className="text-white d-flex flex-wrap justify-content-center">
                              <h2>No available data!</h2></div>
                        : <div className="text-white d-flex flex-wrap justify-content-center">
                              <h1>Past week statistics</h1></div>
                    }
                </div>
                <div className="d-flex flex-wrap">
                    {weeklyStatistic.map((st, index)=> {
                        return (
                            <div key={index} className="stock card bg-dark text-white border-light">
                                <div>{st.date}</div>
                                <div>High: {st.data.high}</div>
                                <div>Low: {st.data.low}</div>
                                <div>Open: {st.data.open}</div>
                                <div>Close: {st.data.close}</div>
                                <div>Volume: {st.data.volume}</div>
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

export default WeeklyStatistics;