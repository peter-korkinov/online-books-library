import {html} from '/src/lib.js';


const loggedInTemplate = (email, onLogout) => html`
    <a href="/home">Dashboard</a>
    <div id="user">
        <span>Welcome, ${email}</span>
        <a class="button" href="/my-books">My Books</a>
        <a class="button" href="/create">Add Book</a>
        <a class="button" href="javascript:void(0)" @click=${onLogout}>Logout</a>
    </div>
`;

const guestTemplate = () => html`
    <a href="/home">Dashboard</a>
    <div id="guest">
        <a class="button" href="/login">Login</a>
        <a class="button" href="/register">Register</a>
    </div>
`;

export {
    loggedInTemplate,
    guestTemplate
};
