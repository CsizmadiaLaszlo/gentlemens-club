﻿using GentlemensClub.Daos;
using GentlemensClub.Models.Restaurant.Table;

public interface ITableDao : IDao<TableModel>
{

    public Dictionary<int, ReservationModel> GetTableReservations();

}