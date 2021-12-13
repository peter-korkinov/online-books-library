import {html} from '/src/lib.js';
import {createRecord} from "../api/data.js";
import {notify} from "../common/notify.js";
import {onSubmit} from "../common/util.js";


async function createPage(ctx) {
    try {
        ctx.render(createTemplate(onSubmit, ctx));
    } catch (err) {
        notify('error', err);
    }
}

const createTemplate = (onSubmit, ctx) => html`
    <section id="create-page" class="create">
        <form id="create-form" action="" method="" @submit=${(event) => onSubmit(event, ctx, createRecord)}">
            <fieldset>
                <legend>Add new Book</legend>
                <p class="field">
                    <label for="title">Title</label>
                    <span class="input">
                            <input type="text" name="title" id="title" placeholder="Title">
                        </span>
                </p>
                <p class="field">
                    <label for="description">Description</label>
                    <span class="input">
                            <textarea name="description" id="description" placeholder="Description"></textarea>
                        </span>
                </p>
                <p class="field">
                    <label for="image">Image</label>
                    <span class="input">
                            <input type="text" name="imageUrl" id="image" placeholder="Image">
                        </span>
                </p>
                <p class="field">
                    <label for="type">Type</label>
                    <span class="input">
                            <select id="type" name="type">
                                <option value="Fiction">Fiction</option>
                                <option value="Romance">Romance</option>
                                <option value="Mistery">Mistery</option>
                                <option value="Classic">Clasic</option>
                                <option value="Other">Other</option>
                            </select>
                        </span>
                </p>
                <input class="button submit" type="submit" value="Add Book">
            </fieldset>
        </form>
    </section>
`;

export {
    createPage
};