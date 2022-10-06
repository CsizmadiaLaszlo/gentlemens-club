var baseUrl = '/api/restaurant/';

export async function getTableReservations() {
    var apiUrl = 'get-table-reservations';
    return await fetch(baseUrl + apiUrl).then((response) => response.json());
}

export async function loadTableData(selectedTableId) {
    var apiUrl = `get-table-data?tableId=${selectedTableId}`;
    return await fetch(baseUrl + apiUrl).then((response) => response.json());
}

export async function getFilters() {
    var apiUrl = 'get-filters';
    return await fetch(baseUrl + apiUrl).then((response) => response.json());
}

export async function getCategories() {
    var apiUrl = 'get-categories';
    return await fetch(baseUrl + apiUrl).then((response) => response.json());
}