import { createContext } from "react";

const UserContext = createContext(
    {
        user: {
            name: null,
            userId: null,
        },
        setUser: () => { },
    }
);

export default UserContext;