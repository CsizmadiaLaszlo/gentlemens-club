using System.ComponentModel.DataAnnotations.Schema;

namespace GentlemensClub.Models.Restaurant.Table;

public class Reservation
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    public DateTime ReservationStartDate { get; set; }
    public int Member { get; set; }
}