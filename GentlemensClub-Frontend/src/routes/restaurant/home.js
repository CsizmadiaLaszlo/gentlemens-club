import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Home() {

    return (
        <div className='text-center'>
            <h1>Welcome to our restaurant</h1>
            <br />
            <p>
                We offer a wide variety of foods, drinks and desserts for our members.
            </p>
            <br /><br />
            <p>
                Reserve your table now, to enjoy our delicious foods!
            </p>
            <Link className={"btn btn-secondary"} to={'/restaurant/tables'}>Reserve a table now</Link>
        </div>
    ); 

}

export default function RestaurantHomeApp() {
    return <Home /> ;
}