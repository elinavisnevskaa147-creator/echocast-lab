import { episodes as records } from "../db.json";

export const episodes = records.map(episode => ({
    id: String(episode.id),
    podcastTitle: episode.podcast,
    episodeTitle: episode.topic,
    releaseDate: episode.date,
    durationMinutes: episode.duration,
    listensCount: episode.listens,
    isNew: episode.isNew,
    imageUrl: import.meta.env.BASE_URL + episode.image,
    description: episode.description,
    category: episode.category
}));
