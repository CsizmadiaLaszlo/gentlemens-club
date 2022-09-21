import {
    useLoaderData,
} from "react-router-dom";

import {getAllCurrency} from "../../js/finance/bank/bankApiHandler";

export async function loader() {
    const currencies = await getAllCurrency();
    // if (!currencies) {
    //     throw new Response("", {
    //         status: 404,
    //         statusText: "Not Found",
    //     });
    // }
    return currencies;
}

export default function Accounts() {
    const currencies = useLoaderData();
    return (
        <div className="account-grid-parent">
            <div className="account-grid-left">
                <div className="account-container">
                    <div className="account-details">
                        <div className="currency-container">
                            <div style={{display: "flex"}}>
                                <p className="currency-value">{currencies[0]["Value"]}</p>
                                <p className="currency-symbol"></p>
                                <div className="dropdown">
                                    <p className="dropdown-arrow dropdown-toggle" data-bs-toggle="dropdown"
                                       aria-expanded="false" style={{textAlign: "center"}}></p>
                                    <ul className="dropdown-menu" id="dropdown-menu">
                                        <li>
                                            <p className="dropdown-item" data-acronym={currencies[0]["Acronym"]}><span></span> {currencies[0]["Acronym"]}</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <p className="currency-name">{currencies[0]["Name"]}</p>
                        </div>
                        <div className="flag-container">
                            <span className="fi fi-hu flag-icon" data-country="xx"></span>
                        </div>
                        <div className="account-action-container">
                            <div className="btn-group" role="group" aria-label="Basic example">
                                <button type="button" className="btn btn-outline-secondary"><i
                                    className="fa-solid fa-plus"></i> Add money
                                </button>
                                <button type="button" className="btn btn-outline-secondary"><i
                                    className="fa-solid fa-arrow-right-arrow-left"></i> Transfer
                                </button>
                                <button type="button" className="btn btn-outline-secondary"><i
                                    className="fa-solid fa-arrows-rotate"></i> Exchange
                                </button>
                            </div>
                        </div>
                    </div>
                    <h4>Transaction history</h4>
                    <div className="transaction-history-container">
                    </div>
                </div>
            </div>
            <div className="account-grid-right" hidden="hidden">
                <i className="fa-solid fa-x" id="transaction-detail-close"></i>
                {/*<div className="mapouter" style="text-align: center; align-content: center">*/}
                {/*    <div className="gmap_canvas">*/}
                {/*        <iframe width="400" height="300" id="google-map-canvas"*/}
                {/*                src="https://maps.google.com/maps?q=Apple One Apple Park Way Cupertino, CA 95014&t=&z=17&ie=UTF8&iwloc=&output=embed">*/}
                {/*        </iframe>*/}
                {/*        <style>.mapouter{position:relative;text-align:right;height:500px;width:600px;}</style>*/}
                {/*        <style>.gmap_canvas {overflow:hidden;background:none!important;height:500px;width:600px;}</style>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
        </div>
    )
}