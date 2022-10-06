import React, { useEffect, useState } from 'react';
import SideCard from '../../components/restaurant/sideCard';
import MapsterMap from '../../components/restaurant/mapsterMap';
import { getTableReservations, loadTableData } from '../../services/restaurant/restaurantApiHandler';
import $ from 'jquery';

function RestaurantTable() {

  const [tableCount, setTableCount] = useState(25);
  const [mapsterimage, setMapsterimage] = useState($('#mapsterImage'));
  const [reservationData, setReservationData] = useState(null);
  const [mapsterAreas, setMapsterAreas] = useState(null);
  const [loaded, setLoaded] = useState(null);
  const [tableData, setTableData] = useState(null);
  const [clickedTableId, setClickedTableId] = useState(null);

  useEffect(() => {
    getTableReservations().then((reservationData) => {
      console.log(reservationData);
      addKeysToAreas(reservationData);
      initMapster();
      setLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (clickedTableId != null ) {
      loadTableData(clickedTableId).then((data) => {
        setTableData(data);
        setClickedTableId(null);
      });
    }
    if (reservationData != null ) {
      initMapster();
    }
  }, [clickedTableId]);

  const addKeysToAreas = (data) => {

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

    setMapsterAreas(areas);

  }

  const initMapster = () => {
    // mapsterimage.mapster({
    //   fillColor: "333333",
    //   fillOpacity: 0.5,
    //   areas: mapsterAreas,
    //   onClick: function (event) {
    //     console.log(event);
    //     //loadTableData(this.id);
    //   }
    // });
    // ImageMap('#mapsterImage');
  }

  const loadSelectedTableData = (areaId) => {
    initMapster();
    setClickedTableId(areaId);
  }

  return (
    <div className="d-inline-flex justify-content-around">
      <SideCard />
      <MapsterMap clickHandler={loadSelectedTableData} />
      <TableDataCard tableData={tableData} />
    </div>
  );
}

function TableDataCard(props) {
  return (
    <div id="tableDataContainer" className="w-25">
      { props.tableData == null ?
        <></>
        :
        <RenderTableInformationModal tableData={props.tableData}></RenderTableInformationModal>
      }
    </div>
  )
}

function RenderTableInformationModal(props) {
  var tableData = props.tableData;

  return (
    <div className="card bg-dark text - light border - secondary">
      <div className="card-header border-secondary">
        Table {tableData.id}'s information
      </div>
      <div className="card-body">
        {tableData.reservation == null ?
          <h5 className="card-title text-success">This table is available for reservation.</h5>
          :
          <h5 className="card-title text-danger">This table is currently reserved.</h5>
        }
        <p className="card-text">{tableData.description}</p>
        <p className="card-text">Maximum reservation time is 24 hours.</p>
        <p className="card-text">This table has {tableData.seatCount} seats</p>
        {tableData.reservation == null ?
          <a href="/Restaurant/Reservation?table=${tableData.Id}" className="btn btn-secondary">Reserve this table</a>
          :
          <button className="btn btn-secondary" disabled>Reservation not available</button>
        }
      </div>
    </div>
  )
}

export default function RestaurantTableApp() {
  return <RestaurantTable />;
};
