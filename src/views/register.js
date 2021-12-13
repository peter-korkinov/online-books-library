import {html} from '/src/lib.js';
import {register} from "../api/data.js";
import {notify} from "../common/notify.js";


function registerPage(ctx) {
    ctx.render(registerTemplate(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const email = formData.get('email');
        const password = formData.get('password');
        const repeatPassword = formData.get('confirm-pass');

        if (email && password && repeatPassword){
            if (password === repeatPassword) {
                try {
                    await register(email, password);
                    ctx.updateNavBar();
                    ctx.page.redirect('/home');
                } catch (err) {
                    notify('error', err);
                }
            } else {
                notify('error', 'Passwords do not match!');
            }
        } else {
            notify('error', 'All fields are required');
        }
    }
}

const registerTemplate = (onSubmit) => html`
    <section id="register-page" class="register">
        <form id="register-form" action="" method="" @submit=${onSubmit}>
            <fieldset>
                <legend>Register Form</legend>
                <p class="field">
                    <label for="email">Email</label>
                    <span class="input">
                            <input type="text" name="email" id="email" placeholder="Email">
                        </span>
                </p>
                <p class="field">
                    <label for="password">Password</label>
                    <span class="input">
                            <input type="password" name="password" id="password" placeholder="Password">
                        </span>
                </p>
                <p class="field">
                    <label for="repeat-pass">Repeat Password</label>
                    <span class="input">
                            <input type="password" name="confirm-pass" id="repeat-pass" placeholder="Repeat Password">
                        </span>
                </p>
                <input class="button submit" type="submit" value="Register">
            </fieldset>
        </form>
    </section>
`;

export {
    registerPage
};