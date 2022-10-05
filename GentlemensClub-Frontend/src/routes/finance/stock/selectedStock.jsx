import { Link, useParams } from "react-router-dom";
import { useState, useEffect, createContext, useContext } from 'react';
import { LoadingSpinner } from "../../../components/shared";
import { getSelectedStock } from "../../../js/finance/stock/stockApiHandler";
import placeholder from "../../../assets/img/stock/placeholder_chart.jpg"

const SelectedStock = () => {
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
}
export default SelectedStock;