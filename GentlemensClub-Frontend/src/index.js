// IMAGINE THIS FILE IS CALLED MAIN.JS --..--

import React, { useState } from 'react';
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

import Stock from "./routes/finance/stock/stocks";
import SelectedStock from "./routes/finance/stock/selectedStock";
import WeeklyStatistics from "./routes/finance/stock/weeklyStatistics";
import YearlyStatistics from "./routes/finance/stock/yearlyStatistics";

// Contexts
import UserContext from './services/authentication/userContext';

// Login util
import { getUserFromJwt } from './services/authentication/authenticationUtils';
import { RestaurantHome, RestaurantMenu, RestaurantTable } from './routes/restaurant';
import {FinanceContainer} from "./components/finance/financeComponents";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        errorElement: <ErrorPage/>,
        children: [
            {index: true, element: <Index/>},
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
            {
                path: "/finance",
                element: <FinanceContainer/>,
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
                        path: "selected-stock/:symbol",
                        element: <SelectedStock />,
                    },
                    {
                        path: "selected-stock/weekly-statistics/:symbol",
                        element: <WeeklyStatistics />,
                    },
                    {
                        path: "selected-stock/yearly-statistics/:symbol",
                        element: <YearlyStatistics />,
                    },
                ],
            },
        ],
    },
    {
        path: "/restaurant",
        element: <RestaurantHome />,
        errorElement: <ErrorPage/>
    },
    {
        path: "/restaurant/menu",
        element: <RestaurantMenu />,
        errorElement: <ErrorPage/>
    },
    {
        path: "/restaurant/tables",
        element: <RestaurantTable />,
        errorElement: <ErrorPage/>
    }
]);

const App = () => {
    const [user, setUser] = useState(getUserFromJwt());

    return (
        <UserContext.Provider value={{ user, setUser }}>
            <RouterProvider router={router}/>
        </UserContext.Provider>
    );
}

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
