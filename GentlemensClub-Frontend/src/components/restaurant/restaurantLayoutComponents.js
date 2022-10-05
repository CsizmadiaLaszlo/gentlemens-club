import logo from './../../assets/img/shared/GC_logo.jpg';

import {
    Link, Outlet
} from "react-router-dom";
import Restaurant from '../../routes/restaurant';
import RestaurantMenuApp from '../../routes/restaurant/menu';
import RestaurantApp from '../../routes/restaurant/table';

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
                            <li className={"nav-item"}>
                                <Link className={"nav-link text-light"} to={'/restaurant'}>Home</Link>
                            </li>
                            <li className={"nav-item"}>
                                <Link className={"nav-link text-light"} to={'/restaurant/menu'}>Menu</Link>
                            </li>
                            <li className={"nav-item"}>
                                <Link className={"nav-link text-light"} to={'/restaurant/tables'}>Tables</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export function RestaurantHomeContainer() {
    return (
        <RestaurantApp />
    );
}

export function RestaurantMenuContainer() {
    return (
        <RestaurantMenuApp />
    );
}

export function RestaurantTableContainer() {
    return (
        <RestaurantApp />
    );
}