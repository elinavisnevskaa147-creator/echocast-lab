<script setup>
import EpisodeCard from "./EpisodeCard.vue";

defineProps({
    items: { type: Array, required: true },
    queue: { type: Array, default: () => [] }
});
defineEmits(["enqueue"]);
</script>

<template>
    <div class="catalog__grid">
        <EpisodeCard v-for="item in items" :key="item.id" :data-id="item.id"
            :podcast-title="item.podcastTitle" :episode-title="item.episodeTitle"
            :release-date="item.releaseDate" :duration-minutes="item.durationMinutes"
            :listens-count="item.listensCount" :is-new="item.isNew"
            :image-url="item.imageUrl" :description="item.description"
            :queued="queue.includes(item.id)" @enqueue="$emit('enqueue', item.id)" />
    </div>
</template>
