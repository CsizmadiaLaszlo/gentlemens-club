import React, { useEffect, useState } from 'react';
import { getFilters } from '../../services/restaurant/restaurantApiHandler';

function Menu() {

    const [filters, setFilters] = useState(null);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        getFilters().then((filters) => {
            console.log(filters);
            setFilters(filters);
            setLoaded(true);
        });
    }, []);

    function getFilterButtons(filters) {

        let content = [];
        let i = 0;

        for (let filter in filters) {
            content.push(<input key={i + filter} type="radio" className="btn-check" name="btnradio" id={"btnradio" + i} autoComplete="off" />)
            content.push(<label key={i} className="btn btn-outline-primary" htmlFor={"btnradio" + i}>{filter}</label>);
            i++;
        }

        return content;

    }
    

    return (
        <div>
            <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                <input type="radio" className="btn-check" name="btnradio" id="btnradio" autoComplete="off" defaultChecked/>
                <label className="btn btn-outline-primary" htmlFor="btnradio">All</label>
                {
                    filters != null ? getFilterButtons(filters) : <></>
                }
            </div>
        </div>
    ); 

}

export default function RestaurantMenuApp() {
    return <Menu /> ;
}