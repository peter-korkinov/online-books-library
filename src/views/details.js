import {html} from '/src/lib.js';
import {getUserData, isLogged} from "../common/util.js";
import {deleteRecordById, getLikesOfRecordById, like} from "../api/data.js";
import {notify} from "../common/notify.js";


async function detailsPage(ctx) {
    async function onDelete(event) {
        if (confirm('Are you sure you want to delete this meme?')) {
            try {
                await deleteRecordById(event.target.value);
                ctx.page.redirect('/home');
            } catch (err) {
                notify('error', err);
            }
        }
    }

    async function onLike(event) {
        const bookId = event.target.value;
        try {
            await like({bookId});
            ctx.page.redirect(`/details/${bookId}`);
        } catch (err) {
            notify('error', err);
        }
    }

    ctx.render(detailsTemplate(await loadRecord(ctx), onDelete, onLike));
}

async function loadRecord(ctx) {
    try {
        const [record, likes, isLiked] = await Promise.all([
            ctx.recordPromise,
            ctx.likesPromise,
            ctx.isLikedPromise
        ]);

        if (isLogged() && getUserData().id === record._ownerId) {
            record.isOwner = true;
        }

        record.likes = likes;
        record.isLiked = Number(isLiked);

        return record;
    } catch (err) {
        notify('error', err);
    }
}

const detailsTemplate = (record, onDelete, onLike) => html`
    <section id="details-page" class="details">
        <div class="book-information">
            <h3>${record.title}</h3>
            <p class="type">Type: ${record.type}</p>
            <p class="img"><img src="${record.imageUrl}"></p>
            <div class="actions">
                ${
                    record.isOwner
                    ? html`
                            <a class="button" href="${`edit/${record._id}`}">Edit</a>
                            <button class="button" value="${record._id}" @click=${onDelete}>Delete</button>
                    `
                    : html`
                            ${record.isLiked ? null : html`<button class="button" value="${record._id}" @click=${onLike}>Like</button>`}                            
                    `
                }
                <div class="likes">
                    <img class="hearts" src="/images/heart.png">
                    <span id="total-likes">Likes: ${record.likes}</span>
                </div>
            </div>
        </div>
        <div class="book-description">
            <h3>Description:</h3>
            <p>${record.description}</p>
        </div>
    </section>
`;

export {
    detailsPage
};