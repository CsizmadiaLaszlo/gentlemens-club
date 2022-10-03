import logo from '../assets/img/shared/GC_logo.jpg';

import {
    Link, Outlet,
} from "react-router-dom";
import {LoginStatus} from '../components/authentication/loginStatus.jsx';

const Header = () => {
    return (
        <header>
            <nav
                className={"navbar navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow mb-3 navbar-dark text-light"}>
                <div className={"container-fluid"}>
                    <Link to={`/`} className={"navbar-brand text-center"}>
                        <img src={logo} alt={"Gentlemen's Club logo."} style={{width: "50%", height: "50%"}}/>
                    </Link>
                    <div className={"navbar-collapse collapse d-sm-inline-flex justify-content-between"}>
                        <ul className={"navbar-nav flex-grow-1"}>
                            <li key={"header-nav-item-1"} className={"nav-item"}>
                                <Link className={"nav-link text-light"} to={'/restaurant'}>Restaurant</Link>
                            </li>
                            <li key={"header-nav-item-2"} className={"nav-item"}>
                                <Link className={"nav-link text-light"} to={'/fitness'}>Fitness/Wellness</Link>
                            </li>
                            <li key={"header-nav-item-3"} className={"nav-item"}>
                                <Link className={"nav-link text-light"} to={'/healthcare'}>Private
                                    healthcare</Link>
                            </li>
                            <li key={"header-nav-item-4"} className={"nav-item"}>
                                <Link className={"nav-link text-light"} to={'/membership'}>Membership</Link>
                            </li>
                            <li key={"header-nav-item-5"} className={"nav-item"}>
                                <Link className={"nav-link text-light"} to={'/finance'}>Finance</Link>
                            </li>
                            <li key={"header-nav-item-6"} className={"nav-item"}>
                                <Link className={"nav-link text-light"} to={'/contact'}>Contact</Link>
                            </li>
                        </ul>
                        <LoginStatus/>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export const Footer = () => {
    return (
        <footer className="border-top footer">
            <div className="container">
                &copy; 2022 - Gentlemen's Club
            </div>
        </footer>
    )
}

const Layout = () => {
    return (
        <div>
            <Header></Header>
            <div className={"container"}>
                <main role={"main"} className={"pb-3"}>
                    <Outlet />
                </main>
            </div>
            <Footer></Footer>
        </div>
    )
}

export default Layout;