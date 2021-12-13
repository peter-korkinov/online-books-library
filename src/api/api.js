import { getUserData, setUserdata, clearUserData } from "../common/util.js";

const host = 'http://localhost:3030';

async function request (url, options) {
    try {
        const response = await fetch(host + url, options);

        if(response.ok === false) {
            if(response.status === 403) {
                clearUserData();
            }
            const error = await response.json();
            throw new Error(error.message);
        }

        try {
            return await response.json();
        } catch(err) {
            return response;
        }

    } catch (err) {
        throw err;
    }
}

function createOptions(method = 'get', data) {
    const options = {
        method,
        headers: {},
    };

    if(data !== undefined) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    const userData = getUserData();
    if(userData != null) {
        options.headers['X-Authorization'] = userData.token;
    }

    return options;
}

async function get(url) {
    return request(url, createOptions());
}

async function post(url, data) {
    return request(url, createOptions('post', data));
}

async function put(url, data) {
    return request(url, createOptions('put', data));
}

async function del(url) {
    return request(url, createOptions('delete'));
}

async function login(email, password) {
    const response = await request('/users/login', createOptions('post', {email, password}));
    const userData = {
        username: response.username,
        email: response.email,
        id: response._id,
        gender: response.gender,
        token: response.accessToken
    }
    setUserdata(userData);
}

async function register(username, email, password, gender) {
    const response = await request('/users/register', createOptions('post', {username, email, password, gender}));
    const userData = {
        username: response.username,
        email: response.email,
        id: response._id,
        gender: response.gender,
        token: response.accessToken
    }
    setUserdata(userData);
}

async function logout() {
    await request('/users/logout', createOptions());
    clearUserData();
    return 'Logout successful';
}

export {
    get,
    post,
    put,
    del,
    login,
    register,
    logout
};