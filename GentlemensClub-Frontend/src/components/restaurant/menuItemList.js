const MenuItemList = () => {
    return (
        <div className="w-100">
            <nav>
                <div className="nav nav-tabs border-secondary" id="nav-tab" role="tablist">
                    <button className="nav-link text-secondary active" id="nav-dishes-tab" data-bs-toggle="tab" data-bs-target="#nav-dishes" type="button" role="tab" aria-controls="nav-dishes" aria-selected="true">Dishes</button>
                    <button className="nav-link text-secondary" id="nav-drinks-tab" data-bs-toggle="tab" data-bs-target="#nav-drinks" type="button" role="tab" aria-controls="nav-drinks" aria-selected="false">Drinks</button>
                    <button className="nav-link text-secondary" id="nav-desserts-tab" data-bs-toggle="tab" data-bs-target="#nav-desserts" type="button" role="tab" aria-controls="nav-desserts" aria-selected="false">Desserts</button>
                </div>
            </nav>
            <div className="tab-content border-secondary" id="nav-tabContent">
                <div className="tab-pane fade show active" id="nav-dishes" role="tabpanel" aria-labelledby="nav-dishes-tab" tabIndex="0">
                    Dishes here
                </div>
                <div className="tab-pane fade" id="nav-drinks" role="tabpanel" aria-labelledby="nav-drinks-tab" tabIndex="1">
                    <div className="row row-cols-1 row-cols-md-3 g-4">
                        <div className="col">
                            <div className="card m-3 bg-dark border-secondary">
                                <img src={require("../../assets/img/restaurant/foods/cocacola.png")} className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">Coca Cola</h5>
                                    <p className="card-text">A fine beverage.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card m-3 bg-dark border-secondary">
                                <img src={require("../../assets/img/restaurant/foods/pepsi.png")} className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">Pepsi</h5>
                                    <p className="card-text">A more fine beverage.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card m-3 bg-dark border-secondary">
                                <img src={require("../../assets/img/restaurant/foods/icetea.png")} className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">Ice Tea</h5>
                                    <p className="card-text">A drink.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card m-3 bg-dark border-secondary">
                                <img src={require("../../assets/img/restaurant/foods/whiskey.png")} className="card-img-top" alt="..." />
                            <div className="card-body">
                                    <h5 className="card-title">Whiskey</h5>
                                    <p className="card-text">Another drink.</p>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
                <div className="tab-pane fade" id="nav-desserts" role="tabpanel" aria-labelledby="nav-desserts-tab" tabIndex="2">
                    Desserts here
                </div>
            </div>
        </div>
    )
}



export default MenuItemList