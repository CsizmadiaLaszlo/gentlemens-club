using GentlemensClub.Data;
using GentlemensClub.Services.Interfaces;

namespace GentlemensClub.Services;

public class ContactService : IContactService
{
    private readonly GentlemensClubContext _context;

    public ContactService(GentlemensClubContext context)
    {
        _context = context;
    }
}