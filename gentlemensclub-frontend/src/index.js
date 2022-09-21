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

// Component import for route pages
import Index from "./routes/index.jsx";
import Restaurant from "./routes/restaurant";
import Fitness from "./routes/fitness";
import Healthcare from "./routes/healthcare";
import Membership from "./routes/membership";
import Bank from "./routes/bank";
import Contact from "./routes/contact";
import Service from "./routes/service";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Index/>,
        errorElement: <ErrorPage/>,
    },
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
        path: "/bank",
        element: <Bank/>,
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
