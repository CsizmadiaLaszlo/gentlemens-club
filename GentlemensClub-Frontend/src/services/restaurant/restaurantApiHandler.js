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

export async function getAllMenuItems() {
    var apiUrl = 'get-all-menu-items';
    return await fetch(baseUrl + apiUrl).then((response) => response.json());
}

export async function getAllMenuItemsInCategory(category, specialCategory = undefined) {
    var searchCategory;
    if (specialCategory === undefined) {
        searchCategory = {
            "MenuItemCategory": category
        };
    } else {
        searchCategory = {
            "MenuItemCategory": category,
            "SpecialFoodCategory": specialCategory
        };
    }
    var apiUrl = 'get-all-menu-items-in-category';
    return await fetch(baseUrl + apiUrl, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(searchCategory)
    }).then((response) => response.json());
}