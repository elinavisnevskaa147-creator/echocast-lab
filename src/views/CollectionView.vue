<script setup>
import { computed, ref } from "vue";
import { useQueue } from "../queue.js";

const props = defineProps({ episodes: { type: Array, required: true } });
const { queue, save } = useQueue();
const error = ref("");
const items = computed(() => queue.value
    .map(id => props.episodes.find(episode => episode.id === id))
    .filter(Boolean));
const summary = computed(() => {
    const duration = items.value.reduce((sum, episode) => sum + episode.durationMinutes, 0);
    return error.value || (items.value.length
        ? `Всего в очереди: ${items.value.length} · Суммарная длительность: ${duration} мин`
        : "В очереди пока нет эпизодов.");
});

function remove(id) {
    error.value = save(queue.value.filter(queuedId => queuedId !== id))
        ? "" : "Не удалось сохранить очередь в браузере.";
}
</script>

<template>
<main class="main">
        <h2 class="main__title">Очередь прослушивания</h2>
        <p class="main__desc">Эпизоды, которые вы сохранили для прослушивания.</p>

        <!-- Добавил контейнер для скролла таблицы на мобильных -->
        <div class="table-wrapper">
            <table class="table">
                <caption class="table__caption">Моя очередь</caption>
                <thead>
                    <tr>
                        <th>Подкаст</th>
                        <th>Название эпизода</th>
                        <th>Дата выхода</th>
                        <th>Длительность</th>
                        <th>Действие</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="episode in items" :key="episode.id">
                        <td>{{ episode.podcastTitle }}</td><td>{{ episode.episodeTitle }}</td>
                        <td><time :datetime="episode.releaseDate">{{ episode.releaseDate }}</time></td>
                        <td>{{ episode.durationMinutes }} мин</td>
                        <td><button type="button" class="btn btn_secondary" @click="remove(episode.id)">Удалить</button></td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td id="queue-summary" role="status" colspan="5">{{ summary }}</td>
                    </tr>
                </tfoot>
            </table>
        </div>

        <div class="section__actions">
            <a href="checkout.html" class="btn">Оформить подписку на дайджест</a>
            <a href="catalog.html" class="btn btn_secondary">Добавить ещё подкасты</a>
        </div>
    </main>
</template>
