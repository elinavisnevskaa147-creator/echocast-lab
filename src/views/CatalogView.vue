<script setup>
import { computed, ref } from "vue";
import ItemList from "../components/ItemList.vue";
import PageSection from "../components/PageSection.vue";
import { useQueue } from "../queue.js";

const props = defineProps({ episodes: { type: Array, required: true } });
const groups = computed(() => ["Жизнь и быт", "Уютное и красивое", "Музыка и алгоритмы"].map(category => ({
    category,
    items: props.episodes.filter(episode => episode.category === category)
})));
const feedback = ref("");
const { queue, save } = useQueue();

function enqueue(id) {
    if (queue.value.includes(id)) return;
    feedback.value = save([...queue.value, id])
        ? "Эпизод добавлен в очередь."
        : "Не удалось сохранить очередь в браузере.";
}
</script>

<template>
<main class="main">
        <h2 class="main__title">Каталог подкастов</h2>
        <p class="main__desc">
            Выберите шоу, чтобы узнать подробности
            и добавить эпизоды в очередь.
        </p>

        <p role="status">{{ feedback }}</p>
        <PageSection v-for="group in groups" :key="group.category" class="catalog">
            <template #header><h3 class="catalog__title">{{ group.category }}</h3></template>
            <ItemList :items="group.items" :queue="queue" @enqueue="enqueue" />
        </PageSection>
    </main>
</template>
