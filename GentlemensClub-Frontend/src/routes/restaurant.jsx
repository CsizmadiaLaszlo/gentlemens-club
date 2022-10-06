import { Link, Outlet } from 'react-router-dom';
import { Footer } from '../components/layout';
import { RestaurantHeader } from '../components/restaurant/restaurantLayoutComponents';
import RestaurantHomeApp from './restaurant/home';
import RestaurantMenuApp from './restaurant/menu';
import RestaurantReservationApp from './restaurant/reservation';
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

export function RestaurantReservation() {
    return (
        <RestaurantReservationApp />
    );
}

export function RestaurantReservationSuccess() {
    return (
        <div className='text-center'>
            <h1 className='text-success'>Reservation Successful!</h1>
            <Link className={"btn btn-secondary"} to={'/restaurant/menu'}>Check the menu</Link>
        </div>
    );
}