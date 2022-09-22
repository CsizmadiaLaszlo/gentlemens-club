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

}