import {isLogged, loadRecord, getUserData} from "./common/util.js";
import { page, render } from "./lib.js";
import {logout} from "./api/data.js";
import {notify} from "./common/notify.js";

import {catalogPage} from "./views/catalog.js";
import {loginPage} from "./views/login.js";
// import {registerPage} from "./views/register.js";
import {guestTemplate, loggedInTemplate} from "./views/navigation.js";
// import {detailsPage} from "./views/details.js";
// import {editPage} from "./views/edit.js";
// import {createPage} from "./views/create.js";
// // import {homePage} from "./views/home.js";
// // import {myProfilePage} from "./views/profile.js";


function updateNavBar() {
    if (isLogged()) {
        render(loggedInTemplate(getUserData().email, onLogout), navBar);
    } else {
        render(guestTemplate(), navBar);
    }
}

function decorateContext(ctx, next) {
    ctx.render = (template) => render(template, root);
    ctx.updateNavBar = updateNavBar;
    next();
}

async function onLogout() {
    try {
        const message = await logout();
        updateNavBar();
        page('/home');
        notify('info', message);
    } catch (err) {
        notify('error', err);
    }
}

const navBar = document.querySelector('.navbar-dashboard');
const root = document.querySelector('main');

page(decorateContext)
page('/home', catalogPage);
page('/', '/home');
page('/login', loginPage);
// page('/register', registerPage);
// page('/my-profile', myProfilePage);
// page('/create', createPage);
// page('/details/:id', loadRecord, detailsPage);
// page('/edit/:id', loadRecord, editPage);

updateNavBar();
page.start();