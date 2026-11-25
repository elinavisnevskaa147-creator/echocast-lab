<script setup>
import { ref } from "vue";
import { createSubscription } from "../api.js";

const feedback = ref("");
const sending = ref(false);

async function submit(event) {
    if (sending.value) return;

    const form = event.currentTarget;
    const fields = new FormData(form);
    const name = fields.get("subscriber_name").trim();

    if (name.length < 2) {
        feedback.value = "Введите имя длиной хотя бы два символа.";
        return;
    }

    sending.value = true;
    feedback.value = "Отправка подписки…";
    try {
        await createSubscription({
            name,
            email: fields.get("email").trim().toLowerCase(),
            startDate: fields.get("start_date"),
            frequency: fields.get("frequency"),
            categories: fields.getAll("categories"),
            digestSize: Number(fields.get("digest_size")),
            comment: fields.get("comment").trim(),
            agreed: fields.has("agreement"),
            status: "subscribed"
        });
        feedback.value = "Подписка на дайджест сохранена.";
        form.reset();
    } catch (error) {
        console.error("Ошибка отправки подписки:", error);
        feedback.value = "Не удалось сохранить подписку. Проверьте соединение и повторите попытку.";
    } finally {
        sending.value = false;
    }
}
</script>

<template>
<main class="main">
        <h2 class="main__title">Купить подписку</h2>
        <p class="main__desc">Получайте подборку новых эпизодов по вашим интересам.</p>

        <form id="subscription-form" @submit.prevent="submit" class="form">
            <section class="form__section">
                <h3 class="form__section-title">Контактные данные</h3>

                <div class="form__group">
                    <label for="subscriber-name" class="form__label">Ваше имя:</label>
                    <input type="text" id="subscriber-name" name="subscriber_name" class="form__input" required minlength="2" maxlength="50" placeholder="Анна">
                </div>

                <div class="form__group">
                    <label for="email" class="form__label">Email для получения дайджеста:</label>
                    <input type="email" id="email" name="email" class="form__input" required placeholder="you@example.com">
                </div>

                <div class="form__group">
                    <label for="start-date" class="form__label">С какой даты начать подписку:</label>
                    <input type="date" id="start-date" name="start_date" class="form__input" required min="2024-01-01">
                </div>
            </section>

            <section class="form__section">
                <h3 class="form__section-title">Частота получения дайджеста</h3>

                <div class="form__group">
                    <label class="form__label form__label_inline">
                        <input type="radio" id="freq-daily" name="frequency" value="daily" checked>
                        Ежедневно
                    </label>
                </div>

                <div class="form__group">
                    <label class="form__label form__label_inline">
                        <input type="radio" id="freq-weekly" name="frequency" value="weekly">
                        Раз в неделю
                    </label>
                </div>
            </section>

            <section class="form__section">
                <h3 class="form__section-title">Категории интересов</h3>
                <p class="form__desc">Отметьте все, что вам интересно:</p>

                <div class="form__group">
                    <label class="form__label form__label_inline">
                        <input type="checkbox" name="categories" value="admission">
                        Поступление и учёба
                    </label>
                </div>
                <div class="form__group">
                    <label class="form__label form__label_inline">
                        <input type="checkbox" name="categories" value="cats">
                        Котики и питомцы
                    </label>
                </div>
                <div class="form__group">
                    <label class="form__label form__label_inline">
                        <input type="checkbox" name="categories" value="sky">
                        Рассветы и закаты
                    </label>
                </div>
                <div class="form__group">
                    <label class="form__label form__label_inline">
                        <input type="checkbox" name="categories" value="groceries">
                        Закупки в магазине
                    </label>
                </div>
                <div class="form__group">
                    <label class="form__label form__label_inline">
                        <input type="checkbox" name="categories" value="pyro">
                        Разбор творчества Пирокинезиса
                    </label>
                </div>
                <div class="form__group">
                    <label class="form__label form__label_inline">
                        <input type="checkbox" name="categories" value="tiktok">
                        TikTok и алгоритмы
                    </label>
                </div>
            </section>

            <section class="form__section">
                <h3 class="form__section-title">Дополнительно</h3>

                <div class="form__group">
                    <label for="digest-size" class="form__label">Максимум эпизодов в дайджесте:</label>
                    <input type="number" id="digest-size" name="digest_size" class="form__input" min="1" max="20" value="5" required>
                </div>

                <div class="form__group">
                    <label for="comment" class="form__label">Комментарий:</label>
                    <textarea id="comment" name="comment" class="form__input" rows="4" maxlength="500" placeholder="Например: хочу больше эпизодов про котиков"></textarea>
                </div>

                <div class="form__group">
                    <label class="form__label form__label_inline">
                        <input type="checkbox" name="agreement" required>
                        Я согласен с обработкой персональных данных
                    </label>
                </div>
            </section>

            <button type="submit" :disabled="sending" class="form__submit">Оформить подписку</button>
            <p id="subscription-feedback" role="status">{{ feedback }}</p>
        </form>
    </main>
</template>
