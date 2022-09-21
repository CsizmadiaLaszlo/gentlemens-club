import logo from '../assets/img/shared/GC_logo.jpg';

import {
    Link, 
    NavLink
} from "react-router-dom";

export function Header() {
    return (
        <header>
            <nav
                className={"navbar navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow mb-3 navbar-dark text-light"}>
                <div className={"container-fluid"}>
                    <Link to={`/`} className={"navbar-brand text-center"}>
                        <img src={logo} alt={"Gentlemen's Club logo."} width={"50%"} height={"50%"}/>
                    </Link>
                    <div className={"navbar-collapse collapse d-sm-inline-flex justify-content-between"}>
                        <ul className={"navbar-nav flex-grow-1"}>
                            <li key={"nav-item-1"} className={"nav-item"}>
                                <Link className={"nav-link text-light"} to={'/restaurant'}>Restaurant</Link>
                            </li>
                            <li key={"nav-item-2"} className={"nav-item"}>
                                <Link className={"nav-link text-light"} to={'/fitness'}>Fitness/Wellness</Link>
                            </li>
                            <li key={"nav-item-3"} className={"nav-item"}>
                                <Link className={"nav-link text-light"} to={'/healthcare'}>Private
                                    healthcare</Link>
                            </li>
                            <li key={"nav-item-4"} className={"nav-item"}>
                                <Link className={"nav-link text-light"} to={'/membership'}>Membership</Link>
                            </li>
                            <li key={"nav-item-5"} className={"nav-item"}>
                                <Link className={"nav-link text-light"} to={'/finance'}>Finance</Link>
                            </li>
                            <li key={"nav-item-6"} className={"nav-item"}>
                                <Link className={"nav-link text-light"} to={'/contact'}>Contact</Link>
                            </li>
                        </ul>
                        {/* TODO REPLACE THIS WITH the new way */}
                        {/*<ul className="navbar-nav flex-grow-1">*/}
                        {/*    <partial name="_LoginStatusPartial"/>*/}
                        {/*</ul>*/}
                        {/* THIS IS THE NEW WAY */}
                        {/*<NavLink*/}
                        {/*    to={`contacts/${contact.id}`}*/}
                        {/*    className={({isActive, isPending}) =>*/}
                        {/*        isActive*/}
                        {/*            ? "active"*/}
                        {/*            : isPending*/}
                        {/*                ? "pending"*/}
                        {/*                : ""*/}
                        {/*    }*/}
                        {/*>*/}
                        {/*    {contact.first || contact.last ? (*/}
                        {/*        <>*/}
                        {/*            {contact.first} {contact.last}*/}
                        {/*        </>*/}
                        {/*    ) : (*/}
                        {/*        <i>No Name</i>*/}
                        {/*    )}{" "}*/}
                        {/*    {contact.favorite && <span>★</span>}*/}
                        {/*</NavLink>*/}
                    </div>
                </div>
            </nav>
        </header>
    )
}

export function Footer() {
    return (
        <footer className="border-top footer">
            <div className="container">
                &copy; 2022 - Gentlemen's Club
            </div>
        </footer>
    )
}