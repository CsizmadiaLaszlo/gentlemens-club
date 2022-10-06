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
                        <div className="card m-3 bg-dark">
                            <img src={require("../../assets/img/restaurant/foods/steak.png")} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">Steak</h5>
                                <p className="card-text">Our meal.</p>
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