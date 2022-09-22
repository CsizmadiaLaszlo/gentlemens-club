using System.Security.Claims;
using GentlemensClub.Models.Account;

namespace GentlemensClub.Services.Interfaces;

public interface IAccountService
{
    Task<bool> CredentialIsValid(LoginCredential credential);
    Task<ClaimsPrincipal> CreateClaimsPrincipal(LoginCredential credential);
    Task CreateAccount(RegistrationData data);
    Task<bool> RegistrationIsValid(RegistrationData data);
    Task<IEnumerable<Claim>> CreateClaims(LoginCredential credential);
}