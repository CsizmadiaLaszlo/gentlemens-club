import React, { useEffect, useState } from 'react';
import MenuItemList from '../../components/restaurant/menuItemList';
import { getFilters } from '../../services/restaurant/restaurantApiHandler';

function Menu() {

    const [filters, setFilters] = useState(null);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        getFilters().then((filters) => {
            setFilters(filters);
            setLoaded(true);
        });
    }, []);

    function getFilterButtons(filters) {

        let content = [];
        let i = 0;

        for (let filter in filters) {
            content.push(<input key={i + filter} type="radio" className="btn-check border-secondary" name="btnradio" id={"btnradio" + i} autoComplete="off" />)
            content.push(<label key={i} className="btn btn-outline-secondary" htmlFor={"btnradio" + i}>{filter}</label>);
            i++;
        }

        return content;

    }
    

    return (
        <div className='container row'>
            <div className='col col-lg-2'>
                <div className='position-absolute'>
                    <div className="card bg-dark border-secondary">
                        <div className="card-header border-secondary">
                            Filter
                        </div>
                        <div className="btn-group-vertical card-body d-flex flex-column">
                            <input type="radio" className="btn-check" name="btnradio" id="btnradio" autoComplete="off" defaultChecked />
                            <label className="btn btn-outline-secondary" htmlFor="btnradio">All</label>
                            {filters != null ? getFilterButtons(filters) : <></>}
                        </div>
                    </div>
                </div>
            </div>
            <div className='col'>
                <MenuItemList />
            </div>
        </div>
    ); 

}

export default function RestaurantMenuApp() {
    return <Menu /> ;
}