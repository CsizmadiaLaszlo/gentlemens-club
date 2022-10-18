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


export function saveJwtToken(token, expiresAt) {
    localStorage.setItem("jwt", token);
    localStorage.setItem("jwtExpiresAt", new Date(expiresAt).toUTCString());
}


export function deleteJwtToken() {
    localStorage.removeItem("jwt");
    localStorage.removeItem("jwtExpiresAt");
}


const isLoggedIn = () => {
    return localStorage.getItem("jwt") !== null;
}


export const getJwtToken = () => {
    return localStorage.getItem("jwt");
}


export const getUserFromJwt = () => {
    if (isLoggedIn() !== true) {
        return null;
    }

    const nameHeader = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name";
    const idHeader = "UserId";
    const tokenData = parseJwt(localStorage.getItem("jwt"));
    return { name: tokenData[nameHeader], id: tokenData[idHeader] };
}


function parseJwt(token) {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        return null;
    }
}

export async function authorizedFetch(url, options = null) {
    if (!isLoggedIn()) {
        throw "No signed in user token is present!";
    }

    var authorizationHeader = "Bearer " + getJwtToken();

    if (options === null) {
        options = {
            headers: {
                'Authorization': authorizationHeader
            }
        }
    }
    else {
        if (options.headers == null) {
            options['headers'] = {}
        }

        options['headers']['Authorization'] = authorizationHeader;
    }

    return fetch(url, options);
}