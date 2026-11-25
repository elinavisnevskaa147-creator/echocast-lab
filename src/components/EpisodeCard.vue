<script setup>
import BaseBadge from "./BaseBadge.vue";

defineProps({
    podcastTitle: { type: String, required: true },
    episodeTitle: { type: String, required: true },
    releaseDate: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    listensCount: { type: Number, required: true },
    isNew: { type: Boolean, default: false },
    imageUrl: { type: String, required: true },
    description: { type: String, required: true },
    queued: { type: Boolean, default: false }
});
defineEmits(["enqueue"]);
</script>

<template>
    <article class="card episode-card" :class="{ 'episode-card_new': isNew }">
        <div class="card__image-wrapper">
            <img class="card__image" :src="imageUrl" :alt="`Иллюстрация к подкасту «${podcastTitle}»`">
            <BaseBadge v-if="isNew" variant="new">NEW</BaseBadge>
        </div>
        <div class="card__content">
            <h4 class="card__title">«{{ podcastTitle }}»</h4>
            <p class="card__desc">Тема выпуска: {{ episodeTitle }}</p>
            <p class="card__desc">{{ description }}</p>
            <p class="card__meta">
                Дата: <time :datetime="releaseDate">{{ releaseDate }}</time> ·
                Прослушиваний: {{ listensCount }} · Длительность: {{ durationMinutes }} мин
            </p>
            <a class="card__link" href="detail.html">Подробнее о подкасте</a>
            <button type="button" class="btn btn_secondary" :disabled="queued" @click="$emit('enqueue')">
                {{ queued ? "В очереди" : "Слушать позже" }}
            </button>
        </div>
    </article>
</template>

<style lang="scss" scoped>
@use '../assets/scss/variables' as *;

.episode-card_new {
    border-color: $color-badge;
}
</style>
