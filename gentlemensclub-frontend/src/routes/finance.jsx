import {Footer} from "../components/layout";
import {FinanceContainer, FinanceHeader} from "../components/finance/financeComponents";

export default function Finance() {
    return (
        <div>
            <FinanceHeader></FinanceHeader>
            <div className={"container"}>
                <main role={"main"} className={"pb-3"}>
                    <FinanceContainer></FinanceContainer>
                </main>
            </div>
            <Footer></Footer>
        </div>
    );
}