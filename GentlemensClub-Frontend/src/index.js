// IMAGINE THIS FILE IS CALLED MAIN.JS --..--

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import ErrorPage from "./error-page.jsx";

// React-route-dom imports
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

// Component import for main route pages
import Layout from "./components/layout";
import Index from "./routes/index.jsx";
import Restaurant from "./routes/restaurant";
import Fitness from "./routes/fitness";
import Healthcare from "./routes/healthcare";
import Membership from "./routes/membership";
import Finance from "./routes/finance";
import Contact from "./routes/contact";
import Service from "./routes/service";

// Sub-page imports
import Accounts from "./routes/finance/accounts";

import SelectedStock from "./routes/finance/selectedStock";
import Stock from "./routes/finance/stock/stocks";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        errorElement: <ErrorPage/>,
        children: [
            {index: true, element: <Index/>},
            {
                path: "/restaurant",
                element: <Restaurant/>,
                errorElement: <ErrorPage/>,
            },
            {
                path: "/fitness",
                element: <Fitness/>,
                errorElement: <ErrorPage/>,
            },
            {
                path: "/healthcare",
                element: <Healthcare/>,
                errorElement: <ErrorPage/>,
            },
            {
                path: "/membership",
                element: <Membership/>,
                errorElement: <ErrorPage/>,
            },
            {
                path: "/contact",
                element: <Contact/>,
                errorElement: <ErrorPage/>,
            },
            {
                path: "/service",
                element: <Service/>,
                errorElement: <ErrorPage/>,
            },
        ],
    },
    {
        path: "/finance",
        element: <Finance/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "account",
                element: <Accounts />
            },
            {
                path: "stock",
                element: <Stock/>
            },
            {
                path: "selected-stock",
                element: <SelectedStock />
            },
        ],
    },
    {
        path: "/restaurant/table",
        element: <Restaurant />,
        errorElement: <ErrorPage />,
    }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
