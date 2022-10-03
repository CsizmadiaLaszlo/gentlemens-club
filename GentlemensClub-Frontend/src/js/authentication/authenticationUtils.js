export async function requestJwtToken(username, password) {
    const url = "api/authentication/authenticate";

    const credentials = {
        "username": username,
        "password": password
    };

    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials),
    };

    const response = await fetch(url, options);

    return response;
}


export async function requestAccountRegistration(username, email, password, confirmPassword) {
    const url = "api/authentication/register";

    const credentials = {
        "username": username,
        "email": email,
        "password": password,
        "confirmPassword": confirmPassword
    };

    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials),
    };

    const response = await fetch(url, options);

    return response;
}
