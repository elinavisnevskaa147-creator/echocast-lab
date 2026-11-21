class Episode {
    constructor(data) {
        this.id = data.id;
        this.podcast = data.podcast;
        this.topic = data.topic;
        this.date = data.date;
        this.listens = data.listens;
        this.duration = data.duration;
        this.category = data.category;
        this.description = data.description;
        this.image = data.image;
        this.isNew = data.isNew;
        this.tags = data.tags;
    }

    render(queued) {
        const card = document.createElement("article");
        card.className = "card";
        card.dataset.id = this.id;

        const imageWrapper = document.createElement("div");
        imageWrapper.className = "card__image-wrapper";

        const image = document.createElement("img");
        image.className = "card__image";
        image.setAttribute("src", import.meta.env.BASE_URL + this.image);
        image.setAttribute(
            "alt",
            `Иллюстрация к подкасту «${this.podcast}»`
        );

        imageWrapper.append(image);

        if (this.isNew) {
            const badge = document.createElement("span");
            badge.className = "card__badge";
            badge.textContent = "NEW";

            imageWrapper.append(badge);
        }

        const content = document.createElement("div");
        content.className = "card__content";

        const title = document.createElement("h4");
        title.className = "card__title";
        title.textContent = `«${this.podcast}»`;

        const topic = document.createElement("p");
        topic.className = "card__desc";
        topic.textContent = `Тема выпуска: ${this.topic}`;

        const description = document.createElement("p");
        description.className = "card__desc";
        description.textContent = this.description;

        const meta = document.createElement("p");
        meta.className = "card__meta";
        meta.textContent =
            `Дата: ${this.date} · ` +
            `Прослушиваний: ${this.listens} · ` +
            `Длительность: ${this.duration} мин`;

        const link = document.createElement("a");
        link.className = "card__link";
        link.setAttribute("href", "detail.html");
        link.textContent = "Подробнее о подкасте";

        content.append(
            title,
            topic,
            description,
            meta,
            link
        );

        const button = createActionButton(queued ? "В очереди" : "Слушать позже", "enqueue", this.id);
        button.setAttribute("aria-disabled", String(queued));
        content.append(button);

        card.append(imageWrapper, content);

        return card;
    }
}

function createActionButton(label, action, id) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "btn btn_secondary";
    button.dataset.action = action;
    button.dataset.id = id;
    button.textContent = label;
    return button;
}

export const catalog = document.querySelector(".catalog");
export const catalogFeedback = document.querySelector("#catalog-feedback");
export const queueContainer = document.querySelector("#queue");
export const queueSummary = document.querySelector("#queue-summary");

// Контейнеры каталога
const lifeContainer = document.querySelector("#catalog-life");
const cozyContainer = document.querySelector("#catalog-cozy");
const musicContainer = document.querySelector("#catalog-music");

// 7. Динамическая отрисовка карточек
export function renderCatalog(episodes, queue) {
    if (!lifeContainer || !cozyContainer || !musicContainer) {
        return;
    }

    const containers = {
        "Жизнь и быт": lifeContainer,
        "Уютное и красивое": cozyContainer,
        "Музыка и алгоритмы": musicContainer
    };

    Object.values(containers).forEach(container => container.replaceChildren());

    episodes.forEach(data => {
        const episode = new Episode(data);
        const container = containers[episode.category];

        if (container) {
            container.append(episode.render(queue.includes(String(episode.id))));
        }
    });

    console.log("Количество созданных карточек:", episodes.length);
}

export function renderQueue(episodes, queue) {
    if (!queueContainer) {
        return;
    }

    queueContainer.replaceChildren();
    const episodeById = new Map(episodes.map(episode => [String(episode.id), episode]));
    const queuedEpisodes = queue.map(id => episodeById.get(id)).filter(Boolean);

    for (const episode of queuedEpisodes) {
        const row = queueContainer.insertRow();
        row.insertCell().textContent = `«${episode.podcast}»`;
        row.insertCell().textContent = episode.topic;
        const date = document.createElement("time");
        date.dateTime = episode.date;
        date.textContent = episode.date.split("-").reverse().join(".");
        row.insertCell().append(date);
        row.insertCell().textContent = `${episode.duration} мин`;
        const button = createActionButton("Удалить", "remove", episode.id);
        button.setAttribute("aria-label", `Удалить: ${episode.podcast}, ${episode.topic}`);
        row.insertCell().append(button);
    }

    const duration = queuedEpisodes.reduce((sum, episode) => sum + episode.duration, 0);
    queueSummary.textContent = queuedEpisodes.length
        ? `Всего в очереди: ${queuedEpisodes.length} · Суммарная длительность: ${duration} мин`
        : "В очереди пока нет эпизодов.";
}

export function analyzeEpisodes(episodes) {
    const currentYear = new Date().getFullYear();

    // Фильтрация эпизодов за текущий год
    const currentYearEpisodes = episodes.filter(
        episode => new Date(episode.date).getFullYear() === currentYear
    );

    // Подсчет общего количества прослушиваний
    const totalListens = currentYearEpisodes.reduce(
        (sum, episode) => sum + episode.listens,
        0
    );

    // Получение массива уникальных тем
    const uniqueTopics = [
        ...new Set(episodes.map(episode => episode.topic))
    ];

    // Вывод результатов в консоль
    console.log("Текущий год:", currentYear);
    console.log("Количество эпизодов за текущий год:",
        currentYearEpisodes.length);
    console.log("Общее количество прослушиваний:", totalListens);
    console.log("Уникальные темы выпусков:", uniqueTopics);
}
