import { ref } from "vue";

export function useQueue() {
    const queue = ref([]);
    try {
        const stored = JSON.parse(localStorage.getItem("echocast.queue"));
        if (Array.isArray(stored)) {
            queue.value = stored.map(String);
        }
    } catch {
        // The queue remains empty if storage is unavailable.
    }

    function save(ids) {
        try {
            localStorage.setItem("echocast.queue", JSON.stringify(ids));
            queue.value = ids;
            return true;
        } catch {
            return false;
        }
    }

    return { queue, save };
}
