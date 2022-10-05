import { useState, useEffect, createContext, useContext } from 'react';
import { useParams } from "react-router-dom";
import { LoadingSpinner } from "../../../components/shared";
import { getWeeklyStock } from "../../../js/finance/stock/stockApiHandler";

const WeeklyStatistics = () => {

    const [weeklyStatistic, setWeeklyStatistic] = useState([]);
    const [loading, setLoading] = useState(true);
    const { symbol } = useParams();

}

export default WeeklyStatistics;