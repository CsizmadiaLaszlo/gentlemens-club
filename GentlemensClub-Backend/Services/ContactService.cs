using GentlemensClub.Data;
using GentlemensClub.Models.Authentication;
using GentlemensClub.Models.ContactPage;
using GentlemensClub.Models.DataTransferObjects;
using GentlemensClub.Services.Interfaces;

namespace GentlemensClub.Services;

public class ContactService : IContactService
{
    private readonly GentlemensClubContext _context;

    public ContactService(GentlemensClubContext context)
    {
        _context = context;
    }

    /// <summary>
    /// Save data from incoming Form at Contact page.
    /// If User is signed in, save the corresponding Account as well.
    /// </summary>
    /// <param name="formData"></param>
    /// <param name="account"></param>
    /// <returns>Saved form data</returns>
    public async Task<ContactForm> SaveContactFormData(ContactPageFormDto formData, Account? account)
    {
        ContactForm contactForm = new();

        if (account is null)
        {
            contactForm.Message = formData.Message;
            contactForm.EmailAddress = formData.EmailAddress;
        }
        else
        {
            contactForm.Message = formData.Message;
            contactForm.EmailAddress = formData.EmailAddress;
            contactForm.Account = account;
        }

        ContactForm savedContactForm = _context.ContactForms.Add(contactForm).Entity;
        await _context.SaveChangesAsync();

        return savedContactForm;
    }
}