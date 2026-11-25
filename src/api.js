const apiUrl = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

async function request(path, options) {
    const response = await fetch(apiUrl + path, options);
    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }
    return await response.json();
}

export async function createSubscription(subscription) {
    return await request("/subscriptions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(subscription)
    });
}
