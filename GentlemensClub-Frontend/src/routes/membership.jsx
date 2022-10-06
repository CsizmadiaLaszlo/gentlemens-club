import { useContext } from "react";
import MemberShipPage from "../components/membership/membershipPage";

import UserContext from "../services/authentication/userContext";

const Membership = () => {
    const { user } = useContext(UserContext);

    if (user === null) {
        return (
            <>
                <div>
                    Please log in to access this page!
                </div>
            </>
        );
    }

    return (
        <MemberShipPage />
    );
}

export default Membership;