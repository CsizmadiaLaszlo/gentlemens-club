using System.ComponentModel.DataAnnotations.Schema;

namespace GentlemensClub.Models.Restaurant.Table;

public class RestaurantTable
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    public string Description { get; set; }
    public int SeatCount { get; set; }
    public Reservation? Reservation { get; set; }
}