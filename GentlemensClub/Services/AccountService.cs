using System.Security.Claims;
using GentlemensClub.Models.Account;

namespace GentlemensClub.Services;

public class AccountService
{
    public bool CredentialIsValid(LoginCredential credential)
    {
        //TODO
        return credential.Username == "test" && credential.Password == "123";
    }

    public ClaimsPrincipal CreateClaimsPrincipal(LoginCredential credential)
    {
        //TODO
        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.Name, "test"),
            new Claim(ClaimTypes.Email, "test@test.ts")
        };
        var identity = new ClaimsIdentity(claims, "LoginCookieAuth");

        return new ClaimsPrincipal(identity);
    }
}