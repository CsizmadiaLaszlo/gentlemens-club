import { Link } from "react-router-dom";
import { useState, useEffect, createContext, useContext } from 'react';
import { LoadingSpinner } from "../../../components/shared";
import { getStocks, getMaxPage } from "../../../services/finance/stock/stockApiHandler";

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

    useEffect(() => {
        setLoading(true);
        stocksLoader();
    }, [page]);


    const handleClick = (newPage) => {
        setPage(newPage);
    }

    const pagination = () => {
        return (
            <div>
                <div className="pag d-flex flex-wrap justify-content-center">
                    {page > 1
                        ? (<a className="btn btn-dark border-light" onClick={() => handleClick(page - 1)}>Previous</a>)
                        : (<a className="btn btn-dark border-light disabled" onClick={() => handleClick(
                            page - 1)}>Previous</a>)}
                    <a className="btn btn-dark border-light">{page}</a>
                    {maxPage > page
                        ? (<a className="btn btn-dark border-light" onClick={() => handleClick(page + 1)}>Next</a>)
                        : (<a className="btn btn-dark border-light disabled" onClick={() => handleClick(
                            page + 1)}>Next</a>)}
                </div>
            </div>
        );
    }


    const renderStocks = () => {
        return (
            <div>
                <div className="text-white d-flex flex-wrap justify-content-center">
                    <h1>Stocks</h1>
                </div>
                <div className="d-flex flex-wrap">
                    {stocks.map(stock => {
                        return (
                            <div key={stock.symbol} className="stock card bg-dark text-white border-light">
                                <div><Link to={`/finance/selected-stock/${stock.symbol}`}>{stock.name}</Link></div>
                                <div>{stock.symbol}</div>
                            </div>
                        );
                    })}
                </div>
                <div className="pag d-flex flex-wrap justify-content-center">
                    {pagination()}
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

export default Stock;