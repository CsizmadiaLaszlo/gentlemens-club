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