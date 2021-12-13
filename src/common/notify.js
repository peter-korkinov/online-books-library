import {html, render} from '/src/lib.js';


const notificationSection = document.getElementById('notifications');

function notify(type, message) {
    render(notificationTemplate(type, message), notificationSection);
    setTimeout(() => {render(notificationTemplate(), notificationSection);}, 3000);
}

const notificationTemplate = (type, message) => html`
        ${
            type
            ? html`
                <div id="${type}Box" class="notification">
                    <span>${message}</span>
                </div>
                `
            : null
        }
`;

export {
    notify
}