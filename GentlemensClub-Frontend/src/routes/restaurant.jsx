import { Footer } from '../components/layout';
import { RestaurantHeader } from '../components/restaurant/restaurantLayoutComponents';
import RestaurantApp from '../routes/restaurant/table';

export default function RestaurantHome() {
    return (
        <div>
            <RestaurantHeader />
            <div className={"container"}>
                <main role={"main"}>
                    <RestaurantApp />
                </main>
            </div>
            <Footer />
        </div>
    );
}