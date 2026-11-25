<script setup>
import AppHeader from "./components/AppHeader.vue";
import AppFooter from "./components/AppFooter.vue";
import MiniPlayer from "./components/MiniPlayer.vue";
import HomeView from "./views/HomeView.vue";
import CatalogView from "./views/CatalogView.vue";
import CollectionView from "./views/CollectionView.vue";
import CheckoutView from "./views/CheckoutView.vue";
import DetailView from "./views/DetailView.vue";
import { episodes } from "./episodes.js";

const page = window.location.pathname.split("/").pop() || "index.html";
</script>

<template>
    <AppHeader :page="page" />
    <CatalogView v-if="page === 'catalog.html'" :episodes="episodes" />
    <CollectionView v-else-if="page === 'collection.html'" :episodes="episodes" />
    <CheckoutView v-else-if="page === 'checkout.html'" />
    <DetailView v-else-if="page === 'detail.html'" />
    <HomeView v-else />
    <AppFooter />
    <MiniPlayer />
</template>
