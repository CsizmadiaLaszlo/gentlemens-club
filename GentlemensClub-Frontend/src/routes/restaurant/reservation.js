import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

function Reservation() {

    const [searchParams, setSearchParams] = useSearchParams();
    searchParams.get("table")

    return (
        <div className='text-center'>
            Reservation of table {searchParams["table"]}
        </div>
    ); 

}

export default function RestaurantReservationApp() {
    return <Reservation /> ;
}