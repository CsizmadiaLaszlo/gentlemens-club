using GentlemensClub.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace GentlemensClub.Controllers.ApiControllers;

[Route("api/contact")]
[ApiController]
public class ContactApiController : ControllerBase
{
    private readonly IContactService _contactService;

    public ContactApiController(IContactService contactService)
    {
        _contactService = contactService;
    }
    
    
}