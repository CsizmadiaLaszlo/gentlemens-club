using GentlemensClub.Data;
using GentlemensClub.Models.Restaurant.Table;
using GentlemensClub.Services.Interfaces.Restaurant.Table;
using Microsoft.EntityFrameworkCore;

namespace GentlemensClub.Services;

public class RestaurantService : IRestaurantService
{
    private readonly GentlemensClubContext _context;

    public RestaurantService(GentlemensClubContext context)
    {
        _context = context;
    }
    
    // TODO define docstring
    public async Task Add(RestaurantTable table)
    {
        throw new NotImplementedException();
    }
}