import { useState, useEffect, createContext, useContext } from 'react';
import { useParams } from "react-router-dom";
import { LoadingSpinner } from "../../../components/shared";
import { getYearlyStock } from "../../../js/finance/stock/stockApiHandler";

const YearlyStatistics = () => {

    const [yearlyStatistic, setYearlyStatistic] = useState([]);
    const [loading, setLoading] = useState(true);
    const { symbol } = useParams();

}

export default YearlyStatistics;