export async function getTableReservations() {
    var apiUrl = '/api/restaurant/get-table-reservations';
    return await fetch(apiUrl).then((response) => response.json());
}

export async function loadTableData(selectedTableId) {
    var apiUrl = `/api/restaurant/get-table-data?tableId=${selectedTableId}`;
    return await fetch(apiUrl).then((response) => response.json());
}