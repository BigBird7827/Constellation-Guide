export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Only POST requests allowed" });
    }

    const { query } = req.body;
    if (!query) {
        return res.status(400).json({ error: "Missing query parameter" });
    }

    const OPENAI_API_KEY = process.env.OPENAI_API_KEY; // API Key is securely stored

    try {
        const response = await fetch("https://api.openai.com/v1/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: "gpt-4",
                prompt: `Answer this astronomy question: ${query}`,
                max_tokens: 100,
            }),
        });

        const data = await response.json();
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: "Error fetching response" });
    }
}

