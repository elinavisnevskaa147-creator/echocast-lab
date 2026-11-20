"use strict";

// 4. Класс данных Episode
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

    render() {
        const card = document.createElement("article");
        card.className = "card";
        card.dataset.id = this.id;

        const imageWrapper = document.createElement("div");
        imageWrapper.className = "card__image-wrapper";

        const image = document.createElement("img");
        image.className = "card__image";
        image.setAttribute("src", this.image);
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

        card.append(imageWrapper, content);

        return card;
    }
}

// 5. Массив исходных данных
const episodes = [
    {
        id: 1,
        podcast: "Поступить и не сойти с ума",
        topic: "Подготовка к экзаменам",
        date: "2026-01-15",
        listens: 1250,
        duration: 42,
        category: "Жизнь и быт",
        description: "Как подготовиться к экзаменам без стресса.",
        image: "img/admission.jpg",
        isNew: false,
        tags: ["Образование", "Экзамены"]
    },
    {
        id: 2,
        podcast: "Поступить и не сойти с ума",
        topic: "Выбор специальности",
        date: "2026-02-10",
        listens: 980,
        duration: 38,
        category: "Жизнь и быт",
        description: "Как определиться с будущей профессией.",
        image: "img/admission.jpg",
        isNew: false,
        tags: ["Образование", "Профессия"]
    },
    {
        id: 3,
        podcast: "Поступить и не сойти с ума",
        topic: "Студенческая жизнь",
        date: "2025-09-12",
        listens: 2100,
        duration: 45,
        category: "Жизнь и быт",
        description: "Особенности жизни студентов первого курса.",
        image: "img/admission.jpg",
        isNew: false,
        tags: ["Студенты", "Образование"]
    },
    {
        id: 4,
        podcast: "Список и тележка",
        topic: "Планирование бюджета",
        date: "2026-03-05",
        listens: 870,
        duration: 35,
        category: "Жизнь и быт",
        description: "Как планировать расходы на покупки.",
        image: "img/groceries.jpg",
        isNew: false,
        tags: ["Бюджет", "Покупки"]
    },
    {
        id: 5,
        podcast: "Список и тележка",
        topic: "Сезон скидок",
        date: "2025-11-20",
        listens: 1560,
        duration: 32,
        category: "Жизнь и быт",
        description: "Как совершать выгодные покупки.",
        image: "img/groceries.jpg",
        isNew: false,
        tags: ["Скидки", "Покупки"]
    },
    {
        id: 6,
        podcast: "Мурчание в наушниках",
        topic: "Привычки кошек",
        date: "2026-04-12",
        listens: 3200,
        duration: 50,
        category: "Уютное и красивое",
        description: "Разбираемся в особенностях поведения кошек.",
        image: "img/cats.jpg",
        isNew: false,
        tags: ["Кошки", "Животные"]
    },
    {
        id: 7,
        podcast: "Мурчание в наушниках",
        topic: "Уход за питомцами",
        date: "2026-11-15",
        listens: 2450,
        duration: 48,
        category: "Уютное и красивое",
        description: "Основные правила ухода за кошками.",
        image: "img/cats.jpg",
        isNew: true,
        tags: ["Кошки", "Уход"]
    },
    {
        id: 8,
        podcast: "Мурчание в наушниках",
        topic: "Разговор с ветеринаром",
        date: "2025-12-08",
        listens: 1850,
        duration: 55,
        category: "Уютное и красивое",
        description: "Ответы на популярные вопросы владельцев кошек.",
        image: "img/cats.jpg",
        isNew: false,
        tags: ["Животные", "Ветеринария"]
    },
    {
        id: 9,
        podcast: "Небо в 6:14",
        topic: "Фотография",
        date: "2026-05-14",
        listens: 740,
        duration: 28,
        category: "Уютное и красивое",
        description: "Как фотографировать рассветы и закаты.",
        image: "img/sunset.jpg",
        isNew: false,
        tags: ["Фотография", "Природа"]
    },
    {
        id: 10,
        podcast: "Небо в 6:14",
        topic: "Наблюдение за небом",
        date: "2026-06-18",
        listens: 1120,
        duration: 30,
        category: "Уютное и красивое",
        description: "Красота природы в повседневной жизни.",
        image: "img/sunset.jpg",
        isNew: false,
        tags: ["Небо", "Природа"]
    },
    {
        id: 11,
        podcast: "Пирокинезис: рэп-разбор",
        topic: "Музыкальный анализ",
        date: "2026-11-18",
        listens: 4500,
        duration: 43,
        category: "Музыка и алгоритмы",
        description: "Биты и флоу в ранних треках Пирокинезиса.",
        image: "img/pyro.jpg",
        isNew: true,
        tags: ["Музыка", "Рэп"]
    },
    {
        id: 12,
        podcast: "Пирокинезис: рэп-разбор",
        topic: "Музыкальный анализ",
        date: "2026-08-22",
        listens: 3800,
        duration: 46,
        category: "Музыка и алгоритмы",
        description: "Как Пирокинезис переосмыслил классический рэп.",
        image: "img/pyro.jpg",
        isNew: false,
        tags: ["Музыка", "Рэп"]
    },
    {
        id: 13,
        podcast: "Пирокинезис: рэп-разбор",
        topic: "Концертные выступления",
        date: "2025-10-17",
        listens: 2900,
        duration: 48,
        category: "Музыка и алгоритмы",
        description: "Энергия музыканта на сцене.",
        image: "img/pyro.jpg",
        isNew: false,
        tags: ["Музыка", "Концерты"]
    },
    {
        id: 14,
        podcast: "Алгоритм внимания",
        topic: "Социальные сети",
        date: "2026-10-03",
        listens: 1750,
        duration: 39,
        category: "Музыка и алгоритмы",
        description: "Как работают алгоритмы рекомендаций TikTok.",
        image: "img/tiktok.jpg",
        isNew: false,
        tags: ["TikTok", "Алгоритмы"]
    },
    {
        id: 15,
        podcast: "Алгоритм внимания",
        topic: "Фотография",
        date: "2026-11-10",
        listens: 1340,
        duration: 36,
        category: "Музыка и алгоритмы",
        description: "Как создавать визуальный контент для социальных сетей.",
        image: "img/tiktok.jpg",
        isNew: true,
        tags: ["Фотография", "Социальные сети"]
    }
];

// 6. Поиск контейнеров каталога
const lifeContainer = document.querySelector("#catalog-life");
const cozyContainer = document.querySelector("#catalog-cozy");
const musicContainer = document.querySelector("#catalog-music");

// 7. Динамическая отрисовка карточек
const renderCatalog = () => {
    if (!lifeContainer || !cozyContainer || !musicContainer) {
        return;
    }

    const containers = {
        "Жизнь и быт": lifeContainer,
        "Уютное и красивое": cozyContainer,
        "Музыка и алгоритмы": musicContainer
    };

    episodes.forEach(data => {
        const episode = new Episode(data);
        const container = containers[episode.category];

        if (container) {
            container.append(episode.render());
        }
    });

    console.log("Количество созданных карточек:", episodes.length);
};

renderCatalog();

// 8. Аналитика по варианту 18
const analyzeEpisodes = () => {
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
};

analyzeEpisodes();