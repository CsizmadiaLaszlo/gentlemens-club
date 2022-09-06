using System.ComponentModel.DataAnnotations;

namespace GentlemensClub.Models.Account;

public class LoginCredential
{
    [Required]
    public string Username { get; set; }

    [Required]
    [DataType(DataType.Password)]
    public string Password { get; set; }
}