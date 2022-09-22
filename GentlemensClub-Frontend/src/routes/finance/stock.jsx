import { Link } from "react-router-dom";
import React, { Component } from 'react';

import { getStocks, getMaxPage } from "../../js/finance/stock/stockApiHandler";


export default class Stock extends Component {

    constructor(props) {
        super(props);
        this.state = {
            stocks: [],
            page: 1,
            next: 2,
            prev: 0,
            maxPage: 0,
            loading: true
        };

        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        this.stocksLoader();
    }


    async stocksLoader() {
        const stocks = await getStocks(this.state.page);
        const maxPage = await getMaxPage();
        if (!stocks || !maxPage) {
            throw new Response("",
                {
                    status: 404,
                    statusText: "Not Found",
                });
        }
        this.setState({ stocks: stocks, maxPage: maxPage.maxPage, loading: false });
    }

}