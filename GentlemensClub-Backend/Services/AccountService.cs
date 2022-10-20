using System.Security.Claims;
using GentlemensClub.Data;
using GentlemensClub.Models.Authentication;
using GentlemensClub.Services.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace GentlemensClub.Services;

/// <summary>
/// A class dedicated for account related processes.
/// </summary>
public class AccountService : IAccountService
{
    private readonly GentlemensClubContext _context;
    private PasswordHasher<Account> PasswordHasher { get; }

    public AccountService(GentlemensClubContext context)
    {
        _context = context;
        PasswordHasher = new PasswordHasher<Account>();
    }

    /// <summary>
    /// Checks if login credential contains valid username and password pair.
    /// </summary>
    /// <param name="credential">Login credential.</param>
    /// <returns>Bool value for the validity of the credential.</returns>
    public async Task<bool> CredentialIsValid(LoginCredential credential)
    {
        var account = await GetAccountByUsername(credential.Username);
        if (account == null)
        {
            return false;
        }

        var result = PasswordHasher.VerifyHashedPassword(account, account.PasswordHash, credential.Password);
        return result == PasswordVerificationResult.Success;
    }

    /// <summary>
    /// Creates a ClaimsPrincipal from a valid LoginCredential.
    /// </summary>
    /// <param name="credential">Login credential.</param>
    /// <returns>Created ClaimsPrincipal</returns>
    public async Task<ClaimsPrincipal> CreateClaimsPrincipal(LoginCredential credential)
    {
        var claims = await CreateClaims(credential);
        var identity = new ClaimsIdentity(claims, "LoginCookieAuth");

        return new ClaimsPrincipal(identity);
    }

    public async Task CreateAccount(RegistrationData data)
    {
        if (await RegistrationIsValid(data) is false)
        {
            throw new ArgumentException("Registration data is invalid.", nameof(data));
        }

        var account = new Account()
        {
            Username = data.Username,
            Email = data.Email,
        };

        account.PasswordHash = PasswordHasher.HashPassword(account, data.Password);

        await _context.Accounts.AddAsync(account);
        await _context.SaveChangesAsync();
    }

    public async Task<bool> RegistrationIsValid(RegistrationData data)
    {
        return data.Password == data.ConfirmPassword
               // ReSharper disable once ConditionIsAlwaysTrueOrFalseAccordingToNullableAPIContract
               && await GetAccountByUsername(data.Username) is null
               // ReSharper disable once ConditionIsAlwaysTrueOrFalseAccordingToNullableAPIContract
               && await GetAccountByEmail(data.Email) is null;
    }

    public async Task<IEnumerable<Claim>> CreateClaims(LoginCredential credential)
    {
        if (await CredentialIsValid(credential) is false)
        {
            throw new ArgumentException("Credential contains invalid information.", nameof(credential));
        }

        var account = await GetAccountByUsername(credential.Username);

        var claims = new List<Claim>
        {
            new (ClaimTypes.Name, account.Username),
            new (ClaimTypes.Email, account.Email),
            new ("UserId", account.Id.ToString()),
        };

        return claims;
    }

    public async Task<Account?> GetAccountByAccountId(int accountId)
    {
        return await _context.Accounts.FirstOrDefaultAsync(account => account.Id == accountId);
    }

    private async Task<Account?> GetAccountByUsername(string username)
    {
        return await _context.Accounts.FirstOrDefaultAsync(a => a.Username == username);
    }

    private async Task<Account?> GetAccountByEmail(string email)
    {
        return await _context.Accounts.FirstOrDefaultAsync(a => a.Email == email);
    }
}