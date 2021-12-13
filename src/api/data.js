import * as api from './api.js';


const login = api.login;
const register = api.register;
const logout = api.logout;

const endpoints = {
    allRecords: '/data/books?sortBy=_createdOn%20desc',
    recordById: '/data/books/',
    recordsOfUser: (userId) => `/data/books?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,
    create: '/data/books',
    edit: '/data/books/',
    delete: '/data/books/',
    like: '/data/likes',
    getLikes: (bookId) => `/data/likes?where=bookId%3D%22${bookId}%22&distinct=_ownerId&count`,
    isLiked: (bookId, userId) => `/data/likes?where=bookId%3D%22${bookId}%22%20and%20_ownerId%3D%22${userId}%22&count`
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

async function like(data) {
    return api.post(endpoints.like, data)
}

async function getLikesOfRecordById(id) {
    return api.get(endpoints.getLikes(id));
}

async function isRecordIdLikedByUSerId(recId, userId) {
    return api.get(endpoints.isLiked(recId, userId));
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
    getAllRecordsOfUserId,
    like,
    getLikesOfRecordById,
    isRecordIdLikedByUSerId
}