using System.ComponentModel.DataAnnotations.Schema;
using GentlemensClub.Models.Authentication;

namespace GentlemensClub.Models.ContactPage;

public class ContactForm
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    public string Message { get; set; }
    public string EmailAddress { get; set; }
    public Account? Account { get; set; }
    public MessageStatus MessageStatus { get; set; } = MessageStatus.Received;
}