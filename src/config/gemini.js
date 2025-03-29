import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = "API_KEY"; // Ensure you have this in your .env
const genAI = new GoogleGenerativeAI(apiKey);

async function run(prompt) {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro-exp-03-25" });

    const generationConfig = {
        temperature: 1,
        topP: 0.95,
        topK: 64,
        maxOutputTokens: 65536,
        responseMimeType: "text/plain",
    };

    const chatSession = model.startChat({
        generationConfig,
        history: [],
    });

    try {
        const result = await chatSession.sendMessage(prompt);
        console.log(result.response.text());
        return result.response.text();
    } catch (error) {
        console.error("Error in Gemini API request:", error);
    }
}

export default run;
