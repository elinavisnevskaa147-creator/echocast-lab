<script setup>
defineProps({ variant: { type: String, default: "new" } });
</script>

<template>
    <span class="card__badge" :class="`card__badge_${variant}`"><slot /></span>
</template>
