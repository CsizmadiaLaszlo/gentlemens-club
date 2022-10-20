import { useContext } from "react";
import { Navigate } from "react-router-dom";
import MemberShipPage from "../components/membership/membershipPage";

import UserContext from "../services/authentication/userContext";

const Membership = () => {
    const { user } = useContext(UserContext);

    if (user === null) {
        return (
            <Navigate to="/" />
        );
    }

    return (
        <MemberShipPage />
    );
}

export default Membership;