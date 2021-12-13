import {html} from '/src/lib.js';
import {getAllRecords} from "../api/data.js";
import {notify} from "../common/notify.js";


async function catalogPage(ctx) {
    try {
        const books = await getAllRecords();
        ctx.render(catalogTemplate(books));
    } catch (err) {
        notify('error', err);
    }
}

const catalogTemplate = (books) => html`
    <section id="dashboard-page" class="dashboard">
        <h1>Dashboard</h1>        
            ${
                books.length === 0
                ? html`<p class="no-books">No books in database!</p>`
                : html` <ul class="other-books-list">${books.map(bookCardTemplate)}</ul>`
            }        
    </section>
`;

const bookCardTemplate = (book) => html`
    <li class="otherBooks">
        <h3>${book.title}</h3>
        <p>Type: ${book.type}</p>
        <p class="img"><img src="${book.imageUrl}"></p>
        <a class="button" href="${`details/${book._id}`}">Details</a>
    </li>
`;

export {
    catalogPage
};