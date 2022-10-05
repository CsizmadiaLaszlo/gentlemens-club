import { Link, useParams } from "react-router-dom";
import { useState, useEffect, createContext, useContext } from 'react';
import { LoadingSpinner } from "../../../components/shared";
import { getSelectedStock } from "../../../js/finance/stock/stockApiHandler";
import placeholder from "../../../assets/img/stock/placeholder_chart.jpg"
