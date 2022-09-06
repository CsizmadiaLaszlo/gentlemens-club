using System.Security.Claims;
using GentlemensClub.Daos;
using GentlemensClub.Daos.Implementations;
using GentlemensClub.Models.Account;

namespace GentlemensClub.Services;

/// <summary>
/// A class dedicated for account related processes.
/// </summary>
public class AccountService
{
    public IAccountDao AccountDao { get; set; }

    public AccountService()
    {
        AccountDao = AccountDaoMemory.GetInstance();
    }

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