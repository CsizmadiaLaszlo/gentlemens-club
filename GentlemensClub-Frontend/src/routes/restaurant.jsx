import { Footer } from '../components/layout';
import { RestaurantHeader } from '../components/restaurant/restaurantLayoutComponents';
import RestaurantHomeApp from './restaurant/home';
import RestaurantMenuApp from './restaurant/menu';
import RestaurantTableApp from './restaurant/table';

export function RestaurantHome() {
    return (
        <div>
            <RestaurantHeader />
            <div className={"container"}>
                <main role={"main"}>
                    <RestaurantHomeApp />
                </main>
            </div>
            <Footer />
        </div>
    );
}

export function RestaurantMenu() {
    return (
        <div>
            <RestaurantHeader />
            <div className={"container"}>
                <main role={"main"}>
                    <RestaurantMenuApp />
                </main>
            </div>
            <Footer />
        </div>
    );
}

export function RestaurantTable() {
    return (
        <div>
            <RestaurantHeader />
            <div className={"container"}>
                <main role={"main"}>
                    <RestaurantTableApp />
                </main>
            </div>
            <Footer />
        </div>
    );
}