const baseURL = 'http://localhost:3000/';

const setHeaders = () => {
    return {
        'Content-Type': 'application/json',
        'token': window.localStorage.getItem('token'),
        'uuid': window.localStorage.getItem('uuid'),
    }
}

const httpPost = async (body, url) => {
    const response = await fetch(`${baseURL}/${url}`, {
        method: 'POST',
        body: body, // string or object
        headers: setHeaders()
    });
    //extract JSON from the http response
    const result = await response.json();
    return result;
}

const httpPut = async (body, url) => {
    const response = await fetch(`${baseURL}/${url}`, {
        method: 'PUT',
        body: body, // string or object
        headers: setHeaders()
    });
    //extract JSON from the http response
    const result = await response.json();
    return result;
}

const httpGet = async (body, url) => {
    const response = await fetch(`${baseURL}/${url}`, {
        method: 'GET',
        body: body, // string or object
        headers: setHeaders()
    });
    //extract JSON from the http response
    const result = await response.json();
    return result;
}

const httpDelete = async (body, url) => {
    const response = await fetch(`${baseURL}/${url}`, {
        method: 'DELETE',
        body: body, // string or object
        headers: setHeaders()
    });
    //extract JSON from the http response
    const result = await response.json();
    return result;
}

module.exports = {
    httpDelete,
    httpGet,
    httpPost,
    httpPut
}
