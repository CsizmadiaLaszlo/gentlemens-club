import { Link } from "react-router-dom";

import React, { Component } from 'react';

import { getSelectedStock } from "../../services/finance/stock/stockApiHandler";

export default class SelectedStock extends Component {

    constructor(props) {
        super(props);
        this.state = {
            stock: [],
            symbol: "",
            loading: true
        };
    }

    componentDidMount() {
        const queryParams = new URLSearchParams(window.location.search);
        const symbol = queryParams.get('symbol');
        this.setState({ symbol: symbol });
        this.stocksLoader(symbol);
    }


    async stocksLoader(symbol) {
        const stock = await getSelectedStock(symbol);
        if (!stock) {
            throw new Response("",
                {
                    status: 404,
                    statusText: "Not Found",
                });
        }
        this.setState({ stock: stock, loading: false });
    }


    static renderStock(stock) {
        return (
            <div>
                {Object.keys(stock).length === 0
                    ? (<div class="text-white d-flex flex-wrap justify-content-center"><h2>No available data!</h2></div>)
                    : stock.map(st => { return (<div class="text-white d-flex flex-wrap justify-content-center"><h1>{st.name} statistics</h1></div>)})}
                <div class="d-flex flex-wrap">
                    {stock.map(st => {
                        return (
                        <div class="selected-stock card bg-dark text-white border-light">
                                <div><h2>Price: {st.price}</h2></div>
                                <div><h2>Currency: {st.currency}</h2></div>
                                <div><h2>Exchange: {st.exchange_Long} / {st.exchange_Short}</h2></div>
                                <div><h2>Mic code: {st.mic_Code}</h2></div>
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
                        );
                    })}
                </div>
            {/*<div class="graph-box">*/}
            {/*    <div class="text-white d-flex flex-wrap justify-content-center">*/}
            {/*        <h1>@todayInfo.First().Name weekly graph statistics</h1></div>*/}
            {/*    <div class="d-flex flex-wrap justify-content-center"><img src="~/img/shared/placeholder_chart.jpg" alt="Placeholder for real chart" width="90%" height="30%"></div>*/}
            {/*    <div class="text-white d-flex flex-wrap justify-content-center"><a asp-area="" asp-controller="Stock" asp-action="WeeklyStatistics" asp-route-symbol="@todayInfo.First().Ticker">@todayInfo.First().Name weekly statistics in data</a></div>*/}
            {/*</div>*/}
            {/*<div class="graph-box">*/}
            {/*    <div class="text-white d-flex flex-wrap justify-content-center">*/}
            {/*        <h1>@todayInfo.First().Name yearly graph statistics</h1></div>*/}
            {/*    <div class="d-flex flex-wrap justify-content-center"><img src="~/img/shared/placeholder_chart.jpg" alt="Placeholder for real chart" width="90%" height="30%"></div>*/}
            {/*    <div class="text-white d-flex flex-wrap justify-content-center"><a asp-area="" asp-controller="Stock" asp-action="YearlyStatistics" asp-route-symbol="@todayInfo.First().Ticker">@todayInfo.First().Name yearly statistics in data</a></div>*/}
            {/*</div>*/}

            </div>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : SelectedStock.renderStock(this.state.stock);

        return (
            <div>
                {contents}
            </div>
        );
    }
}