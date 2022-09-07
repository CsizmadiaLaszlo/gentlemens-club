﻿using System.Security.Claims;
using GentlemensClub.Daos;
using GentlemensClub.Daos.Implementations;
using GentlemensClub.Models.Account;
using Microsoft.AspNetCore.Identity;

namespace GentlemensClub.Services;

/// <summary>
/// A class dedicated for account related processes.
/// </summary>
public class AccountService
{
    public IAccountDao AccountDao { get; set; }
    public PasswordHasher<Account> PasswordHasher { get; set; }

    public AccountService()
    {
        AccountDao = AccountDaoMemory.GetInstance();
        PasswordHasher = new PasswordHasher<Account>();
    }

    /// <summary>
    /// Checks if login credential contains valid username and password pair.
    /// </summary>
    /// <param name="credential">Login credential.</param>
    /// <returns>Bool value for the validity of the credential.</returns>
    public bool CredentialIsValid(LoginCredential credential)
    {
        var account = AccountDao.GetByUsername(credential.Username);
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
    public ClaimsPrincipal CreateClaimsPrincipal(LoginCredential credential)
    {
        if (!CredentialIsValid(credential))
        {
            throw new ArgumentException("Credential contains invalid information.", nameof(credential));
        }

        var account = AccountDao.GetByUsername(credential.Username);

        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.Name, account.Username),
            new Claim(ClaimTypes.Email, account.Email)
        };
        var identity = new ClaimsIdentity(claims, "LoginCookieAuth");

        return new ClaimsPrincipal(identity);
    }

    public void CreateAccount(RegistrationData data)
    {
        if (!RegistrationIsValid(data))
        {
            throw new ArgumentException("Registration data is invalid.", nameof(data));
        }

        var account = new Account()
        {
            Username = data.Username,
            Email = data.Email,
        };

        account.PasswordHash = PasswordHasher.HashPassword(account, data.Password);

        AccountDao.Add(account);
    }

    public bool RegistrationIsValid(RegistrationData data)
    {
        return data.Password == data.ConfirmPassword
               && AccountDao.GetByUsername(data.Username) is null
               && AccountDao.GetByEmail(data.Email) is null;
    }
}