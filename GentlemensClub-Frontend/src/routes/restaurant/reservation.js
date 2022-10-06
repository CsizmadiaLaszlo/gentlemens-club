import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

function Reservation() {

    const [searchParams, setSearchParams] = useSearchParams();
    searchParams.get("table")

    return (
        <div className='d-flex justify-content-center'>
            <div className='text-center w-50 border border-secondary p-5'>
                Reservation of {searchParams}
                <div className='d-flex m-5'>
                    <label className='w-25' for="reservationDate">Reservation date</label>
                    <input id="reservationDate" className="form-control w-75" type="date" />
                </div>
                <Link className={"btn btn-secondary"} to={'/restaurant/reservationSuccess'}>Submit reservation</Link>
            </div>
        </div>
    ); 

}

export default function RestaurantReservationApp() {
    return <Reservation /> ;
}