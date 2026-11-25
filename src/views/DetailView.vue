<script setup>
import PodcastHeader from "../components/PodcastHeader.vue";

const coverUrl = import.meta.env.BASE_URL + "img/pyro.jpg";
</script>

<template>
<main class="main">
        <article class="detail">
            <h2 class="detail__title">«Пирокинезис: рэп-разбор»</h2>

            <!-- Flexbox для обложки и описания -->
            <PodcastHeader>
                <template #header><img :src="coverUrl" alt="Иллюстрация к подкасту «Пирокинезис: рэп-разбор»" class="detail__image"></template>
                <div class="detail__hero-content">
                    <h3 class="detail__subtitle">Описание</h3>
                    <p class="section__text">Подкаст, в котором ведущие разбирают творчество музыканта Пирокинезиса в контексте рэпа. Обсуждаем биты, тексты, флоу, влияние классиков жанра, эволюцию звучания от первых треков до последних альбомов, а также концертные выступления и необычные музыкальные решения.</p>

                    <ul class="list">
                        <li class="list__item"><strong>Ведущие:</strong> Артём Волков, Ксения Огнева</li>
                        <li class="list__item"><strong>Всего эпизодов:</strong> 46</li>
                        <li class="list__item"><strong>Периодичность:</strong> раз в неделю</li>
                        <li class="list__item"><strong>Жанр:</strong> музыка, разбор творчества</li>
                    </ul>
                </div>
            </PodcastHeader>

            <section class="detail__section">
                <h3 class="detail__subtitle">Последние эпизоды</h3>

                <!-- Специфика 18: Список эпизодов через CSS Grid -->
                <div class="episode-grid">
                    <!-- Шапка для ПК -->
                    <div class="episode-grid__header">
                        <span>№</span>
                        <span>Название</span>
                        <span>Дата</span>
                        <span>Время</span>
                        <span>Действие</span>
                    </div>

                    <!-- Строка 1 -->
                    <div class="episode-grid__row">
                        <span class="episode-grid__num">46</span>
                        <span class="episode-grid__name">Биты и флоу в ранних треках Пирокинезиса</span>
                        <span class="episode-grid__date"><time datetime="2024-05-11">11.05.2024</time></span>
                        <span class="episode-grid__duration">43 мин</span>
                        <button class="episode-grid__btn" aria-label="Слушать эпизод 46">▶</button>
                    </div>

                    <!-- Строка 2 -->
                    <div class="episode-grid__row">
                        <span class="episode-grid__num">45</span>
                        <span class="episode-grid__name">Как Пирокинезис переосмыслил классический рэп</span>
                        <span class="episode-grid__date"><time datetime="2024-05-04">04.05.2024</time></span>
                        <span class="episode-grid__duration">46 мин</span>
                        <button class="episode-grid__btn" aria-label="Слушать эпизод 45">▶</button>
                    </div>

                    <!-- Строка 3 -->
                    <div class="episode-grid__row">
                        <span class="episode-grid__num">44</span>
                        <span class="episode-grid__name">Концертные выступления: энергия на сцене</span>
                        <span class="episode-grid__date"><time datetime="2024-04-27">27.04.2024</time></span>
                        <span class="episode-grid__duration">48 мин</span>
                        <button class="episode-grid__btn" aria-label="Слушать эпизод 44">▶</button>
                    </div>
                </div>
            </section>

            <div class="detail__actions">
                <a href="collection.html" class="btn">Добавить эпизоды в очередь прослушивания</a>
            </div>
        </article>
    </main>
</template>
