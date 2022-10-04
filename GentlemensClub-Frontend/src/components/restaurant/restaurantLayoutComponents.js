import logo from './../../assets/img/shared/GC_logo.jpg';
import RestaurantApp from '../../routes/restaurant';

import {
    Link, Outlet
} from "react-router-dom";
import Restaurant from '../../routes/restaurant';

export function RestaurantHeader() {
    return (
        <header>
            <nav
                className={"navbar navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow mb-3 navbar-dark text-light"}>
                <div className={"container-fluid"}>
                    <Link to={`/`} className={"navbar-brand text-center"}>
                        <img src={logo} alt={"Gentlemen's Club logo."} style={{width: "50%", height: "50%"}}/>
                    </Link>
                    <div className={"navbar-collapse collapse d-sm-inline-flex justify-content-between"}>
                        <ul className={"navbar-nav flex-grow-1"}>
                            <li key={"header-nav-item-1"} className={"nav-item"}>
                                <Link className={"nav-link text-light"} to={'/restaurant'}>Home</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export function RestaurantHome() {
    return (
        <RestaurantApp />
    );
}

export function RestaurantMenu() {
    return (
        <RestaurantApp />
    );
}

export function RestaurantTable() {
    return (
        <RestaurantApp />
    );
}