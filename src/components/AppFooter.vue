<template>
<footer class="footer">
        <p class="footer__text">&copy; 2024 EchoCast. Все права защищены.</p>
        <p class="footer__text">Связь: <a href="mailto:hello@echocast.example" class="footer__link">hello@echocast.example</a></p>
    </footer>
</template>

<style lang="scss" scoped>
@use '../assets/scss/variables' as *;
.footer {
  background-color: $color-white;
  border-top: 1px solid $color-border;
  padding: $spacing-md;
  text-align: center;

  &__text {
    margin: $spacing-xs 0;
    color: $color-gray;
    font-size: 14px;
  }

  &__link {
    color: $color-primary;
  }
}
</style>
