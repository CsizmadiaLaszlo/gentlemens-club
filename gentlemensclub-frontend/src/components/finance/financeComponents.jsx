import logo from "../../assets/img/shared/GC_logo.jpg";
import {Link, Outlet} from "react-router-dom";

export function FinanceHeader() {
    return (
        <header>
            <nav
                className="navbar navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow mb-3 navbar-dark text-light">
                <div className="container-fluid">
                    <Link to={`/`} className={"navbar-brand text-center"}>
                        <img src={logo} alt={"Gentlemen's Club logo."} width={"50%"} height={"50%"}/>
                    </Link>
                    <div className="navbar-collapse collapse d-sm-inline-flex justify-content-between">
                        <ul className="navbar-nav flex-grow-1">
                            <li key={"finance-nav-name"} className="nav-item">
                                <p>Johnny Test</p>
                            </li>
                        </ul>
                        <ul className="navbar-nav flex-grow-1">
                            <li key={"finance-nav-logout"} className="nav-item">
                                <Link className="nav-link text-light" to={"/"}>Logout
                                    from bank</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}

