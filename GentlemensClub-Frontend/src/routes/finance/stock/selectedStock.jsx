import { Link, useParams } from "react-router-dom";
import { useState, useEffect, createContext, useContext } from 'react';
import { LoadingSpinner } from "../../../components/shared";
import { getSelectedStock } from "../../../js/finance/stock/stockApiHandler";
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
                {Object.keys(stock).length === 0
                    ? (
                        <div className="text-white d-flex flex-wrap justify-content-center">
                            <h2>No available data!</h2></div>)
                    : stock.map(st => {
                        return (<div class="text-white d-flex flex-wrap justify-content-center">
                                    <h1>{st.name
                        } statistics</h1></div>)
                    })}
            </div>);
}
export default SelectedStock;