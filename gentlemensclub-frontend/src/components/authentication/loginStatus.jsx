export function LoginStatus() {
    return (
        <ul className={"navbar-nav flex-grow-1"}>
            <li className={"nav-item"}>
                <button className={"btn btn-link nav-link text-light"}>Login</button>
            </li>
            <li className={"nav-item"}>
                <button className={"btn btn-link nav-link text-light"}>Register</button>
            </li>
        </ul>
    );
}