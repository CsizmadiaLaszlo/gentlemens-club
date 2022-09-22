import {Footer, Header} from "../components/layout";
import TablePage from './restaurant/table';

export default function Restaurant() {
    return (
        <div>
            <Header></Header>
            <TablePage></TablePage>
            <Footer></Footer>
        </div>
    );
}