import {getRecordById} from "../api/data.js";
import {notify} from "./notify.js";

function getUserData() {
    return JSON.parse(sessionStorage.getItem('userData'));
}

function setUserdata(data) {
    sessionStorage.setItem('userData', JSON.stringify(data));
}

function clearUserData() {
    sessionStorage.removeItem('userData');
}

function isLogged() {
    return !(sessionStorage.getItem('userData') === null);
}

async function loadRecord(ctx, next) {
    ctx.recordPromise = getRecordById(ctx.params.id);
    next();
}

async function onSubmit(event, ctx, reqFunc) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const title = formData.get('title');
    const description = formData.get('description');
    const imageUrl = formData.get('imageUrl');

    if (title && description && imageUrl) {
        try {
            await reqFunc({title, description, imageUrl}, ctx.params.id);
            ctx.page.redirect('/catalog');
        } catch (err) {
            notify('error', err);
        }
    } else {
        notify('error', 'All fields are required!');
    }
}

export {
    getUserData,
    setUserdata,
    clearUserData,
    isLogged,
    loadRecord,
    onSubmit
};