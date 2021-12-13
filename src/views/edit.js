import {html} from '/src/lib.js';
import {editRecordById} from "../api/data.js";
import {notify} from "../common/notify.js";
import {onSubmit} from "../common/util.js";


async function editPage(ctx) {
    try {
        const record = await ctx.recordPromise;
        ctx.render(editTemplate(record, onSubmit, ctx));
        console.log('try1')
    } catch (err) {
        notify('error', err);
    }
}

const editTemplate = (record, onSubmit, ctx) => html`
    <section id="edit-page" class="edit">
        ${console.log('template')}
        <form id="edit-form" action="" method="" @submit=${(event) => onSubmit(event, ctx, editRecordById)}>
            <fieldset>
                <legend>Edit my Book</legend>
                <p class="field">
                    <label for="title">Title</label>
                    <span class="input">
                        <input type="text" name="title" id="title" value="${record.title}">
                    </span>
                </p>
                <p class="field">
                    <label for="description">Description</label>
                    <span class="input">
                        <textarea name="description" id="description">${record.description}</textarea>
                    </span>
                </p>
                <p class="field">
                    <label for="image">Image</label>
                    <span class="input">
                            <input type="text" name="imageUrl" id="image" value="${record.imageUrl}">
                    </span>
                </p>
                <p class="field">
                    <label for="type">Type</label>
                    <span class="input">
                            <select id="type" name="type" value="${record.type}">
                                <option value="Fiction" >Fiction</option>
                                <option value="Romance">Romance</option>
                                <option value="Mistery">Mistery</option>
                                <option value="Classic">Classic</option>
                                <option value="Other">Other</option>
                            </select>
                        </span>
                </p>
                <input class="button submit" type="submit" value="Save">
            </fieldset>
        </form>
    </section>
`;

export {
    editPage
};