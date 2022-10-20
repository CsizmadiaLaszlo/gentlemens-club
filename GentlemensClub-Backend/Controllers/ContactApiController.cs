using GentlemensClub.Models;
using GentlemensClub.Models.Authentication;
using GentlemensClub.Models.DataTransferObjects;
using GentlemensClub.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace GentlemensClub.Controllers.ApiControllers;

[Route("api/contact")]
[ApiController]
public class ContactApiController : ControllerBase
{
    private readonly IContactService _contactService;
    private readonly IAccountService _accountService;

    public ContactApiController(IContactService contactService, IAccountService accountService)
    {
        _contactService = contactService;
        _accountService = accountService;
    }

    /// <summary>
    /// Save data from incoming Form at Contact page.
    /// </summary>
    /// <param name="formData"></param>
    /// <returns></returns>
    [HttpPost("save")]
    public async Task<IActionResult> SaveContactFormData([FromBody] ContactPageFormDto formData)
    {
        Account? account = null;
        
        if (User.Identity.IsAuthenticated)
        {
            int accountId = int.Parse(User.Claims.FirstOrDefault(claim => claim.Type == "UserId")!.Value);
            account = await _accountService.GetAccountByAccountId(accountId);
        }

        ContactForm savedContactForm = await _contactService.SaveContactFormData(formData, account);
        
        return CreatedAtAction(nameof(SaveContactFormData), savedContactForm);
    }
}