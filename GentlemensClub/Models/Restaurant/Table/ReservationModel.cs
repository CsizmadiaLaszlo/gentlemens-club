namespace GentlemensClub.Models.Restaurant.Table;

public class ReservationModel
{
    public int Id { get; set; }
    public DateTime ReservationStartDate { get; set; }
    public int Member { get; set; }
}