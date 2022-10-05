import { Link } from "react-router-dom";
import { useState, useEffect, createContext, useContext } from 'react';
import { LoadingSpinner } from "../../../components/shared";
import { getStocks, getMaxPage } from "../../../js/finance/stock/stockApiHandler";

const Stock = () => {

    const [stocks, setStocks] = useState([]);
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(0);
    const [loading, setLoading] = useState(true);

    const stocksLoader = async () => {
        const stocks = await getStocks(page);
        const maxPage = await getMaxPage();
        if (!stocks || !maxPage) {
            throw new Response("",
                {
                    status: 404,
                    statusText: "Not Found",
                });
        }
        setStocks(stocks);
        setMaxPage(maxPage.maxPage);
        setLoading(false);
    }

}

export default Stock;