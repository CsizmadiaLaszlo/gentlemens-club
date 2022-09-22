import React, { useDebugValue } from 'react';
import SideCard from '../../components/restaurant/sideCard';
import TableDataCard from '../../components/restaurant/tableDataCard';
import MapsterMap from '../../components/restaurant/mapsterMap';

class RestaurantTable extends React.Component {
  state = {
    tableCount: 25,
    mapsterimage: $("#mapsterImage")
  }

  componentDidMount() {
    this.getTableReservations();
  }

  addKeysToAreas(data) {

    var areas = [this.state.tableCount];

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

    this.initMapster(areas);

}

initMapster(generatedAreas) {
  this.state.mapsterimage.mapster({
        fillColor: "333333",
        fillOpacity: 0.5,
        areas: generatedAreas,
        onClick: function (e) {
            console.log(69);
            //loadTableData(this.id);
        }
    });
}

updateTableInformationModal(tableData) {

    var container = document.getElementById("tableDataContainer");

    container.innerHTML = "";

    var modalHTML = '<div className="card bg-dark text - light border - secondary">' +
        `<div className="card-header border-secondary">Table ${tableData.Id}'s information</div>` +
        '<div className="card-body">';

    if (tableData.Reservation == null) {
        modalHTML += '<h5 className="card-title text-success">This table is available for reservation.</h5>';
    } else {
        modalHTML += '<h5 className="card-title text-danger">This table is currently reserved.</h5>';
    }

    modalHTML += `<p className="card-text">${tableData.Description}</p>` +
        '<p className="card-text">Maximum reservation time is 24 hours.</p>' +
        `<p className="card-text">This table has ${tableData.SeatCount} seats</p>`;

    if (tableData.Reservation == null) {
        modalHTML += `<a href="/Restaurant/Reservation?table=${tableData.Id}" className="btn btn-secondary">Reserve this table</a>`;
    } else {
        modalHTML += '<button className="btn btn-secondary" disabled>Reservation not available</button>';
    }

    modalHTML += "</div></div>";

    container.innerHTML = modalHTML;

}

async loadTableData(tableId) {
    tableId = tableId.split("-")[1];
    var apiUrl = `/api/RestaurantApi/get-table-data?tableId=${tableId}`;
    fetch(apiUrl).then((response) => response.json()).then((data) => {
        this.updateTableInformationModal(data);
    });
}

async getTableReservations() {
    var apiUrl = '/api/RestaurantApi/get-table-reservations';
    fetch(apiUrl).then((response) => response.json()).then((data) => {
        this.addKeysToAreas(data);
    });
}

  render() {
    return (
      <div className="d-inline-flex justify-content-around">
        <SideCard />
        <MapsterMap />
        <TableDataCard />
      </div>
    );
  }
}

export default function restaurantApp() {
    return <RestaurantTable />;
};
