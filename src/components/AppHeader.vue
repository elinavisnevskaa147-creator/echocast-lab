<script setup>
defineProps({ page: { type: String, required: true } });
</script>

<template>
<header class="header">
        <div class="header__container">
            <h1 class="header__logo">EchoCast</h1>
            <p class="header__subtitle">Каталог подкастов обо всём, что звучит в вашей голове</p>
            <nav class="nav">
                <ul class="nav__list">
                    <li class="nav__item"><a href="index.html" class="nav__link" :class="{ nav__link_active: page === 'index.html' }" :aria-current="page === 'index.html' ? 'page' : undefined">Главная</a></li>
                    <li class="nav__item"><a href="catalog.html" class="nav__link" :class="{ nav__link_active: page === 'catalog.html' }" :aria-current="page === 'catalog.html' ? 'page' : undefined">Каталог</a></li>
                    <li class="nav__item"><a href="detail.html" class="nav__link" :class="{ nav__link_active: page === 'detail.html' }" :aria-current="page === 'detail.html' ? 'page' : undefined">О подкасте</a></li>
                    <li class="nav__item"><a href="collection.html" class="nav__link" :class="{ nav__link_active: page === 'collection.html' }" :aria-current="page === 'collection.html' ? 'page' : undefined">Очередь прослушивания</a></li>
                    <li class="nav__item"><a href="checkout.html" class="nav__link" :class="{ nav__link_active: page === 'checkout.html' }" :aria-current="page === 'checkout.html' ? 'page' : undefined">Купить подписку</a></li>
                </ul>
            </nav>
        </div>
    </header>
</template>

<style lang="scss" scoped>
@use '../assets/scss/variables' as *;
.header {
  background-color: $color-white;
  border-bottom: 1px solid $color-border;
  padding: $spacing-md;

  &__container {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: $spacing-sm;
  }

  &__logo {
    margin: 0;
    font-size: 28px;
    color: $color-primary;
  }

  &__subtitle {
    color: $color-gray;
    margin: 0;
    font-size: 14px;
  }
}
.nav {
  &__list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    gap: $spacing-md;
  }

  &__item {
    margin: 0;
  }

  &__link {
    font-weight: bold;
    display: inline-block;
    padding: $spacing-xs 0;

    &_active {
      color: $color-dark;
      text-decoration: underline;
    }
  }
}
</style>
