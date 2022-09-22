import { Link } from "react-router-dom";

import React, { Component } from 'react';

import { getSelectedStock } from "../../js/finance/stock/stockApiHandler";

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


}