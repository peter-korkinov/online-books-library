import * as api from './api.js';


const login = api.login;
const register = api.register;
const logout = api.logout;

const endpoints = {
    allRecords: '/data/memes?sortBy=_createdOn%20desc',
    recordById: '/data/memes/',
    recordsOfUser: (userId) => `/data/memes?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,
    create: '/data/memes',
    edit: '/data/memes/',
    delete: '/data/memes/'
};

async function getAllRecords() {
    let url = endpoints.allRecords;

    return api.get(url);
}

async function getAllRecordsOfUserId(id) {
    return api.get(endpoints.recordsOfUser(id));
}

async function getRecordById(id) {
    return api.get(endpoints.recordById + id);
}

async function createRecord(data) {
    return api.post(endpoints.create, data);
}

async function editRecordById(data, id) {
    return api.put(endpoints.edit + id, data);
}

async function deleteRecordById(id) {
    return api.del(endpoints.delete + id);
}

export {
    login,
    register,
    logout,
    getRecordById,
    getAllRecords,
    createRecord,
    editRecordById,
    deleteRecordById,
    getAllRecordsOfUserId
}