using System.Security.Claims;
using GentlemensClub.Models.Account;

namespace GentlemensClub.Services;

/// <summary>
/// A class dedicated for account related processes.
/// </summary>
public class AccountService
{
    /// <summary>
    /// Checks if login credential contains valid username and password pair.
    /// </summary>
    /// <param name="credential">Login credential.</param>
    /// <returns>Bool value for the validity of the credential.</returns>
    public bool CredentialIsValid(LoginCredential credential)
    {
        //TODO
        return credential.Username == "test" && credential.Password == "123";
    }

    /// <summary>
    /// Creates a ClaimsPrincipal from a valid LoginCredential.
    /// </summary>
    /// <param name="credential">Login credential.</param>
    /// <returns>Created ClaimsPrincipal</returns>
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