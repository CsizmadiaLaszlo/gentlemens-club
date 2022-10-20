using GentlemensClub.Models;
using GentlemensClub.Models.Authentication;
using GentlemensClub.Models.DataTransferObjects;

namespace GentlemensClub.Services.Interfaces;

public interface IContactService
{
    // Create
    Task<ContactForm> SaveContactFormData(ContactPageFormDto formData, Account? account);

    // Read


    // Update


    // Delete
}