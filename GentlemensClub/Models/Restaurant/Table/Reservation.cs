namespace GentlemensClub.Models.Restaurant.Table;

public class Reservation
{
    public int Id { get; set; }
    public DateTime ReservationStartDate { get; set; }
    public int Member { get; set; }
}