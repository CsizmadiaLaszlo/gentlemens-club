import React, { useDebugValue } from 'react';
import SideCard from '../../components/restaurant/sideCard';
import MapsterMap from '../../components/restaurant/mapsterMap';
import { getTableReservations, loadTableData } from '../../services/restaurant/restaurantApiHandler';
import jQuery from 'jquery';

class RestaurantTable extends React.Component {

  imagemapsterimage = $('#mapsterImage');

  state = {
    tableCount: 25,
    mapsterimage: this.imagemapsterimage,
    reservationData: null,
    areas: null,
    loaded: false,
    tableData: null,
    clickedTableId: null
  }

  constructor(props) {
    super(props);

    this.loadSelectedTableData = this.loadSelectedTableData.bind(this);
    this.initMapster = this.initMapster.bind(this);
  }

  componentDidMount() {
    getTableReservations().then((reservationData) => {
      this.addKeysToAreas(reservationData);
      this.initMapster();
      this.setState({ loaded: true });
    });
  }

  componentDidUpdate() {
    if (this.state.clickedTableId != null ) {
      loadTableData(this.state.clickedTableId).then((data) => {
        this.setState({ tableData: data, clickedTableId: null });
      });
    }
    if (this.state.reservationData != null ) {
      this.initMapster();
    }
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

    this.setState({ areas: areas });

  }

  initMapster() {
    this.state.mapsterimage.mapster({
      fillColor: "333333",
      fillOpacity: 0.5,
      areas: this.state.areas,
      onClick: function (event) {
        console.log(event);
        //loadTableData(this.id);
      }
    });
  }

  loadSelectedTableData(areaId) {
    this.initMapster();
    this.setState({clickedTableId:areaId});
  }

  render() {
    return (
      <div className="d-inline-flex justify-content-around">
        <SideCard />
        <MapsterMap clickHandler={this.loadSelectedTableData} />
        <TableDataCard tableData={this.state.tableData} />
      </div>
    );
  }
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

export default function restaurantApp() {
  return <RestaurantTable />;
};
