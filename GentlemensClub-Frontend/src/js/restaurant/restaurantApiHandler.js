export async function getTableReservations() {
    var apiUrl = '/api/RestaurantApi/get-table-reservations';
    return await fetch(apiUrl).then((response) => response.json());
}