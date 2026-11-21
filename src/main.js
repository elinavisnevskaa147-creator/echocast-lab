import "../scss/style.scss";
import { createSubscription, getEpisodes } from "./api.js";
import { analyzeEpisodes, catalog, catalogFeedback, queueContainer, queueSummary, renderCatalog, renderQueue } from "./ui.js";

let episodes = [];
let queue = readQueue();

function readQueue() {
    try {
        const value = JSON.parse(localStorage.getItem("echocast.queue"));
        return Array.isArray(value) ? value.map(String) : [];
    } catch {
        return [];
    }
}

function saveQueue(value) {
    try {
        localStorage.setItem("echocast.queue", JSON.stringify(value));
        return true;
    } catch {
        return false;
    }
}

const subscriptionForm = document.querySelector("#subscription-form");
const subscriptionFeedback = document.querySelector("#subscription-feedback");

subscriptionForm?.addEventListener("submit", async event => {
    event.preventDefault();

    const submitButton = subscriptionForm.querySelector('button[type="submit"]');
    if (submitButton.disabled) {
        return;
    }

    const fields = new FormData(subscriptionForm);
    const name = fields.get("subscriber_name").trim();

    if (name.length < 2) {
        subscriptionFeedback.textContent = "Введите имя длиной хотя бы два символа.";
        return;
    }

    const subscription = {
        name,
        email: fields.get("email").trim().toLowerCase(),
        startDate: fields.get("start_date"),
        frequency: fields.get("frequency"),
        categories: fields.getAll("categories"),
        digestSize: Number(fields.get("digest_size")),
        comment: fields.get("comment").trim(),
        agreed: fields.has("agreement"),
        status: "subscribed"
    };

    submitButton.disabled = true;
    subscriptionFeedback.textContent = "Отправка подписки…";

    try {
        await createSubscription(subscription);
        subscriptionFeedback.textContent = "Подписка на дайджест сохранена.";
        subscriptionForm.reset();
    } catch (error) {
        console.error("Ошибка отправки подписки:", error);
        subscriptionFeedback.textContent = "Не удалось сохранить подписку. Проверьте соединение и повторите попытку.";
    } finally {
        submitButton.disabled = false;
    }
});

catalog?.addEventListener("click", event => {
    const button = event.target.closest('button[data-action="enqueue"]');

    if (!button || !catalog.contains(button)) {
        return;
    }

    const id = button.dataset.id;
    queue = readQueue();

    if (queue.includes(id)) {
        return;
    }

    const updatedQueue = [...queue, id];
    if (!saveQueue(updatedQueue)) {
        catalogFeedback.textContent = "Не удалось сохранить очередь в браузере.";
        return;
    }

    queue = updatedQueue;
    button.textContent = "В очереди";
    button.setAttribute("aria-disabled", "true");
    catalogFeedback.textContent = "Эпизод добавлен в очередь.";
});

queueContainer?.addEventListener("click", event => {
    const button = event.target.closest('button[data-action="remove"]');

    if (!button || !queueContainer.contains(button)) {
        return;
    }

    const id = button.dataset.id;
    const updatedQueue = readQueue().filter(queuedId => queuedId !== id);

    if (!saveQueue(updatedQueue)) {
        queueSummary.textContent = "Не удалось сохранить очередь в браузере.";
        return;
    }

    queue = updatedQueue;
    renderQueue(episodes, queue);
});

async function loadEpisodes() {
    const feedback = catalog ? catalogFeedback : queueSummary;
    if (!feedback) {
        return;
    }

    feedback.textContent = "Загрузка эпизодов…";
    const container = catalog ?? queueContainer;
    container.setAttribute("aria-busy", "true");

    try {
        episodes = await getEpisodes();
        queue = readQueue();
        feedback.textContent = "";
        if (catalog) {
            renderCatalog(episodes, queue);
            analyzeEpisodes(episodes);
        } else {
            renderQueue(episodes, queue);
        }
    } catch (error) {
        console.error("Ошибка загрузки эпизодов:", error);
        feedback.textContent = "Не удалось загрузить эпизоды. Проверьте соединение и обновите страницу.";
    } finally {
        container.removeAttribute("aria-busy");
    }
}

window.addEventListener("pageshow", event => {
    if (event.persisted) {
        loadEpisodes();
    }
});

loadEpisodes();
