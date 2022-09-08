var mapsterImage = $("#mapsterimage");

const tableCount = 25;

var areas = [tableCount];

for (var i = 1; i <= tableCount; i++) {
    areas[i-1] = $("#table-" + i);
}

function init() {

    getTableReservations();

}

function initMapster(generatedAreas) {
    mapsterImage.mapster({
        fillColor: "333333",
        fillOpacity: 0.5,
        mapKey: 'data-key',
        areas: generatedAreas,
        onClick: function (e) {
            loadTableData(this.id);
        }
    });
}

function addKeysToAreas(data) {

    var areas = [tableCount];

    document.querySelectorAll("area").forEach(element => {
        var templateReserved = {
            key: "reserved",
            fillColor: "FF0000",
            fillOpacity: 0.25,
            selected: true,
            isDeselectable: false
        };
        var templateAvailable = {
            key: "available",
            fillColor: "338833",
            isSelectable: false
        };

        var tableId = element.id.split('-')[1];
        element.dataset.key = tableId;
        if (data[tableId] == null) {
            templateAvailable.key = tableId;
            areas.push(templateAvailable);
        } else {
            templateReserved.key = tableId;
            areas.push(templateReserved);
        }
    });

    initMapster(areas);

}

function updateTableInformationModal(tableData) {

    console.log(tableData);

    var container = document.getElementById("tableDataContainer");

    container.innerHTML = "";

    var modalHTML = '<div class="card bg-dark text - light border - secondary">' +
        `<div class="card-header border-secondary">Table ${tableData.Id}'s information</div>` +
        '<div class="card-body">';

    if (tableData.Reservation == null) {
        modalHTML += '<h5 class="card-title text-success">This table is available for reservation.</h5>';
    } else {
        modalHTML += '<h5 class="card-title text-danger">This table is currently reserved.</h5>';
    }

    modalHTML += `<p class="card-text">${tableData.Description}</p>` +
        '<p class="card-text">Maximum reservation time is 24 hours.</p>' +
        `<p class="card-text">This table has ${tableData.SeatCount} seats</p>`;

    if (tableData.Reservation == null) {
        modalHTML += '<a href="#" class="btn btn-secondary">Reserve this table</a>';
    } else {
        modalHTML += '<button class="btn btn-secondary" disabled>Reservation not available</button>';
    }

    modalHTML += "</div></div>";

    console.log(modalHTML);

    container.innerHTML = modalHTML;

}

async function loadTableData(tableId) {
    tableId = tableId.split("-")[1];
    var apiUrl = `/api/RestaurantApi/get-table-data?tableId=${tableId}`;
    fetch(apiUrl).then((response) => response.json()).then((data) => {
        updateTableInformationModal(data);
    });

}

async function getTableReservations() {
    var apiUrl = '/api/RestaurantApi/get-table-reservations';
    fetch(apiUrl).then((response) => response.json()).then((data) => {
        addKeysToAreas(data);
    });
}

window.addEventListener("load", init,);