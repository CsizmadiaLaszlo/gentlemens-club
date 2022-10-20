import {Footer} from "../components/layout";
import { FinanceContainer, FinanceHeader } from "../components/finance/financeComponents";

import { useContext } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "../services/authentication/userContext";

export default function Finance() {
    const { user } = useContext(UserContext);

    if (user === null) {
        return (
            <Navigate to="/" />
        );
    }

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