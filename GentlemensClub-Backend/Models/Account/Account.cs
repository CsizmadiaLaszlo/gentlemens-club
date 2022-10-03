using System.ComponentModel.DataAnnotations.Schema;

namespace GentlemensClub.Models.Account;

public class Account
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    public string Username { get; set; }
    public string Email { get; set; }
    public string PasswordHash { get; set; }
}