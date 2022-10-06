import { Outlet } from 'react-router-dom';
import { Footer } from '../components/layout';
import { RestaurantHeader } from '../components/restaurant/restaurantLayoutComponents';
import RestaurantHomeApp from './restaurant/home';
import RestaurantMenuApp from './restaurant/menu';
import RestaurantTableApp from './restaurant/table';

export function RestaurantLayout() {
    return (
        <div>
            <RestaurantHeader />
            <div className={"container"}>
                <main role={"main"}>
                    <Outlet />
                </main>
            </div>
            <Footer />
        </div>
    );
}

export function RestaurantHome() {
    return (
        <RestaurantHomeApp />
    );
}

export function RestaurantMenu() {
    return (
        <RestaurantMenuApp />
    );
}

export function RestaurantTable() {
    return (
        <RestaurantTableApp />
    );
}