import {html} from '/src/lib.js';
import {getAllRecordsOfUserId} from "../api/data.js";
import {notify} from "../common/notify.js";
import {getUserData} from "../common/util.js";


async function myBooksPage(ctx) {
    try {
        const books = await getAllRecordsOfUserId(getUserData().id);
        ctx.render(myBooksTemplate(books));
    } catch (err) {
        notify('error', err);
    }
}

const myBooksTemplate = (books) => html`
    <section id="my-books-page" class="my-books">
        <h1>My Books</h1>        
            ${
    books.length === 0
        ? html`<p class="no-books">No books in database!</p>`
        : html` <ul class="my-books-list">${books.map(bookCardTemplate)}</ul>`
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
    myBooksPage
};