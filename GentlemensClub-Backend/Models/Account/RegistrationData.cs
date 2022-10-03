using System.ComponentModel.DataAnnotations;

namespace GentlemensClub.Models.Account;

public class RegistrationData
{
    [Required]
    public string Username { get; set; }
    [Required]
    [DataType(DataType.EmailAddress)]
    [Display(Name = "E-mail Address")]
    public string Email { get; set; }
    [Required]
    [DataType(DataType.Password)]
    public string Password { get; set; }
    [Required]
    [DataType(DataType.Password)]
    [Display(Name = "Confirm Password")]
    public string ConfirmPassword { get; set; }
}